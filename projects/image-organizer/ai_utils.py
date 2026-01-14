import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel, BlipProcessor, BlipForConditionalGeneration
from facenet_pytorch import MTCNN, InceptionResnetV1

class ImageAI:
    def __init__(self):
        print("Loading Intelligence Engines...")
        # Apple Silicon (Mac) uses 'mps' for acceleration
        self.device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
        
        # 1. Scene/Object Brain (CLIP)
        self.model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(self.device)
        self.processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        
        # 2. Face Brain (FaceNet)
        self.face_detector = MTCNN(keep_all=True, device=self.device)
        self.face_encoder = InceptionResnetV1(pretrained='vggface2').eval().to(self.device)
        
        # SMART TAXONOMY
        self.taxonomy = {
            "Document": ["Receipt", "Invoice", "Contract", "Bank Statement", "ID Card", "Business Card", "Handwritten Note", "Screenshot"],
            "Nature": ["Beach", "Mountain", "Forest", "Sunset", "Flowers", "Snow", "Lake", "Sky"],
            "Urban": ["City Street", "Building", "Architecture", "Room Interior", "Car", "Traffic"],
            "People": ["Selfie", "Group Photo", "Portrait", "Crowd", "Party", "Meeting"],
            "Animals": ["Dog", "Cat", "Bird", "Wild Animal", "Pet"],
            "Food": ["Meal", "Coffee", "Drink", "Menu", "Cooking"],
            "Other": ["Random Object", "Texture", "Art", "Diagram"]
        }
        # Flatten for initial broad sweep
        self.broad_labels = list(self.taxonomy.keys())
        
        # Lazy load captioning components
        self.caption_model = None
        self.caption_processor = None

    def load_caption_model(self):
        if self.caption_model is None:
            print("Loading Captioning model (BLIP)... this may take a moment.")
            self.caption_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
            self.caption_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base").to(self.device)

    def classify(self, image_path):
        """Quick classification (Legacy support)."""
        return self.smart_classify(image_path)

    def smart_classify(self, image_path):
        """
        Two-step classification:
        1. Identify Broad Category (e.g. "Nature")
        2. Identify Specific Nuance (e.g. "Sunset")
        Returns: (Category, SubCategory, Confidence)
        """
        try:
            image = Image.open(image_path).convert("RGB")
            
            # Step 1: Broad Category
            inputs = self.processor(text=self.broad_labels, images=image, return_tensors="pt", padding=True).to(self.device)
            with torch.no_grad():
                outputs = self.model(**inputs)
            probs = outputs.logits_per_image.softmax(dim=1)
            broad_idx = probs.argmax().item()
            broad_cat = self.broad_labels[broad_idx]
            broad_conf = probs[0][broad_idx].item()
            
            # Step 2: Specific Sub-label
            sub_labels = self.taxonomy.get(broad_cat, ["General"])
            inputs_sub = self.processor(text=sub_labels, images=image, return_tensors="pt", padding=True).to(self.device)
            with torch.no_grad():
                outputs_sub = self.model(**inputs_sub)
            probs_sub = outputs_sub.logits_per_image.softmax(dim=1)
            sub_idx = probs_sub.argmax().item()
            sub_cat = sub_labels[sub_idx]
            
            return broad_cat, sub_cat, broad_conf
            
        except Exception as e:
            print(f"Error classifying {image_path}: {e}")
            return "Uncategorized", "General", 0.0

    def custom_classify(self, image_path, labels):
        """Classify image against a custom list of user-provided labels."""
        try:
            image = Image.open(image_path).convert("RGB")
            inputs = self.processor(text=labels, images=image, return_tensors="pt", padding=True).to(self.device)
            
            with torch.no_grad():
                outputs = self.model(**inputs)
            
            probs = outputs.logits_per_image.softmax(dim=1)
            best_idx = probs.argmax().item()
            return labels[best_idx]
        except Exception as e:
            print(f"Error custom classifying {image_path}: {e}")
            return "Uncategorized"

    def get_face_embeddings(self, image_path):
        """Detect faces and return embeddings for each."""
        try:
            img = Image.open(image_path).convert("RGB")
            # Detect faces
            faces = self.face_detector(img)
            if faces is not None:
                # Calculate embeddings
                embeddings = self.face_encoder(faces)
                return embeddings.detach().cpu().numpy().tolist()
        except Exception as e:
            print(f"Face error: {e}")
        return []

    def get_embedding(self, image_path):
        """Generate a vector embedding for semantic search."""
        try:
            image = Image.open(image_path).convert("RGB")
            inputs = self.processor(images=image, return_tensors="pt", padding=True).to(self.device)
            
            with torch.no_grad():
                image_features = self.model.get_image_features(**inputs)
            
            # Normalize the features
            image_features /= image_features.norm(dim=-1, keepdim=True)
            return image_features.cpu().numpy().flatten().tolist()
        except Exception as e:
            print(f"Error embedding {image_path}: {e}")
            return None

    def get_text_embedding(self, text):
        """Generate a vector embedding for a text query."""
        try:
            inputs = self.processor(text=[text], return_tensors="pt", padding=True).to(self.device)
            with torch.no_grad():
                text_features = self.model.get_text_features(**inputs)
            
            # Normalize
            text_features /= text_features.norm(dim=-1, keepdim=True)
            return text_features.cpu().numpy().flatten().tolist()
        except Exception as e:
            print(f"Error embedding text '{text}': {e}")
            return None

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

