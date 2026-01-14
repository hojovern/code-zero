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
    
    # Location
    location_city = Column(String, index=True)
    location_country = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    
    # AI Analysis
    ai_category = Column(String, index=True)
    ai_subject = Column(String, index=True)
    ai_confidence = Column(Float)
    ai_description = Column(String) # For the descriptive renaming
    
    # Smart Features
    is_duplicate = Column(Boolean, default=False)
    is_video = Column(Boolean, default=False)
    embedding = Column(JSON) # Store the vector as a JSON list
    faces_json = Column(JSON) # Store multiple face embeddings found in this image
    
    # Tracking
    last_scanned = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Photo(name={self.filename}, cat={self.ai_category})>"
