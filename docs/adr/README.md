# Architecture Decision Records (ADRs)

Key architectural decisions made during development based on real project constraints:

| ADR | Title | Decision | Status |
| :---: | :--- | :--- | :---: |
| [0001](0001-web-platform.md) | Web Platform over Desktop App | React + Flask instead of Tkinter `.exe` | Accepted |
| [0002](0002-transfer-learning.md) | Transfer Learning over Custom CNN | Pre-trained ImageNet backbones on HAM10000 | Accepted |
| [0003](0003-ensemble-voting.md) | Multi-Model Soft-Voting Ensemble | Average probability vectors across 3 models | Accepted |
| [0004](0004-tflite-low-memory.md) | TensorFlow Lite & Sequential Inference | TFLite flatbuffers + sequential execution for 512MB RAM | Accepted |
| [0005](0005-removed-mongodb.md) | Decouple MongoDB & Use Browser Storage | Remove MongoDB/auth, localStorage history, Hugging Face caching | Accepted |
| [0006](0006-testing-infrastructure-and-ci-cd.md) | Testing Infrastructure & CI/CD Gate | pytest + Jest, unified `npm test`, GitHub Actions CI pipeline | Accepted |
| [0007](0007-automated-local-ml-training-and-quantization.md) | Automated Local ML Training & TFLite Export | Dual-track notebook/CLI, dynamic quantization, automated verifier | Accepted |
| [0008](0008-containerized-ml-training-engine.md) | Containerized ML Training Engine via Docker | Dedicated ml_engine/Dockerfile & compose service for zero-setup training | Accepted |
| [0009](0009-litert-low-memory-runtime.md) | LiteRT Runtime over Full TensorFlow | Standalone `ai-edge-litert` for 150MB low-memory inference | Accepted |
| [0010](0010-prebaked-model-weights-in-docker.md) | Pre-Bake Model Weights into Docker Image | Direct filesystem weights instead of runtime remote download | Accepted |
| [0011](0011-feature-first-modular-monolith-architecture.md) | Feature-First Modular Monolith Architecture | Domain-driven features, UI primitives, test colocation | Accepted |
| [0012](0012-migrate-cra-to-vite-and-vitest.md) | Migrate from Create React App to Vite & Vitest | Vite ESM bundler, Vitest runner, standalone ESLint | Accepted |
