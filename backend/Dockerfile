# Production Dockerfile for Skin Disease Detection API
FROM python:3.12-slim

# Prevent Python from writing bytecode and enable immediate unbuffered stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TF_CPP_MIN_LOG_LEVEL=3 \
    TF_ENABLE_ONEDNN_OPTS=0 \
    MODEL_DIR=/app/trained_models \
    PORT=5000 \
    GUNICORN_WORKERS=1 \
    GUNICORN_THREADS=2 \
    GUNICORN_TIMEOUT=120

# Install minimal OS dependencies required for OpenCV headless and networking
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies first (Docker layer cache optimization)
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -U pip setuptools wheel && \
    pip install --no-cache-dir -r /app/requirements.txt

# Copy backend application source files
COPY backend/ /app/

# Pre-bake TFLite model weights into image layer during build
# Ensures ZERO runtime network downloads, eliminating cold-start timeouts
RUN python -u /app/download_models.py

# Expose standard application port
EXPOSE 5000

# Container healthcheck against /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:${PORT:-5000}/health || exit 1

# Launch lightweight Gunicorn server
CMD ["sh", "-c", "gunicorn app:app --bind 0.0.0.0:${PORT:-5000} --workers ${GUNICORN_WORKERS:-1} --threads ${GUNICORN_THREADS:-2} --timeout ${GUNICORN_TIMEOUT:-120} --access-logfile - --error-logfile -"]
