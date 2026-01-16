from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, JSON
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class Photo(Base):
    __tablename__ = 'photos'

    id = Column(Integer, primary_key=True)
    file_path = Column(String, unique=True, nullable=False)
    filename = Column(String, nullable=False)
    extension = Column(String)
    file_hash = Column(String, index=True) # For fast duplicate checking
    
    # Metadata
    creation_date = Column(DateTime, index=True)
    size_kb = Column(Float)
    width = Column(Integer)
    height = Column(Integer)
    format = Column(String)
    
    is_video = Column(Boolean, default=False)
    is_duplicate = Column(Boolean, default=False)

    # AI Brain
    ai_category = Column(String, index=True) # "Nature", "People", "Receipts"
    ai_subject = Column(String, index=True) # "Dog", "Beach", "Person 1"
    ai_confidence = Column(Float)
    ai_description = Column(String) # OCR text or Caption
    
    embedding = Column(JSON) # Vector for semantic search
    faces_json = Column(JSON) # List of face embeddings found
    
    # Location
    location_city = Column(String, nullable=True)
    location_country = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Quality Control
    is_junk = Column(Boolean, default=False)
    junk_reason = Column(String, nullable=True) # "Blurry", "Screenshot", "Duplicate"
    
    # Trash System
    is_deleted = Column(Boolean, default=False)
    deleted_at = Column(DateTime, nullable=True)

    def __repr__(self):
        return f"<Photo(filename='{self.filename}', category='{self.ai_category}')>"
