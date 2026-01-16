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
import config_manager as config # Config Persistence
from styles import apply_apple_styles

# --- CONFIG ---
st.set_page_config(page_title="Binky's Magic Image Organizer", layout="wide")
apply_apple_styles()

BASE_DIR = Path(__file__).parent

# --- CACHED RESOURCES ---
def get_binky_core():
    core = BinkyCore()
    # Run auto-cleanup on wake up
    purged = core.auto_purge_trash(days=30)
    if purged > 0:
        print(f"Binky cleaned up {purged} expired treats from the trash.")
    return core

def load_photos_from_db():
    core = get_binky_core()
    # HIDE DELETED PHOTOS FROM MAIN VIEW
    photos = core.db.query(Photo).filter(Photo.is_deleted == False).all()
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

# --- HELPER: FOLDER SELECTORS (Updated with persistence) ---
def web_folder_selector(label, key, default_path):
    if key not in st.session_state: st.session_state[key] = str(default_path)
    if f"web_input_{key}" not in st.session_state: st.session_state[f"web_input_{key}"] = st.session_state[key]
    if f"show_new_{key}" not in st.session_state: st.session_state[f"show_new_{key}"] = False
        
    current_path = Path(st.session_state[key])
    
    def _save_path_config():
        if key == "source": config.save_config("source_path", st.session_state[key])
        if key == "dest": config.save_config("destination_path", st.session_state[key])

    def _go_up():
        p = Path(st.session_state[key]).parent
        st.session_state[key] = str(p); st.session_state[f"web_input_{key}"] = str(p)
        _save_path_config()
    def _go_home():
        p = Path.home()
        st.session_state[key] = str(p); st.session_state[f"web_input_{key}"] = str(p)
        _save_path_config()
    def _go_vol():
        st.session_state[key] = "/Volumes"; st.session_state[f"web_input_{key}"] = "/Volumes"
        _save_path_config()
    def _toggle_new():
        st.session_state[f"show_new_{key}"] = not st.session_state[f"show_new_{key}"]

    st.markdown(f"**{label}**")
    new_path = st.text_input(f"Path for {label}", key=f"web_input_{key}", label_visibility="collapsed")
    if new_path != st.session_state[key]:
        st.session_state[key] = new_path
        _save_path_config()
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
                _save_path_config()
        st.button("Create", key=f"create_{key}", on_click=_create)
        
    try:
        subfolders = [f.name for f in current_path.iterdir() if f.is_dir() and not f.name.startswith('.')]
        subfolders.sort()
        def _on_sub():
            p = Path(st.session_state[key]) / st.session_state[f"sub_{key}"]
            st.session_state[key] = str(p); st.session_state[f"web_input_{key}"] = str(p)
            _save_path_config()
        st.selectbox(f"Nav {label}", ["(Select subfolder)"] + subfolders, key=f"sub_{key}", label_visibility="collapsed", on_change=_on_sub)
    except: st.error("Access denied")
    return st.session_state[key]

def native_folder_selector(label, key, default_path):
    if key not in st.session_state: st.session_state[key] = str(default_path)
    if f"show_new_{key}" not in st.session_state: st.session_state[f"show_new_{key}"] = False
    
    def _save_path_config():
        if key == "source": config.save_config("source_path", st.session_state[key])
        if key == "dest": config.save_config("destination_path", st.session_state[key])

    col1, col2, col3, col4 = st.columns([4, 1, 1, 1])
    with col2:
        if st.button("📂", key=f"browse_{key}", use_container_width=True):
            if sys.platform == 'darwin':
                script = f'POSIX path of (choose folder with prompt "Select {label}" default location "{st.session_state[key]}")'
                res = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
                if res.returncode == 0 and res.stdout.strip():
                    st.session_state[key] = res.stdout.strip()
                    st.session_state[f"input_{key}"] = res.stdout.strip()
                    _save_path_config()
                    st.rerun()
    with col3:
        if st.button("💾", key=f"vol_{key}", use_container_width=True):
            st.session_state[key] = "/Volumes"; st.session_state[f"input_{key}"] = "/Volumes"
            _save_path_config()
            st.rerun()
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
                _save_path_config()
        st.button("Create", key=f"create_{key}", on_click=_create_native)
    with col1:
        if f"input_{key}" not in st.session_state: st.session_state[f"input_{key}"] = st.session_state[key]
        new_path = st.text_input(label, key=f"input_{key}", label_visibility="collapsed")
        if new_path != st.session_state[key]: 
            st.session_state[key] = new_path
            _save_path_config()
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
    
    # Persistent Mobile Mode
    def _toggle_mobile():
        config.save_config("mobile_mode", st.session_state.mobile_mode)
    
    mobile_mode = st.checkbox("📱 Remote / Mobile Mode", key="mobile_mode", on_change=_toggle_mobile)
    if mobile_mode:
        st.success("👇 Local (Wi-Fi):")
        st.code(f"http://{get_local_ip()}:8501/?mobile=true", language=None)
        
        st.markdown("**🌍 Global Access (5G)**")
        if st.button("Start Secure Tunnel"):
            with st.spinner("Digging tunnel..."):
                # Run the tunnel script
                try:
                    process = subprocess.Popen(
                        [str(BASE_DIR / "start_tunnel.sh")], 
                        stdout=subprocess.PIPE, 
                        stderr=subprocess.STDOUT,
                        text=True
                    )
                    # Read lines until we find the URL
                    tunnel_url = None
                    for line in iter(process.stdout.readline, ''):
                        if ".trycloudflare.com" in line:
                            match = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line)
                            if match:
                                tunnel_url = match.group(0)
                                break
                    
                    if tunnel_url:
                        st.session_state['tunnel_url'] = tunnel_url
                        st.balloons()
                    else:
                        st.error("Could not find tunnel URL.")
                except Exception as e:
                    st.error(f"Tunnel failed: {e}")

        if 'tunnel_url' in st.session_state:
            st.success("👇 Global Link (Anywhere):")
            st.code(f"{st.session_state['tunnel_url']}/?mobile=true", language=None)
            st.warning("⚠️ Keep this tab open to keep the tunnel alive!")

    # Use saved source path if available
    source_path = folder_selector("Source", "source", Path(st.session_state.get("source", Path.home() / "Pictures")))
    st.markdown("---")
    
    if 'dest' not in st.session_state: 
        st.session_state.dest = str(BASE_DIR / "organized-photos")
        
    output_path = folder_selector("Destination", "dest", Path(st.session_state.get("dest", BASE_DIR / "organized-photos")))
    
    # --- DRIVE DETECTIVE ---
    if sys.platform == 'darwin':
        st.markdown("🚢 **Detected Drives**")
        volumes = Path("/Volumes")
        external_drives = [d for d in volumes.iterdir() if d.is_dir() and not d.name.startswith("Macintosh")]
        
        if external_drives:
            for drive in external_drives:
                if st.button(f"📍 Use '{drive.name}' SSD", use_container_width=True):
                    st.session_state.dest = str(drive / "Organized_by_Binky")
                    config.save_config("destination_path", st.session_state.dest)
                    st.rerun()
            
            # Special Action: Clone Entire Library to this SSD
            if "Volumes" in st.session_state.dest:
                st.divider()
                if st.button("🚢 Clone Entire Library to SSD", type="primary", use_container_width=True):
                    with st.spinner("Binky is carrying your treats to the ship..."):
                        core = get_binky_core()
                        count = core.clone_library(st.session_state.dest)
                        st.success(f"Successfully cloned {count} photos to {st.session_state.dest}!")
                        st.balloons()
        else:
            st.caption("No external drives found on Mac.")

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

core = get_binky_core()

# --- FEATURE: MEMORY LANE (ON THIS DAY) ---
if DB_PATH.exists():
    memories = core.get_memories_for_today()
    if memories:
        with st.container():
            st.markdown("### ✨ On This Day")
            m_cols = st.columns(len(memories))
            for i, m in enumerate(memories):
                with m_cols[i]:
                    thumb_path = core.get_thumbnail_path(m.file_hash)
                    display_path = str(thumb_path) if thumb_path.exists() else m.file_path
                    st.image(display_path, use_container_width=True)
                    st.caption(f"{m.creation_date.year} ({m.ai_category})")
        st.divider()

# --- FEATURE: MAGIC SEARCH ---
if DB_PATH.exists():
    search_query = st.text_input("🔍 Magic Search", placeholder="e.g. 'beach sunset' or 'funny dog'")
    if search_query:
        search_results = core.semantic_search(search_query)
        if search_results:
            st.markdown(f"Found {len(search_results)} matches for '{search_query}'")
            s_cols = st.columns(4)
            for i, res in enumerate(search_results):
                with s_cols[i % 4]:
                    thumb_path = core.get_thumbnail_path(res.file_hash)
                    display_path = str(thumb_path) if thumb_path.exists() else res.file_path
                    st.image(display_path, use_container_width=True)
                    st.caption(res.filename[:15])
            st.divider()
        else:
            st.info("Binky couldn't find any matches for that. Try another sniff!")

# --- FEATURE: CAMERA ROLL MIGRATION (BINKY DROP) ---
if st.session_state.get('mobile_mode', False) or st.checkbox("Show Migration Tools"):
    with st.expander("📥 Migrate from Camera Roll / Device", expanded=True):
        # Show Landing Zone for clarity
        dest_path_obj = Path(st.session_state.dest)
        landing_name = dest_path_obj.name if "Volumes" not in st.session_state.dest else f"🚢 SSD: {dest_path_obj.parts[2]}"
        st.markdown(f"**Landing Zone:** `{landing_name}`")
        
        st.info("Select photos from your library. Binky will fly them to your Mac and sort them instantly!")
        uploaded_files = st.file_uploader("Choose photos...", accept_multiple_files=True, type=['png', 'jpg', 'jpeg', 'heic', 'webp'])
        
        if uploaded_files and st.button(f"✈️ Fly {len(uploaded_files)} Photos to Mac"):
            core = get_binky_core()
            progress_bar = st.progress(0)
            status_text = st.empty()
            
            # Temp storage for upload
            temp_upload_dir = BASE_DIR / ".binky_uploads"
            temp_upload_dir.mkdir(exist_ok=True)
            
            success_count = 0
            
            for i, uploaded_file in enumerate(uploaded_files):
                status_text.text(f"Processing {uploaded_file.name}...")
                
                # 1. Save to Temp
                temp_path = temp_upload_dir / uploaded_file.name
                with open(temp_path, "wb") as f:
                    f.write(uploaded_file.getbuffer())
                
                # 2. Ingest & Organize
                try:
                    final_path = core.ingest_file(
                        str(temp_path), 
                        st.session_state.dest, 
                        command=st.session_state.get("org_cmd", ""), 
                        rename=True
                    )
                    success_count += 1
                except Exception as e:
                    st.error(f"Failed on {uploaded_file.name}: {e}")
                
                progress_bar.progress((i + 1) / len(uploaded_files))
            
            st.success(f"✨ Success! {success_count} photos migrated and organized on your Mac.")
            st.balloons()
            # Cleanup
            # shutil.rmtree(temp_upload_dir) # Optional: Keep for safety or clear
            
            # Force refresh to show new files
            if DB_PATH.exists():
                st.session_state.last_scanned_path = source_path # Hack to trigger reload if needed or just rerun
                st.rerun()

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
        is_mobile = st.session_state.get('mobile_mode', False)
        preview_limit = 12 if is_mobile else 48
        
        # Responsive Columns
        cols_count = 2 if is_mobile else 4
        preview_cols = st.columns(cols_count)
        
        sample_df = df.head(preview_limit) 
        
        # Determine Server URL for Downloads
        server_ip = get_local_ip()
        server_url = f"http://{server_ip}:8000"
        
        for i, (_, row) in enumerate(sample_df.iterrows()):
            img_path = row['file_path']
            file_hash = row['file_hash']
            parent_folder = Path(img_path).parent.name
            
            # SPEED BOOST: Use thumbnail if it exists
            thumb_path = core.get_thumbnail_path(file_hash)
            display_path = str(thumb_path) if thumb_path.exists() else img_path
            
            if os.path.exists(img_path):
                with preview_cols[i % cols_count]:
                    st.image(display_path, use_container_width=True)
                    # File Context
                    st.caption(f"📂 .../{parent_folder}\n📄 {row['filename'][:15]}")
                    
                    # Mobile Download Action
                    if is_mobile:
                        dl_link = f"{server_url}/download/{file_hash}"
                        st.markdown(f"[⬇️ Save to Camera Roll]({dl_link})")

        # SEARCH / ORGANIZE
        st.divider()
        
        # PERSISTENT COMMAND
        def _save_cmd():
            config.save_config("last_command", st.session_state.org_cmd)

        org_command = st.text_input("Tell Binky how to sort your treats...", value=st.session_state.org_cmd, on_change=_save_cmd, key="org_cmd_input")
        # Sync input with state
        if org_command != st.session_state.org_cmd:
            st.session_state.org_cmd = org_command
            _save_cmd()

        # Chips
        st.caption("Binky's favorite sorting tricks:")
        chips = [("📅 Year", "By year"), ("🌍 Location", "By location"), ("🐶 Dogs", "Dogs"), ("📄 Receipts", "Receipts"), ("🌄 Nature", "Nature"), ("👥 People", "People")]
        cols = st.columns(6)
        for i, (label, cmd) in enumerate(chips):
            if cols[i].button(label, use_container_width=True):
                st.session_state.org_cmd = cmd
                _save_cmd()
                st.rerun()

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
                st.markdown("##### 📂 Sub-folders")
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

# --- PEOPLE MANAGER ---
if DB_PATH.exists() and source_path == st.session_state.last_scanned_path:
    with st.expander("👥 The Hall of Faces (Beta)", expanded=False):
        st.write("Binky has noticed these people. Give them names!")
        core = get_binky_core()
        
        # Get unique people
        # Raw SQL for speed or simple pandas
        people_df = df[df['ai_category'] == 'People']
        if not people_df.empty:
            unique_people = people_df['ai_subject'].unique()
            
            for person in unique_people:
                if not person: continue
                p_col1, p_col2 = st.columns([1, 3])
                
                # Show Face
                sample = people_df[people_df['ai_subject'] == person].iloc[0]
                thumb_path = core.get_thumbnail_path(sample['file_hash'])
                img_path = str(thumb_path) if thumb_path.exists() else sample['file_path']
                
                with p_col1:
                    if os.path.exists(img_path):
                        st.image(img_path, width=100)
                
                with p_col2:
                    new_name = st.text_input(f"Name for {person}", key=f"rename_{person}")
                    if st.button(f"Rename to {new_name}", key=f"btn_{person}"):
                        if new_name:
                            core.rename_person(person, new_name)
                            st.success(f"Renamed {person} to {new_name}!")
                            st.rerun()
        else:
            st.info("No faces found yet. Try scanning a folder with people!")

# --- FEATURE: TRASH REVIEW ---
if DB_PATH.exists():
    with st.expander("🗑️ Trash Pouch Review"):
        # 1. JUNK REVIEW (Not yet deleted, just flagged)
        junk_photos = core.db.query(Photo).filter(
            Photo.is_junk == True, 
            Photo.is_deleted == False
        ).all()
        
        if junk_photos:
            st.subheader("🚩 Flagged as Junk")
            st.write("Binky found these low-quality items. Move them to Trash?")
            if st.button("Move ALL Junk to Trash"):
                for p in junk_photos: core.delete_photo(p.id)
                st.rerun()
            
            j_cols = st.columns(4)
            for i, p in enumerate(junk_photos):
                with j_cols[i % 4]:
                    thumb_path = core.get_thumbnail_path(p.file_hash)
                    st.image(str(thumb_path) if thumb_path.exists() else p.file_path, use_container_width=True)
                    st.caption(f"Reason: {p.junk_reason}")
                    if st.button("Trash", key=f"trash_{p.id}"):
                        core.delete_photo(p.id)
                        st.rerun()
        
        # 2. RECENTLY DELETED (Recovery Bin)
        deleted_photos = core.db.query(Photo).filter(Photo.is_deleted == True).all()
        if deleted_photos:
            st.divider()
            st.subheader("🕒 Recently Deleted (30 Day Recovery)")
            st.info("These items will be permanently removed after 30 days.")
            
            if st.button("Empty Trash Now", type="primary"):
                core.clear_trash()
                st.success("Trash emptied!")
                st.rerun()
                
            d_cols = st.columns(4)
            for i, p in enumerate(deleted_photos):
                with d_cols[i % 4]:
                    thumb_path = core.get_thumbnail_path(p.file_hash)
                    st.image(str(thumb_path) if thumb_path.exists() else p.file_path, use_container_width=True)
                    
                    c1, c2 = st.columns(2)
                    if c1.button("Restore", key=f"rec_{p.id}"):
                        core.recover_photo(p.id, st.session_state.dest)
                        st.rerun()
                    if c2.button("Delete!", key=f"perm_{p.id}"):
                        core.permanent_delete_photo(p.id)
                        st.rerun()
        
        if not junk_photos and not deleted_photos:
            st.success("Your pouches are clean! No junk or deleted items.")

else:
    st.info("Binky is napping... select a folder to wake him up!")
    st.session_state.show_open_folder = False