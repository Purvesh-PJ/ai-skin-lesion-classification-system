# Testing

The project has 79 automated tests across the backend, frontend, and ML engine. All commands run from the repo root and work on Windows, macOS, and Linux.

## Overview

| Suite | Tool | Tests | What it covers |
| :-- | :-- | :-: | :-- |
| **Backend** | pytest | 30 | Image preprocessing, model downloader, real LiteRT execution, Flask API error routing. **91% statement coverage.** |
| **Frontend** | Vitest + React Testing Library | 41 (10 suites) | Design-system primitives, Radix UI dialogs, image picker, prediction engine, backend health status context, history persistence in `localStorage`, routing, end-to-end diagnostic studio flow. |
| **ML engine** | pytest | 8 | Stratified dataset splits, generator tensor shapes, class-weight calculation, TFLite quantization export. |
| **Total** | | **79** | |

## Commands

```bash
# Run backend and frontend tests
npm test

# Same, with full coverage tables
npm run test:cov
```

### Run one suite

```bash
npm run test:backend        # backend tests
npm run test:backend:cov    # backend with coverage report

npm run test:frontend       # frontend tests (CI mode)
npm run test:frontend:cov   # frontend with coverage report

npm run test:ml             # ML engine tests
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs the test and build workflow on every push. The reasoning behind the testing setup is in [ADR 0006](adr/0006-testing-infrastructure-and-ci-cd.md).