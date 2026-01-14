from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Photo
from pathlib import Path

# Database path in the project folder
DB_PATH = Path(__file__).parent / "binky.db"
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    """Create all tables if they don't exist."""
    Base.metadata.create_all(bind=engine)

def get_db():
    """Dependency helper to get a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def save_photo(db, photo_data):
    """Upsert a photo record into the database."""
    # Check if exists
    db_photo = db.query(Photo).filter(Photo.file_path == photo_data['file_path']).first()
    
    if db_photo:
        # Update existing
        for key, value in photo_data.items():
            setattr(db_photo, key, value)
    else:
        # Create new
        db_photo = Photo(**photo_data)
        db.add(db_photo)
    
    db.commit()
    return db_photo
