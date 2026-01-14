import easyocr
import os
import time
from PIL import Image, ImageOps

class CodeZeroEngine:
    """
    The code:zero Core Engine (The Engine Room).
    Optimized for high-context financial data extraction.
    """
    def __init__(self):
        print("[code:zero] Ignition: Loading AI Vision models...")
        # Pre-loading the reader. In production, we ensure these are local to avoid WiFi lag.
        self.reader = easyocr.Reader(['en'], gpu=False) # mps/gpu handled by torch in background
        print("[code:zero] Engine Ready.")

    def _preprocess_image(self, image_path):
        """
        Enhances the image for the AI to see better.
        """
        with Image.open(image_path) as img:
            # Convert to Grayscale for better OCR contrast
            img = img.convert('L')
            # Auto-rotate based on EXIF if available (prevents upside-down sniffing)
            img = ImageOps.exif_transpose(img)
            
            # Save a temp processed image for the engine
            temp_path = f"temp_{os.path.basename(image_path)}"
            img.save(temp_path)
            return temp_path

    def sniff_receipt(self, image_path):
        """
        High-performance extraction of financial data strings.
        """
        if not os.path.exists(image_path):
            return ["ERROR: File not found at " + image_path]
        
        print(f"[code:zero] Analyzing: {os.path.basename(image_path)}...")
        start_time = time.time()
        
        try:
            # Step 1: Pre-process
            temp_img = self._preprocess_image(image_path)
            
            # Step 2: OCR
            # detail=0 returns just the text, detail=1 returns coordinates (for advanced UI)
            results = self.reader.readtext(temp_img, detail=0)
            
            # Clean up temp file
            if os.path.exists(temp_img):
                os.remove(temp_img)
                
            elapsed = time.time() - start_time
            print(f"[code:zero] Sniff complete in {elapsed:.2f}s. Found {len(results)} data points.")
            
            return results
            
        except Exception as e:
            return [f"ERROR: Engine stall - {str(e)}"]

def get_engine():
    return CodeZeroEngine()