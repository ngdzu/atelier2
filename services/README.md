# Microservices Directory

This directory contains microservices for the nail salon website application.

## Dockerfile Pattern for Microservices

Each microservice should follow this Dockerfile pattern:

### Production Dockerfile Pattern

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Builder (if build step needed)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy only production dependencies
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --chown=nodejs:nodejs package*.json ./

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

CMD ["node", "dist/index.js"]
```

### Development Dockerfile Pattern

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
```

## Best Practices

1. **Multi-stage builds**: Always use multi-stage builds for production
2. **Non-root user**: Run containers as non-root user (nodejs)
3. **Health checks**: Implement health checks for all services
4. **Resource limits**: Set appropriate resource limits in docker-compose.prod.yml
5. **Layer caching**: Order Dockerfile instructions for optimal caching
6. **Alpine Linux**: Use `node:20-alpine` for smaller images
7. **Security**: Never commit secrets, use environment variables

## Service Structure

Each microservice should have:
- `Dockerfile` - Production build
- `Dockerfile.dev` - Development build
- `.dockerignore` - Exclude unnecessary files
- `package.json` - Dependencies and scripts
- `src/` - Source code directory
- `healthcheck.js` - Health check script (optional)

## Adding a New Microservice

1. Create service directory: `services/my-service/`
2. Copy Dockerfile patterns from this README
3. Add service to `docker-compose.yml` and `docker-compose.prod.yml`
4. Configure networking and dependencies
5. Add health checks and resource limits

