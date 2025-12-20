# Docker Setup Guide

This guide explains how to build, run, and deploy the LuxeNail salon website using Docker.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

## Quick Start

### Development Environment

Start the development environment with hot reload:

```bash
docker-compose up client
```

The client will be available at `http://localhost:5173`

### Production Environment

Build and run the production environment:

```bash
docker-compose -f docker-compose.prod.yml build client
docker-compose -f docker-compose.prod.yml up client
```

The client will be available at `http://localhost:80`

## Environment Variables

### Development

Create a `.env.local` file in the `client/` directory:

```env
GEMINI_API_KEY=your_api_key_here
VITE_HOST=0.0.0.0
VITE_PORT=5173
```

### Production

Set environment variables in `docker-compose.prod.yml` or use Docker secrets:

```yaml
environment:
  - NODE_ENV=production
  - GEMINI_API_KEY=${GEMINI_API_KEY}
```

## Docker Commands

### Build Images

Build development image:
```bash
docker-compose build client
```

Build production image:
```bash
docker-compose -f docker-compose.prod.yml build client
```

### Run Containers

Start development environment:
```bash
docker-compose up client
```

Start in detached mode:
```bash
docker-compose up -d client
```

Start production environment:
```bash
docker-compose -f docker-compose.prod.yml up -d client
```

### View Logs

View client logs:
```bash
docker-compose logs -f client
```

### Stop Containers

Stop development environment:
```bash
docker-compose down
```

Stop production environment:
```bash
docker-compose -f docker-compose.prod.yml down
```

### Clean Up

Remove containers and volumes:
```bash
docker-compose down -v
```

Remove images:
```bash
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
├── docker-compose.yml      # Development configuration
├── docker-compose.prod.yml # Production configuration
└── .dockerignore           # Root-level ignore file
```

## Architecture

### Development

- **Client**: React/Vite application running in development mode
- **Port**: 5173 (Vite dev server)
- **Hot Reload**: Enabled via volume mounts
- **Network**: `app-network` bridge network

### Production

- **Client**: Static files served by nginx
- **Port**: 80
- **Build**: Multi-stage build with optimized static assets
- **Network**: `app-network` bridge network

## Health Checks

Production containers include health checks. Check container health:

```bash
docker-compose -f docker-compose.prod.yml ps
```

## Troubleshooting

### Port Already in Use

If port 5173 or 80 is already in use:

```bash
# Find process using port
lsof -i :5173
# or
lsof -i :80

# Kill process or change port in docker-compose.yml
```

### Container Keeps Restarting

Check logs for errors:
```bash
docker-compose logs client
```

### Build Fails

Clear Docker cache and rebuild:
```bash
docker-compose build --no-cache client
```

### Permission Issues

Ensure Docker has proper permissions:
```bash
sudo usermod -aG docker $USER
# Log out and log back in
```

### Hot Reload Not Working

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

