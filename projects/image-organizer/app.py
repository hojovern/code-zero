import streamlit as st
import pandas as pd
import os
import shutil
import json
import numpy as np
from pathlib import Path
from datetime import datetime
from scanner import ImageScanner
import sys
import subprocess
import re
import socket
# Import AI Utils at top level for caching
try:
    from ai_utils import ImageAI
except ImportError:
    ImageAI = None

# --- CONFIG ---
st.set_page_config(page_title="Binky's Magic Image Organizer", layout="wide")
BASE_DIR = Path(__file__).parent
CSV_PATH = BASE_DIR / 'image_index.csv'
EMBEDDINGS_PATH = BASE_DIR / 'embeddings.json'

# --- CACHED RESOURCES (SPEED BOOST) ---
@st.cache_resource(show_spinner="Waking up Binky's brain...")
def get_ai_engine():
    if ImageAI:
        return ImageAI()
    return None

@st.cache_data
def load_data(csv_path):
    if csv_path.exists():
        return pd.read_csv(csv_path)
    return None

# --- HELPER: WEB FOLDER PICKER (Mobile Friendly) ---
def web_folder_selector(label, key, default_path):
    # 1. INITIALIZE STATE
    if key not in st.session_state:
        st.session_state[key] = str(default_path)
    if f"web_input_{key}" not in st.session_state:
        st.session_state[f"web_input_{key}"] = st.session_state[key]
    if f"show_new_{key}" not in st.session_state:
        st.session_state[f"show_new_{key}"] = False
        
    current_path = Path(st.session_state[key])
    if not current_path.exists():
        current_path = Path.home()
        st.session_state[key] = str(current_path)
        st.session_state[f"web_input_{key}"] = str(current_path)

    # 2. DEFINE CALLBACKS
    def _go_up():
        p = Path(st.session_state[key]).parent
        st.session_state[key] = str(p)
        st.session_state[f"web_input_{key}"] = str(p)
        
    def _go_home():
        p = Path.home()
        st.session_state[key] = str(p)
        st.session_state[f"web_input_{key}"] = str(p)
        
    def _go_vol():
        st.session_state[key] = "/Volumes"
        st.session_state[f"web_input_{key}"] = "/Volumes"

    def _toggle_new():
        st.session_state[f"show_new_{key}"] = not st.session_state[f"show_new_{key}"]

    # 3. RENDER UI
    st.markdown(f"**{label}**")
    
    # Text Input (Widget key driven)
    new_path = st.text_input(f"Path for {label}", key=f"web_input_{key}", label_visibility="collapsed")
    if new_path != st.session_state[key]:
        st.session_state[key] = new_path
        st.rerun()

    # Buttons using Callbacks
    c1, c2, c3, c4, c5 = st.columns([1, 1, 1, 1, 2])
    
    c1.button("⬆️", key=f"up_{key}", use_container_width=True, on_click=_go_up)
    c2.button("🏠", key=f"home_{key}", use_container_width=True, on_click=_go_home)
    c3.button("💾", key=f"vol_{key}", help="Go to External Drives (/Volumes)", use_container_width=True, on_click=_go_vol)
    
    # New Folder Toggle
    icon = "➖" if st.session_state[f"show_new_{key}"] else "➕"
    c4.button(icon, key=f"new_{key}", help="Create New Folder", use_container_width=True, on_click=_toggle_new)

    # New Folder Input (Conditional)
    if st.session_state[f"show_new_{key}"]:
        new_name = st.text_input(f"Name for new folder in {current_path.name}:", key=f"name_{key}")
        if st.button("Create", key=f"create_{key}"):
            if new_name:
                new_dir = current_path / new_name
                try:
                    new_dir.mkdir(exist_ok=True)
                    st.session_state[key] = str(new_dir)
                    st.session_state[f"web_input_{key}"] = str(new_dir)
                    st.session_state[f"show_new_{key}"] = False
                    st.rerun()
                except Exception as e:
                    st.error(f"Error: {e}")
        
    # Subfolder List
    try:
        subfolders = [f.name for f in current_path.iterdir() if f.is_dir() and not f.name.startswith('.')]
        subfolders.sort()
        
        selection = st.selectbox(f"Navigate {label}", ["(Select subfolder)"] + subfolders, key=f"sub_{key}", label_visibility="collapsed")
        
        if selection != "(Select subfolder)":
            p = current_path / selection
            st.session_state[key] = str(p)
            st.session_state[f"web_input_{key}"] = str(p)
            st.rerun()
            
    except Exception as e:
        st.error(f"Access denied: {e}")

    return st.session_state[key]

# --- HELPER: NATIVE FOLDER PICKER ---
def native_folder_selector(label, key, default_path):
    # Ensure main state exists
    if key not in st.session_state:
        st.session_state[key] = str(default_path)
    if f"show_new_{key}" not in st.session_state:
        st.session_state[f"show_new_{key}"] = False
    
    col1, col2, col3, col4 = st.columns([4, 1, 1, 1])
    
    # 1. BUTTON LOGIC (First)
    with col2:
        if st.button("📂", key=f"browse_{key}", help="Select folder and Magic Scan", use_container_width=True):
            if sys.platform == 'darwin':
                try:
                    current = st.session_state[key]
                    # AppleScript with default location logic
                    script = f'''
                    set currentPath to "{current}"
                    try
                        set startFolder to POSIX file currentPath as alias
                    on error
                        set startFolder to path to pictures folder
                    end try
                    POSIX path of (choose folder with prompt "Select {label}" default location startFolder)
                    '''
                    res = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
                    if res.returncode == 0 and res.stdout.strip():
                        selected = res.stdout.strip()
                        st.session_state[key] = selected
                        # Force update widget
                        st.session_state[f"input_{key}"] = selected
                        st.rerun()
                except: pass

    with col3:
        if st.button("💾", key=f"vol_{key}", help="Jump to External Drives", use_container_width=True):
            st.session_state[key] = "/Volumes"
            st.session_state[f"input_{key}"] = "/Volumes"
            st.rerun()

    # Create New Folder Logic
    with col4:
        if st.session_state.get(f"show_new_{key}", False):
            if st.button("➖", key=f"cancel_{key}", help="Cancel New Folder", use_container_width=True):
                st.session_state[f"show_new_{key}"] = False
                st.rerun()
        else:
            if st.button("➕", key=f"new_{key}", help="Create New Folder", use_container_width=True):
                st.session_state[f"show_new_{key}"] = True
                st.rerun()
            
    if st.session_state.get(f"show_new_{key}", False):
        current_path = Path(st.session_state[key])
        new_name = st.text_input(f"New folder in {current_path.name}:", key=f"name_{key}")
        if st.button("Create", key=f"create_{key}"):
            if new_name:
                new_dir = current_path / new_name
                try:
                    new_dir.mkdir(exist_ok=True)
                    st.session_state[key] = str(new_dir)
                    st.session_state[f"input_{key}"] = str(new_dir)
                    st.session_state[f"show_new_{key}"] = False
                    st.rerun()
                except Exception as e:
                    st.error(f"Error: {e}")

    # 2. TEXT INPUT LOGIC (Second)
    with col1:
        # Sync: If widget key is missing, init from main key
        if f"input_{key}" not in st.session_state:
            st.session_state[f"input_{key}"] = st.session_state[key]
            
        new_path = st.text_input(label, key=f"input_{key}", label_visibility="collapsed")
        
        # Sync: If user typed, update main key
        if new_path != st.session_state[key]:
            st.session_state[key] = new_path
            
    return st.session_state[key]

# --- HELPER: MAIN SELECTOR WRAPPER ---
def folder_selector(label, key, default_path):
    # Check for Mobile Mode
    if st.session_state.get('mobile_mode', False):
        return web_folder_selector(label, key, default_path)
    else:
        return native_folder_selector(label, key, default_path)

# --- HELPER: SMART NAMING ---
def is_generic_filename(filename):
    """Returns True if filename looks like a camera default or random number."""
    stem = Path(filename).stem
    # Pure numbers (e.g. 172635.jpg)
    if re.match(r'^\d+$', stem): return True
    # Camera patterns (IMG_123, DSC001, PXL_2023)
    if re.match(r'^(IMG|DSC|PXL|VID|MVI)[-_]?\d+', stem, re.IGNORECASE): return True
    # Screenshots (Screenshot 2023...) - debatable, but usually we want content description
    if stem.lower().startswith('screenshot'): return True
    return False

# --- HELPER: GET LOCAL IP ---
def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost"

# --- SIDEBAR ---
with st.sidebar:
    st.header("1. Settings")
    
    # Mobile Mode Toggle
    mobile_mode = st.checkbox("📱 Remote / Mobile Mode", key="mobile_mode", help="Enable this if you are using an iPad or Phone to control the app.")
    
    if mobile_mode:
        local_ip = get_local_ip()
        st.success("👇 Connect your device here:")
        st.code(f"http://{local_ip}:8501", language=None)
    
    st.markdown("**Source Folder** (Where your messy photos are)")
    source_path = folder_selector("Source", "source", Path.home() / "Pictures")
    
    st.markdown("---")
    
    st.markdown("**Destination Folder** (Where organized photos go)")
    if 'dest' not in st.session_state:
        st.session_state.dest = str(BASE_DIR / "organized-photos")
    output_path = folder_selector("Destination", "dest", BASE_DIR / "organized-photos")
    
    st.markdown("---")
    if st.button("Reset / Clear Data"):
        if CSV_PATH.exists(): os.remove(CSV_PATH)
        if EMBEDDINGS_PATH.exists(): os.remove(EMBEDDINGS_PATH)
        st.rerun()

# CSS to nudge icons slightly left
st.markdown("""
<style>
    /* Nudge icons inside sidebar buttons slightly left */
    [data-testid="stSidebar"] button div p {
        margin-left: -3px !important;
    }
    
    /* Minimal Sidebar Navigation Buttons (Up, Home, Drives, Browse, New) */
    [data-testid="stSidebar"] button {
        background-color: transparent !important;
        border: none !important;
        padding: 0 !important;
    }
    /* Make the emoji icons bigger */
    [data-testid="stSidebar"] button div {
        font-size: 1.2rem !important;
    }
</style>
""", unsafe_allow_html=True)

# --- MAIN APP ---
st.title("🐿️✨ Binky's Magic Image Organizer")
st.markdown("*\"I'll glide through your files and organize them safely!\"*")

# AUTO SCAN LOGIC
if 'last_scanned_path' not in st.session_state:
    st.session_state.last_scanned_path = None

# STEP 1: SCAN
if not CSV_PATH.exists() or source_path != st.session_state.last_scanned_path:
    st.header("Step 1: Glide & Scan")
    st.write("Show Binky where your messy photos are hiding.")

    if st.button("🚀 Start Magic Glide", type="primary"):
        if os.path.exists(source_path):
            if len(str(source_path)) > 1: 
                with st.spinner("Binky is sniffing out your files..."):
                    # Use Cached AI Engine
                    ai_engine = get_ai_engine()
                    
                    scanner = ImageScanner(source_path, enable_ai=True, ai_instance=ai_engine)
                    df = scanner.scan()
                    df.to_csv(CSV_PATH, index=False)
                    
                    # Save embeddings
                    if scanner.embeddings:
                        with open(EMBEDDINGS_PATH, 'w') as f:
                            json.dump(scanner.embeddings, f)
                    
                    # Clear data cache since we just updated the file
                    load_data.clear()
                    
                    st.session_state.last_scanned_path = source_path
                st.rerun()
        else:
            st.error("Binky can't reach that branch! (Path invalid)")

# ORGANIZE SECTION
is_scanned = CSV_PATH.exists() and source_path == st.session_state.last_scanned_path

if not is_scanned:
    st.info("Binky is ready to organize your images.")
else:
    # Use Cached Data
    df = load_data(CSV_PATH)
    st.divider()
    st.info(f"Binky found {len(df)} treats! Ready to sort.")

    # SCROLLABLE PREVIEW SECTION
    st.subheader("👀 What Binky Found")
    
    # CSS for scrollable gallery
    st.markdown("""
    <style>
        .scroll-container {
            height: 400px;
            overflow-y: auto;
            border: 1px solid #333;
            border-radius: 10px;
            padding: 15px;
            background-color: #111;
        }
    </style>
    """, unsafe_allow_html=True)

    # Use a container to hold the grid
    with st.container():
        # Streamlit doesn't support custom class on container easily, 
        # so we'll use a columns-inside-expander trick or just a simple header + grid.
        # Let's use 4 columns and show up to 48 images for performance.
        preview_cols = st.columns(4)
        sample_df = df.head(48) 
        
        for i, (_, row) in enumerate(sample_df.iterrows()):
            img_path = row['file_path']
            if os.path.exists(img_path):
                with preview_cols[i % 4]:
                    st.image(img_path, use_container_width=True)
                    st.caption(row['filename'][:20])

    # VISUAL DUPLICATES (Burst Mode)
    if EMBEDDINGS_PATH.exists():
        with open(EMBEDDINGS_PATH, 'r') as f:
            embeddings_map = json.load(f)
        
        # Only run if we have enough images
        if len(embeddings_map) > 1:
            keys = list(embeddings_map.keys())
            vecs = np.array([embeddings_map[k] for k in keys])
            
            # Simple pairwise check (optimization: only check top matches to avoid N^2 on large sets)
            # For small sets (<1000), full matrix is fine.
            if len(keys) < 500:
                sim_matrix = cosine_similarity(vecs)
                # Find pairs > 0.95
                duplicates = []
                for i in range(len(keys)):
                    for j in range(i + 1, len(keys)):
                        if sim_matrix[i][j] > 0.95:
                            duplicates.append((keys[i], keys[j], sim_matrix[i][j]))
                
                if duplicates:
                    st.divider()
                    st.subheader(f"👯 Binky found {len(duplicates)} similar shots (Burst Mode)")
                    with st.expander("Review Similar Photos", expanded=True):
                        for f1, f2, score in duplicates[:10]: # Show top 10 pairs
                            c1, c2 = st.columns(2)
                            with c1:
                                if os.path.exists(f1): st.image(f1, caption=f"Original: {Path(f1).name}")
                            with c2:
                                if os.path.exists(f2): st.image(f2, caption=f"Match ({int(score*100)}%): {Path(f2).name}")
                            st.divider()

    st.divider()

    # ORGANIZE CONTROLS
    if 'org_cmd' not in st.session_state:
        st.session_state.org_cmd = "" # Empty to show placeholder

    org_command = st.text_input("Tell Binky how to sort your treats...", value=st.session_state.org_cmd, placeholder="use natural language to organize your images")
    st.session_state.org_cmd = org_command # Sync manual typing

    # Quick Chips
    st.caption("Binky's favorite sorting tricks:")
    row1_cols = st.columns(3)
    row2_cols = st.columns(3)
    row3_cols = st.columns(3)
    
    chips = [
        ("📅 by year, location, date", "By year, location, date"), 
        ("🐶 dogs", "Dogs"), 
        ("🎂 birthdays", "Birthdays"), 
        ("👨‍👩‍👧 family, year, location", "Family, year, location"),
        ("📄 receipts & invoices", "Receipts"),
        ("🌄 nature & landscapes", "Nature"),
        ("📱 screenshots", "Screenshots"),
        ("🍕 food & drinks", "Food"),
        ("🏢 urban & city", "Urban")
    ]
    
    for i, (label, cmd_text) in enumerate(chips):
        if i < 3: target_col = row1_cols[i]
        elif i < 6: target_col = row2_cols[i-3]
        else: target_col = row3_cols[i-6]
        
        if target_col.button(label, use_container_width=True):
            st.session_state.org_cmd = cmd_text
            st.rerun()
    
    # Parse Intent
    hierarchy = "Year / Month" # Default
    filter_query = None
    custom_categories = []
    
    cmd = st.session_state.org_cmd.lower()
    
    # Check for Custom Split (comma separated list)
    if "," in st.session_state.org_cmd or " vs " in st.session_state.org_cmd:
        # Split by comma or 'vs'
        raw_cats = re.split(r',| vs ', st.session_state.org_cmd)
        custom_categories = [c.strip().title() for c in raw_cats if c.strip()]
        if len(custom_categories) > 1:
            hierarchy = "Custom Split"
            st.success(f"✨ Custom Mode: Sorting into {custom_categories}")

    # ZERO-SHOT CONCEPT EXPANSION
    if not custom_categories:
        ABSTRACT_CONCEPTS = {
            "color": ["Red", "Blue", "Green", "Yellow", "Black", "White", "Orange", "Purple", "Pink"],
            "vibe": ["Happy", "Melancholy", "Energetic", "Calm", "Dark", "Romantic", "Minimalist"],
            "season": ["Spring", "Summer", "Autumn", "Winter"],
            "time": ["Morning", "Afternoon", "Evening", "Night"],
            "lighting": ["Bright", "Dark", "Neon", "Natural", "Golden Hour"],
            "texture": ["Smooth", "Rough", "Soft", "Hard", "Metallic", "Wooden"]
        }
        
        for key, buckets in ABSTRACT_CONCEPTS.items():
            if key in cmd:
                custom_categories = buckets
                hierarchy = "Custom Split"
                st.success(f"✨ Binky is inventing folders based on **{key.title()}**: {custom_categories}")
                break

    if not custom_categories:
        if "location" in cmd or "city" in cmd or "country" in cmd: hierarchy = "Location"
        elif "category" in cmd or "type" in cmd: hierarchy = "Category / Year"
        elif "year" in cmd or "date" in cmd: hierarchy = "Year / Month"
        
        # Mapping for filters
        filter_map = {
            "dog": ("ai_subject", "Dog"),
            "receipt": ("ai_subject", "Receipt"), # Detailed sub-label
            "screenshot": ("ai_subject", "Screenshot"),
            "nature": ("ai_category", "Nature"),
            "people": ("ai_category", "People"),
            "food": ("ai_category", "Food"),
            "urban": ("ai_category", "Urban"),
            "document": ("ai_category", "Document")
        }
        
        for key, mapping in filter_map.items():
            if key in cmd:
                filter_query = mapping
                break
        
        if filter_query:
            st.caption(f"✨ Sniffing for: **{filter_query[1]}**")

    col1, col2 = st.columns(2)
    with col1:
        rename = st.checkbox("Rename treats? (e.g. '2025_tasty_snack.jpg')")
    with col2:
        mode = st.radio("Mode", ["Copy (Keep Safe)", "Move (Tuck Away)"])
    
    if st.button("Magic Organizer - It's Playing, Playing Time!", type="primary"):
        # Use Cached AI Renamer
        ai_renamer = get_ai_engine()
        
        # Ensure caption model is loaded if we need it
        if rename or custom_categories:
            try:
                if rename: 
                    with st.spinner("Loading caption skills..."):
                        ai_renamer.load_caption_model()
            except Exception as e:
                st.error(f"AI ERROR: {e}")
                st.stop()
        
        progress = st.progress(0)
        unique_df = df[~df['is_duplicate']]
        
        # Apply Filter if needed
        if filter_query:
            key, val = filter_query
            if key in unique_df.columns:
                # Fuzzy match
                unique_df = unique_df[unique_df[key].str.contains(val, case=False, na=False)]
        
        count = 0
        failed_files = []
        
        for idx, row in unique_df.iterrows():
            try:
                src = Path(row['file_path'])
                if not src.exists(): 
                    failed_files.append(f"{row['filename']} (Source not found)")
                    continue
                
                # Get Date
                try: 
                    date = datetime.strptime(str(row['creation_date']), '%Y-%m-%d %H:%M:%S')
                except:
                    date = datetime.fromtimestamp(os.path.getmtime(src))
                
                # Get Category & Subject
                cat = row.get('ai_category', 'Uncategorized')
                sub = row.get('ai_subject', 'General')
                
                # CUSTOM CLASSIFICATION OVERRIDE
                if custom_categories:
                    # Ask AI: Which of these specific buckets does this file belong to?
                    cat = ai_renamer.custom_classify(str(src), custom_categories)
                    sub = "Custom" # Placeholder since we defined the category manually
                
                # Build Path based on Hierarchy Selection
                base = Path(output_path)
                
                if hierarchy == "Location":
                    country = row.get('location_country') or "Unknown Country"
                    city = row.get('location_city') or "Unknown City"
                    dest_dir = base / country / city / str(date.year)
                elif hierarchy == "Custom Split":
                    # Simple: Dest / CustomCategory / Filename
                    dest_dir = base / cat
                elif hierarchy == "Category / Year / Month":
                    dest_dir = base / cat / str(date.year) / f"{date.month:02d}"
                elif hierarchy == "Category / Year":
                    dest_dir = base / cat / str(date.year)
                elif hierarchy == "Category":
                    dest_dir = base / cat
                elif hierarchy == "Year / Month":
                    dest_dir = base / str(date.year) / f"{date.month:02d}"
                else: # Flat
                    dest_dir = base
                
                dest_dir.mkdir(parents=True, exist_ok=True)
                
                # Filename Logic
                fname = row['filename']
                if rename:
                    try:
                        # Clean Original Name
                        clean_original = Path(fname).stem
                        clean_original = "".join([c if c.isalnum() else "_" for c in clean_original]).strip("_")
                        # Remove generic prefixes like IMG, DSC from the meaningful part if we are adding better context
                        if is_generic_filename(fname):
                            clean_original = "" # Drop it completely if it's just IMG_1234
                        
                        # Build Structured Name: Date_Category_Subject_Original.ext
                        # e.g. 2025-01-14_Nature_Mountain.jpg
                        parts = [date.strftime('%Y-%m-%d'), cat, sub]
                        if clean_original:
                            parts.append(clean_original)
                            
                        base_name = "_".join(parts)
                        fname = f"{base_name}{src.suffix}"
                        
                    except Exception as e:
                        print(f"Renaming failed for {row['filename']}: {e}")
                        fname = f"{date.strftime('%Y-%m-%d')}_{row['filename']}"

                # Move/Copy
                dest = dest_dir / fname
                c = 1
                while dest.exists():
                    dest = dest_dir / f"{dest.stem}_{c}{dest.suffix}"
                    c += 1
                
                if "Move" in mode:
                    shutil.move(src, dest)
                else:
                    shutil.copy2(src, dest)
                count += 1
                
            except Exception as e:
                failed_files.append(f"{row['filename']} ({str(e)})")
                print(f"Error processing {row['filename']}: {e}")
            
            progress.progress((idx + 1) / len(unique_df))
                
        st.success(f"Finished! Organized {count} images.")
        
        if failed_files:
            st.error(f"Failed to process {len(failed_files)} files:")
            st.write(failed_files)
            
        # Open Folder Button
        if st.button("📂 Open Organized Folder"):
            if sys.platform == 'darwin':
                subprocess.run(['open', str(output_path)])
            elif sys.platform == 'win32':
                os.startfile(str(output_path))
            # Linux usually uses xdg-open
            else:
                subprocess.run(['xdg-open', str(output_path)])
            
        st.balloons()