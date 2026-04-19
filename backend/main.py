# main.py
import os

# prevent TF from trying to use GPU/onednn on Windows CPU, which can hang
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from backend.pipeline.controller import PipelineController

app = FastAPI()

# enable CORS so that frontend at localhost:5173 (Vite dev server) can
# send requests, including preflight OPTIONS.  We allow all origins here
# for simplicity during development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# controller will be created during startup so model loading happens before
# any request handlers are invoked and we avoid doing heavy work at import time.
controller = None

@app.on_event("startup")
def startup_event():
    global controller
    # ensure model is initialized early
    from backend.models.image.predictor import load_model
    load_model()
    controller = PipelineController()


class User(BaseModel):
    username: str
    followers: int


class VerifyRequest(BaseModel):

    id: str
    text: str
    image: Optional[str] = None
    user: User


@app.post("/verify")
def verify_post(data: VerifyRequest):

    result = controller.process(
        post_id=data.id,
        text=data.text,
        image_url=data.image,
        user=data.user.dict()
    )

    return result