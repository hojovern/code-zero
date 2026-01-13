import os
import hashlib
import exifread
from pathlib import Path
from PIL import Image
import pandas as pd
from datetime import datetime
from tqdm import tqdm
try:
    from ai_utils import ImageAI
except ImportError:
    ImageAI = None

class ImageScanner:
    def __init__(self, source_dir, enable_ai=False):
        self.source_dir = Path(source_dir)
        self.image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.heic', '.tiff', '.webp'}
        self.video_extensions = {'.mp4', '.mov', '.avi', '.mkv', '.webm'}
        self.data = []
        self.enable_ai = enable_ai
        self.ai_model = ImageAI() if enable_ai and ImageAI else None

    def get_hash(self, file_path):
        """Generate MD5 hash of the file to identify duplicates."""
        hash_md5 = hashlib.md5()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()

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
                
                # Get Date
                if is_video:
                    # Videos don't work with exifread, use file stats
                    stats = os.stat(file_path)
                    creation_date = datetime.fromtimestamp(stats.st_mtime)
                    width, height = 0, 0
                    format = "VIDEO"
                else:
                    creation_date = self.get_exif_date(file_path)
                    with Image.open(file_path) as img:
                        width, height = img.size
                        format = img.format

                # AI Processing (Skip for videos)
                ai_label = "unchecked"
                ai_conf = 0.0
                if self.enable_ai and self.ai_model:
                    if is_video:
                        ai_label = "video"
                        ai_conf = 1.0
                    else:
                        ai_label, ai_conf = self.ai_model.classify(str(file_path))

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
                    'ai_label': ai_label,
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
        scanner = ImageScanner(sys.argv[1])
        report = scanner.scan()
        report.to_csv('image_index.csv', index=False)
        print(f"\nScan complete! Found {len(report)} images.")
        print(f"Duplicates identified: {report['is_duplicate'].sum() if 'is_duplicate' in report else 0}")
        print("Results saved to image_index.csv")
