import webview
import subprocess
import time
import os
import signal
import sys
import socket
from pathlib import Path

# Config
APP_TITLE = "Binky's Magic Organizer"
STREAMLIT_URL = "http://localhost:8501"
FASTAPI_URL = "http://localhost:8000"
BASE_DIR = Path(__file__).parent

# Process handles
processes = []

def is_port_open(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def start_services():
    print("🐿️ Binky is waking up...")
    
    # 1. Start FastAPI (Brain)
    p_fastapi = subprocess.Popen(
        [sys.executable, str(BASE_DIR / "server.py")],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    processes.append(p_fastapi)
    
    # 2. Start Streamlit (Face)
    # --browser.gatherUsageStats=false hides the opt-in prompt
    # --server.headless=true stops it from opening a real browser
    p_streamlit = subprocess.Popen(
        [
            sys.executable, "-m", "streamlit", "run", 
            str(BASE_DIR / "app.py"), 
            "--server.headless=true", 
            "--browser.gatherUsageStats=false"
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    processes.append(p_streamlit)
    
    # 3. Wait for UI to be ready
    print("Waiting for the pouch to open...")
    retries = 0
    while not is_port_open(8501) and retries < 20:
        time.sleep(1)
        retries += 1
    
    if retries >= 20:
        print("❌ Binky is having trouble waking up. Check your logs!")
        cleanup()
        sys.exit(1)

def cleanup():
    print("\n🐿️ Binky is going to sleep. Goodnight!")
    for p in processes:
        p.terminate()
        # On Mac we sometimes need to be more aggressive
        try:
            p.wait(timeout=2)
        except:
            p.kill()

def main():
    start_services()
    
    # 4. Create the Native Window
    # vibrations=True enables the Mac vibrancy effect if supported
    window = webview.create_window(
        APP_TITLE, 
        STREAMLIT_URL,
        width=1200,
        height=800,
        min_size=(800, 600),
        background_color='#FFFFFF'
    )
    
    # Start the app
    # gui='cocoa' ensures we use Mac's native engine
    try:
        webview.start(gui='cocoa')
    finally:
        cleanup()

if __name__ == "__main__":
    main()
