import json
import os
from pathlib import Path

CONFIG_FILE = Path(__file__).parent / "binky_config.json"

DEFAULT_CONFIG = {
    "source_path": str(Path.home() / "Pictures"),
    "destination_path": str(Path(__file__).parent / "organized-photos"),
    "mobile_mode": False,
    "last_command": "",
    "password": "binky"
}

def load_config():
    if not CONFIG_FILE.exists():
        return DEFAULT_CONFIG
    try:
        with open(CONFIG_FILE, "r") as f:
            config = json.load(f)
            # Merge with defaults in case of missing keys
            return {**DEFAULT_CONFIG, **config}
    except:
        return DEFAULT_CONFIG

def save_config(key, value):
    config = load_config()
    config[key] = value
    try:
        with open(CONFIG_FILE, "w") as f:
            json.dump(config, f, indent=4)
    except Exception as e:
        print(f"Failed to save config: {e}")

def get_config_value(key):
    config = load_config()
    return config.get(key, DEFAULT_CONFIG.get(key))
