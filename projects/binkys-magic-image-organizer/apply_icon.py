import os
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).parent
APP_PATH = BASE_DIR / "Binky's Magic Image Organizer.app"
ICON_SOURCE = BASE_DIR / "assets" / "binky-logo.png"

def apply_macos_icon():
    if not ICON_SOURCE.exists():
        print(f"❌ Icon source not found at {ICON_SOURCE}. Please save your generated PNG there.")
        return

    print("🚀 Crafting Apple-style icon bundle...")
    
    # 1. Create a temporary iconset
    iconset_dir = BASE_DIR / "binky.iconset"
    iconset_dir.mkdir(exist_ok=True)
    
    # 2. Generate various sizes required by macOS
    sizes = [16, 32, 64, 128, 256, 512, 1024]
    for size in sizes:
        out = iconset_dir / f"icon_{size}x{size}.png"
        subprocess.run(["sips", "-z", str(size), str(size), str(ICON_SOURCE), "--out", str(out)], capture_output=True)
        # @2x versions
        out_2x = iconset_dir / f"icon_{size}x{size}@2x.png"
        subprocess.run(["sips", "-z", str(size*2), str(size*2), str(ICON_SOURCE), "--out", str(out_2x)], capture_output=True)

    # 3. Convert iconset to .icns
    icns_path = BASE_DIR / "binky.icns"
    subprocess.run(["iconutil", "-c", "icns", str(iconset_dir), "-o", str(icns_path)])
    
    # 4. Move to App Bundle
    dest_icns = APP_PATH / "Contents" / "Resources" / "applet.icns"
    subprocess.run(["cp", str(icns_path), str(dest_icns)])
    
    # 5. Force Finder to refresh the icon
    subprocess.run(["touch", str(APP_PATH)])
    
    # Cleanup
    import shutil
    shutil.rmtree(iconset_dir)
    if icns_path.exists(): os.remove(icns_path)
    
    print(f"✨ Binky is now wearing his new Apple suit! Check your Dock.")

if __name__ == "__main__":
    apply_macos_icon()
