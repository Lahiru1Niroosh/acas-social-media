#agents/similarity_agent.py
import requests
import easyocr
from PIL import Image
from io import BytesIO

from backend.models.similarity.clip_model import CLIPSimilarityModel


class SimilarityAgent:

    def __init__(self):

        print("Initializing Similarity Agent...")

        # Load CLIP similarity model
        self.clip_model = CLIPSimilarityModel()

        # OCR reader
        self.ocr_reader = easyocr.Reader(['en'])

        # similarity threshold
        self.threshold = 0.24

        print("Similarity Agent Ready")

    # --------------------------------------------------
    # Download Image (with browser header to avoid 403)
    # --------------------------------------------------

    def download_image(self, image_url):

        try:

            headers = {
                "User-Agent": "Mozilla/5.0"
            }

            response = requests.get(image_url, headers=headers, timeout=10)

            response.raise_for_status()

            image = Image.open(BytesIO(response.content)).convert("RGB")

            return image

        except Exception as e:

            print("Image download failed:", e)

            return None

    # --------------------------------------------------
    # OCR TEXT EXTRACTION
    # --------------------------------------------------

    def extract_ocr(self, image):

        try:

            result = self.ocr_reader.readtext(image, detail=0)

            if len(result) == 0:
                return ""

            return " ".join(result)

        except:

            return ""

    # --------------------------------------------------
    # TEXT ONLY CASE
    # --------------------------------------------------

    def handle_text_only(self, text_result):

        explanation = []

        explanation.append("Tweet contains only text.")
        explanation.append(text_result["reason"])

        return {

            "final_prediction": {
                "label": text_result["label"],
                "confidence": text_result["confidence"]
            },

            "similarity_analysis": None,

            "explanation": explanation
        }

    # --------------------------------------------------
    # IMAGE ONLY CASE
    # --------------------------------------------------

    def handle_image_only(self, image_result):

        explanation = []

        explanation.append("Tweet contains only an image.")

        explanation.extend(image_result["reasons"])

        return {

            "final_prediction": {
                "label": image_result["label"],
                "confidence": image_result["confidence"]
            },

            "similarity_analysis": None,

            "explanation": explanation
        }

    # --------------------------------------------------
    # TEXT + IMAGE CASE
    # --------------------------------------------------

    def handle_multimodal(self, text, image_url, text_result, image_result):

        explanation = []

        image = self.download_image(image_url)

        if image is None:

            explanation.append("Image could not be downloaded.")

            return {
                "final_prediction": {
                    "label": "UNKNOWN",
                    "confidence": 0
                },
                "similarity_analysis": None,
                "explanation": explanation
            }

        # compute similarity
        similarity_score = self.clip_model.compute_similarity(image, text)

        relation = "MATCH" if similarity_score >= self.threshold else "MISMATCH"

        # OCR
        ocr_text = self.extract_ocr(image)

        explanation.append(f"Image-text similarity score: {round(similarity_score,3)}")
        explanation.append(f"Detected relationship: {relation}")

        if ocr_text:
            explanation.append(f"OCR text detected in image: {ocr_text}")

        explanation.append(f"Text agent prediction: {text_result['label']}")
        explanation.append(f"Image agent prediction: {image_result['label']}")

        # --------------------------------------------------
        # FINAL DECISION LOGIC
        # --------------------------------------------------

        if text_result["label"] == "FAKE":

            final_label = "FAKE"

            explanation.append(
                "Text analysis determined the claim is false."
            )

        elif image_result["label"] == "FAKE":

            final_label = "FAKE"

            explanation.append(
                "Image analysis detected manipulated or AI-generated content."
            )

        elif relation == "MISMATCH":

            final_label = "FAKE"

            explanation.append(
                "The image does not support the textual claim."
            )

        else:

            final_label = "REAL"

            explanation.append(
                "Text, image, and semantic similarity are consistent."
            )

        confidence = round(similarity_score * 100, 2)

        return {

            "final_prediction": {
                "label": final_label,
                "confidence": confidence
            },

            "similarity_analysis": {
                "score": round(similarity_score, 3),
                "relation": relation
            },

            "explanation": explanation
        }

    # --------------------------------------------------
    # MAIN ENTRY FUNCTION
    # --------------------------------------------------

    def analyze(self, text=None, image_url=None,
                text_result=None, image_result=None):

        # text only tweet
        if text and not image_url:

            return self.handle_text_only(text_result)

        # image only tweet
        if image_url and not text:

            return self.handle_image_only(image_result)

        # text + image tweet
        if text and image_url:

            return self.handle_multimodal(
                text,
                image_url,
                text_result,
                image_result
            )

        # invalid input
        return {

            "final_prediction": {
                "label": "UNKNOWN",
                "confidence": 0
            },

            "similarity_analysis": None,

            "explanation": [
                "No valid text or image input provided."
            ]
        }