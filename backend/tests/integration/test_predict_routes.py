"""
Integration Tests: Skin Lesion Prediction API
----------------------------------------------
Tests the /predict multipart POST endpoint, input validation,
and status code behavior.
"""

import io
import pytest


class TestPredictEndpoint:
    """Integration test suite for POST /predict."""

    def test_predict_success_with_valid_image(self, client, dummy_image_bytes, mocker):
        """
        Verify that uploading a valid JPEG image returns 200 OK
        with predicted disease, confidence, details, and metadata.
        """
        mock_result = {
            "predicted_disease": "mel",
            "confidence": "96",
            "disease_details": {
                "name": "Melanoma",
                "severity": "High",
                "description": "A serious form of skin cancer.",
            },
            "ensemble_models_used": ["resnet", "densenet", "efficientnet"],
            "filename": "clinical_scan.jpg",
            "message": "Image processed successfully",
        }
        mocker.patch(
            "app.predict_skin_disease",
            return_value=mock_result,
        )

        data = {
            "image": (dummy_image_bytes, "clinical_scan.jpg"),
        }

        response = client.post(
            "/predict",
            data=data,
            content_type="multipart/form-data",
        )

        assert response.status_code == 200
        json_data = response.get_json()
        assert json_data["predicted_disease"] == "mel"
        assert json_data["confidence"] == "96"
        assert json_data["disease_details"]["name"] == "Melanoma"
        assert json_data["filename"] == "clinical_scan.jpg"
        assert json_data["message"] == "Image processed successfully"

    def test_predict_missing_image_payload_returns_400(self, client):
        """Verify that requests missing the 'image' field return 400 Bad Request."""
        response = client.post(
            "/predict",
            data={},
            content_type="multipart/form-data",
        )

        assert response.status_code == 400
        json_data = response.get_json()
        assert json_data["error"] == "No image file provided"

    def test_predict_empty_filename_returns_400(self, client):
        """Verify that sending a file with an empty filename returns 400."""
        empty_file = (io.BytesIO(b"empty"), "")
        response = client.post(
            "/predict",
            data={"image": empty_file},
            content_type="multipart/form-data",
        )

        assert response.status_code == 400
        json_data = response.get_json()
        assert json_data["error"] == "No selected file"

    def test_predict_invalid_image_returns_400(self, client, mocker):
        """Verify that ValueError during preprocessing returns 400."""
        mocker.patch(
            "app.predict_skin_disease",
            side_effect=ValueError("Invalid or unreadable image file."),
        )

        corrupt_file = (io.BytesIO(b"not_an_image"), "corrupt.jpg")
        response = client.post(
            "/predict",
            data={"image": corrupt_file},
            content_type="multipart/form-data",
        )

        assert response.status_code == 400
        json_data = response.get_json()
        assert "Invalid or unreadable image file." in json_data["error"]

    def test_predict_model_missing_returns_503(self, client, dummy_image_bytes, mocker):
        """Verify that FileNotFoundError when weights are missing returns 503."""
        mocker.patch(
            "app.predict_skin_disease",
            side_effect=FileNotFoundError("No AI model weights found"),
        )

        data = {"image": (dummy_image_bytes, "scan.jpg")}
        response = client.post(
            "/predict",
            data=data,
            content_type="multipart/form-data",
        )

        assert response.status_code == 503
        json_data = response.get_json()
        assert "No AI model weights found" in json_data["error"]
