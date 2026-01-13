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

# --- CONFIG ---
st.set_page_config(page_title="Binky's Magic Image Organizer", layout="wide")
BASE_DIR = Path(__file__).parent
CSV_PATH = BASE_DIR / 'image_index.csv'
EMBEDDINGS_PATH = BASE_DIR / 'embeddings.json'

# --- HELPER: NATIVE FOLDER PICKER ---
def folder_selector(label, key, default_path):
    # Ensure main state exists
    if key not in st.session_state:
        st.session_state[key] = str(default_path)
    
    col1, col2 = st.columns([4, 1])
    
    # 1. BUTTON LOGIC (First)
    with col2:
        if st.button("📂", key=f"browse_{key}", help="Select folder and Magic Scan"):
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

# --- SIDEBAR ---
with st.sidebar:
    st.header("1. Settings")
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

# --- MAIN APP ---
st.title("🪄 Binky's Magic Image Organizer")

# AUTO SCAN LOGIC
if 'last_scanned_path' not in st.session_state:
    st.session_state.last_scanned_path = None

# Logic: Only scan if path CHANGED and it's not the very first load (unless user explicitly clicked something)
# We detect 'first load' by last_scanned_path being None.
# But we want to allow re-scanning if the user clicks '✨ Scan' even if path is same?
# Actually, the button updates the path variable. 
# Let's just strict check: Scan if path is different from last successful scan.
# AND ensure we don't scan default path on boot unless requested.

should_scan = False
if source_path != st.session_state.last_scanned_path:
    # It changed. But is it just the default loading?
    # If last_scanned is None, it means we just started.
    # We only want to scan if the user *changed* it or we clicked reset.
    if st.session_state.last_scanned_path is None:
        # On boot, don't scan yet. Wait for user.
        # UNLESS the user just clicked the "Scan" button which set this path?
        # The button click updates session_state. 
        # Let's rely on the fact that if they used the picker, they want a scan.
        pass 
    else:
        should_scan = True

# Explicit override: If they clicked the button, we want to scan even if path matches
# (Requires tracking button click, but for now path change is the main trigger)
# Let's just allow scanning if last_scanned is None BUT the path is valid and they likely chose it?
# Actually, safest is: Don't scan on boot. 
# If they change the text or pick a folder, scan.

if source_path != st.session_state.last_scanned_path and st.session_state.last_scanned_path is not None:
    should_scan = True
elif source_path != st.session_state.last_scanned_path and st.session_state.last_scanned_path is None:
    # Startup. Don't scan automatically.
    # User must click something to trigger.
    # But wait, if they use the picker, it updates the path.
    # So we need a flag "scan_requested"
    pass

# Simplified: The user MUST click '✨ Scan' to trigger the picker, which updates the path.
# OR they type in the box.
# We will use a dedicated session state flag trigger.

if 'trigger_scan' not in st.session_state:
    st.session_state.trigger_scan = False

# We need to hook into the folder_selector to set this flag. 
# Since we can't easily edit the helper without breaking flow, let's rely on path change 
# BUT ignore the very first render.

if source_path != st.session_state.last_scanned_path:
    # If it's the first run (None), we skip unless we are sure.
    if st.session_state.last_scanned_path is not None:
        should_scan = True
    else:
        # First run. Just set the tracker to current so we don't scan.
        st.session_state.last_scanned_path = source_path

if should_scan and os.path.exists(source_path):
    if len(str(source_path)) > 1: 
        st.info(f"✨ Magic Scanning: {source_path}...")
        with st.spinner("Analyzing your visual library..."):
            scanner = ImageScanner(source_path, enable_ai=True)
            df = scanner.scan()
            df.to_csv(CSV_PATH, index=False)
            
            # Save embeddings
            if scanner.embeddings:
                with open(EMBEDDINGS_PATH, 'w') as f:
                    json.dump(scanner.embeddings, f)
            
            st.session_state.last_scanned_path = source_path
        st.rerun()

# ORGANIZE SECTION
if not CSV_PATH.exists():
    st.info("Binky is ready to organize your images.")
else:
    df = pd.read_csv(CSV_PATH)
    st.divider()
    st.info(f"Binky is ready to organize {len(df)} images.")

    # ORGANIZE CONTROLS
    if 'org_cmd' not in st.session_state:
        st.session_state.org_cmd = "" # Empty to show placeholder

    org_command = st.text_input("How should we organize?", value=st.session_state.org_cmd, placeholder="use natural language to organize your images")
    st.session_state.org_cmd = org_command # Sync manual typing
    st.session_state.org_cmd = org_command # Sync manual typing

    # Quick Chips
    st.caption("Try these prompts:")
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
    
    cmd = st.session_state.org_cmd.lower()
    if "category" in cmd or "type" in cmd: hierarchy = "Category / Year"
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
        st.caption(f"✨ Filtering for: **{filter_query[1]}**")

    col1, col2 = st.columns(2)
    with col1:
        rename = st.checkbox("Smart Clean & Rename? (Standardizes all filenames)")
    with col2:
        mode = st.radio("Mode", ["Copy (Keep Originals)", "Move (Delete Originals)"])
    
    if st.button("✨ Run Magic Organize"):
        # Setup AI Renamer if needed
        ai_renamer = None
        if rename:
            if 'search_ai' in st.session_state:
                ai_renamer = st.session_state.search_ai
                ai_renamer.load_caption_model()
            else:
                from ai_utils import ImageAI
                ai_renamer = ImageAI()
                ai_renamer.load_caption_model()
        
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
                
                # Build Path based on Hierarchy Selection
                base = Path(output_path)
                if hierarchy == "Category / Year / Month":
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
            
        st.balloons()
