import streamlit as st
import pandas as pd
import os
import shutil
import json
import numpy as np
from pathlib import Path
from datetime import datetime
import sys
import subprocess
import re
import socket
from sklearn.metrics.pairwise import cosine_similarity

# NEW: Binky 2.0 Imports
from core import BinkyCore
from database import DB_PATH, init_db
from models import Photo

# --- CONFIG ---
st.set_page_config(page_title="Binky's Magic Image Organizer", layout="wide")

# Auto-Enable Mobile Mode via URL
if "mobile" in st.query_params:
    st.session_state["mobile_mode"] = True

BASE_DIR = Path(__file__).parent

# --- CACHED RESOURCES ---
@st.cache_resource(show_spinner="Waking up Binky's brain...")
def get_binky_core():
    return BinkyCore()

def load_photos_from_db():
    core = get_binky_core()
    photos = core.get_all_photos()
    if not photos:
        return pd.DataFrame()
    
    # Convert SQLAlchemy objects to DataFrame for UI compatibility
    data = []
    for p in photos:
        data.append({
            'file_path': p.file_path,
            'filename': p.filename,
            'ai_category': p.ai_category,
            'ai_subject': p.ai_subject,
            'ai_description': p.ai_description or "", # OCR text
            'creation_date': p.creation_date,
            'is_duplicate': p.is_duplicate,
            'file_hash': p.file_hash,
            'location_city': p.location_city,
            'location_country': p.location_country,
            'embedding': p.embedding
        })
    return pd.DataFrame(data)

# --- HELPER: FOLDER SELECTORS ---
def web_folder_selector(label, key, default_path):
    if key not in st.session_state: st.session_state[key] = str(default_path)
    if f"web_input_{key}" not in st.session_state: st.session_state[f"web_input_{key}"] = st.session_state[key]
    if f"show_new_{key}" not in st.session_state: st.session_state[f"show_new_{key}"] = False
        
    current_path = Path(st.session_state[key])
    
    def _go_up():
        p = Path(st.session_state[key]).parent
        st.session_state[key] = str(p); st.session_state[f"web_input_{key}"] = str(p)
    def _go_home():
        p = Path.home()
        st.session_state[key] = str(p); st.session_state[f"web_input_{key}"] = str(p)
    def _go_vol():
        st.session_state[key] = "/Volumes"; st.session_state[f"web_input_{key}"] = "/Volumes"
    def _toggle_new():
        st.session_state[f"show_new_{key}"] = not st.session_state[f"show_new_{key}"]

    st.markdown(f"**{label}**")
    new_path = st.text_input(f"Path for {label}", key=f"web_input_{key}", label_visibility="collapsed")
    if new_path != st.session_state[key]:
        st.session_state[key] = new_path
        st.rerun()

    c1, c2, c3, c4, c5 = st.columns([1, 1, 1, 1, 2])
    c1.button("⬆️", key=f"up_{key}", use_container_width=True, on_click=_go_up)
    c2.button("🏠", key=f"home_{key}", use_container_width=True, on_click=_go_home)
    c3.button("💾", key=f"vol_{key}", help="Drives", use_container_width=True, on_click=_go_vol)
    icon = "➖" if st.session_state[f"show_new_{key}"] else "➕"
    c4.button(icon, key=f"new_{key}", help="New Folder", use_container_width=True, on_click=_toggle_new)

    if st.session_state.get(f"show_new_{key}"):
        st.text_input(f"New folder in {current_path.name}:", key=f"name_{key}")
        def _create():
            n = st.session_state.get(f"name_{key}")
            if n:
                d = Path(st.session_state[key]) / n
                d.mkdir(exist_ok=True)
                st.session_state[key] = str(d); st.session_state[f"web_input_{key}"] = str(d)
                st.session_state[f"show_new_{key}"] = False
        st.button("Create", key=f"create_{key}", on_click=_create)
        
    try:
        subfolders = [f.name for f in current_path.iterdir() if f.is_dir() and not f.name.startswith('.')]
        subfolders.sort()
        def _on_sub():
            p = Path(st.session_state[key]) / st.session_state[f"sub_{key}"]
            st.session_state[key] = str(p); st.session_state[f"web_input_{key}"] = str(p)
        st.selectbox(f"Nav {label}", ["(Select subfolder)"] + subfolders, key=f"sub_{key}", label_visibility="collapsed", on_change=_on_sub)
    except: st.error("Access denied")
    return st.session_state[key]

def native_folder_selector(label, key, default_path):
    if key not in st.session_state: st.session_state[key] = str(default_path)
    if f"show_new_{key}" not in st.session_state: st.session_state[f"show_new_{key}"] = False
    col1, col2, col3, col4 = st.columns([4, 1, 1, 1])
    with col2:
        if st.button("📂", key=f"browse_{key}", use_container_width=True):
            if sys.platform == 'darwin':
                script = f'POSIX path of (choose folder with prompt "Select {label}" default location "{st.session_state[key]}")'
                res = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
                if res.returncode == 0 and res.stdout.strip():
                    st.session_state[key] = res.stdout.strip()
                    st.session_state[f"input_{key}"] = res.stdout.strip()
                    st.rerun()
    with col3:
        if st.button("💾", key=f"vol_{key}", use_container_width=True):
            st.session_state[key] = "/Volumes"; st.session_state[f"input_{key}"] = "/Volumes"; st.rerun()
    with col4:
        icon = "➖" if st.session_state[f"show_new_{key}"] else "➕"
        if st.button(icon, key=f"new_{key}", use_container_width=True):
            st.session_state[f"show_new_{key}"] = not st.session_state[f"show_new_{key}"]; st.rerun()
    if st.session_state.get(f"show_new_{key}"):
        st.text_input(f"New folder:", key=f"name_{key}")
        def _create_native():
            n = st.session_state.get(f"name_{key}")
            if n:
                d = Path(st.session_state[key]) / n
                d.mkdir(exist_ok=True)
                st.session_state[key] = str(d); st.session_state[f"input_{key}"] = str(d)
                st.session_state[f"show_new_{key}"] = False
        st.button("Create", key=f"create_{key}", on_click=_create_native)
    with col1:
        if f"input_{key}" not in st.session_state: st.session_state[f"input_{key}"] = st.session_state[key]
        new_path = st.text_input(label, key=f"input_{key}", label_visibility="collapsed")
        if new_path != st.session_state[key]: st.session_state[key] = new_path
    return st.session_state[key]

def folder_selector(label, key, default_path):
    if st.session_state.get('mobile_mode', False): return web_folder_selector(label, key, default_path)
    return native_folder_selector(label, key, default_path)

def is_generic_filename(filename):
    stem = Path(filename).stem
    if re.match(r'^\d+$', stem): return True
    if re.match(r'^(IMG|DSC|PXL|VID|MVI)[-_]?\d+', stem, re.IGNORECASE): return True
    if stem.lower().startswith('screenshot'): return True
    return False

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except: return "localhost"

# --- SIDEBAR ---
with st.sidebar:
    st.header("1. Settings")
    mobile_mode = st.checkbox("📱 Remote / Mobile Mode", key="mobile_mode")
    if mobile_mode:
        st.success("👇 Connect your device here:")
        st.code(f"http://{get_local_ip()}:8501/?mobile=true", language=None)
    source_path = folder_selector("Source", "source", Path.home() / "Pictures")
    st.markdown("---")
    if 'dest' not in st.session_state: st.session_state.dest = str(BASE_DIR / "organized-photos")
    output_path = folder_selector("Destination", "dest", BASE_DIR / "organized-photos")
    st.markdown("---")
    if st.button("Reset / Clear Data"):
        if DB_PATH.exists(): os.remove(DB_PATH)
        st.rerun()

# CSS Fix
st.markdown("<style>[data-testid='stSidebar'] button div p {margin-left: -3px !important;}</style>", unsafe_allow_html=True)

# --- MAIN APP ---
st.title("🐿️✨ Binky's Magic Image Organizer")
st.markdown("*\"I'll glide through your files and organize them safely!\"*")

if 'last_scanned_path' not in st.session_state: st.session_state.last_scanned_path = None

# GLIDE & SCAN
if not DB_PATH.exists() or source_path != st.session_state.last_scanned_path:
    st.header("Step 1: Glide & Scan")
    if st.button("🚀 Start Magic Glide", type="primary"):
        if os.path.exists(source_path):
            with st.spinner("Binky is sniffing out your files..."):
                core = get_binky_core()
                core.scan_folder(source_path, progress_callback=st.progress(0).progress)
                st.session_state.last_scanned_path = source_path
            st.rerun()
        else: st.error("Binky can't reach that branch!")

# ORGANIZE SECTION
if DB_PATH.exists() and source_path == st.session_state.last_scanned_path:
    df = load_photos_from_db()
    if df.empty:
        st.warning("Binky didn't find any treats in this folder.")
    else:
        st.divider()
        st.info(f"Binky found {len(df)} treats! Ready to sort.")
        
    # SCROLLABLE PREVIEW SECTION
    st.subheader("👀 What Binky Found")
    
    core = get_binky_core()
    
    # Use a container to hold the grid
    with st.container():
        # Optimize for Mobile: Show fewer images to speed up loading
        preview_limit = 12 if st.session_state.get('mobile_mode', False) else 48
        
        preview_cols = st.columns(4)
        sample_df = df.head(preview_limit) 
        
        for i, (_, row) in enumerate(sample_df.iterrows()):
            img_path = row['file_path']
            # SPEED BOOST: Use thumbnail if it exists
            thumb_path = core.get_thumbnail_path(row['file_hash'])
            display_path = str(thumb_path) if thumb_path.exists() else img_path
            
            if os.path.exists(img_path):
                with preview_cols[i % 4]:
                    st.image(display_path, use_container_width=True)
                    st.caption(row['filename'][:20])

        # SEARCH / ORGANIZE
        st.divider()
        if 'org_cmd' not in st.session_state: st.session_state.org_cmd = ""
        org_command = st.text_input("Tell Binky how to sort your treats...", value=st.session_state.org_cmd)
        st.session_state.org_cmd = org_command

        # Chips
        st.caption("Binky's favorite sorting tricks:")
        chips = [("📅 Year", "By year"), ("🌍 Location", "By location"), ("🐶 Dogs", "Dogs"), ("📄 Receipts", "Receipts"), ("🌄 Nature", "Nature"), ("👥 People", "People")]
        cols = st.columns(6)
        for i, (label, cmd) in enumerate(chips):
            if cols[i].button(label, use_container_width=True):
                st.session_state.org_cmd = cmd; st.rerun()

        # Logic Parsing
        hierarchy = "Year / Month"
        filter_query = None
        custom_categories = []
        cmd = st.session_state.org_cmd.lower()
        
        if "," in st.session_state.org_cmd:
            custom_categories = [c.strip().title() for c in st.session_state.org_cmd.split(",") if c.strip()]
            hierarchy = "Custom Split"
            st.success(f"✨ Custom Mode: {custom_categories}")
        else:
            if "location" in cmd: hierarchy = "Location"
            elif "category" in cmd or "type" in cmd: hierarchy = "Category / Year"
            elif "people" in cmd or "person" in cmd: hierarchy = "Category" # Put people in main folders
            
            filter_map = {"dog": ("ai_subject", "Dog"), "receipt": ("ai_subject", "Receipt"), "nature": ("ai_category", "Nature"), "people": ("ai_category", "People")}
            for k, v in filter_map.items():
                if k in cmd: filter_query = v; break
            
            # If no category filter found, try OCR text filter
            if not filter_query and cmd:
                filter_query = ("ai_description", st.session_state.org_cmd)
            
            if filter_query: st.caption(f"✨ Sniffing for: **{filter_query[1]}**")

        col1, col2 = st.columns(2)
        rename = col1.checkbox("Rename treats?")
        mode = col2.radio("Mode", ["Copy", "Move"])

        if st.button("Magic Organizer - It's Playing, Playing Time!", type="primary"):
            # Binky 3.0: CALL THE SERVER
            import requests
            try:
                # We call the local server (or the IP if in remote mode)
                # For now, we'll assume the server is running on port 8000
                server_url = f"http://localhost:8000/organize"
                payload = {
                    "command": st.session_state.org_cmd,
                    "destination": output_path,
                    "rename": rename,
                    "mode": mode
                }
                
                response = requests.post(server_url, json=payload)
                if response.status_code == 200:
                    st.success("✨ Magic Sent! Binky is sorting your treats in the background.")
                    st.info("You can keep browsing or close the app—the server will finish the job.")
                    st.session_state.show_open_folder = True
                    st.balloons()
                else:
                    st.error(f"Server error: {response.text}")
            except Exception as e:
                st.error(f"Could not connect to Binky Command Center. Is the server running? ({e})")

    # --- BINKY RESULT EXPLORER (The Reliable Finder) ---
    if st.session_state.get('show_open_folder', False):
        st.divider()
        st.header("✨ Step 3: Enjoy your sorted treats!")
        
        # Initialize browsing state
        if 'browse_path' not in st.session_state:
            st.session_state.browse_path = str(output_path)
            
        curr_b_path = Path(st.session_state.browse_path)
        
        # Breadcrumbs
        st.markdown(f"**Browsing:** `{curr_b_path.relative_to(Path(output_path).parent)}`")
        
        # Explorer Controls
        c_nav1, c_nav2 = st.columns([1, 4])
        with c_nav1:
            if curr_b_path != Path(output_path):
                if st.button("⬅️ Back", use_container_width=True):
                    st.session_state.browse_path = str(curr_b_path.parent)
                    st.rerun()
        with c_nav2:
            st.code(str(curr_b_path), language=None) # Copyable path

        # List Contents
        try:
            items = sorted(list(curr_b_path.iterdir()))
            folders = [i for i in items if i.is_dir()]
            files = [i for i in items if i.is_file() and i.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp', '.heic'}]
            
            if folders:
                st.markdown("##### 📂 Sub-pouches")
                f_cols = st.columns(4)
                for idx, f in enumerate(folders):
                    if f_cols[idx % 4].button(f"📁 {f.name}", key=f"dir_{f.name}_{idx}", use_container_width=True):
                        st.session_state.browse_path = str(f)
                        st.rerun()
            
            if files:
                st.markdown("##### 🖼️ Images")
                img_cols = st.columns(4)
                for idx, img in enumerate(files[:20]): # Show first 20 in this folder
                    with img_cols[idx % 4]:
                        st.image(str(img), use_container_width=True)
                        st.caption(img.name)
            
            if not folders and not files:
                st.info("This pouch is empty.")
                
        except Exception as e:
            st.error(f"Explorer error: {e}")

        st.divider()
        if st.button("🧹 Clear Results & Start New Batch", type="secondary"):
            st.session_state.show_open_folder = False
            del st.session_state.browse_path
            st.rerun()
else:
    st.info("Binky is napping... select a folder to wake him up!")
    st.session_state.show_open_folder = False
