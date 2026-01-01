# Architecture Decisions

**Document Version:** 1.0  
**Date:** 2025-01-24  
**Status:** Active  
**Purpose:** Document key architecture decisions for the LuxeNail project

## Table of Contents

1. [Repository Structure](#repository-structure)
2. [Technology Stack](#technology-stack)
3. [Database](#database)
4. [Future Considerations](#future-considerations)

---

## Repository Structure

### Decision: Monorepo (Current)

**Status:** ✅ Active  
**Date:** 2025-01-24  
**Type:** Architecture Decision

### Current Structure

```
atelier2/
├── client/              # Frontend (React/Vite)
├── server/              # Backend (NestJS/Prisma)
├── services/            # Microservices (future)
├── doc/                 # Documentation
├── .tasks/              # Task files
└── docker-compose.yml   # Docker orchestration
```

### Rationale

**Why Monorepo Now:**
- ✅ Small project size (suitable for monorepo)
- ✅ Single team/developer
- ✅ Tightly coupled frontend and backend
- ✅ Easier local development setup
- ✅ Shared code and types without package publishing
- ✅ Atomic commits across services
- ✅ Simpler CI/CD pipeline

### Future Migration Plan

**Planned:** Migration to **Polyrepo** when project grows

**Migration Triggers:**
- Project scales to 20+ developers
- Multiple independent teams
- Services require independent deployment cycles
- Multiple AI agents need parallel development
- Services become truly decoupled domains

**Migration Strategy:**
- See [Polyrepo Architecture Guide](./ARCHITECTURE_POLYREPO.md) for detailed migration plan
- Plan to split into separate repositories:
  - `atelier2-client/` (Frontend)
  - `atelier2-api/` (Backend API)
  - `atelier2-admin/` (Admin Dashboard, if separate)
  - `atelier2-shared-types/` (Shared types package, if needed)

**When to Revisit:**
- Review decision when:
  - Team size exceeds 10 developers
  - Frequent merge conflicts occur
  - Services need independent release schedules
  - Codebase becomes difficult to navigate

---

## Technology Stack

### Backend

**Decision:** NestJS + Prisma + PostgreSQL

**Status:** ✅ Active  
**Date:** 2025-01-24

**Rationale:**
- NestJS: Stable framework with excellent dependency injection
- Prisma: Type-safe ORM with great developer experience
- PostgreSQL: Reliable relational database

**See:** [Calendar Architecture](./dashboard/calendar-apointment/CALENDAR_APPOINTMENT_ARCHITECTURE.md) for details

### Frontend

**Decision:** React 19+ + TypeScript + Vite

**Status:** ✅ Active

**Rationale:**
- React: Industry standard UI library
- TypeScript: Type safety
- Vite: Fast build tool and dev server

---

## Database

### Decision: PostgreSQL with Prisma ORM

**Status:** ✅ Active  
**Date:** 2025-01-24

**Rationale:**
- PostgreSQL: Robust relational database
- Prisma: Type-safe database client
- Excellent TypeScript support
- Automatic migration generation
- Prisma Studio for data management

**Schema Location:** `server/prisma/schema.prisma`

---

## Future Considerations

### Microservices Architecture

**Status:** 🔮 Future Consideration

**Current:** Monolithic backend in `server/` directory

**Future:** May split into microservices:
- Calendar/Appointment service
- Customer management service
- Notification service
- Analytics service

**Migration Triggers:**
- Services need independent scaling
- Different technology requirements per service
- Team structure requires service boundaries
- Performance requirements for specific services

### Polyrepo Migration

**Status:** 🔮 Planned (see [Repository Structure](#repository-structure))

**Reference:** [Polyrepo Architecture Guide](./ARCHITECTURE_POLYREPO.md)

---

## Decision Log

### 2025-01-24

- **Repository Structure:** Decided to use monorepo for current project size
- **Backend Framework:** Chose NestJS over Express.js
- **ORM:** Chose Prisma over TypeORM
- **Future Planning:** Documented polyrepo migration plan for when project scales

---

## Related Documents

- [Polyrepo Architecture Guide](./ARCHITECTURE_POLYREPO.md) - Future polyrepo structure
- [Calendar Architecture](./dashboard/calendar-apointment/CALENDAR_APPOINTMENT_ARCHITECTURE.md) - Feature-specific architecture
- [Development Workflow](../../.cursor/rules/development.mdc) - Development process

---

**Document History:**

- **v1.0** (2025-01-24): Initial architecture decisions document created

