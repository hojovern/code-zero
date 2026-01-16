import os
import hashlib
import exifread
import shutil
import re
import json
import easyocr
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

    def scan_folder(self, source_dir, progress_callback=None):
        source_path = Path(source_dir)
        files = [p for p in source_path.rglob('*') if p.suffix.lower() in self.image_extensions or p.suffix.lower() in self.video_extensions]
        
        total = len(files)
        for idx, file_path in enumerate(files):
            is_video = file_path.suffix.lower() in self.video_extensions
            
            # 1. Basic Stats
            file_hash = self.get_file_hash(file_path)
            
            # 2. Metadata & AI
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
                # Image processing
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
                
                # Text Detective (OCR) for Documents/Screenshots
                sniffed_text = ""
                if cat in ["Document", "Other", "Urban"]:
                    try:
                        results = self.ocr.readtext(str(file_path), detail=0)
                        sniffed_text = " ".join(results)
                    except: pass

                # NEW: Face Detection
                face_prints = self.ai.get_face_embeddings(str(file_path))

                # Generate Thumbnail
                self.generate_thumbnail(file_path, file_hash)

                photo_data.update({
                    'ai_category': cat,
                    'ai_subject': sub,
                    'ai_confidence': conf,
                    'ai_description': sniffed_text,
                    'faces_json': face_prints,
                    'embedding': self.ai.get_embedding(str(file_path))
                })
                
                # Geo
                city, country, lat, lon = self.get_geo_data(file_path)
                photo_data.update({
                    'location_city': city,
                    'location_country': country,
                    'latitude': lat,
                    'longitude': lon
                })

            # 3. Save to DB
            save_photo(self.db, photo_data)
            
            if progress_callback:
                progress_callback((idx + 1) / total)

        # After scan, group people automatically
        self._cluster_faces()
        # Mark duplicates globally in DB
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
        # Note: A photo can have multiple people, for now we label the primary (first) person
        # In a real Plex app, we'd have a separate 'Faces' table.
        for i, label in enumerate(labels):
            if label != -1: # -1 means noise/unidentified
                person_name = f"Person {label + 1}"
                # If it's a 'People' photo, let's update its subject
                if photo_map[i].ai_category == "People":
                    photo_map[i].ai_subject = person_name
        
        self.db.commit()

    def _mark_duplicates(self):
        # Professional Hash-based duplicate detection in SQL
        # self.db.execute(self.db.query(Photo).statement) # Stub for complex duplicate logic
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

    def execute_organization(self, command, destination, rename=False, mode="Copy", progress_callback=None):
        """
        The Master Organization Engine.
        Handles Natural Language, Custom Splits, and File Movement.
        """
        photos = self.get_all_photos()
        if not photos: return 0
        
        unique_photos = [p for p in photos if not p.is_duplicate]
        total = len(unique_photos)
        dest_base = Path(destination)
        
        # 1. PARSE COMMAND (SMART NLP)
        cmd = command.lower()
        hierarchy = "Year / Month" # Default
        custom_categories = []
        filter_subject = None
        filter_year = None
        target_folder_name = None
        
        # A. Extract "Into a folder called X"
        if "folder called" in cmd:
            parts = cmd.split("folder called")
            if len(parts) > 1:
                # Take the next few words or the rest of the string
                target_folder_name = parts[1].strip().strip('"').strip("'").split(" ")[0] # Simple extraction
                # If the name is multi-word and quoted, handle that? For now assume single word or end of string
                if not target_folder_name: target_folder_name = parts[1].strip().strip('"').strip("'")
                
        # B. Extract Year Constraints ("from 2023", "in 2022")
        year_match = re.search(r'\b(19|20)\d{2}\b', cmd)
        if year_match:
            filter_year = int(year_match.group(0))

        # C. Check for Custom Split (vs mode)
        if "," in command or " vs " in command:
            raw_cats = re.split(r',| vs ', command)
            custom_categories = [c.strip().title() for c in raw_cats if c.strip()]
            if len(custom_categories) > 1: hierarchy = "Custom Split"

        # D. Subject / Content Constraints
        # Zero-Shot Expansion
        if not custom_categories:
            ABSTRACT_CONCEPTS = {
                "color": ["Red", "Blue", "Green", "Yellow", "Black", "White", "Orange", "Purple", "Pink"],
                "vibe": ["Happy", "Melancholy", "Energetic", "Calm", "Dark", "Romantic", "Minimalist"],
                "season": ["Spring", "Summer", "Autumn", "Winter"],
                "time": ["Morning", "Afternoon", "Evening", "Night"]
            }
            for key, buckets in ABSTRACT_CONCEPTS.items():
                if key in cmd:
                    custom_categories = buckets
                    hierarchy = "Custom Split"
                    break

        if not custom_categories and not target_folder_name:
            if "location" in cmd: hierarchy = "Location"
            elif "category" in cmd or "type" in cmd: hierarchy = "Category / Year"
            elif "people" in cmd or "person" in cmd: hierarchy = "Category"
            
            # Simple Filter Sniffing
            filter_map = {
                "dog": "Dog", "receipt": "Receipt", "nature": "Nature", "people": "People", 
                "screenshot": "Screenshot", "document": "Document", "selfie": "Selfie", "food": "Food"
            }
            for k, v in filter_map.items():
                if k in cmd: filter_subject = v; break
            
            # Fallback: if no specific subject found but user typed something specific like "cats"
            # We treat the whole command as a subject filter if it's short
            if not filter_subject and len(cmd.split()) < 3 and not filter_year:
                # filter_subject = cmd.title() # Risky, might match nothing.
                pass

        # 2. EXECUTE LOOP
        count = 0
        for idx, p in enumerate(unique_photos):
            try:
                src = Path(p.file_path)
                if not src.exists(): continue
                
                date = p.creation_date or datetime.now()
                
                # Apply Year Filter
                if filter_year and date.year != filter_year:
                    continue

                # Apply Subject Filter
                if filter_subject:
                    # Check AI Category, Subject, or Filename
                    is_match = False
                    if p.ai_subject and filter_subject.lower() in p.ai_subject.lower(): is_match = True
                    if p.ai_category and filter_subject.lower() in p.ai_category.lower(): is_match = True
                    if filter_subject.lower() in p.filename.lower(): is_match = True
                    if not is_match: continue

                cat = p.ai_category or "Uncategorized"
                
                if custom_categories:
                    cat = self.ai.custom_classify(str(src), custom_categories)
                
                # Build Path
                if target_folder_name:
                    # "Move into a folder called X" -> dest/X/filename
                    # We might still want subfolders? For now, flat inside X unless hierarchy specified
                    d_dir = dest_base / target_folder_name
                elif hierarchy == "Location":
                    d_dir = dest_base / (p.location_country or "Unknown") / (p.location_city or "Unknown")
                elif hierarchy == "Custom Split": d_dir = dest_base / cat
                elif hierarchy == "Category / Year": d_dir = dest_base / cat / str(date.year)
                elif hierarchy == "Category": d_dir = dest_base / cat
                else: d_dir = dest_base / str(date.year) / f"{date.month:02d}"
                
                d_dir.mkdir(parents=True, exist_ok=True)
                
                # Rename Logic
                fname = p.filename
                if rename:
                    clean_orig = "".join([c if c.isalnum() else "_" for c in src.stem]).strip("_")
                    # Check if original is generic
                    is_generic = re.match(r'^\d+$', src.stem) or re.match(r'^(IMG|DSC|PXL|VID|MVI)[-_]?\d+', src.stem, re.IGNORECASE)
                    if is_generic: clean_orig = ""
                    
                    parts = [date.strftime('%Y-%m-%d'), cat, p.ai_subject or "General"]
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

    def close(self):
        self.db.close()
