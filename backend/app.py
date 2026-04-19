# backend/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# the verify endpoint lives under backend/routes/verify.py
from backend.routes.verify import router as verify_router

app = FastAPI(title="ACAS Privacy Agent Backend")

# allow CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# the router defines its own path; to avoid double prefixing change
# endpoint to root or adjust call in frontend accordingly
app.include_router(verify_router, prefix="/verify")

@app.get("/")
def root():
    return {"status": "Backend running"}
