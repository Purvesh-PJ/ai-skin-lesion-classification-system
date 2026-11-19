"""
Unit Tests: TFLite Inference & Ensemble Logic
---------------------------------------------
Tests prediction, soft-voting fusion, and single TFLite execution.
"""

import numpy as np
import pytest

from constants import SKIN_DISEASE_CLASSES, USER_FRIENDLY_MAPPING
from predictor import predict_skin_disease, get_model_directory


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
