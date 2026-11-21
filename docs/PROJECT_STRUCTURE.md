# Project Structure

```text
skin_disease_detection/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions: test and build
├── backend/
│   ├── app/
│   │   ├── core/               # Configuration, constants, domain exceptions
│   │   ├── inference/          # LiteRT inference engine and model downloader
│   │   ├── routes/             # REST endpoints (health, predict)
│   │   └── services/           # Prediction service and image preprocessing
│   ├── tests/
│   │   ├── unit/               # Preprocessing, ensemble, downloader
│   │   └── integration/        # /health and /predict endpoints
│   ├── Dockerfile              # Production multi-stage build, models pre-baked
│   ├── main.py                 # Flask app factory and entry point
│   ├── requirements.txt        # Production dependencies (Flask, ai-edge-litert, opencv)
│   ├── requirements-dev.txt    # pytest, pytest-cov, pytest-mock
│   └── pytest.ini              # Test discovery and execution config
├── frontend/
│   ├── public/                 # Static assets, icons, screenshots
│   ├── src/
│   │   ├── components/         # Design-system primitives (Button, Input, Alert, Badge) and layout
│   │   ├── config/             # Environment config and API base URLs
│   │   ├── constants/          # App-wide constants and clinical mappings
│   │   ├── context/            # Theme context provider
│   │   ├── features/           # Domain features
│   │   │   ├── history/        # Scan history persistence, formatters, audit components
│   │   │   ├── image-picker/   # HAM10000 sample selector, drag-and-drop, validation
│   │   │   ├── prediction/     # Prediction service, results card, confidence gauges, state views
│   │   │   └── system-health/  # Backend status context and liveness indicators
│   │   ├── lib/                # Shared utilities and Axios client
│   │   ├── pages/              # Landing, Dashboard, NotFound
│   │   ├── routes/             # Router configuration and navigation
│   │   ├── index.css           # Tailwind directives and theme tokens
│   │   ├── index.jsx           # DOM root mount point
│   │   └── setupTests.jsx      # Vitest and Testing Library setup
│   ├── .eslintrc.json          # ESLint config enforcing design-system primitives
│   ├── index.html              # Root HTML template for Vite
│   ├── vite.config.js          # Vite bundler, dev proxy, and Vitest config
│   └── package.json
├── ml_engine/
│   ├── Dockerfile              # ML training container
│   ├── architectures/          # ResNet, DenseNet, EfficientNet definitions
│   ├── pipeline/               # Training workflow (generators, trainer, evaluation)
│   ├── export/                 # Quantization to .tflite
│   ├── scripts/                # Dataset readiness verifier
│   ├── data/                   # HAM10000 dataset directory
│   ├── notebooks/              # EDA and experiments
│   └── run_pipeline.py         # CLI entry point for training and export
├── scripts/
│   ├── docker_manager.py       # Docker ML build runner
│   └── run_backend_tests.py    # Cross-platform test runner
├── docs/
│   └── adr/                    # Architecture Decision Records (0001 to 0012)
├── package.json                # Root test, lint, and Docker runner
└── README.md
```

## Frontend layout

The frontend follows a feature-first layout ([ADR 0011](adr/0011-feature-first-modular-monolith-architecture.md)): each folder under `src/features/` owns its own components, services, and tests.