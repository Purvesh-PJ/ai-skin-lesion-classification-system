# API

The backend is a stateless Flask REST API. It stores nothing about the images it receives.

## Endpoints

| Method | Endpoint | Auth | Description |
| :-: | :-- | :-: | :-- |
| `GET` | `/` | None | Service liveness probe, environment, and API status |
| `GET` | `/health` | None | Health status, memory diagnostics, and model availability |
| `POST` | `/predict` | None | Upload a lesion image for ensemble prediction |

## `POST /predict`

**Request:** `multipart/form-data` with the lesion image as the uploaded file.

**Response:** a JSON diagnosis containing:

- the predicted condition (code and readable name)
- the confidence percentage
- the risk level
- the list of models that contributed

The image is deleted from the server as soon as the response is prepared. See [Architecture](ARCHITECTURE.md#2-request-lifecycle) for the full request flow.

## Trying it

With the backend running locally ([Development Guide](DEVELOPMENT.md)):

```bash
curl http://localhost:5000/health
```