# Polyrepo Architecture Guide

**Document Version:** 1.0  
**Date:** 2025-01-24  
**Status:** Active  
**Related Documents:** 
- [Development Workflow](../../.cursor/rules/development.mdc)
- [Project Rules](../../.cursor/rules/rules.mdc)

## Table of Contents

1. [Overview](#overview)
2. [What is a Polyrepo?](#what-is-a-polyrepo)
3. [When to Use Polyrepos](#when-to-use-polyrepos)
4. [Polyrepo vs Monorepo](#polyrepo-vs-monorepo)
5. [Recommended Structure](#recommended-structure)
6. [AI Agent Workflow Considerations](#ai-agent-workflow-considerations)
7. [Code Sharing Strategies](#code-sharing-strategies)
8. [Implementation Guidelines](#implementation-guidelines)
9. [Best Practices](#best-practices)
10. [Migration Guide](#migration-guide)

---

## Overview

This document outlines the polyrepo (multi-repository) architecture approach for the LuxeNail project. A polyrepo structure uses separate Git repositories for different services, applications, or domains, providing clear boundaries and isolation between components.

### Current Decision

**Architecture:** Polyrepo (Multi-Repository)

**Rationale:**
- Multiple AI agents working in parallel
- Reduced merge conflicts
- Clear service boundaries
- Independent versioning and deployment
- Better isolation for debugging and rollbacks

---

## What is a Polyrepo?

A **polyrepo** (also called multi-repo) architecture maintains separate Git repositories for each service, application, or domain. Each repository is independently versioned, deployed, and maintained.

### Structure Example

```
atelier2-client/              # Separate repository: Frontend
atelier2-api/                 # Separate repository: Backend API
atelier2-admin/               # Separate repository: Admin Dashboard
atelier2-shared-types/        # Separate repository: Shared types (optional)
```

Each repository:
- Has its own Git history
- Has its own CI/CD pipeline
- Can be versioned independently
- Has its own deployment schedule
- Owned by specific teams or agents

---

## When to Use Polyrepos

### Ideal Scenarios

✅ **Use polyrepos when:**

1. **Multiple Teams/Services:**
   - Different teams own different services
   - Services have independent release cycles
   - Teams need autonomy over their repositories

2. **Independent Deployment:**
   - Services deploy on different schedules
   - Services scale independently
   - Different infrastructure requirements

3. **AI Agent Workflows:**
   - Multiple AI agents work in parallel
   - Need to avoid merge conflicts
   - Require clear boundaries between agents
   - Want isolated development cycles

4. **Fine-Grained Access Control:**
   - Different security requirements per service
   - Need repository-level permissions
   - Compliance requirements for code separation

5. **Large Scale:**
   - 20+ developers working across services
   - Multiple independent domains
   - Services that rarely change together

### Not Ideal When

❌ **Avoid polyrepos when:**

- Small team (1-5 developers)
- Services are tightly coupled
- Frequent cross-service changes
- Need to share code frequently
- Want atomic commits across services
- Prefer simpler local development setup

---

## Polyrepo vs Monorepo

### Comparison Matrix

| Factor | Polyrepo | Monorepo |
|--------|----------|----------|
| **Team Size** | Large (>20) | Small-Medium (<20) |
| **Merge Conflicts** | Minimal (separate repos) | Higher risk (shared files) |
| **Code Sharing** | Requires packages/API | Easy (same repo) |
| **Deployment** | Independent | Coordinated |
| **Access Control** | Granular (per repo) | Repository-wide |
| **Local Setup** | More complex | Simpler |
| **Build Times** | Faster per service | Can be slower (larger scope) |
| **Refactoring** | Harder across repos | Easier (shared context) |
| **Type Safety** | Requires generation/sync | Direct (shared types) |
| **AI Agent Isolation** | Excellent | Requires coordination |
| **Versioning** | Independent | Shared |

### Decision Criteria

Choose **polyrepo** if you prioritize:
- Isolation between services
- Independent deployment
- AI agent workflows
- Team autonomy
- Granular access control

Choose **monorepo** if you prioritize:
- Code sharing
- Atomic commits
- Simpler local development
- Tightly coupled services
- Unified tooling

---

## Recommended Structure

### Repository Organization

```
atelier2-client/                    # Repository 1: Public Website
├── src/
│   ├── components/
│   ├── services/
│   ├── types/
│   └── App.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── Dockerfile
└── README.md

atelier2-api/                       # Repository 2: Backend API
├── src/
│   ├── calendar/
│   ├── customers/
│   ├── common/
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md

atelier2-admin/                     # Repository 3: Admin Dashboard (future)
├── src/
├── package.json
└── README.md

atelier2-shared-types/              # Repository 4: Shared Types (optional)
├── src/
│   └── api-contracts.ts
├── package.json
└── README.md
```

### Directory Structure Per Repository

Each repository follows standard project structure:

```
<repository-name>/
├── src/                    # Source code
├── tests/                  # Tests
├── docs/                   # Documentation
├── .github/                # GitHub workflows
│   └── workflows/
├── Dockerfile              # Docker configuration
├── .dockerignore
├── .env.example           # Environment variables template
├── .gitignore
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── README.md              # Repository documentation
└── CHANGELOG.md           # Version history
```

---

## AI Agent Workflow Considerations

### Why Polyrepos Are Better for AI Agents

When multiple AI agents work in parallel, polyrepos provide significant advantages:

#### 1. **True Isolation**

Each agent works in a completely separate repository:
- No file-level conflicts
- No merge conflicts
- Clear ownership boundaries
- Independent git history

```
Agent 1: Working in atelier2-client/
Agent 2: Working in atelier2-api/
Agent 3: Working in atelier2-admin/

→ No conflicts possible!
```

#### 2. **Parallel Development**

All agents can work simultaneously without coordination:

```
Terminal 1: AI Agent (Frontend)
$ cd atelier2-client
$ # Agent makes changes, commits, pushes

Terminal 2: AI Agent (Backend)
$ cd atelier2-api
$ # Agent makes changes, commits, pushes

→ Both work independently, no merge conflicts
```

#### 3. **Clearer Context**

AI agents see only relevant code:
- Smaller codebase per repository
- Better use of context window
- Less confusion about what to change
- Focused scope of work

#### 4. **Easier Debugging**

When something breaks:
- Clear which repository is affected
- Easier to identify which agent introduced the issue
- Isolated rollback (only affect one repo)
- Simpler git history to review

### AI Agent Workflow Best Practices

1. **Assign Clear Ownership:**
   ```
   Agent 1 → atelier2-client (frontend features)
   Agent 2 → atelier2-api (backend endpoints)
   Agent 3 → atelier2-admin (admin dashboard)
   ```

2. **Use API Contracts:**
   - API agent defines OpenAPI/Swagger spec
   - Client agent generates types from spec
   - Clear contract prevents conflicts

3. **Coordinate Breaking Changes:**
   - Version API contracts
   - Document breaking changes
   - Update client when ready

4. **Independent Branches:**
   - Each agent works on feature branches
   - No need to coordinate merges
   - Independent pull request workflows

---

## Code Sharing Strategies

### Challenge: Sharing Code Across Repositories

In a polyrepo, code sharing requires explicit strategies:

### Strategy 1: API Contract Generation (Recommended)

**Approach:** Generate client types from API OpenAPI specification

```yaml
# atelier2-api/openapi.yaml
paths:
  /api/calendar/appointments:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AppointmentResponse'
components:
  schemas:
    AppointmentResponse:
      type: object
      properties:
        id:
          type: string
          format: uuid
        startTime:
          type: string
          format: date-time
```

**Client generates types:**

```bash
# atelier2-client/
npm install openapi-typescript openapi-fetch

# Generate types from API spec
npm run generate-api-types
```

```typescript
// Generated: src/types/api.ts
export interface AppointmentResponse {
  id: string;
  startTime: string;
  // ... auto-generated from OpenAPI spec
}
```

**Benefits:**
- ✅ Single source of truth (API spec)
- ✅ Always in sync
- ✅ No manual type maintenance
- ✅ Type-safe API calls

### Strategy 2: Published npm Package

**Approach:** Publish shared types as npm package

```json
// atelier2-shared-types/package.json
{
  "name": "@atelier2/shared-types",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

```typescript
// atelier2-shared-types/src/api-contracts.ts
export interface AppointmentResponse {
  id: string;
  startTime: string;
}
```

**Usage:**

```json
// atelier2-client/package.json
{
  "dependencies": {
    "@atelier2/shared-types": "^1.0.0"
  }
}
```

```typescript
// atelier2-client/src/services/api.ts
import { AppointmentResponse } from '@atelier2/shared-types';
```

**Benefits:**
- ✅ Versioned shared code
- ✅ Can be used by multiple clients
- ✅ Clear dependency management
- ✅ Can be published to private npm registry

**Trade-offs:**
- ⚠️ Requires publishing/updating package
- ⚠️ Need to manage versions
- ⚠️ Slight overhead for simple types

### Strategy 3: Git Submodules (Not Recommended)

**Approach:** Include shared code as git submodule

```bash
# atelier2-client/
git submodule add https://github.com/atelier2/shared-types.git packages/shared
```

**Why Not Recommended:**
- ❌ Complex to manage
- ❌ Submodule updates require manual steps
- ❌ Can cause confusion
- ❌ Harder for AI agents to understand

### Recommended Approach for This Project

**Use Strategy 1: API Contract Generation**

1. API repository maintains OpenAPI specification
2. Client repositories generate types from API spec
3. Shared types package for common utilities (if needed)

**Implementation:**

```bash
# atelier2-api/
npm install @nestjs/swagger

# Generate OpenAPI spec
npm run build:api-docs
# → outputs: openapi.yaml
```

```bash
# atelier2-client/
npm install openapi-typescript openapi-fetch

# package.json
{
  "scripts": {
    "generate-api-types": "openapi-typescript http://localhost:3000/api-docs > src/types/api.ts"
  }
}
```

---

## Implementation Guidelines

### Step 1: Repository Setup

Create separate repositories:

```bash
# Create repositories
mkdir atelier2-client && cd atelier2-client
git init
# ... setup frontend code

mkdir atelier2-api && cd atelier2-api
git init
# ... setup backend code
```

### Step 2: Shared Configuration

Each repository should have:

1. **Consistent Tooling:**
   - Same Node.js version (`.nvmrc`)
   - Similar ESLint/Prettier configs
   - Consistent TypeScript config

2. **CI/CD Pipelines:**
   - Separate GitHub Actions workflows
   - Independent build/deploy processes
   - Repository-specific tests

3. **Documentation:**
   - README.md in each repo
   - Clear setup instructions
   - API documentation (for API repo)

### Step 3: API Contract Definition

**In `atelier2-api/`:**

```typescript
// src/main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Atelier2 API')
  .setDescription('API for LuxeNail salon management')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
```

**Generate OpenAPI spec:**
```bash
npm run build:api-docs > openapi.yaml
```

### Step 4: Client Type Generation

**In `atelier2-client/`:**

```json
// package.json
{
  "scripts": {
    "generate-api-types": "openapi-typescript http://api-server/api-docs > src/types/api.ts",
    "prebuild": "npm run generate-api-types"
  },
  "devDependencies": {
    "openapi-typescript": "^6.0.0"
  }
}
```

**Generate types before development:**
```bash
npm run generate-api-types
```

### Step 5: Development Workflow

**Local Development:**

```bash
# Terminal 1: API
cd atelier2-api
npm install
npm run dev

# Terminal 2: Client
cd atelier2-client
npm install
npm run generate-api-types  # Pull latest API types
npm run dev
```

**Docker Compose (Optional):**

```yaml
# docker-compose.yml (in project root or separate repo)
version: '3.8'
services:
  api:
    build: ./atelier2-api
    ports:
      - "3000:3000"
  
  client:
    build: ./atelier2-client
    ports:
      - "5173:5173"
    depends_on:
      - api
```

---

## Best Practices

### 1. Clear Repository Boundaries

**Define ownership:**
- `atelier2-client`: Frontend UI, user interactions
- `atelier2-api`: Backend logic, database, business rules
- `atelier2-admin`: Admin dashboard (if separate)

**Avoid overlaps:**
- ❌ Don't duplicate business logic in client
- ❌ Don't put UI code in API repo
- ✅ Keep clear separation of concerns

### 2. API-First Development

**Define contracts first:**
1. Design API endpoints (OpenAPI spec)
2. Generate client types
3. Implement API
4. Implement client

**Benefits:**
- Clear contracts prevent conflicts
- Parallel development possible
- Type safety from the start

### 3. Version Management

**API Versioning:**
```
/api/v1/calendar/appointments
/api/v2/calendar/appointments  # Breaking changes
```

**Shared Package Versioning:**
```
@atelier2/shared-types@1.0.0
@atelier2/shared-types@1.1.0  # New types
@atelier2/shared-types@2.0.0  # Breaking changes
```

### 4. Independent CI/CD

Each repository has its own pipeline:

```yaml
# .github/workflows/ci.yml (in each repo)
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
```

### 5. Documentation Standards

**Each repository should have:**

1. **README.md:**
   - What the repository contains
   - Setup instructions
   - Development workflow
   - Dependencies

2. **API Documentation:**
   - OpenAPI/Swagger spec (for API repo)
   - Endpoint descriptions
   - Authentication requirements

3. **CHANGELOG.md:**
   - Version history
   - Breaking changes
   - Migration guides

### 6. Dependency Management

**Keep dependencies consistent:**
- Use `.nvmrc` for Node.js version
- Document major dependencies
- Keep security updates in sync
- Use Dependabot for updates

### 7. Environment Variables

**Separate `.env` files:**
```bash
# atelier2-api/.env
DATABASE_URL=postgresql://...
PORT=3000
JWT_SECRET=...

# atelier2-client/.env
VITE_API_URL=http://localhost:3000
VITE_API_KEY=...
```

**Document required variables:**
- `.env.example` in each repo
- Document in README.md

---

## Migration Guide

### From Monorepo to Polyrepo

If migrating from a monorepo structure:

#### Step 1: Identify Boundaries

Analyze current structure:
```
monorepo/
├── client/          → atelier2-client/
├── server/          → atelier2-api/
└── packages/        → atelier2-shared-types/
```

#### Step 2: Create New Repositories

```bash
# Create new repositories
mkdir atelier2-client && cd atelier2-client
git init

mkdir atelier2-api && cd atelier2-api
git init
```

#### Step 3: Move Code

```bash
# Copy code to new repositories
cp -r monorepo/client/* atelier2-client/
cp -r monorepo/server/* atelier2-api/
```

#### Step 4: Update Configuration

1. **Update package.json dependencies**
2. **Update import paths**
3. **Set up CI/CD pipelines**
4. **Update documentation**

#### Step 5: Set Up Type Generation

1. Configure OpenAPI in API repo
2. Set up type generation in client repo
3. Test type synchronization

#### Step 6: Archive Monorepo

```bash
# After migration complete
git tag v1.0.0-monorepo
# Archive or delete monorepo
```

### Preserving Git History (Optional)

To preserve git history when splitting:

```bash
# Use git filter-branch or git filter-repo
cd monorepo
git filter-branch --subdirectory-filter client -- --all
# Move to new repository
```

**Note:** This is complex and may not be necessary if starting fresh.

---

## Troubleshooting

### Common Issues

#### Issue: Types Out of Sync

**Problem:** Client types don't match API

**Solution:**
```bash
# In client repo
npm run generate-api-types
# Regenerate from latest API spec
```

#### Issue: Breaking Changes

**Problem:** API changes break client

**Solution:**
1. Version API endpoints (`/api/v2/...`)
2. Keep old version until client updated
3. Document migration path

#### Issue: Shared Code Duplication

**Problem:** Code duplicated across repos

**Solution:**
1. Extract to shared npm package
2. Or use API contract generation
3. Document shared patterns

#### Issue: Complex Local Setup

**Problem:** Hard to run all services locally

**Solution:**
1. Use Docker Compose
2. Provide setup scripts
3. Document dependencies

---

## Summary

### Key Takeaways

1. **Polyrepos provide isolation** - Perfect for AI agent workflows
2. **Use API contract generation** - Keep types in sync automatically
3. **Clear boundaries** - Each repository has specific purpose
4. **Independent deployment** - Services can deploy separately
5. **Version management** - Use semantic versioning for shared packages

### Decision Checklist

Use polyrepos if:
- ✅ Multiple AI agents working in parallel
- ✅ Services have independent release cycles
- ✅ Need to avoid merge conflicts
- ✅ Want clear service boundaries
- ✅ Large team or multiple teams

Use monorepo if:
- ✅ Small team
- ✅ Tightly coupled services
- ✅ Frequent cross-service changes
- ✅ Prefer simpler local development
- ✅ Want atomic commits across services

---

## Related Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
- [openapi-typescript](https://github.com/drwpow/openapi-typescript)
- [Git Submodules Documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

---

**Document History:**

- **v1.0** (2025-01-24): Initial polyrepo architecture guide created

