import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel, BlipProcessor, BlipForConditionalGeneration

class ImageAI:
    def __init__(self):
        print("Loading CLIP model (local)...")
        # Apple Silicon (Mac) uses 'mps' for acceleration
        self.device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
        self.model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(self.device)
        self.processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        self.labels = ["a photograph", "a document", "a receipt", "a screenshot", "a drawing or illustration"]
        
        # Lazy load captioning components
        self.caption_model = None
        self.caption_processor = None

    def load_caption_model(self):
        if self.caption_model is None:
            print("Loading Captioning model (BLIP)... this may take a moment.")
            self.caption_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
            self.caption_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base").to(self.device)

    def classify(self, image_path):
        """Classify if the image is a photo, document, etc."""
        try:
            image = Image.open(image_path).convert("RGB")
            inputs = self.processor(text=self.labels, images=image, return_tensors="pt", padding=True).to(self.device)
            
            with torch.no_grad():
                outputs = self.model(**inputs)
            
            probs = outputs.logits_per_image.softmax(dim=1)
            best_label_idx = probs.argmax().item()
            return self.labels[best_label_idx], probs[0][best_label_idx].item()
        except Exception as e:
            print(f"Error classifying {image_path}: {e}")
            return "error", 0.0

    def generate_caption(self, image_path):
        """Generate a short descriptive caption for the image."""
        try:
            self.load_caption_model()
            image = Image.open(image_path).convert("RGB")
            inputs = self.caption_processor(image, return_tensors="pt").to(self.device)
            
            with torch.no_grad():
                out = self.caption_model.generate(**inputs, max_new_tokens=20)
            
            caption = self.caption_processor.decode(out[0], skip_special_tokens=True)
            return caption
        except Exception as e:
            print(f"Error captioning {image_path}: {e}")
            return "image"

