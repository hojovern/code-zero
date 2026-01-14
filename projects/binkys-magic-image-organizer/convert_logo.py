from PIL import Image
import os

source = "/Users/jv/Desktop/binky.jpg"
dest = "projects/image-organizer/assets/logo.webp"

if os.path.exists(source):
    img = Image.open(source)
    img.save(dest, format="WEBP")
    print(f"Converted {source} to {dest}")
else:
    print("Source image not found.")
