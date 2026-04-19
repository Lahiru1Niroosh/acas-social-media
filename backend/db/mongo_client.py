import os
from pathlib import Path
from pymongo import MongoClient

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

env_path = Path(__file__).resolve().parents[1] / "config" / ".env"
if load_dotenv and env_path.exists():
    load_dotenv(str(env_path))
elif load_dotenv:
    load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "acas_db")

if not MONGO_URI:
    raise RuntimeError(
        "MONGO_URI environment variable is not set. "
        "Ensure backend/config/.env exists or set it in your environment."
    )

client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

# ✅ Separated collections (professional logging)
tweets_raw = db["tweets_raw"]          # original tweet + user
pii_audit = db["pii_audit"]            # raw user + masked user
agent_runs = db["agent_runs"]          # each agent input/output
final_results = db["final_results"]    # final verdict + xai
analysis_logs = db["analysis_logs"]    # optional (kept for compatibility)