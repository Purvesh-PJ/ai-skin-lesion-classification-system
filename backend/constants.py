"""
Constants & Clinical Metadata
-----------------------------
Single source of truth for disease categories, class indices, target sizes,
and user-facing clinical explanations for skin lesion classification.
"""

SKIN_DISEASE_CLASSES = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']

CLASS_INDICES = {cls: i for i, cls in enumerate(SKIN_DISEASE_CLASSES)}
IDX2CLASS = {v: k for k, v in CLASS_INDICES.items()}

TARGET_IMAGE_SIZE = (224, 224)

# Model definitions mapping identifier to filename
MODEL_DEFINITIONS = {
    "resnet": "resnet101.tflite",
    "densenet": "densenet121.tflite",
    "efficientnet": "efficientnetb3.tflite"
}

USER_FRIENDLY_MAPPING = {
    "akiec": {
        "name": "Actinic Keratoses",
        "severity": "Pre-Cancerous",
        "description": (
            "Actinic keratoses are rough, scaly patches on the skin caused by years of sun exposure. "
            "They can sometimes develop into skin cancer and should be monitored by a dermatologist."
        )
    },
    "bcc": {
        "name": "Basal Cell Carcinoma",
        "severity": "High",
        "description": (
            "Basal cell carcinoma is the most common type of skin cancer. It is usually slow-growing "
            "and rarely metastasizes, but professional evaluation is recommended."
        )
    },
    "bkl": {
        "name": "Benign Keratosis",
        "severity": "Benign",
        "description": (
            "Benign keratoses are non-cancerous skin growths. They are typically harmless, though any changes "
            "should be evaluated by a healthcare provider."
        )
    },
    "df": {
        "name": "Dermatofibroma",
        "severity": "Benign",
        "description": (
            "Dermatofibromas are benign skin nodules that generally do not require treatment unless they "
            "cause discomfort or cosmetic concerns."
        )
    },
    "mel": {
        "name": "Melanoma",
        "severity": "High",
        "description": (
            "Melanoma is a serious form of skin cancer that can be life-threatening if not detected early. "
            "Immediate consultation with a dermatologist is crucial."
        )
    },
    "nv": {
        "name": "Melanocytic Nevus",
        "severity": "Benign",
        "description": (
            "Melanocytic nevi (moles) are usually benign. However, any noticeable changes in size, shape, "
            "or color should be examined by a professional."
        )
    },
    "vasc": {
        "name": "Vascular Lesion",
        "severity": "Moderate",
        "description": (
            "Vascular lesions are abnormalities of the blood vessels. While often benign, they may require "
            "treatment if symptomatic or for cosmetic reasons."
        )
    }
}
