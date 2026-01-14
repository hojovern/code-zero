from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pathlib import Path
from typing import List, Optional
import os
import uvicorn

# Import Binky Core
from core import BinkyCore
from database import SessionLocal, get_db
from models import Photo

app = FastAPI(title="Binky Command Center", version="3.0")

# Enable Cross-Origin requests (for iPad/Remote access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shared Core Instance
# We lazy-load this to keep server startup fast
_binky_core = None

def get_core():
    global _binky_core
    if _binky_core is None:
        print("Initializing Binky's Brain in the background...")
        _binky_core = BinkyCore()
    return _binky_core

# Mount Thumbnail Cache as Static Files
# This makes http://mac-ip:8000/thumbs/hash.webp work instantly!
CACHE_DIR = Path(__file__).parent / ".binky_cache"
THUMB_DIR = CACHE_DIR / "thumbs"
THUMB_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/thumbs", StaticFiles(directory=str(THUMB_DIR)), name="thumbs")

# --- API MODELS ---
class ScanRequest(BaseModel):
    path: str

class OrganizeRequest(BaseModel):
    command: str
    destination: str
    rename: bool = False
    mode: str = "Copy" # Copy or Move

# --- ENDPOINTS ---

@app.get("/")
def read_root():
    return {"status": "online", "message": "Binky is ready to glide!"}

@app.get("/status")
def get_status():
    db = SessionLocal()
    count = db.query(Photo).count()
    db.close()
    return {"total_photos": count, "is_busy": False}

@app.get("/photos")
def list_photos(limit: int = 100, offset: int = 0):
    db = SessionLocal()
    photos = db.query(Photo).offset(offset).limit(limit).all()
    db.close()
    return photos

@app.post("/scan")
def start_scan(request: ScanRequest, background_tasks: BackgroundTasks):
    if not os.path.exists(request.path):
        raise HTTPException(status_code=404, detail="Path not found")
    
    core = get_core()
    background_tasks.add_task(core.scan_folder, request.path)
    return {"message": "Binky is gliding through your files in the background!"}

@app.post("/organize")
def run_organize(request: OrganizeRequest, background_tasks: BackgroundTasks):
    core = get_core()
    background_tasks.add_task(
        core.execute_organization, 
        command=request.command, 
        destination=request.destination, 
        rename=request.rename, 
        mode=request.mode
    )
    return {"message": "Binky is sorting your treats into pouches in the background!"}

if __name__ == "__main__":
    # Run the server
    # Port 8000 is standard for APIs
    # host 0.0.0.0 makes it accessible to the iPad!
    uvicorn.run(app, host="0.0.0.0", port=8000)
