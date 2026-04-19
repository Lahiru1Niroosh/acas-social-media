# AI Social Media Credibility Analyzer (ACAS)

## 📌 Overview
This system detects fake or real social media posts using a multi-agent AI architecture.

## 🧠 System Architecture
- PII Agent (Privacy Layer)
- Text Analysis Agent
- Image Analysis Agent
- Similarity Agent (CLIP + OCR)

## 🔐 Privacy Feature
User metadata is anonymized using a PII Agent before analysis.

## ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload