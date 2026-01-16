#!/bin/bash
# 🐿️ Binky Native Launcher

# Get the directory where the script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Wake up the environment
# Assuming standard python3 or venv
PYTHON_CMD="python3"
if [ -d "venv" ]; then
    PYTHON_CMD="./venv/bin/python3"
fi

echo "Launching Binky Crystal..."
$PYTHON_CMD desktop_app.py

