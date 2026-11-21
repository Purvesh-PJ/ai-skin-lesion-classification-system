# Deployment

How and where the project is deployed.

## Overview

| Component | Platform | URL / Location | Notes |
| :-- | :-- | :-- | :-- |
| **Frontend** | Vercel | [Live App](https://skin-disease-detection.vercel.app) | React 18 + Vite SPA, output directory `dist/` |
| **Backend API** | Render | [API Health](https://skin-disease-detection-6kxm.onrender.com/health) | Containerized Flask app, 512 MB cgroup memory limit |
| **Model weights** | Hugging Face Hub / Docker | [Model Hub](https://huggingface.co/purvesh-pj/skin-disease-ensemble) | Pre-baked in Docker image, cached fallback from Hugging Face |

---

## 1. Frontend (Vercel)

The frontend is deployed on Vercel as a single-page application:
- Built with Vite (`npm run build`), outputting to `dist/`.
- Configured via `vercel.json` with route rewriting to `index.html` for client-side routing.
- Fast global CDN edge caching.

---

## 2. Backend API (Render)

The backend runs as a containerized web service on Render:
- Built using the multi-stage `backend/Dockerfile`.
- Served with Gunicorn running Flask under Python 3.12.
- Fits within Render's free-tier 512 MB memory limit using Google LiteRT (`ai-edge-litert`) and sequential model execution (<150 MB total RAM).
- Model flatbuffers are pre-baked directly into `/app/trained_models` at Docker build time ([ADR 0010](adr/0010-prebaked-model-weights-in-docker.md)).

---

## 3. Model Weights (Hugging Face)

Quantized `.tflite` model files are hosted on Hugging Face:
- Repo: `purvesh-pj/skin-disease-ensemble`
- ResNet-101 (`resnet101_quantized.tflite`, 43.8 MB)
- DenseNet-121 (`densenet121_quantized.tflite`, 7.7 MB)
- EfficientNet-B3 (`efficientnetb3_quantized.tflite`, 12.7 MB)

If running outside Docker without pre-baked files, the backend automatically downloads and caches them on first boot.

---

## 4. Docker (Local Full-Stack)<a id="docker"></a>

To run both frontend and backend locally with Docker Compose:

```bash
# Build and run backend and frontend containers
docker compose up -d backend frontend

# Check status
docker compose ps
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health endpoint: http://localhost:5000/health
