# Docker Setup Guide

This guide explains how to build, run, and deploy the LuxeNail salon website using Docker.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

## Quick Start

### Development Environment

Start the development environment with hot reload for client, server, and database:

```
docker-compose up client server database
```

- Client: http://localhost:5174
- Server: http://localhost:3000/health
- Postgres: localhost:5432 (user: postgres, password: postgres, db: atelier2)

### Production Environment

Build and run the production environment:

```
docker-compose -f docker-compose.prod.yml build client server
docker-compose -f docker-compose.prod.yml up -d client server database
```

- Client: http://localhost:80
- Server: http://localhost:3000/health (reachable on host; internal DNS: http://server:3000)

## Environment Variables

### Development

Create a `.env.local` file in the `client/` directory:

```env
GEMINI_API_KEY=your_api_key_here
VITE_HOST=0.0.0.0
VITE_PORT=5174
```

Create a `.env` file in the `server/` directory (copy from `.env.example`):

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@database:5432/atelier2
CLIENT_URL=http://localhost:5174
```

### Production

Set environment variables in `docker-compose.prod.yml` or use Docker secrets:

```yaml
environment:
  - NODE_ENV=production
  - DATABASE_URL=${DATABASE_URL}
  - CLIENT_URL=${CLIENT_URL}
```

Recommended values:
- `CLIENT_URL=http://localhost`
- `PORT=3000`

## Docker Commands

### Build Images

```
docker-compose build client server
docker-compose -f docker-compose.prod.yml build client server
```

### Run Containers

```
# Development (foreground)
docker-compose up client server database

# Development (detached)
docker-compose up -d client server database

# Production
docker-compose -f docker-compose.prod.yml up -d client server database
```

### View Logs

```
docker-compose logs -f client

docker-compose logs -f server

docker-compose logs -f database
```

### Stop Containers

```
docker-compose down

docker-compose -f docker-compose.prod.yml down
```

### Clean Up

```
docker-compose down -v

docker-compose down --rmi all
```

## Project Structure

```
.
├── client/
│   ├── Dockerfile          # Production Dockerfile
│   ├── Dockerfile.dev      # Development Dockerfile
│   ├── .dockerignore       # Files to exclude from build
│   └── nginx.conf          # Nginx configuration for production
├── server/
│   ├── Dockerfile          # Production Dockerfile
│   ├── Dockerfile.dev      # Development Dockerfile
│   ├── .dockerignore       # Files to exclude from build
│   └── README.md           # Server setup and usage
├── docker-compose.yml      # Development configuration
├── docker-compose.prod.yml # Production configuration
└── .dockerignore           # Root-level ignore file
```

## Architecture

### Development

- Client: React/Vite application on port 5174
- Server: Express/TypeORM API on port 3000
- Database: PostgreSQL 16-alpine on port 5432
- Network: `app-network` bridge network

### Production

- Client: Static assets served by nginx on port 80
- Server: Express/TypeORM API on port 3000 (exposed for testing)
- Database: PostgreSQL 16-alpine (internal only)
- Network: `app-network` bridge network

## Health Checks

- Client: nginx health via `docker-compose -f docker-compose.prod.yml ps`
- Server: `/health` endpoint
- Database: `pg_isready` check

## Troubleshooting

- Ports already in use: `lsof -i :5174`, `lsof -i :3000`, or `lsof -i :5432`
- Container keeps restarting: `docker-compose logs -f <service>`
- Build fails: `docker-compose build --no-cache <service>`
- Hot reload issues: `docker-compose config` to verify volume mounts

Ensure volumes are properly mounted:
```bash
docker-compose config
```

## Security

- Containers run as non-root users when possible
- Secrets should be passed via environment variables, not hardcoded
- Regular security scans: `docker scan <image-name>`
- Keep base images updated

## Performance

- Production images use multi-stage builds for smaller size
- Static assets are cached by nginx
- Resource limits are set in production compose file

## Future Microservices

When adding microservices:

1. Create service in `services/` directory
2. Add Dockerfile following patterns in `services/README.md`
3. Add service to docker-compose files
4. Configure networking and dependencies
5. Add health checks and resource limits

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Vite Documentation](https://vitejs.dev/)
- [Nginx Documentation](https://nginx.org/en/docs/)

