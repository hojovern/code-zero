import unittest
import shutil
import os
from pathlib import Path
import sys
from unittest.mock import MagicMock

# Add parent dir to path to import core
sys.path.append(str(Path(__file__).parent.parent))

# MOCK Dependencies BEFORE importing core
sys.modules['face_recognition'] = MagicMock()
sys.modules['easyocr'] = MagicMock()
sys.modules['torch'] = MagicMock()
sys.modules['transformers'] = MagicMock()
sys.modules['PIL'] = MagicMock()
sys.modules['geopy'] = MagicMock()
sys.modules['geopy.geocoders'] = MagicMock()
sys.modules['geopy.exc'] = MagicMock()
sys.modules['sklearn'] = MagicMock()
sys.modules['sklearn.cluster'] = MagicMock()
sys.modules['cv2'] = MagicMock() # Mock OpenCV
sys.modules['exifread'] = MagicMock()
sys.modules['facenet_pytorch'] = MagicMock()

from core import BinkyCore
from models import Photo
from database import SessionLocal, init_db

class TestPeopleManager(unittest.TestCase):
    def setUp(self):
        # Setup temporary test environment
        self.test_dir = Path("test_env")
        if self.test_dir.exists(): shutil.rmtree(self.test_dir)
        self.test_dir.mkdir(exist_ok=True)
        self.db_path = self.test_dir / "test_fresh.db"
        
        # Override DB Path
        import database
        database.DB_PATH = self.db_path
        # RE-CREATE ENGINE with new path
        from sqlalchemy import create_engine
        from sqlalchemy.orm import sessionmaker
        database.engine = create_engine(f"sqlite:///{self.db_path}", echo=False)
        database.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=database.engine)
        
        print(f"DEBUG: Engine URL: {database.engine.url}")
        
        # Create Tables explicitly using the new engine
        from models import Base, Photo
        Photo.__table__.create(bind=database.engine)
        print("DEBUG: Tables created.")
        
        # Create Core instance (with mocked AI to avoid loading models)
        self.core = BinkyCore(ai_instance=MagicMock())
        # Re-point DB session to test DB
        self.core.db = database.SessionLocal()
        print(f"DEBUG: Session bind: {self.core.db.get_bind().url}")
        
        # Create Dummy "Person 1" Folder and Photos
        self.p1_dir = self.test_dir / "People" / "Person 1"
        self.p1_dir.mkdir(parents=True, exist_ok=True)
        
        self.photo_path = self.p1_dir / "face1.jpg"
        with open(self.photo_path, "w") as f: f.write("fake image")
        
        # Add to DB
        p = Photo(
            file_path=str(self.photo_path),
            filename="face1.jpg",
            file_hash="hash123",
            ai_category="People",
            ai_subject="Person 1"
        )
        self.core.db.add(p)
        self.core.db.commit()

    def tearDown(self):
        self.core.close()
        if self.test_dir.exists():
            shutil.rmtree(self.test_dir)

    def test_rename_person(self):
        """Test that renaming 'Person 1' to 'Mom' moves files and updates DB."""
        print("\nTesting Rename: Person 1 -> Mom")
        
        # EXECUTE THE FUNCTION WE ARE ABOUT TO WRITE
        # Check if method exists first, else fail gracefully for TDD
        if not hasattr(self.core, 'rename_person'):
            self.fail("Method 'rename_person' not implemented in BinkyCore yet.")
            
        success = self.core.rename_person("Person 1", "Mom")
        
        self.assertTrue(success)
        
        # ASSERT 1: DB Updated
        updated_photo = self.core.db.query(Photo).filter_by(file_hash="hash123").first()
        self.assertEqual(updated_photo.ai_subject, "Mom")
        
        # ASSERT 2: File Moved
        expected_path = self.test_dir / "People" / "Mom" / "face1.jpg"
        self.assertTrue(expected_path.exists())
        self.assertFalse(self.photo_path.exists())
        
        # ASSERT 3: DB Path Updated
        self.assertEqual(updated_photo.file_path, str(expected_path))

if __name__ == '__main__':
    unittest.main()