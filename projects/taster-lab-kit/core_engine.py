import easyocr
import json
import os

class CodeZeroEngine:
    """
    The code:zero Core Engine (Black Box).
    This handles the heavy lifting of OCR and data extraction.
    """
    def __init__(self):
        # Initialize the reader once to save time
        # In a real taster, we'd have the models pre-downloaded in the .cache folder
        self.reader = easyocr.Reader(['en'])

    def sniff_receipt(self, image_path):
        """
        Reads an image and returns a list of detected text strings.
        """
        if not os.path.exists(image_path):
            return {"error": "File not found"}
        
        # Performance Note: EasyOCR can take 2-5 seconds per image
        results = self.reader.readtext(image_path, detail=0)
        
        # We return the raw strings for the AI Agent to process into business logic
        return results

def get_engine():
    return CodeZeroEngine()
