# Development Guide

How to run the project on your own machine. You do not need any of this to view the project, since a [hosted demo](DEPLOYMENT.md) is available.

## Prerequisites

- **Python** 3.10+ (3.12 or 3.13 recommended)
- **Node.js** 18+ (20 recommended) and `npm`
- **Docker and Docker Compose** (optional)

## Setup

### 1. Clone

```bash
git clone https://github.com/Purvesh-PJ/skin_disease_detection.git
cd skin_disease_detection
```

### 2. Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
# Windows:      .\venv\Scripts\activate
# Linux/macOS:  source venv/bin/activate

pip install -r requirements.txt

# Start the API (model checkpoints download automatically on first run)
python main.py
```

The API runs at http://localhost:5000. Health check: http://localhost:5000/health

### 3. Frontend

In a new terminal:

```bash
cd frontend
npm install
npm start          # Vite dev server
npm run build      # Optimized production bundle in dist/
```

The app opens at http://localhost:3000.

### 4. Docker (optional)

See [Deployment](DEPLOYMENT.md#docker).

## Scripts (repo root)

| Command | What it does |
| :-- | :-- |
| `npm test` | Runs backend and frontend tests |
| `npm run lint` | Frontend linting and design-system checks |
| `npm run ml:prepare` | Prepare the HAM10000 dataset (see [ML Pipeline](ML_PIPELINE.md)) |
| `npm run ml:verify` | Check dataset and environment readiness |
| `npm run docker:build` | Build the ML engine image with live logs |
| `npm run docker:status` | Show Docker image sizes and build status |

Test commands are listed in [Testing](TESTING.md).

## Linting

```bash
npm run lint             # frontend linting and design-system checks
npm run lint:frontend    # frontend ESLint only
```

The frontend ESLint config (`frontend/.eslintrc.json`) requires the shared design-system primitives (`Button`, `Input`, `Badge`, `Alert`, `Dropdown`) instead of ad-hoc markup.