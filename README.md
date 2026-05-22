# cloud-run-decoupled-images-js
This repository contains two independently deployable services:

- `frontend`: Static web app served by Nginx
- `backend`: Node.js API for status and message endpoints

## Goal

Candidates should:

1. Build both Docker images
2. Push both images to Artifactory
3. Deploy `frontend` and `backend` independently to Cloud Run
4. Configure the frontend to call the deployed backend URL so the site works end to end

## Suggested tasks for candidates

- Build backend image from `backend/Dockerfile`
- Build frontend image from `frontend/Dockerfile`
- Push both images to your container registry / Artifactory
- Deploy backend to Cloud Run and note the backend service URL
- Deploy frontend to Cloud Run with `API_BASE_URL` pointing to the backend URL
- Verify `/healthz` on the backend and UI rendering on the frontend

## Cloud Run notes

- Both containers listen on the `PORT` environment variable
- Backend is stateless and suitable for Cloud Run
- Frontend injects `API_BASE_URL` at container startup via Nginx entrypoint templating
- Deploy frontend only after you know the backend URL, or update and redeploy frontend later

## Example local commands

### Backend

```bash
cd backend
docker build -t backend:local .
docker run --rm -p 8080:8080 backend:local
```

### Frontend

```bash
cd frontend
docker build -t frontend:local .
docker run --rm -p 8081:8080 -e API_BASE_URL=http://localhost:8080 frontend:local
```

## Expected behavior

- Frontend loads a simple operations dashboard page
- Frontend calls backend `/api/message`
- Backend returns service metadata and timestamp
- UI shows success when frontend can reach backend
