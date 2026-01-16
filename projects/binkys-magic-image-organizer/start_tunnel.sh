#!/bin/bash
echo "🐿️  Binky Global Tunnel Starting..."
echo "---------------------------------------------------"
echo "Creating a secure bridge to the outside world."
echo "You will see a URL ending in .trycloudflare.com below."
echo "Use that URL on your phone to access Binky from anywhere (5G/LTE)."
echo "---------------------------------------------------"

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "❌ cloudflared not found. Installing via Homebrew..."
    brew install cloudflared
fi

# Run tunnel pointing to Streamlit (8501)
# 2>&1 redirects stderr to stdout so we can grep the URL
cloudflared tunnel --url http://localhost:8501 2>&1 | grep --line-buffered "trycloudflare.com"
