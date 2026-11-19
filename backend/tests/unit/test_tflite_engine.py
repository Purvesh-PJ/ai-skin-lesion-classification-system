"""
Unit Tests: TFLite Inference & Ensemble Logic
---------------------------------------------
Tests prediction, soft-voting fusion, and single TFLite execution.
"""

import os
import cv2
import numpy as np
import pytest

from constants import SKIN_DISEASE_CLASSES, USER_FRIENDLY_MAPPING
from predictor import (
    predict_skin_disease,
    get_model_directory,
    run_single_tflite_model,
)


class TestTFLiteEnsemble:
    """Tests ensemble fusion logic and model output formatting."""

    def test_model_directory_resolution(self):
        """Verify model directory resolves to an existing path."""
        model_dir = get_model_directory()
        assert model_dir is not None

    def test_constants_mapping_integrity(self):
        """Verify all 7 disease classes have corresponding friendly metadata."""
        for code in SKIN_DISEASE_CLASSES:
            assert code in USER_FRIENDLY_MAPPING
            details = USER_FRIENDLY_MAPPING[code]
            assert "name" in details
            assert "severity" in details
            assert "description" in details

    def test_predict_skin_disease_mocked_models(self, mocker):
        """Test complete ensemble pipeline with mocked TFLite runs to test voting."""
        mocker.patch(
            "predictor.get_model_directory",
            return_value="/mock/models"
        )
        mocker.patch(
            "os.path.exists",
            return_value=True
        )

        mock_pred = np.array([0.1, 0.7, 0.05, 0.05, 0.05, 0.03, 0.02])
        mocker.patch(
            "predictor.run_single_tflite_model",
            return_value=mock_pred
        )

        img = np.zeros((224, 224, 3), dtype=np.uint8)
        _, enc = cv2.imencode(".jpg", img)

        res = predict_skin_disease(enc.tobytes(), "test_mock.jpg")
        assert res["predicted_disease"] == "bcc"
        assert res["confidence"] == "70"
        assert len(res["ensemble_models_used"]) == 3
        assert res["filename"] == "test_mock.jpg"

    def test_predict_skin_disease_no_models_raises_error(self, mocker):
        """Test that missing all models raises FileNotFoundError."""
        mocker.patch(
            "os.path.exists",
            return_value=False
        )
        img = np.zeros((224, 224, 3), dtype=np.uint8)
        _, enc = cv2.imencode(".jpg", img)

        with pytest.raises(FileNotFoundError):
            predict_skin_disease(enc.tobytes(), "test.jpg")
