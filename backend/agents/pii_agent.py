#agents/pii_agent.py
import uuid
from datetime import datetime
from backend.db.mongo_client import pii_audit

class PIIAgent:
    """
    Must run FIRST.
    Masks ONLY user metadata (not tweet text/image).
    """

    def mask_user_metadata(self, user: dict, request_id: str) -> dict:
        masked_user = {
            "masked_id": f"USER_{uuid.uuid4().hex[:8]}",   # ✅ frontend expects masked_id
            "original_user_id": user.get("id"),
            "username": "[MASKED]",
            "name": "[MASKED]",
            "location": "[MASKED]",
            "profile_image": "[MASKED]"
        }

        pii_audit.insert_one({
            "request_id": request_id,
            "user_raw": user,
            "user_masked": masked_user,
            "masked_fields": ["username", "name", "location", "profile_image"],
            "created_at": datetime.utcnow()
        })

        return masked_user