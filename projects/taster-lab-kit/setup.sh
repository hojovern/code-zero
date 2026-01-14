#!/bin/bash

# code:zero Lab Kit Initialization Script
echo "------------------------------------------------"
echo "[code:zero] Initializing Digital Site Office..."
echo "------------------------------------------------"

# Check for Python
if ! command -v python3 &> /dev/null
then
    echo "[ERROR] Python 3 not found. Please install Python to proceed."
    exit
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "[code:zero] Creating local engine environment..."
    python3 -m venv venv
fi

# Activate and install dependencies silently
source venv/bin/activate
echo "[code:zero] Warming up the AI Vision engine (this may take a minute)..."
pip install -q easyocr torch torchvision

# Create the report file
touch report.md

echo "------------------------------------------------"
echo "[code:zero] SYSTEM ONLINE. Architect identified."
echo "[code:zero] Ready to build. Open the terminal and command your agent."
echo "------------------------------------------------"
