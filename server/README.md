# Server (API) Service

Backend microservice providing API and health checks for the portal.

## Prerequisites

- Node.js 20+
- npm (pnpm migration tracked separately)
- Docker (optional for containerized runs)

## Local Setup

1. Copy environment file:
   ```bash
   cp .env.example .env
   ```
2. **Important**: Ensure PostgreSQL is running locally on port 5432, or update `DATABASE_URL` in `.env`. For Docker, change hostname from `localhost` to `database`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run in development (hot reload):
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   npm start
   ```
6. Run migrations (placeholder path):
   ```bash
   npm run db:migrate
   ```

## Environment Variables

- `NODE_ENV` (default: development)
- `PORT` (default: 3000)
- `DATABASE_URL` (required) e.g. `postgresql://postgres:postgres@localhost:5432/atelier2`
- `CLIENT_URL` (default: http://localhost:5174)

## Health Check

- `GET /health` returns status and verifies database connectivity.

## Docker

Development build and run:
```bash
docker-compose build server
docker-compose up server database
```

Production build and run:
```bash
docker-compose -f docker-compose.prod.yml build server
docker-compose -f docker-compose.prod.yml up -d server database
```

## Tech Stack

- Express + TypeScript
- TypeORM with PostgreSQL
- Helmet, CORS, dotenv for security/config
