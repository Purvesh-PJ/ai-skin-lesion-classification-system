# ML Pipeline

How the HAM10000 dataset is prepared, how the ensemble models are trained, and how they are exported to quantized flatbuffers.

## Contents

1. [Dataset setup](#1-dataset-setup)
2. [Automated preparation](#2-automated-preparation)
3. [Readiness verification](#3-readiness-verification)
4. [Training models](#4-training-models)
5. [TFLite quantization export](#5-tflite-quantization-export)

---

## 1. Dataset setup

The models train on the **HAM10000** dataset (10,015 dermatoscopic images across 7 diagnostic categories).

1. Download the dataset from [Kaggle HAM10000](https://www.kaggle.com/datasets/kmader/skin-cancer-mnist-ham10000) (approx. 2.6 GB).
2. Extract the downloaded archive files into:
   ```text
   ml_engine/data/raw/
   ```

No API keys or cloud tokens are required.

---

## 2. Automated preparation

Run the preparation script to unpack images, map lesion metadata, and partition the dataset into stratified splits (80% train, 10% validation, 10% test) across all 7 diagnostic classes:

```bash
# Using root npm shortcut:
npm run ml:prepare

# Or directly with python in active venv:
python ml_engine/pipeline/prepare_dataset.py

# Or via Docker:
docker compose run --rm ml-engine python ml_engine/pipeline/prepare_dataset.py
```

> **Tip:** Running dataset preparation natively on your host OS takes ~30 seconds because it writes directly to disk without container filesystem overhead.

---

## 3. Readiness verification

To safely inspect the environment and verify that all 10,015 images and dependencies are in place (without triggering training):

```bash
# Using root shortcut:
npm run ml:verify

# Or via Docker:
docker compose run --rm ml-engine python ml_engine/scripts/verify_dataset_readiness.py
```

---

## 4. Training models

### Option A: Docker (Recommended — Zero Host Setup)

Run training inside an isolated container ([ADR 0008](adr/0008-containerized-ml-training-engine.md)):

```bash
# 1. Build the ML training image:
docker compose build ml-engine
# Or with live streaming logs:
npm run docker:build

# 2. Train a single architecture (e.g. ResNet-101):
docker compose run --rm ml-engine python ml_engine/run_pipeline.py --model resnet101 --epochs 20

# 3. Train the full 3-model ensemble and export quantized models:
docker compose run --rm ml-engine python ml_engine/run_pipeline.py --model ensemble --epochs 15
```

Trained checkpoints (`.h5` and `.tflite`) are saved to the host `trained_models/` directory via volume mounts.

### Option B: Native Host Environment

```bash
cd ml_engine

# 1. Create and activate a virtual environment
python -m venv venv_ml
# Windows:      .\venv_ml\Scripts\activate
# Linux/macOS:  source venv_ml/bin/activate

# 2. Install ML dependencies
pip install -r requirements.txt

# 3. Run training CLI
python run_pipeline.py --model resnet101 --epochs 20
python run_pipeline.py --model ensemble --epochs 15
```

---

## 5. TFLite quantization export

The pipeline automatically converts trained Keras `.h5` models into lightweight `.tflite` flatbuffers using Dynamic Range Quantization ([ADR 0007](adr/0007-automated-local-ml-training-and-quantization.md)):

- `resnet101_quantized.tflite` (~43.8 MB)
- `densenet121_quantized.tflite` (~7.7 MB)
- `efficientnetb3_quantized.tflite` (~12.7 MB)

Quantization can also be executed standalone using `ml_engine/export/tflite.py` or via Section 5 in `ml_engine/notebooks/02_model_training_and_evaluation.ipynb`.
