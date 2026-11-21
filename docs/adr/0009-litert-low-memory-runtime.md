# 0009. LiteRT Runtime over Full TensorFlow for Zero-OOM Inference

## Status
Accepted

## Context
Even after converting all neural network models to `.tflite` format (ADR 0004), importing the standard `tensorflow` Python package into the backend still loaded massive C++ shared libraries and CUDA detection routines into memory. 

This baseline package overhead created critical runtime problems on free-tier cloud containers (Render) with a strict 512 MB RAM limit:
- The `tensorflow` package alone consumed nearly 1.5 GB of disk space.
- Simply importing `import tensorflow as tf` caused the container's baseline memory to sit at 450–480 MB before serving a single user request.
- Under multi-request traffic or sequential inference, container memory breached 512 MB, triggering immediate `SIGKILL 137` (Out Of Memory) container restarts.

## Decision
Uninstall the monolithic `tensorflow` pip package from the backend serving environment and replace it with Google's dedicated, lightweight inference runtime: **`ai-edge-litert` (LiteRT)**.

## Consequences
- **Positive**: Base container memory dropped from ~480 MB to **~140 MB**, leaving over 350 MB of safe memory headroom below the 512 MB ceiling.
- **Positive**: Python dependency size shrunk from ~1.5 GB to **~50 MB**, speeding up Docker build and container deployment times.
- **Positive**: Zero loss in inference accuracy—LiteRT runs the exact same `.tflite` quantized flatbuffers with identical probability vectors and predictions.
- **Positive**: OOM container crashes (`SIGKILL 137`) on free-tier hosting are completely eliminated.
- **Negative**: LiteRT is an inference-only engine; training and model conversion must be performed in the standalone `ml_engine` environment.
