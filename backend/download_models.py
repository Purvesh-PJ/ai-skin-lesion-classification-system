"""
Model Weights Pre-baking Utility
--------------------------------
Used exclusively during Docker build step to download and verify all 3 TFLite
model weights from Hugging Face Model Hub directly into the container filesystem.
Ensures zero runtime network calls, eliminating cold-start timeouts.
"""

import os
import sys
import shutil
import urllib.request
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

MODELS = {
    'resnet101.tflite': 'https://huggingface.co/purvesh-pj/skin-disease-ensemble/resolve/main/resnet101.tflite',
    'densenet121.tflite': 'https://huggingface.co/purvesh-pj/skin-disease-ensemble/resolve/main/densenet121.tflite',
    'efficientnetb3.tflite': 'https://huggingface.co/purvesh-pj/skin-disease-ensemble/resolve/main/efficientnetb3.tflite'
}

EXPECTED_MIN_SIZES_BYTES = {
    'resnet101.tflite': 40 * 1024 * 1024,      # ~43.8 MB
    'densenet121.tflite': 7 * 1024 * 1024,     # ~7.7 MB
    'efficientnetb3.tflite': 12 * 1024 * 1024  # ~12.7 MB
}

def get_target_dir() -> str:
    return os.getenv('MODEL_DIR', '/app/trained_models')

HEADERS = {'User-Agent': 'SkinDiseaseDetection-DockerBuilder/1.0'}


def download_models(target_directory: str = None):
    target_dir = target_directory or get_target_dir()
    os.makedirs(target_dir, exist_ok=True)
    logger.info(f"Target model directory: {target_dir}")

    for filename, url in MODELS.items():
        destination = os.path.join(target_dir, filename)
        min_size = EXPECTED_MIN_SIZES_BYTES.get(filename, 1000000)

        # Check existing cached file
        if os.path.exists(destination) and os.path.getsize(destination) >= min_size:
            size_mb = os.path.getsize(destination) / (1024 * 1024)
            logger.info(f"[CACHE HIT] {filename} already present and valid ({size_mb:.2f} MB). Skipping.")
            continue

        logger.info(f"[DOWNLOAD] Streaming {filename} from Hugging Face...")
        req = urllib.request.Request(url, headers=HEADERS)

        # Download with retry mechanism (up to 3 retries)
        download_success = False
        for attempt in range(1, 4):
            try:
                temp_destination = destination + ".tmp"
                with urllib.request.urlopen(req, timeout=120) as resp, open(temp_destination, 'wb') as out_f:
                    shutil.copyfileobj(resp, out_f, length=16 * 1024 * 1024)

                downloaded_size = os.path.getsize(temp_destination)
                if downloaded_size < min_size:
                    raise IOError(f"Downloaded file incomplete ({downloaded_size} bytes < expected {min_size} bytes)")

                # Atomic replace
                shutil.move(temp_destination, destination)
                size_mb = downloaded_size / (1024 * 1024)
                logger.info(f"[SUCCESS] {filename} verified and saved ({size_mb:.2f} MB)")
                download_success = True
                break
            except Exception as e:
                logger.warning(f"[RETRY {attempt}/3] Download failed for {filename}: {e}")
                if os.path.exists(destination + ".tmp"):
                    try:
                        os.remove(destination + ".tmp")
                    except Exception:
                        pass

        if not download_success:
            logger.error(f"[FATAL] Failed to download {filename} after 3 attempts.")
            sys.exit(1)

    logger.info("All 3 TFLite models pre-baked and verified successfully.")


if __name__ == '__main__':
    download_models()
