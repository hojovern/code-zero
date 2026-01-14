#!/bin/bash

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# 1. Kill any existing Binky processes to avoid port conflicts
kill $(lsof -t -i:8000) 2>/dev/null
kill $(lsof -t -i:8501) 2>/dev/null

# 2. Activate Environment
source venv/bin/activate

# 3. Start the Server in the background
python server.py &
SERVER_PID=$!

# 4. Start the UI
streamlit run app.py --server.headless true &
UI_PID=$!

echo "🐿️ Binky is waking up..."
echo "Server PID: $SERVER_PID"
echo "UI PID: $UI_PID"

# Function to clean up on exit
cleanup() {
    echo "🐿️ Binky is going back to sleep..."
    kill $SERVER_PID
    kill $UI_PID
    exit
}

trap cleanup SIGINT SIGTERM

# Keep the script alive so the processes stay running
wait
