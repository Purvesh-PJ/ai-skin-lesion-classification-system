# 0010. Pre-Bake Model Weights into Backend Docker Image

## Status
Accepted

## Context
In earlier iterations, trained model weights were downloaded over the internet from Hugging Face Hub during container startup or upon receiving the first prediction request.

On cloud containers that sleep when idle (such as Render free-tier), this created significant friction:
- Every cold start suffered an extra 15 to 45 seconds of latency while downloading ~65 MB of model binaries.
- If Hugging Face Hub experienced transient network timeouts, rate-limiting, or downtime, the container failed to boot or returned 500 errors to users.
- Evaluating the diagnostic platform felt sluggish and unpredictable for doctors and reviewers.

## Decision
Pre-bake all three quantized `.tflite` model files (`resnet101.tflite`, `densenet121.tflite`, `efficientnetb3.tflite`) directly into the backend Docker image at `/app/trained_models/` during the image build phase.

## Consequences
- **Positive**: Completely eliminates external internet dependencies during container startup.
- **Positive**: Container startup is fast and reliable; models load straight from the local container filesystem in ~1 second.
- **Positive**: Diagnostic inference works reliably even in air-gapped or network-restricted runtime environments.
- **Negative**: Increases the final Docker image size by ~65 MB.
