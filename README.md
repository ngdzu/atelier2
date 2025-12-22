# Atelier 2 Portal

Monorepo for the LuxeNail salon portal, including the client web app, VS Code task portal tooling, static site generator, and new server API scaffold.

## Apps & Packages

- `client/` – React/Vite frontend
- `task-portal/` – VS Code extension + parser for task registry
- `static-site/` – Static site generator
- `server/` – Express/TypeScript API (added for TASK-OPS-003)

## Getting Started

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### Docker

See [DOCKER.md](DOCKER.md) for running client, server, and Postgres together.

## Scripts (top-level)

- Docker: use root `docker-compose.yml` for development, `docker-compose.prod.yml` for production.

## Task Registry

Task definitions live under `.tasks/` with the generated registry at `.tasks/TASK_REGISTRY.json`.
