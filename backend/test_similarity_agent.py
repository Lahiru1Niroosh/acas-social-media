import os
import sys

# when executed as a script the working directory becomes 'backend',
# which means importing `backend` fails.  Add parent directory to sys.path
# so the package root is visible.
root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if root not in sys.path:
    sys.path.insert(0, root)

from backend.agents.similarity_agent import SimilarityAgent


def test_text_only():

    print("\nTEST 1 — TEXT ONLY")

    agent = SimilarityAgent()

    text_result = {
        "label": "FAKE",
        "confidence": 97.51,
        "traditional_model": 1,
        "bert_model": 1,
        "indicators": ["none"],
        "reason": "Prediction FAKE with 97.51% confidence."
    }

    result = agent.analyze(
        text="Aliens landed in Colombo yesterday",
        image_url=None,
        text_result=text_result,
        image_result=None
    )

    print(result)


def test_image_only():

    print("\nTEST 2 — IMAGE ONLY")

    agent = SimilarityAgent()

    image_result = {
        "label": "REAL",
        "confidence": "98.0%",
        "probability_real": 0.98,
        "reasons": [
            "Image features align with natural photographic patterns."
        ]
    }

    result = agent.analyze(
        text=None,
        image_url="https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        text_result=None,
        image_result=image_result
    )

    print(result)


def test_text_image_match():

    print("\nTEST 3 — TEXT + IMAGE (MATCH)")

    agent = SimilarityAgent()

    text_result = {
        "label": "REAL",
        "confidence": 88.0,
        "reason": "No misinformation patterns detected."
    }

    image_result = {
        "label": "REAL",
        "confidence": "95%",
        "probability_real": 0.95,
        "reasons": [
            "Image features align with natural photography."
        ]
    }

    result = agent.analyze(
        text="A beautiful mountain landscape with a lake",
        image_url="https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        text_result=text_result,
        image_result=image_result
    )

    print(result)


def test_text_image_mismatch():

    print("\nTEST 4 — TEXT + IMAGE (MISMATCH)")

    agent = SimilarityAgent()

    text_result = {
        "label": "REAL",
        "confidence": 90.0,
        "reason": "Claim appears factual."
    }

    image_result = {
        "label": "REAL",
        "confidence": "94%",
        "probability_real": 0.94,
        "reasons": [
            "Image features align with natural photography."
        ]
    }

    result = agent.analyze(
        text="A shark swimming on a flooded highway",
        image_url="https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg",
        text_result=text_result,
        image_result=image_result
    )

    print(result)


if __name__ == "__main__":

    test_text_only()

    test_image_only()

    test_text_image_match()

    test_text_image_mismatch()