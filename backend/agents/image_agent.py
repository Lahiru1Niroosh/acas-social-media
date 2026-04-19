import requests
from backend.models.image.predictor import ImageCredibilityPredictor

class ImageAgent:
    def __init__(self):
        self.predictor = ImageCredibilityPredictor()

    def analyze(self, image_url: str):
        if not image_url:
            return None

        try:
            response = requests.get(image_url, timeout=10)
            response.raise_for_status()
            
            prediction = self.predictor.predict(response.content)
            
            label = prediction["label"]
            prob_real = prediction["raw_prob_real"]
            
            reasons = []
            if label == "FAKE":
                reasons.append("Model detected synthetic artifacts in the pixel distribution.")
                reasons.append(f"AI Signal Strength: {round((1 - prob_real) * 100, 2)}%")
            else:
                reasons.append("Visual patterns align with natural photographic standards.")

            return {
                "label": label,
                "confidence": f"{round(prediction['confidence'] * 100, 2)}%",
                "probability_real": prob_real,
                "reasons": reasons
            }
        except Exception as e:
            return {"label": "ERROR", "reasons": [str(e)]}