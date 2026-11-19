"""
Unit Tests: Image Preprocessing Pipeline
----------------------------------------
Tests image loading, format normalization, resizing, and error handling
in backend.predictor.
"""

import cv2
import numpy as np
import pytest

from constants import TARGET_IMAGE_SIZE
from predictor import preprocess_image


class TestImagePreprocessing:
    """Test suite for image decoding, validation, and tensor transformation."""

    def test_preprocess_valid_image(self):
        """
        Verify that valid image bytes are decoded, converted to RGB, resized to (224, 224),
        normalized, and returned as a 4D batch tensor.
        """
        img_data = np.full((300, 400, 3), 128, dtype=np.uint8)
        _, encoded = cv2.imencode(".jpg", img_data)

        tensor = preprocess_image(encoded.tobytes())

        assert isinstance(tensor, np.ndarray)
        assert tensor.shape == (1, TARGET_IMAGE_SIZE[0], TARGET_IMAGE_SIZE[1], 3)
        assert tensor.size > 0
        assert tensor.ndim == 4

    def test_preprocess_invalid_bytes_raises_error(self):
        """Verify that invalid corrupted bytes raise ValueError."""
        with pytest.raises(ValueError) as excinfo:
            preprocess_image(b"not_an_image_data")
        assert "Invalid or unreadable" in str(excinfo.value)
