"""
Skin Disease Detection API
--------------------------
Lightweight, stateless Flask application serving dermatoscopic AI predictions.
Single entrypoint for health checks and multi-model ensemble inference.
"""

import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

try:
    from predictor import predict_skin_disease
except ImportError:
    from backend.predictor import predict_skin_disease

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s'
)
logger = logging.getLogger(__name__)

VERSION = "3.0.0"


def create_app(testing: bool = False) -> Flask:
    """Application factory for Flask API."""
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB maximum upload
    if testing:
        app.config['TESTING'] = True

    # Configure permissive CORS for web clients
    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=False,
        allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept"],
        methods=["GET", "POST", "OPTIONS"]
    )

    # -------------------------------------------------------------
    # Routes
    # -------------------------------------------------------------
    @app.route('/', methods=['GET'])
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint returning online status and service metadata."""
        return jsonify({
            "status": "online",
            "service": "Skin Disease Detection API",
            "version": VERSION
        }), 200

    @app.route('/predict', methods=['POST'])
    def predict():
        """
        Receives an uploaded dermatoscopic image, executes ensemble prediction,
        and returns diagnosis and clinical guidance.
        """
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        image_file = request.files['image']
        if not image_file or image_file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        try:
            image_bytes = image_file.read()
            if not image_bytes:
                return jsonify({"error": "Empty file uploaded"}), 400

            result = predict_skin_disease(image_bytes, filename=image_file.filename)
            return jsonify(result), 200

        except ValueError as val_err:
            logger.warning(f"Validation error: {val_err}")
            return jsonify({"error": str(val_err)}), 400
        except FileNotFoundError as fnf_err:
            logger.error(f"Model missing error: {fnf_err}")
            return jsonify({"error": str(fnf_err)}), 503
        except Exception as err:
            logger.exception("Unexpected error during image processing")
            return jsonify({"error": "Internal server error during inference"}), 500

    # -------------------------------------------------------------
    # Error Handlers
    # -------------------------------------------------------------
    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        return jsonify({
            "error": error.name,
            "message": error.description,
            "status": "error"
        }), error.code

    @app.errorhandler(Exception)
    def handle_generic_exception(error):
        logger.exception("Unhandled server error")
        return jsonify({
            "error": "internal_server_error",
            "message": "An unexpected server error occurred",
            "status": "error"
        }), 500

    return app


# Production application instance for Gunicorn / WSGI
app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
