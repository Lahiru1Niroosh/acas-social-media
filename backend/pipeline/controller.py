from backend.agents.pii_agent import PIIAgent
from backend.agents.text_agent import TextAgent
from backend.agents.image_agent import ImageAgent
from backend.agents.similarity_agent import SimilarityAgent


class PipelineController:

    def __init__(self):

        print("Starting Pipeline Controller...")

        self.pii_agent = PIIAgent()
        self.text_agent = TextAgent()
        self.image_agent = ImageAgent()
        self.similarity_agent = SimilarityAgent()

        print("Pipeline Ready")

    def process(self, post_id, text, image_url, user):

        # ------------------------------------
        # 1️⃣ PII MASKING (FIRST STEP)
        # ------------------------------------

        masked_user = self.pii_agent.mask_user_metadata(user, post_id)

        # ------------------------------------
        # 2️⃣ TEXT ANALYSIS
        # ------------------------------------

        text_res = None

        if text:
            text_res = self.text_agent.analyze(text)

        # ------------------------------------
        # 3️⃣ IMAGE ANALYSIS
        # ------------------------------------

        image_res = None

        if image_url:

            try:
                image_res = self.image_agent.analyze(image_url)

            except Exception as exc:

                image_res = {
                    "label": "ERROR",
                    "confidence": "0%",
                    "reasons": [str(exc)]
                }

        # ------------------------------------
        # 4️⃣ SIMILARITY ANALYSIS
        # ------------------------------------

        similarity_res = self.similarity_agent.analyze(
            text=text,
            image_url=image_url,
            text_result=text_res,
            image_result=image_res
        )

        # ------------------------------------
        # 5️⃣ FINAL RESPONSE
        # ------------------------------------

        return {

            "post_id": post_id,

            "user": masked_user,   # masked user returned

            "text_analysis": text_res,

            "image_analysis": image_res,

            "similarity_analysis": similarity_res["similarity_analysis"],

            "final_prediction": similarity_res["final_prediction"],

            "explanation": similarity_res["explanation"]

        }