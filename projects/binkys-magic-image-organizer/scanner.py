import os
import hashlib
import exifread
import json
from pathlib import Path
from PIL import Image
import pandas as pd
from datetime import datetime
from tqdm import tqdm
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

try:
    from ai_utils import ImageAI
except ImportError:
    ImageAI = None

class ImageScanner:
    def __init__(self, source_dir, enable_ai=False, ai_instance=None):
        self.source_dir = Path(source_dir)
        self.image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.heic', '.tiff', '.webp'}
        self.video_extensions = {'.mp4', '.mov', '.avi', '.mkv', '.webm'}
        self.data = []
        self.embeddings = {} # Store vectors here
        self.enable_ai = enable_ai
        self.geolocator = Nominatim(user_agent="binky_organizer")
        
        # Use shared AI instance if provided, otherwise lazy load
        if enable_ai:
            if ai_instance:
                self.ai_model = ai_instance
            elif ImageAI:
                self.ai_model = ImageAI()
            else:
                self.ai_model = None
        else:
            self.ai_model = None

    def get_hash(self, file_path):
        """Generate MD5 hash of the file to identify duplicates."""
        hash_md5 = hashlib.md5()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()

    def _convert_to_degrees(self, value):
        """Helper to convert GPS EXIF to decimal degrees."""
        d = float(value.values[0].num) / float(value.values[0].den)
        m = float(value.values[1].num) / float(value.values[1].den)
        s = float(value.values[2].num) / float(value.values[2].den)
        return d + (m / 60.0) + (s / 3600.0)

    def get_geo_location(self, file_path):
        """Extract GPS from EXIF and reverse geocode to (City, Country)."""
        try:
            with open(file_path, 'rb') as f:
                tags = exifread.process_file(f)
                
            if 'GPS GPSLatitude' in tags and 'GPS GPSLongitude' in tags:
                lat = self._convert_to_degrees(tags['GPS GPSLatitude'])
                lon = self._convert_to_degrees(tags['GPS GPSLongitude'])
                
                # Check Refs (N/S, E/W)
                if tags.get('GPS GPSLatitudeRef', 'N').values == 'S': lat = -lat
                if tags.get('GPS GPSLongitudeRef', 'E').values == 'W': lon = -lon
                
                try:
                    location = self.geolocator.reverse(f"{lat}, {lon}", language='en', timeout=2)
                    if location:
                        addr = location.raw['address']
                        city = addr.get('city') or addr.get('town') or addr.get('village') or "Unknown City"
                        country = addr.get('country') or "Unknown Country"
                        return city, country
                except (GeocoderTimedOut, Exception):
                    return None, None
        except Exception:
            pass
        return None, None

    def get_exif_date(self, file_path):
        """Extract the original capture date from EXIF data."""
        with open(file_path, 'rb') as f:
            tags = exifread.process_file(f, stop_tag='DateTimeOriginal', details=False)
            date_tag = tags.get('EXIF DateTimeOriginal') or tags.get('Image DateTime')
            if date_tag:
                try:
                    return datetime.strptime(str(date_tag), '%Y:%m:%d %H:%M:%S')
                except ValueError:
                    pass
        
        # Fallback to file creation time
        stats = os.stat(file_path)
        return datetime.fromtimestamp(stats.st_mtime)

    def scan(self, progress_callback=None):
        print(f"Scanning directory: {self.source_dir}")
        # Scan for both images and videos
        files = [p for p in self.source_dir.rglob('*') if p.suffix.lower() in self.image_extensions or p.suffix.lower() in self.video_extensions]
        
        total_files = len(files)
        for idx, file_path in enumerate(tqdm(files, desc="Indexing Files")):
            try:
                file_hash = self.get_hash(file_path)
                is_video = file_path.suffix.lower() in self.video_extensions
                
                # Get Date & Location
                city, country = None, None
                
                if is_video:
                    # Videos don't work with exifread, use file stats
                    stats = os.stat(file_path)
                    creation_date = datetime.fromtimestamp(stats.st_mtime)
                    width, height = 0, 0
                    format = "VIDEO"
                else:
                    creation_date = self.get_exif_date(file_path)
                    # Extract Location
                    city, country = self.get_geo_location(file_path)
                    
                    with Image.open(file_path) as img:
                        width, height = img.size
                        format = img.format

                # AI Processing (Skip for videos)
                ai_category = "Video"
                ai_subject = "General"
                ai_conf = 0.0
                
                if self.enable_ai and self.ai_model:
                    if is_video:
                        ai_category = "Video"
                        ai_conf = 1.0
                    else:
                        # NEW: Smart 2-step classification
                        cat, sub, conf = self.ai_model.smart_classify(str(file_path))
                        ai_category = cat
                        ai_subject = sub
                        ai_conf = conf
                        
                        # Generate Embedding for Search
                        vector = self.ai_model.get_embedding(str(file_path))
                        if vector:
                            self.embeddings[str(file_path)] = vector

                self.data.append({
                    'file_path': str(file_path),
                    'filename': file_path.name,
                    'extension': file_path.suffix.lower(),
                    'hash': file_hash,
                    'creation_date': creation_date,
                    'width': width,
                    'height': height,
                    'format': format,
                    'size_kb': round(os.path.getsize(file_path) / 1024, 2),
                    'location_city': city,
                    'location_country': country,
                    'ai_category': ai_category,
                    'ai_subject': ai_subject,
                    'ai_confidence': round(ai_conf, 4)
                })
                
                if progress_callback:
                    progress_callback(idx / total_files)

            except Exception as e:
                print(f"Error processing {file_path}: {e}")

        df = pd.DataFrame(self.data)
        # Identify duplicates based on hash
        if not df.empty:
            df['is_duplicate'] = df.duplicated(subset=['hash'], keep='first')
        
        return df

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python scanner.py <source_directory>")
    else:
        scanner = ImageScanner(sys.argv[1], enable_ai=True)
        report = scanner.scan()
        report.to_csv('image_index.csv', index=False)
        
        # Save embeddings
        with open('embeddings.json', 'w') as f:
            json.dump(scanner.embeddings, f)
            
        print(f"\nScan complete! Found {len(report)} images.")
        print(f"Duplicates identified: {report['is_duplicate'].sum() if 'is_duplicate' in report else 0}")
        print("Results saved to image_index.csv and embeddings.json")
