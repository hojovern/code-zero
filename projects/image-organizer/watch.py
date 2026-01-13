import sys
import time
import os
import shutil
import logging
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from datetime import datetime

# Setup logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

# Configuration
WATCH_DIR = Path("projects/image-organizer/magic-image-organizer").resolve()
DEST_DIR = Path("projects/image-organizer/organized-photos").resolve()
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.heic', '.tiff', '.webp'}
VIDEO_EXTENSIONS = {'.mp4', '.mov', '.avi', '.mkv', '.webm'}

# Import your existing tools (lazy load to speed up startup)
try:
    from ai_utils import ImageAI
    print("AI Engine Loaded for Magic Folder.")
    ai_engine = ImageAI()
except ImportError:
    print("AI Engine not found. Running in basic mode.")
    ai_engine = None

class MagicOrganizer(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        
        # Wait a moment for file copy to complete
        time.sleep(1)
        self.process_file(Path(event.src_path))

    def process_file(self, file_path):
        if not file_path.exists():
            return
        
        ext = file_path.suffix.lower()
        if ext not in IMAGE_EXTENSIONS and ext not in VIDEO_EXTENSIONS:
            return # Ignore non-media files

        logging.info(f"✨ Magic detected: {file_path.name}")
        
        try:
            # 1. Get Date
            stats = os.stat(file_path)
            creation_date = datetime.fromtimestamp(stats.st_mtime)
            year = str(creation_date.year)
            month = f"{creation_date.month:02d}"

            # 2. Get AI Label (if image)
            category = "Uncategorized"
            if ai_engine and ext in IMAGE_EXTENSIONS:
                try:
                    label, conf = ai_engine.classify(str(file_path))
                    # Clean label: "a receipt" -> "Receipts"
                    raw_label = label.replace("a ", "").replace("an ", "")
                    category = raw_label.title().replace(" ", "_") + "s"
                except Exception as e:
                    logging.error(f"AI Error: {e}")

            # 3. Move File
            # Structure: Dest / Category / Year / Month / Filename
            dest_folder = DEST_DIR / category / year / month
            dest_folder.mkdir(parents=True, exist_ok=True)
            
            dest_file = dest_folder / file_path.name
            
            # Handle collision
            counter = 1
            while dest_file.exists():
                dest_file = dest_folder / f"{file_path.stem}_{counter}{ext}"
                counter += 1
            
            shutil.move(str(file_path), str(dest_file))
            logging.info(f"✅ Moved to: {dest_file}")

        except Exception as e:
            logging.error(f"Failed to process {file_path}: {e}")

if __name__ == "__main__":
    if not WATCH_DIR.exists():
        WATCH_DIR.mkdir(parents=True)
    if not DEST_DIR.exists():
        DEST_DIR.mkdir(parents=True)

    event_handler = MagicOrganizer()
    observer = Observer()
    observer.schedule(event_handler, str(WATCH_DIR), recursive=False)
    
    observer.start()
    print(f"👀 Magic Image Organizer is watching: {WATCH_DIR}")
    print(f"➡️  Moving files to: {DEST_DIR}")
    print("Press Ctrl+C to stop.")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
