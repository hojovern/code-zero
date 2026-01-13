import streamlit as st
import pandas as pd
from scanner import ImageScanner
import os
from pathlib import Path

st.set_page_config(page_title="AI Image Organizer", layout="wide")

st.title("📸 AI Image Organizer")
st.markdown("Organize 10,000+ images using Date, Content, and AI similarity.")

# Define paths
BASE_DIR = Path(__file__).parent
CSV_PATH = BASE_DIR / 'image_index.csv'

import shutil
import subprocess
import sys
from datetime import datetime

# Helper: Folder Selector
def folder_selector(label, key, default_path, location="sidebar"):
    container = st.sidebar if location == "sidebar" else st
    container.markdown(f"**{label}**")
    
    # Initialize state for this selector
    if key not in st.session_state:
        st.session_state[key] = str(default_path)

    # Layout: Text Input + Browse Button
    col1, col2 = container.columns([3, 1])
    
    # Logic for Browse Button (Run this first to update state before render)
    with col2:
        if st.button("📂", key=f"browse_{key}", help="Open Finder to select folder"):
            selected_folder = None
            current_dir = st.session_state[key]
            
            if sys.platform == 'darwin':
                try:
                    # AppleScript with default location
                    script = f'''
                    set currentPath to "{current_dir}"
                    try
                        set startFolder to POSIX file currentPath as alias
                    on error
                        set startFolder to path to pictures folder
                    end try
                    POSIX path of (choose folder with prompt "Select Folder" default location startFolder)
                    '''
                    
                    cmd = ['osascript', '-e', script]
                    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                    
                    if result.returncode == 0 and result.stdout.strip():
                        selected_folder = result.stdout.strip()
                except Exception as e:
                    st.error(f"Error opening finder: {e}")
            else:
                # Fallback
                try:
                    import tkinter as tk
                    from tkinter import filedialog
                    root = tk.Tk()
                    root.withdraw()
                    root.wm_attributes('-topmost', 1)
                    selected_folder = filedialog.askdirectory(initialdir=current_dir)
                    root.destroy()
                except Exception as e:
                    st.error(f"Picker Error: {e}")

            if selected_folder:
                st.session_state[key] = selected_folder
                # Force update the widget state (Safe now because this runs BEFORE the widget is created)
                st.session_state[f"input_{key}"] = selected_folder
                st.toast(f"Selected: {selected_folder.split('/')[-1]}")
                st.rerun()

    # Logic for Text Input
    with col1:
        # Ensure widget key exists in state
        if f"input_{key}" not in st.session_state:
            st.session_state[f"input_{key}"] = st.session_state[key]
            
        # Widget is driven purely by session_state[f"input_{key}"]
        new_path = st.text_input(
            "Path", 
            key=f"input_{key}", 
            label_visibility="collapsed"
        )
        
        # Sync back to main key if user typed manually
        if new_path != st.session_state[key]:
            st.session_state[key] = new_path
            # We don't rerun here immediately to allow typing, 
            # but if other components rely on 'key', they get the update.
            
    return st.session_state[key]

# Sidebar Settings
st.sidebar.header("📁 Folder Settings")
source_path = folder_selector("Source Folder", "source_folder", Path.home() / "Pictures", location="sidebar")

st.sidebar.divider()

# Destination Path with Session State
if 'destination_folder' not in st.session_state:
    st.session_state.destination_folder = str(BASE_DIR / "organized-photos")

output_path = folder_selector("Destination Folder", "destination_folder", BASE_DIR / "organized-photos", location="sidebar")

st.sidebar.divider()
enable_ai = st.sidebar.checkbox("Enable AI Analysis (for Renaming & Sorting)")

if st.sidebar.button("Scan Folder", type="primary", use_container_width=True):
    if os.path.exists(source_path):
        with st.spinner("Scanning images and extracting metadata..."):
            progress_bar = st.progress(0)
            scanner = ImageScanner(source_path, enable_ai=enable_ai)
            df = scanner.scan(progress_callback=progress_bar.progress)
            df.to_csv(CSV_PATH, index=False)
            st.success(f"Scan complete! Found {len(df)} images.")
    else:
        st.error("Source path does not exist.")

# Load Data if exists
if CSV_PATH.exists():
    df = pd.read_csv(CSV_PATH)
    df['creation_date'] = pd.to_datetime(df['creation_date'])

    # Stats Row
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Total Images", len(df))
    col2.metric("Duplicates", df['is_duplicate'].sum())
    col3.metric("Formats", df['extension'].nunique())
    col4.metric("Total Size", f"{df['size_kb'].sum() / 1024 / 1024:.2f} GB")

    # Tabs
    tab1, tab2, tab3, tab4 = st.tabs(["Timeline", "AI Clusters", "Duplicates", "Organize"])

    with tab1:
        st.subheader("Image Timeline")
        df['year_month'] = df['creation_date'].dt.to_period('M').astype(str)
        timeline = df.groupby('year_month').size()
        st.bar_chart(timeline)

    with tab2:
        st.subheader("AI Smart Clusters")
        if 'ai_label' in df.columns and df['ai_label'].nunique() > 1:
            st.bar_chart(df['ai_label'].value_counts())
            
            # Show gallery of a selected category
            selected_cat = st.selectbox("View Category", df['ai_label'].unique())
            subset = df[df['ai_label'] == selected_cat].head(10)
            cols = st.columns(5)
            for idx, row in subset.reset_index().iterrows():
                with cols[idx % 5]:
                    if os.path.exists(row['file_path']):
                        st.image(row['file_path'], use_container_width=True, caption=row['filename'])
        else:
            st.info("Run a scan with 'Enable AI Classification' checked to see clusters.")

    with tab3:
        st.subheader("Duplicate Management")
        dupes = df[df['is_duplicate'] == True]
        if not dupes.empty:
            st.write(f"Found {len(dupes)} duplicate files.")
            st.dataframe(dupes[['filename', 'size_kb', 'file_path']])
        else:
            st.write("No duplicates found!")
            
    with tab4:
        st.subheader("Organize Files")
        
        st.markdown(f"**Target Destination:** `{output_path}`")
        st.divider()
        st.markdown("### 1. How should we organize them?")

        col_settings_1, col_settings_2 = st.columns(2)
        
        with col_settings_1:
            # Safety Mode Selection
            mode = st.radio("Operation Mode", ["Copy (Safe - Keep Originals)", "Move (Clean Source)"])
            is_move = "Move" in mode
            
        with col_settings_2:
            # Advanced Organization Settings
            structure_type = st.selectbox(
                "Folder Structure",
                ["Year / Month", "Category / Year / Month", "Year / Category"]
            )
            rename_option = st.radio(
                "Renaming Strategy",
                ["Keep Original", "Timestamp (Fast)", "Smart AI Renaming (Descriptive)"]
            )

        action_verb = "MOVE" if is_move else "COPY"
        st.write(f"This will **{action_verb}** {len(df) - df['is_duplicate'].sum()} unique images to: **{output_path}**")
        
        if is_move:
            st.warning("⚠️ This action will remove files from the source folder.")
        else:
            st.success("✅ Safe Mode: Your original files will stay where they are.")
        
        if st.button(f"Start {action_verb.title()}ing"):
            if not os.path.exists(output_path):
                os.makedirs(output_path)
            
            # Initialize AI if needed for renaming
            ai_renamer = None
            if "Smart AI" in rename_option:
                try:
                    with st.spinner("Loading AI Captioning Model (this happens once)..."):
                        from ai_utils import ImageAI
                        ai_renamer = ImageAI()
                        # Force load the caption model immediately
                        ai_renamer.load_caption_model()
                except Exception as e:
                    st.error(f"Failed to load AI model: {e}")
                    st.stop()

            progress_bar = st.progress(0)
            success_count = 0
            errors = 0
            
            # Filter unique images
            unique_images = df[df['is_duplicate'] == False]
            total_files = len(unique_images)
            
            for idx, row in unique_images.iterrows():
                try:
                    src = Path(row['file_path'])
                    if not src.exists():
                        continue
                        
                    date = row['creation_date']
                    year = str(date.year)
                    month = f"{date.month:02d}"
                    
                    # Determine Category
                    category = "Uncategorized"
                    if 'ai_label' in row and pd.notna(row['ai_label']):
                        # Clean label: "a receipt" -> "Receipts"
                        raw_label = row['ai_label'].replace("a ", "").replace("an ", "")
                        category = raw_label.title().replace(" ", "_") + "s"
                    
                    # Build Destination Path based on User Choice
                    base_dest = Path(output_path)
                    
                    if structure_type == "Year / Month":
                        dest_dir = base_dest / year / month
                    elif structure_type == "Category / Year / Month":
                        dest_dir = base_dest / category / year / month
                    elif structure_type == "Year / Category":
                        dest_dir = base_dest / year / category
                    
                    dest_dir.mkdir(parents=True, exist_ok=True)
                    
                    # Determine Filename
                    if "Smart AI" in rename_option:
                        timestamp = date.strftime("%Y-%m-%d")
                        # Generate caption
                        caption = ai_renamer.generate_caption(str(src))
                        # Sanitize caption for filename (limit to 50 chars, alphanumeric + underscores)
                        clean_caption = "".join([c if c.isalnum() else "_" for c in caption]).strip("_")
                        # Compress multiple underscores
                        while "__" in clean_caption:
                            clean_caption = clean_caption.replace("__", "_")
                        
                        dest_filename = f"{timestamp}_{clean_caption[:50]}{src.suffix}"
                        
                    elif "Timestamp" in rename_option:
                        timestamp = date.strftime("%Y-%m-%d_%H-%M-%S")
                        clean_name = src.stem.replace(" ", "_")
                        dest_filename = f"{timestamp}_{clean_name}{src.suffix}"
                    else:
                        dest_filename = row['filename']
                        
                    dest_file = dest_dir / dest_filename
                    
                    # Handle collisions
                    counter = 1
                    while dest_file.exists():
                        stem = dest_file.stem
                        # Avoid infinite stacking of _1_1_1
                        if stem[-2:] == f"_{counter-1}":
                            stem = stem[:-2]
                        dest_file = dest_dir / f"{stem}_{counter}{dest_file.suffix}"
                        counter += 1
                    
                    if is_move:
                        shutil.move(str(src), str(dest_file))
                    else:
                        shutil.copy2(str(src), str(dest_file))
                        
                    success_count += 1
                    
                except Exception as e:
                    errors += 1
                    print(f"Error processing {row['filename']}: {e}")
                
                progress_bar.progress((success_count + errors) / total_files)
            
            st.success(f"Organization complete! Processed {success_count} files. {errors} errors.")
            st.balloons()
else:
    st.info("Enter a path in the sidebar and click 'Scan' to begin.")
