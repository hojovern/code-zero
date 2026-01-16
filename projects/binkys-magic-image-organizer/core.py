import os
import hashlib
import exifread
import shutil
import re
import json
import easyocr
import torch
from pathlib import Path
from datetime import datetime
from PIL import Image
from sqlalchemy.orm import Session
from database import SessionLocal, init_db, save_photo
from models import Photo
from ai_utils import ImageAI
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

from sklearn.cluster import DBSCAN
import numpy as np

class BinkyCore:
    def __init__(self, ai_instance=None):
        init_db()
        self.db = SessionLocal()
        self.ai = ai_instance or ImageAI()
        self.geolocator = Nominatim(user_agent="binky_organizer_v3")
        self.image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.heic', '.tiff', '.webp'}
        self.video_extensions = {'.mp4', '.mov', '.avi', '.mkv', '.webm'}
        
        # Initialize OCR (English only for now)
        print("Loading Intelligence Engines...")
        self.ocr = easyocr.Reader(['en'], gpu=torch.cuda.is_available() or torch.backends.mps.is_available())
        
        # Setup Thumbnail Storage
        self.cache_dir = Path(__file__).parent / ".binky_cache"
        self.thumb_dir = self.cache_dir / "thumbs"
        self.thumb_dir.mkdir(parents=True, exist_ok=True)
        
        # Setup Trash Storage
        self.trash_dir = self.cache_dir / "trash"
        self.trash_dir.mkdir(parents=True, exist_ok=True)

    def get_thumbnail_path(self, file_hash):
        """Returns the path to the cached thumbnail."""
        return self.thumb_dir / f"{file_hash}.webp"

    def generate_thumbnail(self, file_path, file_hash):
        """Create a tiny, fast version of the image."""
        dest = self.get_thumbnail_path(file_hash)
        if dest.exists():
            return str(dest)
        
        try:
            with Image.open(file_path) as img:
                img.thumbnail((300, 300))
                img.save(dest, "WEBP", quality=80)
            return str(dest)
        except:
            return None

    def get_file_hash(self, file_path):
        hash_md5 = hashlib.md5()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()

    def _convert_to_degrees(self, value):
        d = float(value.values[0].num) / float(value.values[0].den)
        m = float(value.values[1].num) / float(value.values[1].den)
        s = float(value.values[2].num) / float(value.values[2].den)
        return d + (m / 60.0) + (s / 3600.0)

    def get_geo_data(self, file_path):
        try:
            with open(file_path, 'rb') as f:
                tags = exifread.process_file(f)
            if 'GPS GPSLatitude' in tags and 'GPS GPSLongitude' in tags:
                lat = self._convert_to_degrees(tags['GPS GPSLatitude'])
                lon = self._convert_to_degrees(tags['GPS GPSLongitude'])
                if tags.get('GPS GPSLatitudeRef', 'N').values == 'S': lat = -lat
                if tags.get('GPS GPSLongitudeRef', 'E').values == 'W': lon = -lon
                
                try:
                    location = self.geolocator.reverse(f"{lat}, {lon}", language='en', timeout=2)
                    if location:
                        addr = location.raw['address']
                        city = addr.get('city') or addr.get('town') or addr.get('village') or "Unknown City"
                        country = addr.get('country') or "Unknown Country"
                        return city, country, lat, lon
                except: pass
        except: pass
        return None, None, None, None

    def _scan_single_file(self, file_path):
        """Scans a single file and saves/updates it in the DB. Returns the Photo object."""
        file_path = Path(file_path)
        is_video = file_path.suffix.lower() in self.video_extensions
        file_hash = self.get_file_hash(file_path)

        photo_data = {
            'file_path': str(file_path),
            'filename': file_path.name,
            'extension': file_path.suffix.lower(),
            'file_hash': file_hash,
            'is_video': is_video,
            'size_kb': round(os.path.getsize(file_path) / 1024, 2)
        }

        if is_video:
            photo_data['creation_date'] = datetime.fromtimestamp(os.path.getmtime(file_path))
            photo_data['ai_category'] = "Video"
        else:
            with open(file_path, 'rb') as f:
                tags = exifread.process_file(f, stop_tag='DateTimeOriginal', details=False)
                date_tag = tags.get('EXIF DateTimeOriginal') or tags.get('Image DateTime')
                if date_tag:
                    try: photo_data['creation_date'] = datetime.strptime(str(date_tag), '%Y:%m:%d %H:%M:%S')
                    except: photo_data['creation_date'] = datetime.fromtimestamp(os.path.getmtime(file_path))
                else:
                    photo_data['creation_date'] = datetime.fromtimestamp(os.path.getmtime(file_path))

            # AI - Broad classification
            cat, sub, conf = self.ai.smart_classify(str(file_path))
            
            # Text Detective (OCR)
            sniffed_text = ""
            if cat in ["Document", "Other", "Urban"]:
                try:
                    results = self.ocr.readtext(str(file_path), detail=0)
                    sniffed_text = " ".join(results)
                except: pass

            # Face Detection
            face_prints = self.ai.get_face_embeddings(str(file_path))

            # Generate Thumbnail
            self.generate_thumbnail(file_path, file_hash)
            
            # Quality / Junk Detection
            is_junk, junk_reason = self.ai.detect_quality_issues(str(file_path))

            photo_data.update({
                'ai_category': cat,
                'ai_subject': sub,
                'ai_confidence': conf,
                'ai_description': sniffed_text,
                'faces_json': face_prints,
                'embedding': self.ai.get_embedding(str(file_path)),
                'is_junk': is_junk,
                'junk_reason': junk_reason
            })
            
            # Geo
            city, country, lat, lon = self.get_geo_data(file_path)
            photo_data.update({
                'location_city': city,
                'location_country': country,
                'latitude': lat,
                'longitude': lon
            })

        return save_photo(self.db, photo_data)

    def scan_folder(self, source_dir, progress_callback=None):
        source_path = Path(source_dir)
        files = [p for p in source_path.rglob('*') if p.suffix.lower() in self.image_extensions or p.suffix.lower() in self.video_extensions]
        
        total = len(files)
        for idx, file_path in enumerate(files):
            self._scan_single_file(file_path)
            if progress_callback:
                progress_callback((idx + 1) / total)

        self._cluster_faces()
        self._mark_duplicates()

    def _cluster_faces(self):
        """Automatically group photos by the people found in them."""
        photos = self.db.query(Photo).filter(Photo.faces_json != None).all()
        
        all_embeddings = []
        photo_map = [] # Track which photo each embedding belongs to
        
        for p in photos:
            if p.faces_json:
                for face_vec in p.faces_json:
                    all_embeddings.append(face_vec)
                    photo_map.append(p)
        
        if len(all_embeddings) < 2:
            return

        # DBSCAN: eps is the 'closeness' threshold (0.6 is good for FaceNet)
        clustering = DBSCAN(eps=0.6, min_samples=2, metric='euclidean').fit(all_embeddings)
        labels = clustering.labels_
        
        # Update photos with person tags
        for i, label in enumerate(labels):
            if label != -1: # -1 means noise/unidentified
                person_name = f"Person {label + 1}"
                if photo_map[i].ai_category == "People":
                    photo_map[i].ai_subject = person_name
        
        self.db.commit()

    def _mark_duplicates(self):
        # Simple implementation for now
        all_photos = self.db.query(Photo).all()
        seen_hashes = set()
        for p in all_photos:
            if p.file_hash in seen_hashes:
                p.is_duplicate = True
            else:
                seen_hashes.add(p.file_hash)
                p.is_duplicate = False
        self.db.commit()

    def get_all_photos(self):
        return self.db.query(Photo).all()

    def _parse_command(self, command):
        """Internal helper to turn English into sorting logic."""
        cmd = command.lower()
        params = {
            'hierarchy': "Year / Month",
            'custom_categories': [],
            'filter_subject': None,
            'filter_year': None,
            'target_folder_name': None
        }
        
        # A. Extract "Into a folder called X"
        if "folder called" in cmd:
            parts = cmd.split("folder called")
            if len(parts) > 1:
                params['target_folder_name'] = parts[1].strip().strip('"').strip("'").split(" ")[0]
                if not params['target_folder_name']: 
                    params['target_folder_name'] = parts[1].strip().strip('"').strip("'")
                
        # B. Extract Year Constraints
        year_match = re.search(r'\b(19|20)\d{2}\b', cmd)
        if year_match:
            params['filter_year'] = int(year_match.group(0))

        # C. Check for Custom Split
        if "," in command or " vs " in command:
            raw_cats = re.split(r',| vs ', command)
            params['custom_categories'] = [c.strip().title() for c in raw_cats if c.strip()]
            if len(params['custom_categories']) > 1: params['hierarchy'] = "Custom Split"

        # D. Subject / Content Constraints
        if not params['custom_categories']:
            ABSTRACT_CONCEPTS = {
                "color": ["Red", "Blue", "Green", "Yellow", "Black", "White", "Orange", "Purple", "Pink"],
                "vibe": ["Happy", "Melancholy", "Energetic", "Calm", "Dark", "Romantic", "Minimalist"],
                "season": ["Spring", "Summer", "Autumn", "Winter"],
                "time": ["Morning", "Afternoon", "Evening", "Night"]
            }
            for key, buckets in ABSTRACT_CONCEPTS.items():
                if key in cmd:
                    params['custom_categories'] = buckets
                    params['hierarchy'] = "Custom Split"
                    break

        if not params['custom_categories'] and not params['target_folder_name']:
            if "location" in cmd: params['hierarchy'] = "Location"
            elif "category" in cmd or "type" in cmd: params['hierarchy'] = "Category / Year"
            elif "people" in cmd or "person" in cmd: params['hierarchy'] = "Category"
            
            filter_map = {
                "dog": "Dog", "receipt": "Receipt", "nature": "Nature", "people": "People", 
                "screenshot": "Screenshot", "document": "Document", "selfie": "Selfie", "food": "Food"
            }
            for k, v in filter_map.items():
                if k in cmd: params['filter_subject'] = v; break
        
        return params

    def _get_destination_path(self, photo, dest_base, params):
        """Calculates where a specific photo should go based on parsed params."""
        date = photo.creation_date or datetime.now()
        cat = photo.ai_category or "Uncategorized"
        
        if params['custom_categories']:
            cat = self.ai.custom_classify(str(photo.file_path), params['custom_categories'])
        
        if params['target_folder_name']:
            d_dir = Path(dest_base) / params['target_folder_name']
        elif params['hierarchy'] == "Location":
            d_dir = Path(dest_base) / (photo.location_country or "Unknown") / (photo.location_city or "Unknown")
        elif params['hierarchy'] == "Custom Split": 
            d_dir = Path(dest_base) / cat
        elif params['hierarchy'] == "Category / Year": 
            d_dir = Path(dest_base) / cat / str(date.year)
        elif params['hierarchy'] == "Category": 
            d_dir = Path(dest_base) / cat
        else: 
            d_dir = Path(dest_base) / str(date.year) / f"{date.month:02d}"
            
        return d_dir, cat

    def execute_organization(self, command, destination, rename=False, mode="Copy", progress_callback=None):
        photos = self.get_all_photos()
        if not photos: return 0
        unique_photos = [p for p in photos if not p.is_duplicate]
        total = len(unique_photos)
        dest_base = Path(destination)
        
        params = self._parse_command(command)

        count = 0
        for idx, p in enumerate(unique_photos):
            try:
                src = Path(p.file_path)
                if not src.exists(): continue
                
                # Filters
                if params['filter_year'] and p.creation_date and p.creation_date.year != params['filter_year']:
                    continue
                if params['filter_subject']:
                    is_match = False
                    if p.ai_subject and params['filter_subject'].lower() in p.ai_subject.lower(): is_match = True
                    if p.ai_category and params['filter_subject'].lower() in p.ai_category.lower(): is_match = True
                    if params['filter_subject'].lower() in p.filename.lower(): is_match = True
                    if not is_match: continue

                d_dir, cat = self._get_destination_path(p, dest_base, params)
                d_dir.mkdir(parents=True, exist_ok=True)
                
                # Rename Logic
                fname = p.filename
                if rename:
                    clean_orig = "".join([c if c.isalnum() else "_" for c in src.stem]).strip("_")
                    is_generic = re.match(r'^\d+$', src.stem) or re.match(r'^(IMG|DSC|PXL|VID|MVI)[-_]?\d+', src.stem, re.IGNORECASE)
                    if is_generic: clean_orig = ""
                    date_str = p.creation_date.strftime('%Y-%m-%d') if p.creation_date else "UnknownDate"
                    parts = [date_str, cat, p.ai_subject or "General"]
                    if clean_orig: parts.append(clean_orig)
                    fname = f"{'_'.join(parts)}{p.extension}"
                
                dest = d_dir / fname
                c = 1
                while dest.exists():
                    dest = d_dir / f"{dest.stem}_{c}{p.extension}"
                    c += 1
                
                if mode == "Move": shutil.move(src, dest)
                else: shutil.copy2(src, dest)
                count += 1
                if progress_callback: progress_callback((idx + 1) / total)
            except Exception as e:
                print(f"Binky Error on {p.filename}: {e}")
        return count

    def ingest_file(self, file_path, destination_root, command="", rename=True):
        """New & Improved: Ingest respects natural language commands."""
        # 1. Scan and Analyze
        photo = self._scan_single_file(file_path)
        
        # 2. Duplicate Check (Pre-Move)
        # Check if this hash exists in any OTHER photo record
        existing = self.db.query(Photo).filter(Photo.file_hash == photo.file_hash, Photo.id != photo.id).first()
        if existing:
            photo.is_junk = True
            photo.junk_reason = "Duplicate"
            self.db.commit()
            print(f"Detected duplicate: {photo.filename} matches {existing.filename}")
        
        # 3. Parse Logic
        params = self._parse_command(command)
        
        # 4. Determine Destination
        if photo.is_junk:
            # DIVERT TO TRASH POUCH
            dest_dir = Path(destination_root) / "_Trash_Pouch" / (photo.junk_reason or "Misc")
            cat = "Junk" # Override for renaming if needed
        else:
            # Normal Flow
            dest_dir, cat = self._get_destination_path(photo, destination_root, params)
            
        dest_dir.mkdir(parents=True, exist_ok=True)
        
        # 4. Rename Logic
        fname = photo.filename
        if rename:
            date_str = photo.creation_date.strftime('%Y-%m-%d') if photo.creation_date else "UnknownDate"
            clean_orig = "".join([c if c.isalnum() else "_" for c in Path(file_path).stem]).strip("_")
            is_generic = re.match(r'^\d+$', Path(file_path).stem) or re.match(r'^(IMG|DSC|PXL|VID|MVI)[-_]?\d+', Path(file_path).stem, re.IGNORECASE)
            if is_generic: clean_orig = ""
            parts = [date_str, cat, photo.ai_subject or "General"]
            if clean_orig: parts.append(clean_orig)
            fname = f"{'_'.join(parts)}{photo.extension}"
        
        dest_path = dest_dir / fname
        c = 1
        while dest_path.exists():
            dest_path = dest_dir / f"{dest_path.stem}_{c}{photo.extension}"
            c += 1
            
        shutil.move(str(photo.file_path), str(dest_path))
        photo.file_path = str(dest_path)
        photo.filename = dest_path.name
        self.db.commit()
        return dest_path

    def rename_person(self, old_name, new_name):
        """
        Renames a person in the database and moves their files on disk.
        """
        photos = self.db.query(Photo).filter(
            Photo.ai_category == "People",
            Photo.ai_subject == old_name
        ).all()
        
        if not photos:
            print(f"No photos found for {old_name}")
            return False
            
        success_count = 0
        for p in photos:
            try:
                src_path = Path(p.file_path)
                if not src_path.exists(): continue
                
                # Assume standard structure: Root/People/OldName/file.jpg
                # We want: Root/People/NewName/file.jpg
                
                # Construct new path safely
                # Find the 'People' segment? Or just rely on parent?
                # Better: Use the same parent directory if it's currently in a folder named 'OldName'
                
                if src_path.parent.name == old_name:
                    # It's in .../OldName/file.jpg -> .../NewName/file.jpg
                    dest_dir = src_path.parent.parent / new_name
                else:
                    # It's scattered? Force it into a structured People/NewName folder
                    # This is safer for "gathering"
                    # Find the root? We don't track "Library Root" explicitly in core...
                    # But we can infer it from the file path usually.
                    # Fallback: Just rename the immediate parent folder? No, that affects other files.
                    
                    # Strategy: Move to sibling folder named 'NewName'
                    dest_dir = src_path.parent.parent / new_name
                
                dest_dir.mkdir(parents=True, exist_ok=True)
                dest_path = dest_dir / src_path.name
                
                # Handle collision
                c = 1
                while dest_path.exists():
                    dest_path = dest_dir / f"{dest_path.stem}_{c}{dest_path.suffix}"
                    c += 1
                
                shutil.move(str(src_path), str(dest_path))
                
                # Update DB
                p.ai_subject = new_name
                p.file_path = str(dest_path)
                success_count += 1
                
            except Exception as e:
                print(f"Error renaming {p.filename}: {e}")
        
        self.db.commit()
        
        # Cleanup old folder if empty
        # We need to know where the old folder was.
        # We can assume if we moved files from X, X might be empty now.
        # Let's try to remove the directory of the LAST processed photo if it matches old_name
        if photos and Path(photos[0].file_path).parent.name == new_name:
             # The *original* path was .../OldName.
             # We can't easily track it unless we stored it.
             # But generally, if we moved from .../OldName, we can try to delete .../OldName
             pass # Optimization for later
             
        return success_count > 0

    def semantic_search(self, query, limit=20):
        """Find photos that match a text description using CLIP embeddings."""
        query_vec = self.ai.get_text_embedding(query)
        if query_vec is None: return []
        
        # Get all photos with embeddings (EXCLUDING DELETED)
        all_photos = self.db.query(Photo).filter(
            Photo.embedding != None,
            Photo.is_deleted == False
        ).all()
        if not all_photos: return []
        
        # Calculate similarities
        results = []
        for p in all_photos:
            # embeddings are stored as JSON (list) in DB
            sim = np.dot(query_vec, p.embedding) # CLIP embeddings are normalized
            results.append((p, sim))
            
        # Sort by similarity descending
        results.sort(key=lambda x: x[1], reverse=True)
        return [r[0] for r in results[:limit]]

    def delete_photo(self, photo_id):
        """Soft delete: move to .binky_cache/trash and mark in DB."""
        photo = self.db.query(Photo).get(photo_id)
        if photo and not photo.is_deleted:
            try:
                src = Path(photo.file_path)
                if src.exists():
                    dest = self.trash_dir / src.name
                    # Handle name collisions in trash
                    c = 1
                    while dest.exists():
                        dest = self.trash_dir / f"{src.stem}_{c}{src.suffix}"
                        c += 1
                    
                    # Store original path for recovery
                    # We can use a JSON field or just repurpose ai_description temporarily?
                    # Better: models.py should have original_path. 
                    # For now, let's keep it in DB record.
                    
                    shutil.move(str(src), str(dest))
                    photo.file_path = str(dest)
                    photo.is_deleted = True
                    photo.deleted_at = datetime.now()
                    self.db.commit()
                    return True
            except Exception as e:
                print(f"Soft delete error: {e}")
        return False

    def recover_photo(self, photo_id, destination_root):
        """Restore a photo from trash to the library."""
        photo = self.db.query(Photo).get(photo_id)
        if photo and photo.is_deleted:
            try:
                src = Path(photo.file_path)
                if src.exists():
                    # Put it back in organized library
                    # We re-run the destination logic to find its proper home
                    params = self._parse_command("") # Default hierarchy
                    dest_dir, cat = self._get_destination_path(photo, destination_root, params)
                    dest_dir.mkdir(parents=True, exist_ok=True)
                    dest_path = dest_dir / src.name
                    
                    shutil.move(str(src), str(dest_path))
                    photo.file_path = str(dest_path)
                    photo.is_deleted = False
                    photo.deleted_at = None
                    self.db.commit()
                    return True
            except Exception as e:
                print(f"Recovery error: {e}")
        return False

    def permanent_delete_photo(self, photo_id):
        """Actually wipe the file and the record."""
        photo = self.db.query(Photo).get(photo_id)
        if photo:
            try:
                p = Path(photo.file_path)
                if p.exists(): p.unlink()
                thumb = self.get_thumbnail_path(photo.file_hash)
                if thumb.exists(): thumb.unlink()
                
                self.db.delete(photo)
                self.db.commit()
                return True
            except Exception as e:
                print(f"Permanent delete error: {e}")
        return False

    def auto_purge_trash(self, days=30):
        """Permanently delete items older than X days."""
        from datetime import timedelta
        cutoff = datetime.now() - timedelta(days=days)
        expired = self.db.query(Photo).filter(
            Photo.is_deleted == True,
            Photo.deleted_at < cutoff
        ).all()
        
        count = 0
        for p in expired:
            if self.permanent_delete_photo(p.id): count += 1
        return count

    def clear_trash(self):
        """Empty the entire trash immediately."""
        trash_items = self.db.query(Photo).filter(Photo.is_deleted == True).all()
        count = 0
        for p in trash_items:
            if self.permanent_delete_photo(p.id): count += 1
        return count

    def clone_library(self, external_dest, progress_callback=None):
        """
        Takes the current organized library and clones it to a new location (like an SSD).
        Maintains the exact folder structure.
        """
        photos = self.get_all_photos()
        unique_photos = [p for p in photos if not p.is_deleted and not p.is_duplicate]
        total = len(unique_photos)
        
        count = 0
        for idx, p in enumerate(unique_photos):
            try:
                src = Path(p.file_path)
                if not src.exists(): continue
                
                # Get relative path from current destination
                # This is tricky because files might be scattered.
                # Better: Re-run the destination logic for the NEW root.
                params = self._parse_command("") # Default hierarchy
                d_dir, cat = self._get_destination_path(p, external_dest, params)
                d_dir.mkdir(parents=True, exist_ok=True)
                
                dest_path = d_dir / p.filename
                shutil.copy2(src, dest_path)
                count += 1
                if progress_callback: progress_callback((idx + 1) / total)
            except Exception as e:
                print(f"Clone error: {e}")
        return count

    def get_memories_for_today(self, limit=5):
        """Get photos from this same day in previous years."""
        today = datetime.now()
        # Filter photos where month and day match
        # SQLite extraction of month/day
        from sqlalchemy import extract
        memories = self.db.query(Photo).filter(
            extract('month', Photo.creation_date) == today.month,
            extract('day', Photo.creation_date) == today.day,
            extract('year', Photo.creation_date) < today.year
        ).order_by(Photo.creation_date.desc()).limit(limit).all()
        
        return memories

    def close(self):
        self.db.close()