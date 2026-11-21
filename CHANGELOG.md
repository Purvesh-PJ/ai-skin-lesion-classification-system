# Changelog

Notable changes to this project, newest first.

## [Unreleased]

## [3.0.1-test] - 2026-11-22

### Added
- Automated release pipeline verification test.

### Changed
- Verified end-to-end changelog extraction and draft publishing.

## [3.0.0] - 2026-11-21

### Added
- Interactive landing showcase with dedicated modular sections detailing the 3 CNN backbones, 7 disease classes, dataset metrics, and clinical limitations.
- Server cold-start feedback with real-time wake-up pings and visual status indicators to handle free-tier cloud hosting spin-ups gracefully.
- Shared design-system primitives (`Button`, `Input`, `Badge`, `Alert`, `Dropdown`) enforced across all views using custom ESLint AST rules.
- Colocated Vitest suites, expanding the full-stack automated test suite to 79 tests (30 Backend, 41 Frontend, 8 ML).
- Architecture decision records 0009 to 0012 and restructured modular documentation across 8 dedicated guides.

### Changed
- Migrated frontend build tooling from Create React App (`react-scripts`) and Webpack to Vite 8 for fast sub-second development startup and optimized production builds.
- Migrated frontend test runner from Jest to Vitest, running all 41 component and integration tests in under 4 seconds.
- Reorganized frontend into a Feature-First modular architecture (`src/features/`) where each domain module (`history`, `image-picker`, `prediction`, `system-health`) owns its components, hooks, and tests.
- Replaced the heavy TensorFlow dependency with Google LiteRT (`ai-edge-litert`), reducing peak memory below 150 MB and eliminating Render out-of-memory crashes (`SIGKILL 137`).
- Streamlined backend serving architecture into a clean, flat design (`app.py`, `predictor.py`, `constants.py`), removing over 700 lines of over-engineered boilerplate.
- Pre-baked quantized `.tflite` model files directly into the production Docker image, eliminating runtime remote downloads on container startup.

### Removed
- Deprecated `react-scripts`, Webpack configuration, and redundant `App.js` wrapper.
- Heavy TensorFlow Python dependency from the production microservice.
- Over-engineered backend abstractions (`app/core`, `app/inference`, `app/services`).
- Dead styling tokens, unused theme files, and ad-hoc HTML input/button markup.

## [2.1.0] - 2026-11-03

### Added
- Automated tests for the backend (pytest), frontend (Jest), and ML code, plus a GitHub Actions workflow that runs them on every push.
- Modular ML training pipeline with a command-line tool to train one model or the full ensemble.
- Export of trained models to quantized TensorFlow Lite files.
- Docker environment for ML training, set up so training never starts by accident.
- Commands to prepare the HAM10000 dataset and check it is ready before training.
- Architecture decision records 0006 to 0008.

### Changed
- Dataset setup is now a simple browser download instead of a Kaggle API token.
- Frontend Docker image upgraded to Node 20.

### Removed
- Unused legacy scripts.

## [2.0.0] - 2026-11-01

### Added
- Diagnostic Studio opens directly from the landing page, with no login.
- Scan history saved in the browser (`localStorage`), so it works without a server.
- Models download automatically from Hugging Face on first launch.

### Changed
- Backend is now a stateless, lightweight service (under 200 MB of RAM at the time).

### Removed
- MongoDB, user accounts, and JWT authentication, along with the login and sign-up screens.

## [1.0.0] - 2026-10-15

### Added
- First release: an ensemble of ResNet-101, DenseNet-121, and EfficientNet-B3 trained on HAM10000, combined by soft voting.
- React app with a scan dashboard and a sample picker.
- Flask API with quantized TensorFlow Lite inference.