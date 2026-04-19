#agents/text_agent.py
from backend.models.text.predictor import TextCredibilityPredictor


class TextAgent:

    def __init__(self):
        print("Initializing TextAgent...")
        self.model = TextCredibilityPredictor()

    def analyze(self, text):

        result = self.model.predict(text)

        prediction = result["prediction"]
        confidence = result["confidence"]

        label = "FAKE" if prediction == 1 else "REAL"

        indicators = result["key_indicators"] or ["none"]

        reason = (
            f"Prediction {label} with {round(confidence*100,2)}% confidence. "
            f"Indicators: {', '.join(indicators)}."
        )

        return {
            "label": label,
            "confidence": round(confidence * 100, 2),
            "traditional_model": result["traditional_prediction"],
            "bert_model": result["bert_prediction"],
            "indicators": indicators,
            "reason": reason
        }