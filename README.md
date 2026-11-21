# Skin Disease Detection

**A final-year college project: classifying dermatoscopic skin lesions into seven categories using an ensemble of three deep neural networks.**

[![College Project](https://img.shields.io/badge/Final%20Year-College%20Project-7c3aed.svg)](#about-this-project)
[![Purpose](https://img.shields.io/badge/Purpose-Academic%20Demonstration-64748b.svg)](#medical-disclaimer)
[![CI](https://github.com/Purvesh-PJ/skin_disease_detection/actions/workflows/ci.yml/badge.svg)](https://github.com/Purvesh-PJ/skin_disease_detection/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

![Landing page of the Skin Disease Detection app](frontend/public/screenshots/landing_hero.png)

## About this project

This is my final-year project (project phase) for my B.Tech in Computer Science. It is shared here for viewing and demonstration. A hosted demo is available if you just want to see it working, and if you would like to run it on your own machine, the steps are in the [Development Guide](docs/DEVELOPMENT.md).

- [Hosted demo](https://skin-disease-detection.vercel.app)
- [API health check](https://skin-disease-detection-6kxm.onrender.com/health)
- [Trained model files on Hugging Face](https://huggingface.co/purvesh-pj/skin-disease-ensemble)

## Medical disclaimer

This project was built for **academic and research demonstration only**. It is not a certified medical device and must not replace professional dermatological evaluation or biopsy.

## What the project covers

- **Machine learning:** three models (ResNet-101, DenseNet-121, EfficientNet-B3) trained on the HAM10000 dataset and combined by averaging their predictions.
- **Web application:** a React frontend and a Flask API that returns a predicted condition, a confidence score, and a risk level.
- **Engineering practice:** automated tests, a CI workflow, and written architecture decision records.

The seven conditions it distinguishes are melanoma, basal cell carcinoma, actinic keratoses, vascular lesions, benign keratosis-like lesions, dermatofibroma, and melanocytic nevi. Details are in [Models](docs/MODEL.md).

## Preview

| Diagnostic studio | Scan history | Sample picker |
| :---------------: | :----------: | :-----------: |
| ![Prediction dashboard](frontend/public/screenshots/dashboard_prediction.png) | ![History audit log](frontend/public/screenshots/history_audit.png) | ![HAM10000 sample selector](frontend/public/screenshots/sample_picker.png) |

## System design

```mermaid
flowchart LR
    A["React app<br/>upload image"] -->|"POST /predict"| B["Flask API<br/>validate + OpenCV preprocess"]
    B --> C["LiteRT models, one at a time<br/>ResNet-101, DenseNet-121, EfficientNet-B3"]
    C --> D["Soft voting<br/>average of 3 probability vectors"]
    D -->|"JSON result"| A
    A --> E[("Browser localStorage<br/>scan history")]
```

In short:

1. You upload a lesion image, or pick a sample image from the HAM10000 test set.
2. The backend resizes and normalizes the image, then runs it through the three models one after another.
3. The three predictions are averaged, and the most likely condition is shown with its confidence and risk level. Scan history is kept only in your browser.

The detailed system diagram, step-by-step request flow, and memory strategy are in [Architecture](docs/ARCHITECTURE.md).

## Tech stack

React 18, Vite, Tailwind CSS, Flask, Google LiteRT, OpenCV, TensorFlow/Keras, Docker, pytest, Vitest.

## Documentation

| Doc | What it covers |
| :-- | :------------- |
| [Architecture](docs/ARCHITECTURE.md) | How the system is structured and how a request flows through it |
| [Models](docs/MODEL.md) | The three networks, ensemble voting, and the seven classes |
| [API](docs/API.md) | Backend endpoints |
| [Deployment](docs/DEPLOYMENT.md) | Where each part is hosted |
| [Development Guide](docs/DEVELOPMENT.md) | Running the project locally |
| [Project Structure](docs/PROJECT_STRUCTURE.md) | Folder layout |
| [ML Pipeline](docs/ML_PIPELINE.md) | Dataset setup, training, and model export |
| [Testing](docs/TESTING.md) | Test suites and how to run them |
| [Decision Records](docs/adr/README.md) | Why key technical choices were made |

## License

[MIT](LICENSE) · Purvesh Jathade