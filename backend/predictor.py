"""
Skin Lesion Predictor (Sequential TFLite Ensemble Inference)
------------------------------------------------------------
Pure inference module:
1. Preprocesses dermatoscopic image via OpenCV.
2. Runs ResNet-101, DenseNet-121, and EfficientNet-B3 sequentially via TFLite Interpreter.
3. Cleans memory with explicit garbage collection between invocations to keep RAM < 120MB.
4. Performs soft-voting consensus across all active architectures.
"""

import os
import gc
import time
import logging
import warnings
import numpy as np
import tensorflow as tf
import cv2

try:
    from constants import (
        IDX2CLASS,
        USER_FRIENDLY_MAPPING,
        TARGET_IMAGE_SIZE,
        MODEL_DEFINITIONS
    )
except ImportError:
    from backend.constants import (
        IDX2CLASS,
        USER_FRIENDLY_MAPPING,
        TARGET_IMAGE_SIZE,
        MODEL_DEFINITIONS
    )

# Silence TensorFlow & Lite warnings
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
warnings.filterwarnings("ignore", category=UserWarning)

logger = logging.getLogger(__name__)

# Base path resolution for models
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(BACKEND_DIR, ".."))


def get_model_directory() -> str:
    """Resolves local model directory from environment or standard repo paths."""
    env_dir = os.getenv("MODEL_DIR")
    if env_dir:
        return env_dir

    candidate_paths = [
        os.path.join(REPO_ROOT, "trained_models"),
        os.path.join(BACKEND_DIR, "trained_models"),
    ]
    for path in candidate_paths:
        if os.path.exists(path):
            return path
    return os.path.join(BACKEND_DIR, "trained_models")


def preprocess_image(image_bytes: bytes, target_size=TARGET_IMAGE_SIZE) -> np.ndarray:
    """Decodes raw image bytes, converts BGR to RGB, resizes, and normalizes."""
    file_bytes = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Invalid or unreadable image file.")

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, target_size)

    # EfficientNet-style normalization: map [0, 255] to [-1, 1] or appropriate scale
    image = tf.keras.applications.efficientnet.preprocess_input(image)
    image = np.expand_dims(image, axis=0).astype(np.float32)
    return image


def run_single_tflite_model(model_path: str, preprocessed_image: np.ndarray) -> np.ndarray:
    """Executes inference on a single TFLite flatbuffer and cleans up memory immediately."""
    interpreter = tf.lite.Interpreter(model_path=model_path)
    try:
        interpreter.allocate_tensors()
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        interpreter.set_tensor(input_details[0]['index'], preprocessed_image)
        interpreter.invoke()

        predictions = interpreter.get_tensor(output_details[0]['index'])[0]
        return predictions
    finally:
        del interpreter
        gc.collect()


def predict_skin_disease(image_bytes: bytes, filename: str = "uploaded_image.jpg") -> dict:
    """
    Executes sequential ensemble prediction across available TFLite models.
    Produces consensus classification with confidence percentage and clinical details.
    """
    start_time = time.time()
    model_dir = get_model_directory()
    preprocessed_image = preprocess_image(image_bytes)

    predictions = {}
    for name, fname in MODEL_DEFINITIONS.items():
        model_path = os.path.join(model_dir, fname)
        if not os.path.exists(model_path):
            logger.warning(f"[INFERENCE] Model file for {name} not found at {model_path}. Skipping.")
            continue

        try:
            pred = run_single_tflite_model(model_path, preprocessed_image)
            predictions[name] = pred
            logger.info(f"[INFERENCE] Completed {name} prediction.")
        except Exception as err:
            logger.error(f"[INFERENCE] Failed inference for {name}: {err}")

    if not predictions:
        raise FileNotFoundError(
            f"No AI model weights found in {model_dir}. Ensure TFLite models exist on disk."
        )

    # Soft-Voting Consensus: Average probabilities across all contributing models
    avg_probs = np.mean(list(predictions.values()), axis=0)
    predicted_idx = int(np.argmax(avg_probs))
    predicted_label = IDX2CLASS.get(predicted_idx, str(predicted_idx))
    disease_details = USER_FRIENDLY_MAPPING.get(predicted_label, {
        "name": predicted_label,
        "severity": "Unknown",
        "description": "No description available."
    })

    # Confidence score: max confidence across the models for consensus class
    max_confidence = max(pred[predicted_idx] for pred in predictions.values())
    confidence_percent = f"{int(round(max_confidence * 100))}"
    duration = time.time() - start_time

    logger.info(
        f"[CONSENSUS] Disease: {predicted_label} | "
        f"Confidence: {confidence_percent}% | "
        f"Time: {duration:.2f}s | "
        f"Models: {list(predictions.keys())}"
    )

    return {
        "predicted_disease": predicted_label,
        "confidence": confidence_percent,
        "disease_details": disease_details,
        "ensemble_models_used": list(predictions.keys()),
        "filename": filename,
        "message": "Image processed successfully"
    }
