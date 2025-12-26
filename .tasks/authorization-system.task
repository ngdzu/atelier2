# Authorization System - Complete SDL Task Breakdown

This document contains all tasks for the complete Software Development Lifecycle (SDL) of the Authorization System, including requirements analysis, architecture, design, implementation, testing, documentation, and integration with other modules (calendar, dashboard, etc.).

## Task Overview

The authorization system provides role-based access control (RBAC) and permission management for the LuxeNail salon website. It integrates with all dashboard modules, calendar system, and other protected features.

### Task Phases

1. **Requirements Analysis** (TASK-DOC-014)
2. **Architecture and Design** (TASK-ARCH-004)
3. **Detailed Design** (TASK-DOC-015)
4. **Database Schema** (TASK-DB-008)
5. **Domain Layer Implementation** (TASK-API-007)
6. **Application Layer Implementation** (TASK-API-008)
7. **Infrastructure Layer Implementation** (TASK-API-009)
8. **Presentation Layer Implementation** (TASK-SEC-004)
9. **Integration with Calendar Module** (TASK-SEC-005)
10. **Integration with Dashboard Modules** (TASK-SEC-006)
11. **Testing Suite** (TASK-TEST-008)
12. **Documentation** (TASK-DOC-016)

---

## TASK-DOC-014: Authorization System Requirements Analysis

**Status:** PENDING
**Priority:** CRITICAL
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 8 hours
**Dependencies:** TASK-DOC-002, TASK-DOC-007
**Related Tasks:** TASK-ARCH-004, TASK-DOC-015

### Description

Conduct comprehensive requirements analysis for the authorization system including user roles, permissions, access control requirements, security requirements, integration points with calendar, dashboard, and other modules. This analysis will serve as the foundation for architecture and design work.

### Requirements / What to Do

#### Step 1: User Roles and Permissions Analysis
- [ ] Document all user roles (Owner, Manager, Admin, Receptionist/Cashier, Employee)
- [ ] Define permission matrix for each role
- [ ] Document role hierarchy and inheritance rules
- [ ] Identify permission granularity requirements (feature-level, action-level, data-level)
- [ ] Document special permissions and edge cases
- [ ] Define permission assignment and revocation rules

#### Step 2: Access Control Requirements
- [ ] Document authentication requirements (login, logout, session management)
- [ ] Define authorization requirements (route protection, API endpoint protection)
- [ ] Document resource-level access control requirements
- [ ] Define data filtering requirements (e.g., employees can only see their own appointments)
- [ ] Document multi-tenant considerations (if applicable)
- [ ] Define permission caching and performance requirements

#### Step 3: Integration Requirements
- [ ] Document integration requirements with Calendar module
  - Role-based calendar view permissions
  - Appointment creation/edit/delete permissions by role
  - Filter and search permissions
- [ ] Document integration requirements with Dashboard modules
  - Metrics and Analytics access by role
  - Promotions Management permissions
  - Content Editor permissions
  - Gallery Management permissions
  - Employee Management permissions
- [ ] Document integration requirements with Booking system
- [ ] Document API endpoint protection requirements
- [ ] Document frontend route protection requirements

#### Step 4: Security Requirements
- [ ] Document password policy requirements
- [ ] Define session timeout and token expiration requirements
- [ ] Document refresh token requirements
- [ ] Define password reset and recovery requirements
- [ ] Document account lockout and brute force protection
- [ ] Define audit logging requirements for authorization events
- [ ] Document security headers and CSRF protection requirements

#### Step 5: Non-Functional Requirements
- [ ] Document performance requirements (authorization check latency)
- [ ] Define scalability requirements (number of users, roles, permissions)
- [ ] Document availability requirements
- [ ] Define audit and compliance requirements
- [ ] Document error handling and user feedback requirements

#### Step 6: Use Cases and User Stories
- [ ] Create user stories for each role and permission scenario
- [ ] Document use cases for permission assignment
- [ ] Document use cases for role management
- [ ] Create use case diagrams
- [ ] Document edge cases and error scenarios

### Definition of Done (DoD)

- [ ] All user roles documented with complete permission matrix
- [ ] All integration points with calendar and dashboard modules documented
- [ ] Security requirements comprehensively documented
- [ ] Use cases and user stories created
- [ ] Requirements document reviewed and approved
- [ ] Requirements document saved to `doc/authorization/AUTHORIZATION_REQUIREMENTS.md`

### Verification Steps

1. **Review Requirements Document:**
   - Verify all roles are documented
   - Verify permission matrix is complete
   - Verify integration points are documented
   - Verify security requirements are comprehensive

2. **Stakeholder Review:**
   - Present requirements to stakeholders
   - Gather feedback and incorporate changes
   - Obtain sign-off on requirements

### Acceptance Criteria

- ✅ Complete requirements document exists
- ✅ All user roles and permissions are documented
- ✅ Integration requirements with calendar and dashboard are documented
- ✅ Security requirements are comprehensive
- ✅ Use cases and user stories are created
- ✅ Requirements are ready for architecture design phase

### Technical Details

**Files to Create:**
- `doc/authorization/AUTHORIZATION_REQUIREMENTS.md`

**Files to Reference:**
- `doc/DASHBOARD_REQUIREMENTS.md` (for role definitions)
- `doc/dashboard/calendar-apointment/CALENDAR_APPOINTMENT_REQUIREMENTS.md` (for calendar integration)

**Notes:**
- This task focuses on requirements analysis only - no implementation
- Should align with existing TASK-DOC-006 (Authentication and Authorization Design) but be more comprehensive
- Should reference DDD architecture principles

---

## TASK-ARCH-004: Authorization System Architecture and Design

**Status:** PENDING
**Priority:** CRITICAL
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 10 hours
**Dependencies:** TASK-DOC-014, TASK-ARCH-003
**Related Tasks:** TASK-DOC-015, TASK-API-007

### Description

Design the architecture for the authorization system following Domain-Driven Design (DDD) principles. This includes bounded context definition, domain model design, aggregate boundaries, repository interfaces, and integration architecture with calendar and dashboard modules.

### Requirements / What to Do

#### Step 1: Bounded Context Definition
- [ ] Define Authorization bounded context scope
- [ ] Document relationships with other bounded contexts (Dashboard, Booking, Calendar)
- [ ] Create context mapping diagram
- [ ] Define shared kernel components (if any)
- [ ] Document integration patterns (Customer-Supplier, Conformist, etc.)

#### Step 2: Domain Model Design
- [ ] Design User aggregate (root entity)
  - UserId value object
  - Email value object
  - PasswordHash value object
  - Role enum
  - Permissions collection
- [ ] Design Role aggregate (if separate from User)
  - RoleId value object
  - RoleName value object
  - Permissions collection
  - Role hierarchy
- [ ] Design Permission value object
  - PermissionId value object
  - Resource (e.g., "calendar", "dashboard.metrics")
  - Action (e.g., "read", "write", "delete")
  - Conditions (optional, for data-level permissions)
- [ ] Design Session aggregate
  - SessionId value object
  - UserId reference
  - AccessToken value object
  - RefreshToken value object
  - ExpirationDateTime value object
- [ ] Design AuditLog aggregate (for authorization events)
  - AuditLogId value object
  - UserId reference
  - Action (e.g., "login", "permission_denied", "role_changed")
  - Resource reference
  - Timestamp value object

#### Step 3: Aggregate Boundaries and Invariants
- [ ] Define User aggregate boundary and invariants
- [ ] Define Role aggregate boundary (if separate)
- [ ] Define Session aggregate boundary and invariants
- [ ] Document aggregate consistency rules
- [ ] Define transaction boundaries

#### Step 4: Domain Services Design
- [ ] Design AuthorizationService (domain service)
  - CheckPermission(user, resource, action)
  - CheckRole(user, role)
  - FilterDataByPermissions(user, data)
- [ ] Design PasswordService (domain service)
  - HashPassword(password)
  - VerifyPassword(password, hash)
  - ValidatePasswordPolicy(password)
- [ ] Design TokenService (domain service)
  - GenerateAccessToken(user)
  - GenerateRefreshToken(user)
  - ValidateToken(token)

#### Step 5: Repository Interfaces Design
- [ ] Design IUserRepository interface
  - findById(userId)
  - findByEmail(email)
  - save(user)
  - delete(userId)
- [ ] Design IRoleRepository interface (if separate)
  - findById(roleId)
  - findAll()
  - save(role)
- [ ] Design ISessionRepository interface
  - findByToken(token)
  - findByUserId(userId)
  - save(session)
  - delete(sessionId)
  - deleteExpired()
- [ ] Design IAuditLogRepository interface
  - save(auditLog)
  - findByUserId(userId, dateRange)
  - findByAction(action, dateRange)

#### Step 6: Integration Architecture Design
- [ ] Design authorization middleware for API endpoints
- [ ] Design route guard components for frontend
- [ ] Design permission checking hooks for React components
- [ ] Document integration points with Calendar module
  - Calendar view authorization
  - Appointment CRUD authorization
  - Filter/search authorization
- [ ] Document integration points with Dashboard modules
  - Metrics dashboard authorization
  - Promotions management authorization
  - Content editor authorization
  - Gallery management authorization
  - Employee management authorization
- [ ] Design permission caching strategy
- [ ] Design authorization event publishing (domain events)

#### Step 7: Security Architecture Design
- [ ] Design JWT token structure and claims
- [ ] Design refresh token rotation strategy
- [ ] Design password hashing strategy (bcrypt, Argon2)
- [ ] Design session management strategy
- [ ] Design CSRF protection strategy
- [ ] Design rate limiting for authentication endpoints
- [ ] Design audit logging architecture

### Definition of Done (DoD)

- [ ] Bounded context defined and documented
- [ ] Domain model designed with all aggregates and value objects
- [ ] Repository interfaces defined
- [ ] Domain services designed
- [ ] Integration architecture documented
- [ ] Security architecture designed
- [ ] Architecture diagrams created (Mermaid format)
- [ ] Architecture document saved to `doc/authorization/AUTHORIZATION_ARCHITECTURE.md`

### Verification Steps

1. **Architecture Review:**
   - Review architecture against DDD principles
   - Verify aggregate boundaries are correct
   - Verify integration points are well-defined
   - Review security architecture

2. **Team Review:**
   - Present architecture to team
   - Gather feedback
   - Update architecture based on feedback

### Acceptance Criteria

- ✅ Complete architecture document exists
- ✅ Domain model is well-designed following DDD principles
- ✅ Integration points with calendar and dashboard are defined
- ✅ Security architecture is comprehensive
- ✅ Architecture diagrams are created
- ✅ Architecture is ready for detailed design phase

### Technical Details

**Files to Create:**
- `doc/authorization/AUTHORIZATION_ARCHITECTURE.md`
- `doc/diagrams/authorization-architecture.mmd`
- `doc/diagrams/authorization-architecture.svg`
- `doc/diagrams/authorization-domain-model.mmd`
- `doc/diagrams/authorization-domain-model.svg`
- `doc/diagrams/authorization-integration.mmd`
- `doc/diagrams/authorization-integration.svg`

**Files to Reference:**
- `.cursor/rules/ddd.mdc` (DDD architecture guidelines)
- `doc/authorization/AUTHORIZATION_REQUIREMENTS.md` (from TASK-DOC-014)

**Dependencies:**
- DDD architecture principles from TASK-ARCH-003
- Requirements from TASK-DOC-014

**Notes:**
- Follow DDD layered architecture (Domain, Application, Infrastructure, Presentation)
- Consider performance implications of permission checking
- Design for scalability (many users, roles, permissions)

---

## TASK-DOC-015: Authorization System Detailed Design

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 12 hours
**Dependencies:** TASK-ARCH-004
**Related Tasks:** TASK-DB-008, TASK-API-007

### Description

Create detailed design documentation for the authorization system including class/component design, interface definitions, data flow diagrams, API design, and integration design. This detailed design will guide implementation work.

### Requirements / What to Do

#### Step 1: Domain Layer Detailed Design
- [ ] Design User entity class structure
  - Properties and types
  - Factory methods
  - Business methods (assignRole, revokePermission, etc.)
  - Invariants and validation
- [ ] Design Role entity class structure (if separate)
  - Properties and types
  - Factory methods
  - Business methods
- [ ] Design value objects
  - UserId, Email, PasswordHash, Role, Permission
  - Validation rules
  - Immutability patterns
- [ ] Design domain services
  - AuthorizationService interface and implementation details
  - PasswordService interface and implementation details
  - TokenService interface and implementation details
- [ ] Design repository interfaces
  - Method signatures
  - Return types
  - Error handling

#### Step 2: Application Layer Detailed Design
- [ ] Design use cases/application services
  - LoginUseCase
  - LogoutUseCase
  - RefreshTokenUseCase
  - CheckPermissionUseCase
  - AssignRoleUseCase
  - RevokePermissionUseCase
  - GetUserPermissionsUseCase
- [ ] Design DTOs
  - LoginRequest, LoginResponse
  - TokenResponse
  - PermissionDto
  - RoleDto
  - UserDto
- [ ] Design command/query objects (CQRS pattern)
  - LoginCommand
  - CheckPermissionQuery
  - AssignRoleCommand
- [ ] Design mappers
  - UserMapper (entity to DTO)
  - PermissionMapper
  - RoleMapper

#### Step 3: Infrastructure Layer Detailed Design
- [ ] Design repository implementations
  - UserRepository implementation details
  - SessionRepository implementation details
  - AuditLogRepository implementation details
- [ ] Design database entities (TypeORM/Prisma)
  - UserEntity
  - RoleEntity (if separate table)
  - PermissionEntity (if junction table)
  - SessionEntity
  - AuditLogEntity
- [ ] Design database mappers
  - Domain entity <-> DB entity mappers
- [ ] Design external service integrations
  - JWT token generation service
  - Password hashing service (bcrypt/Argon2)
  - Email service integration (for password reset)

#### Step 4: Presentation Layer Detailed Design
- [ ] Design API controllers
  - AuthController (login, logout, refresh)
  - PermissionController (check, assign, revoke)
  - RoleController (CRUD operations)
- [ ] Design API routes
  - Route definitions
  - Route parameters
  - Query parameters
- [ ] Design middleware
  - AuthenticationMiddleware (JWT validation)
  - AuthorizationMiddleware (permission checking)
  - RoleMiddleware (role checking)
- [ ] Design request/response DTOs
  - API request DTOs
  - API response DTOs
  - Validation schemas

#### Step 5: Frontend Integration Design
- [ ] Design AuthContext (React Context)
  - State structure
  - Methods (login, logout, checkPermission)
  - Provider component
- [ ] Design ProtectedRoute component
  - Props interface
  - Permission checking logic
  - Redirect logic
- [ ] Design useAuth hook
  - Return values
  - Methods
- [ ] Design usePermission hook
  - Permission checking logic
  - Caching strategy
- [ ] Design LoginPage component
  - Form structure
  - Validation
  - Error handling
- [ ] Design role-based UI components
  - Conditional rendering patterns
  - Permission-based component visibility

#### Step 6: Integration Design
- [ ] Design Calendar module integration
  - Calendar view authorization checks
  - Appointment CRUD authorization
  - Filter/search permission checks
  - Data filtering by permissions (e.g., employees see only their appointments)
- [ ] Design Dashboard modules integration
  - Metrics dashboard authorization
  - Promotions management authorization
  - Content editor authorization
  - Gallery management authorization
  - Employee management authorization
- [ ] Design API endpoint protection
  - Middleware application strategy
  - Permission checking at endpoint level
  - Error responses for unauthorized access
- [ ] Design data filtering strategy
  - How to filter data based on user permissions
  - Performance considerations
  - Caching strategy

#### Step 7: Data Flow Design
- [ ] Design authentication flow diagram
- [ ] Design authorization check flow diagram
- [ ] Design permission assignment flow diagram
- [ ] Design token refresh flow diagram
- [ ] Design integration flows with calendar and dashboard

### Definition of Done (DoD)

- [ ] All layers designed in detail (Domain, Application, Infrastructure, Presentation)
- [ ] All classes, interfaces, and components designed
- [ ] Integration points with calendar and dashboard designed
- [ ] Data flow diagrams created
- [ ] API design documented
- [ ] Frontend integration designed
- [ ] Detailed design document saved to `doc/authorization/AUTHORIZATION_DETAILED_DESIGN.md`

### Verification Steps

1. **Design Review:**
   - Review design against architecture
   - Verify all layers are designed
   - Verify integration points are designed
   - Check for consistency

2. **Implementation Readiness:**
   - Verify design is detailed enough for implementation
   - Verify all interfaces are defined
   - Verify data structures are defined

### Acceptance Criteria

- ✅ Complete detailed design document exists
- ✅ All layers are designed in detail
- ✅ Integration points are designed
- ✅ Data flow diagrams are created
- ✅ Design is ready for implementation

### Technical Details

**Files to Create:**
- `doc/authorization/AUTHORIZATION_DETAILED_DESIGN.md`
- `doc/diagrams/authorization-authentication-flow.mmd`
- `doc/diagrams/authorization-authentication-flow.svg`
- `doc/diagrams/authorization-permission-check-flow.mmd`
- `doc/diagrams/authorization-permission-check-flow.svg`
- `doc/diagrams/authorization-integration-calendar.mmd`
- `doc/diagrams/authorization-integration-calendar.svg`
- `doc/diagrams/authorization-integration-dashboard.mmd`
- `doc/diagrams/authorization-integration-dashboard.svg`

**Files to Reference:**
- `doc/authorization/AUTHORIZATION_ARCHITECTURE.md` (from TASK-ARCH-004)
- `doc/authorization/AUTHORIZATION_REQUIREMENTS.md` (from TASK-DOC-014)

**Notes:**
- Design should be implementation-ready
- Consider performance and scalability
- Design for testability

---

## TASK-DB-008: Authorization System Database Schema

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 6 hours
**Dependencies:** TASK-DOC-015, TASK-DB-002
**Related Tasks:** TASK-API-007, TASK-API-009

### Description

Design and implement the database schema for the authorization system including users, roles, permissions, sessions, and audit logs. This extends the existing user authentication schema (TASK-DB-005) with authorization-specific tables and relationships.

### Requirements / What to Do

#### Step 1: Review Existing Schema
- [ ] Review TASK-DB-005 (User Authentication Database Schema)
- [ ] Identify what can be reused (users table, etc.)
- [ ] Identify what needs to be extended
- [ ] Document schema dependencies

#### Step 2: Design Authorization Tables
- [ ] Design roles table (if separate from users)
  - id, name, description, created_at, updated_at
  - Indexes
- [ ] Design permissions table
  - id, resource, action, description, created_at
  - Indexes
- [ ] Design role_permissions junction table
  - role_id, permission_id
  - Composite primary key
  - Foreign keys
  - Indexes
- [ ] Design user_roles junction table (if many-to-many)
  - user_id, role_id
  - Composite primary key
  - Foreign keys
  - Indexes
- [ ] Design user_permissions table (for direct permission assignment)
  - user_id, permission_id, granted_at, granted_by
  - Foreign keys
  - Indexes
- [ ] Extend sessions table (if not in TASK-DB-005)
  - user_id, access_token, refresh_token, expires_at, created_at
  - Indexes on user_id and tokens
- [ ] Design audit_logs table
  - id, user_id, action, resource, resource_id, details, ip_address, user_agent, created_at
  - Indexes on user_id, action, created_at

#### Step 3: Design Relationships
- [ ] Document foreign key relationships
- [ ] Document cascade rules (on delete, on update)
- [ ] Design referential integrity constraints
- [ ] Document relationship cardinalities

#### Step 4: Design Indexes and Performance
- [ ] Design indexes for common queries
  - User lookup by email
  - Permission checks by user
  - Role lookups
  - Audit log queries
- [ ] Design composite indexes for junction tables
- [ ] Document query performance considerations

#### Step 5: Design Constraints and Validation
- [ ] Design check constraints
  - Email format validation
  - Role name uniqueness
  - Permission resource/action uniqueness
- [ ] Design unique constraints
  - User email uniqueness
  - Role name uniqueness
- [ ] Design not null constraints

#### Step 6: Create Migration Files
- [ ] Create initial migration for authorization tables
- [ ] Create migration for extending users table (if needed)
- [ ] Create migration for indexes
- [ ] Create migration for constraints
- [ ] Test migrations (up and down)

#### Step 7: Create Seed Data
- [ ] Create seed script for default roles
  - Owner, Manager, Admin, Receptionist/Cashier, Employee
- [ ] Create seed script for default permissions
  - All permissions defined in requirements
- [ ] Create seed script for role-permission assignments
  - Assign permissions to roles based on permission matrix
- [ ] Create seed script for test users (optional, for development)

### Definition of Done (DoD)

- [ ] All authorization tables designed
- [ ] Relationships and constraints defined
- [ ] Indexes designed for performance
- [ ] Migration files created and tested
- [ ] Seed data scripts created
- [ ] ERD diagram created
- [ ] Schema documentation saved to `doc/authorization/AUTHORIZATION_DATABASE_SCHEMA.md`

### Verification Steps

1. **Schema Review:**
   - Review schema against requirements
   - Verify all relationships are correct
   - Verify indexes are appropriate
   - Check for normalization issues

2. **Migration Testing:**
   - Test migrations on clean database
   - Test rollback (down migration)
   - Verify seed data loads correctly
   - Test query performance

### Acceptance Criteria

- ✅ Complete database schema designed
- ✅ Migration files created and tested
- ✅ Seed data scripts created
- ✅ ERD diagram created
- ✅ Schema is ready for implementation

### Technical Details

**Files to Create:**
- `server/src/database/migrations/XXXXXX-create-authorization-tables.ts`
- `server/src/database/seeds/authorization-seed.ts`
- `doc/authorization/AUTHORIZATION_DATABASE_SCHEMA.md`
- `doc/diagrams/authorization-erd.mmd`
- `doc/diagrams/authorization-erd.svg`

**Files to Modify:**
- May extend `server/src/database/migrations/XXXXXX-create-users-table.ts` (from TASK-DB-005)

**Files to Reference:**
- TASK-DB-005 (User Authentication Database Schema)
- `doc/authorization/AUTHORIZATION_DETAILED_DESIGN.md` (from TASK-DOC-015)

**Dependencies:**
- TypeORM or Prisma (depending on project setup)
- Existing database migration system

**Notes:**
- Consider data migration strategy if extending existing schema
- Design for performance (indexes, query optimization)
- Consider audit trail requirements

---

## TASK-API-007: Authorization System Domain Layer Implementation

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 16 hours
**Dependencies:** TASK-DOC-015, TASK-DB-008
**Related Tasks:** TASK-API-008, TASK-API-009

### Description

Implement the domain layer for the authorization system following DDD principles. This includes value objects, domain entities, domain services, and repository interfaces. The domain layer has no dependencies on infrastructure or application layers.

### Requirements / What to Do

#### Step 1: Implement Value Objects
- [ ] Implement UserId value object
  - Validation (UUID format)
  - Immutability
  - Equality comparison
- [ ] Implement Email value object
  - Email format validation
  - Immutability
  - Equality comparison
- [ ] Implement PasswordHash value object
  - Validation (hash format)
  - Immutability
- [ ] Implement Role value object/enum
  - Role enum values (Owner, Manager, Admin, Receptionist/Cashier, Employee)
  - Role validation
- [ ] Implement Permission value object
  - Resource and action properties
  - Validation
  - Equality comparison
  - Permission string format (e.g., "calendar:read", "dashboard.metrics:write")
- [ ] Implement SessionId value object
- [ ] Implement AccessToken value object
- [ ] Implement RefreshToken value object
- [ ] Implement DateTimeRange value object (if needed for audit logs)

#### Step 2: Implement Domain Entities
- [ ] Implement User aggregate root
  - Properties (id, email, passwordHash, roles, permissions, createdAt, updatedAt)
  - Factory method (create)
  - Business methods:
    - assignRole(role)
    - revokeRole(role)
    - grantPermission(permission)
    - revokePermission(permission)
    - hasRole(role)
    - hasPermission(permission)
    - canAccess(resource, action)
  - Invariants validation
  - Domain events (UserRoleChanged, UserPermissionChanged)
- [ ] Implement Role aggregate root (if separate from User)
  - Properties (id, name, description, permissions, createdAt)
  - Factory method
  - Business methods
  - Invariants
- [ ] Implement Session aggregate root
  - Properties (id, userId, accessToken, refreshToken, expiresAt, createdAt)
  - Factory method
  - Business methods:
    - isExpired()
    - refresh()
  - Invariants

#### Step 3: Implement Domain Services
- [ ] Implement AuthorizationService
  - checkPermission(user, resource, action): boolean
  - checkRole(user, role): boolean
  - filterDataByPermissions(user, data, resource): filteredData
  - Business logic for permission checking
  - Role hierarchy evaluation
- [ ] Implement PasswordService
  - hashPassword(password): PasswordHash
  - verifyPassword(password, hash): boolean
  - validatePasswordPolicy(password): ValidationResult
  - Password strength requirements
- [ ] Implement TokenService (domain service interface)
  - generateAccessToken(user): AccessToken
  - generateRefreshToken(user): RefreshToken
  - validateToken(token): ValidationResult
  - Extract claims from token

#### Step 4: Implement Repository Interfaces
- [ ] Implement IUserRepository interface
  - findById(userId): Promise<User | null>
  - findByEmail(email): Promise<User | null>
  - save(user): Promise<void>
  - delete(userId): Promise<void>
  - findByRole(role): Promise<User[]>
- [ ] Implement IRoleRepository interface (if separate)
  - findById(roleId): Promise<Role | null>
  - findAll(): Promise<Role[]>
  - save(role): Promise<void>
- [ ] Implement ISessionRepository interface
  - findByToken(token): Promise<Session | null>
  - findByUserId(userId): Promise<Session[]>
  - save(session): Promise<void>
  - delete(sessionId): Promise<void>
  - deleteExpired(): Promise<void>
- [ ] Implement IAuditLogRepository interface
  - save(auditLog): Promise<void>
  - findByUserId(userId, dateRange): Promise<AuditLog[]>
  - findByAction(action, dateRange): Promise<AuditLog[]>

#### Step 5: Implement Domain Events
- [ ] Implement UserRoleChangedEvent
- [ ] Implement UserPermissionChangedEvent
- [ ] Implement UserLoggedInEvent
- [ ] Implement PermissionDeniedEvent
- [ ] Implement domain event infrastructure (if not exists)

#### Step 6: Write Unit Tests
- [ ] Write unit tests for all value objects
- [ ] Write unit tests for User entity
  - Factory method tests
  - Business method tests
  - Invariant tests
- [ ] Write unit tests for AuthorizationService
  - Permission checking tests
  - Role checking tests
  - Data filtering tests
- [ ] Write unit tests for PasswordService
  - Password hashing tests
  - Password verification tests
  - Password policy validation tests

### Definition of Done (DoD)

- [ ] All value objects implemented and tested
- [ ] All domain entities implemented and tested
- [ ] All domain services implemented and tested
- [ ] All repository interfaces defined
- [ ] Domain events implemented
- [ ] Unit tests written with >80% coverage
- [ ] No infrastructure dependencies in domain layer
- [ ] Code follows DDD principles
- [ ] Code reviewed and approved

### Verification Steps

1. **Code Review:**
   - Verify no infrastructure dependencies
   - Verify DDD principles are followed
   - Verify business logic is in domain layer
   - Check code quality

2. **Unit Testing:**
   ```bash
   npm test domain/authorization
   npm run test:coverage  # Should show >80% coverage for domain layer
   ```

3. **Type Checking:**
   ```bash
   npm run type-check
   ```

### Acceptance Criteria

- ✅ All domain layer components implemented
- ✅ Unit tests passing with >80% coverage
- ✅ No infrastructure dependencies
- ✅ Code follows DDD principles
- ✅ Domain layer is ready for application layer implementation

### Technical Details

**Files to Create:**
- `server/src/domain/authorization/value-objects/UserId.ts`
- `server/src/domain/authorization/value-objects/Email.ts`
- `server/src/domain/authorization/value-objects/PasswordHash.ts`
- `server/src/domain/authorization/value-objects/Role.ts`
- `server/src/domain/authorization/value-objects/Permission.ts`
- `server/src/domain/authorization/value-objects/SessionId.ts`
- `server/src/domain/authorization/value-objects/AccessToken.ts`
- `server/src/domain/authorization/value-objects/RefreshToken.ts`
- `server/src/domain/authorization/entities/User.ts`
- `server/src/domain/authorization/entities/Session.ts`
- `server/src/domain/authorization/domain-services/AuthorizationService.ts`
- `server/src/domain/authorization/domain-services/PasswordService.ts`
- `server/src/domain/authorization/domain-services/TokenService.ts`
- `server/src/domain/authorization/repositories/IUserRepository.ts`
- `server/src/domain/authorization/repositories/ISessionRepository.ts`
- `server/src/domain/authorization/repositories/IAuditLogRepository.ts`
- `server/src/domain/authorization/events/UserRoleChangedEvent.ts`
- `server/src/domain/authorization/events/UserPermissionChangedEvent.ts`
- `server/src/domain/authorization/events/UserLoggedInEvent.ts`
- `server/src/domain/authorization/events/PermissionDeniedEvent.ts`
- `server/tests/unit/domain/authorization/**/*.test.ts`

**Files to Reference:**
- `doc/authorization/AUTHORIZATION_DETAILED_DESIGN.md` (from TASK-DOC-015)
- `.cursor/rules/ddd.mdc` (DDD guidelines)

**Dependencies:**
- TypeScript
- No external dependencies (pure domain logic)

**Notes:**
- Follow DDD principles strictly
- Keep domain layer pure (no infrastructure dependencies)
- Write comprehensive unit tests
- Use factory methods for entity creation
- Implement proper validation in value objects

---

## TASK-API-008: Authorization System Application Layer Implementation

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 12 hours
**Dependencies:** TASK-API-007
**Related Tasks:** TASK-API-009, TASK-SEC-004

### Description

Implement the application layer for the authorization system including use cases, DTOs, commands, queries, and mappers. The application layer orchestrates domain objects to fulfill use cases.

### Requirements / What to Do

#### Step 1: Implement Use Cases
- [ ] Implement LoginUseCase
  - Validate credentials
  - Create session
  - Generate tokens
  - Return login response
- [ ] Implement LogoutUseCase
  - Invalidate session
  - Delete tokens
- [ ] Implement RefreshTokenUseCase
  - Validate refresh token
  - Generate new access token
  - Return new tokens
- [ ] Implement CheckPermissionUseCase
  - Check user permission for resource/action
  - Return boolean result
- [ ] Implement GetUserPermissionsUseCase
  - Get all permissions for user (from roles + direct)
  - Return permission list
- [ ] Implement AssignRoleUseCase
  - Assign role to user
  - Publish domain event
- [ ] Implement RevokeRoleUseCase
  - Revoke role from user
  - Publish domain event
- [ ] Implement GrantPermissionUseCase
  - Grant permission to user
  - Publish domain event
- [ ] Implement RevokePermissionUseCase
  - Revoke permission from user
  - Publish domain event
- [ ] Implement GetUserRolesUseCase
  - Get all roles for user
  - Return role list

#### Step 2: Implement DTOs
- [ ] Implement LoginRequest DTO
  - email, password
  - Validation
- [ ] Implement LoginResponse DTO
  - accessToken, refreshToken, user, expiresIn
- [ ] Implement TokenResponse DTO
  - accessToken, refreshToken, expiresIn
- [ ] Implement PermissionDto
  - id, resource, action, description
- [ ] Implement RoleDto
  - id, name, description, permissions
- [ ] Implement UserDto
  - id, email, roles, permissions (filtered for security)
- [ ] Implement CheckPermissionRequest DTO
  - resource, action
- [ ] Implement CheckPermissionResponse DTO
  - allowed, reason (if denied)

#### Step 3: Implement Commands and Queries (CQRS)
- [ ] Implement LoginCommand
- [ ] Implement LogoutCommand
- [ ] Implement RefreshTokenCommand
- [ ] Implement CheckPermissionQuery
- [ ] Implement GetUserPermissionsQuery
- [ ] Implement AssignRoleCommand
- [ ] Implement RevokeRoleCommand
- [ ] Implement GrantPermissionCommand
- [ ] Implement RevokePermissionCommand

#### Step 4: Implement Mappers
- [ ] Implement UserMapper
  - toDto(user): UserDto
  - toDomain(dto): User (if needed)
- [ ] Implement PermissionMapper
  - toDto(permission): PermissionDto
- [ ] Implement RoleMapper
  - toDto(role): RoleDto
- [ ] Implement SessionMapper (if needed)

#### Step 5: Write Unit Tests
- [ ] Write unit tests for all use cases
  - Mock repository dependencies
  - Test success scenarios
  - Test error scenarios
  - Test validation
- [ ] Write unit tests for mappers
- [ ] Write unit tests for DTOs validation

### Definition of Done (DoD)

- [ ] All use cases implemented and tested
- [ ] All DTOs implemented
- [ ] All commands and queries implemented
- [ ] All mappers implemented
- [ ] Unit tests written with >80% coverage
- [ ] No business logic in application layer (delegates to domain)
- [ ] Code reviewed and approved

### Verification Steps

1. **Code Review:**
   - Verify application layer is thin (delegates to domain)
   - Verify no business logic in use cases
   - Check error handling
   - Verify DTOs are properly validated

2. **Unit Testing:**
   ```bash
   npm test application/authorization
   npm run test:coverage  # Should show >80% coverage
   ```

3. **Type Checking:**
   ```bash
   npm run type-check
   ```

### Acceptance Criteria

- ✅ All application layer components implemented
- ✅ Unit tests passing with >80% coverage
- ✅ Application layer is thin (delegates to domain)
- ✅ DTOs are properly validated
- ✅ Application layer is ready for infrastructure layer implementation

### Technical Details

**Files to Create:**
- `server/src/application/authorization/use-cases/LoginUseCase.ts`
- `server/src/application/authorization/use-cases/LogoutUseCase.ts`
- `server/src/application/authorization/use-cases/RefreshTokenUseCase.ts`
- `server/src/application/authorization/use-cases/CheckPermissionUseCase.ts`
- `server/src/application/authorization/use-cases/GetUserPermissionsUseCase.ts`
- `server/src/application/authorization/use-cases/AssignRoleUseCase.ts`
- `server/src/application/authorization/use-cases/RevokeRoleUseCase.ts`
- `server/src/application/authorization/use-cases/GrantPermissionUseCase.ts`
- `server/src/application/authorization/use-cases/RevokePermissionUseCase.ts`
- `server/src/application/authorization/use-cases/GetUserRolesUseCase.ts`
- `server/src/application/authorization/dto/LoginRequest.ts`
- `server/src/application/authorization/dto/LoginResponse.ts`
- `server/src/application/authorization/dto/TokenResponse.ts`
- `server/src/application/authorization/dto/PermissionDto.ts`
- `server/src/application/authorization/dto/RoleDto.ts`
- `server/src/application/authorization/dto/UserDto.ts`
- `server/src/application/authorization/commands/LoginCommand.ts`
- `server/src/application/authorization/commands/AssignRoleCommand.ts`
- `server/src/application/authorization/queries/CheckPermissionQuery.ts`
- `server/src/application/authorization/queries/GetUserPermissionsQuery.ts`
- `server/src/application/authorization/mappers/UserMapper.ts`
- `server/src/application/authorization/mappers/PermissionMapper.ts`
- `server/src/application/authorization/mappers/RoleMapper.ts`
- `server/tests/unit/application/authorization/**/*.test.ts`

**Files to Reference:**
- `doc/authorization/AUTHORIZATION_DETAILED_DESIGN.md` (from TASK-DOC-015)

**Dependencies:**
- Domain layer (TASK-API-007)

**Notes:**
- Keep application layer thin
- Use dependency injection for repositories
- Handle errors appropriately
- Validate DTOs

---

## TASK-API-009: Authorization System Infrastructure Layer Implementation

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 14 hours
**Dependencies:** TASK-API-008, TASK-DB-008
**Related Tasks:** TASK-SEC-004

### Description

Implement the infrastructure layer for the authorization system including repository implementations, database entities, external service integrations (JWT, password hashing), and mappers between domain and database entities.

### Requirements / What to Do

#### Step 1: Implement Database Entities (TypeORM/Prisma)
- [ ] Implement UserEntity
  - Map to User domain entity
  - Relationships (roles, permissions, sessions)
- [ ] Implement RoleEntity (if separate table)
  - Map to Role domain entity
  - Relationships (permissions, users)
- [ ] Implement PermissionEntity (if separate table)
  - Map to Permission value object
- [ ] Implement RolePermissionEntity (junction table)
- [ ] Implement UserRoleEntity (junction table, if many-to-many)
- [ ] Implement UserPermissionEntity (for direct permissions)
- [ ] Implement SessionEntity
  - Map to Session domain entity
  - Indexes on tokens
- [ ] Implement AuditLogEntity
  - Map to AuditLog domain entity
  - Indexes for queries

#### Step 2: Implement Repository Implementations
- [ ] Implement UserRepository
  - Implement IUserRepository interface
  - Use TypeORM/Prisma for database access
  - Map between domain and database entities
  - Handle errors appropriately
- [ ] Implement RoleRepository (if separate)
  - Implement IRoleRepository interface
- [ ] Implement SessionRepository
  - Implement ISessionRepository interface
  - Handle token lookups
  - Handle expired session cleanup
- [ ] Implement AuditLogRepository
  - Implement IAuditLogRepository interface
  - Handle audit log queries

#### Step 3: Implement Database Mappers
- [ ] Implement UserMapper (domain <-> database)
  - toDomain(entity): User
  - toEntity(user): UserEntity
- [ ] Implement SessionMapper
  - toDomain(entity): Session
  - toEntity(session): SessionEntity
- [ ] Implement AuditLogMapper
  - toDomain(entity): AuditLog
  - toEntity(auditLog): AuditLogEntity

#### Step 4: Implement External Service Integrations
- [ ] Implement JWTService
  - Generate access token
  - Generate refresh token
  - Validate token
  - Extract claims from token
  - Use jsonwebtoken library
- [ ] Implement PasswordHashingService
  - Hash password (bcrypt or Argon2)
  - Verify password
  - Implement PasswordService interface from domain
- [ ] Implement TokenService implementation
  - Implement TokenService interface from domain
  - Use JWTService for token generation
- [ ] Implement EmailService integration (for password reset)
  - Send password reset email
  - Send account activation email

#### Step 5: Implement Caching (Optional but Recommended)
- [ ] Implement permission cache
  - Cache user permissions
  - Cache invalidation on role/permission changes
  - Use Redis or in-memory cache
- [ ] Implement session cache
  - Cache active sessions
  - Improve performance

#### Step 6: Write Integration Tests
- [ ] Write integration tests for repositories
  - Test with real database (test database)
  - Test CRUD operations
  - Test queries
- [ ] Write integration tests for external services
  - Test JWT token generation/validation
  - Test password hashing/verification
- [ ] Write integration tests for mappers
  - Test domain <-> database mapping

### Definition of Done (DoD)

- [ ] All database entities implemented
- [ ] All repository implementations completed
- [ ] All mappers implemented
- [ ] External service integrations implemented
- [ ] Integration tests written and passing
- [ ] Caching implemented (if applicable)
- [ ] Code reviewed and approved

### Verification Steps

1. **Code Review:**
   - Verify repository implementations are correct
   - Verify mappers handle all cases
   - Check error handling
   - Verify external service integrations

2. **Integration Testing:**
   ```bash
   npm test infrastructure/authorization
   npm run test:integration
   ```

3. **Database Testing:**
   - Test migrations
   - Test repository operations with real database
   - Test performance

### Acceptance Criteria

- ✅ All infrastructure layer components implemented
- ✅ Integration tests passing
- ✅ Repository implementations work correctly
- ✅ External services integrated
- ✅ Infrastructure layer is ready for presentation layer implementation

### Technical Details

**Files to Create:**
- `server/src/infrastructure/persistence/entities/UserEntity.ts`
- `server/src/infrastructure/persistence/entities/RoleEntity.ts`
- `server/src/infrastructure/persistence/entities/PermissionEntity.ts`
- `server/src/infrastructure/persistence/entities/SessionEntity.ts`
- `server/src/infrastructure/persistence/entities/AuditLogEntity.ts`
- `server/src/infrastructure/persistence/repositories/UserRepository.ts`
- `server/src/infrastructure/persistence/repositories/RoleRepository.ts`
- `server/src/infrastructure/persistence/repositories/SessionRepository.ts`
- `server/src/infrastructure/persistence/repositories/AuditLogRepository.ts`
- `server/src/infrastructure/persistence/mappers/UserMapper.ts`
- `server/src/infrastructure/persistence/mappers/SessionMapper.ts`
- `server/src/infrastructure/persistence/mappers/AuditLogMapper.ts`
- `server/src/infrastructure/external-services/jwt/JWTService.ts`
- `server/src/infrastructure/external-services/password/PasswordHashingService.ts`
- `server/src/infrastructure/external-services/token/TokenService.ts`
- `server/src/infrastructure/external-services/email/EmailService.ts`
- `server/src/infrastructure/cache/PermissionCache.ts` (optional)
- `server/tests/integration/infrastructure/authorization/**/*.test.ts`

**Files to Reference:**
- `doc/authorization/AUTHORIZATION_DETAILED_DESIGN.md` (from TASK-DOC-015)
- `doc/authorization/AUTHORIZATION_DATABASE_SCHEMA.md` (from TASK-DB-008)

**Dependencies:**
- TypeORM or Prisma
- jsonwebtoken library
- bcrypt or argon2 library
- Redis (for caching, optional)

**Notes:**
- Implement proper error handling
- Use connection pooling for database
- Consider performance (indexes, queries)
- Implement proper logging

---

## TASK-SEC-004: Authorization System Presentation Layer Implementation

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 10 hours
**Dependencies:** TASK-API-009
**Related Tasks:** TASK-SEC-005, TASK-SEC-006

### Description

Implement the presentation layer for the authorization system including API controllers, routes, middleware (authentication, authorization), request/response DTOs, and validation. This layer handles HTTP requests and delegates to application services.

### Requirements / What to Do

#### Step 1: Implement API Controllers
- [ ] Implement AuthController
  - login(request): LoginResponse
  - logout(request): void
  - refreshToken(request): TokenResponse
  - getCurrentUser(request): UserDto
- [ ] Implement PermissionController
  - checkPermission(request): CheckPermissionResponse
  - getUserPermissions(request): PermissionDto[]
  - grantPermission(request): void
  - revokePermission(request): void
- [ ] Implement RoleController
  - getRoles(request): RoleDto[]
  - assignRole(request): void
  - revokeRole(request): void

#### Step 2: Implement API Routes
- [ ] Define auth routes
  - POST /api/auth/login
  - POST /api/auth/logout
  - POST /api/auth/refresh
  - GET /api/auth/me
- [ ] Define permission routes
  - POST /api/auth/permissions/check
  - GET /api/auth/permissions
  - POST /api/auth/permissions/grant
  - DELETE /api/auth/permissions/revoke
- [ ] Define role routes
  - GET /api/auth/roles
  - POST /api/auth/roles/assign
  - DELETE /api/auth/roles/revoke
- [ ] Apply authentication middleware to protected routes
- [ ] Apply authorization middleware to permission/role routes

#### Step 3: Implement Middleware
- [ ] Implement AuthenticationMiddleware
  - Extract JWT token from request
  - Validate token
  - Attach user to request object
  - Handle invalid/expired tokens
- [ ] Implement AuthorizationMiddleware
  - Check user permission for resource/action
  - Return 403 if unauthorized
  - Support multiple permission checks (AND/OR)
- [ ] Implement RoleMiddleware
  - Check user role
  - Return 403 if role doesn't match
- [ ] Implement ErrorHandlingMiddleware
  - Handle authentication errors
  - Handle authorization errors
  - Return appropriate HTTP status codes
  - Return user-friendly error messages

#### Step 4: Implement Request/Response DTOs
- [ ] Implement LoginRequestDto (API layer)
  - Validation (email format, password required)
- [ ] Implement LoginResponseDto
- [ ] Implement CheckPermissionRequestDto
  - Validation (resource, action required)
- [ ] Implement CheckPermissionResponseDto
- [ ] Implement error response DTOs
  - UnauthorizedErrorDto
  - ForbiddenErrorDto
  - ValidationErrorDto

#### Step 5: Implement Validation
- [ ] Implement request validation using class-validator or zod
- [ ] Validate all request DTOs
- [ ] Return validation errors in consistent format
- [ ] Implement custom validators if needed

#### Step 6: Write API Integration Tests
- [ ] Write integration tests for auth endpoints
  - Test login success/failure
  - Test logout
  - Test token refresh
  - Test invalid tokens
- [ ] Write integration tests for permission endpoints
  - Test permission checking
  - Test permission granting/revoking
- [ ] Write integration tests for middleware
  - Test authentication middleware
  - Test authorization middleware
  - Test error handling

### Definition of Done (DoD)

- [ ] All API controllers implemented
- [ ] All routes defined and protected
- [ ] All middleware implemented
- [ ] Request/response DTOs implemented and validated
- [ ] API integration tests written and passing
- [ ] Error handling implemented
- [ ] Code reviewed and approved

### Verification Steps

1. **Code Review:**
   - Verify controllers are thin (delegate to use cases)
   - Verify middleware is correct
   - Check error handling
   - Verify validation

2. **API Testing:**
   ```bash
   npm test api/authorization
   npm run test:integration
   ```

3. **Manual Testing:**
   - Test API endpoints with Postman/curl
   - Test authentication flow
   - Test authorization checks
   - Test error scenarios

### Acceptance Criteria

- ✅ All API endpoints implemented
- ✅ Authentication middleware working
- ✅ Authorization middleware working
- ✅ API integration tests passing
- ✅ Presentation layer is ready for frontend integration

### Technical Details

**Files to Create:**
- `server/src/presentation/api/controllers/AuthController.ts`
- `server/src/presentation/api/controllers/PermissionController.ts`
- `server/src/presentation/api/controllers/RoleController.ts`
- `server/src/presentation/api/routes/auth.routes.ts`
- `server/src/presentation/api/routes/permission.routes.ts`
- `server/src/presentation/api/routes/role.routes.ts`
- `server/src/presentation/api/middleware/AuthenticationMiddleware.ts`
- `server/src/presentation/api/middleware/AuthorizationMiddleware.ts`
- `server/src/presentation/api/middleware/RoleMiddleware.ts`
- `server/src/presentation/api/middleware/ErrorHandlingMiddleware.ts`
- `server/src/presentation/api/dto/LoginRequestDto.ts`
- `server/src/presentation/api/dto/LoginResponseDto.ts`
- `server/src/presentation/api/dto/CheckPermissionRequestDto.ts`
- `server/src/presentation/api/dto/ErrorResponseDto.ts`
- `server/src/presentation/api/validation/auth.validation.ts`
- `server/tests/integration/api/authorization/**/*.test.ts`

**Files to Reference:**
- `doc/authorization/AUTHORIZATION_DETAILED_DESIGN.md` (from TASK-DOC-015)

**Dependencies:**
- Express.js or similar framework
- class-validator or zod for validation
- Application layer (TASK-API-008)

**Notes:**
- Keep controllers thin
- Use dependency injection
- Implement proper error handling
- Follow RESTful API conventions

---

## TASK-SEC-005: Authorization Integration with Calendar Module

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 8 hours
**Dependencies:** TASK-SEC-004, TASK-API-006
**Related Tasks:** TASK-SEC-006

### Description

Integrate the authorization system with the Calendar module to enforce role-based access control for calendar views, appointment management, and data filtering. This includes API endpoint protection, frontend route guards, and data filtering based on user permissions.

### Requirements / What to Do

#### Step 1: API Endpoint Protection
- [ ] Apply authentication middleware to all calendar API endpoints
- [ ] Apply authorization middleware to calendar endpoints
  - GET /api/calendar/appointments - check "calendar:read" permission
  - POST /api/calendar/appointments - check "calendar:write" permission
  - PUT /api/calendar/appointments/:id - check "calendar:write" permission
  - DELETE /api/calendar/appointments/:id - check "calendar:delete" permission
  - GET /api/calendar/availability - check "calendar:read" permission
- [ ] Implement role-based endpoint restrictions
  - Employees can only access their own appointments
  - Receptionist can access all appointments
  - Manager/Owner can access all appointments
- [ ] Add permission checks in calendar controllers
- [ ] Return appropriate error responses (401, 403)

#### Step 2: Data Filtering by Permissions
- [ ] Implement data filtering in calendar service
  - Filter appointments by user role
  - Employees see only their appointments
  - Receptionist/Manager/Owner see all appointments
- [ ] Implement appointment filtering in repository queries
  - Add WHERE clauses based on user role
  - Optimize queries for performance
- [ ] Implement search/filter authorization
  - Check permissions for filter operations
  - Employees can only filter their own appointments

#### Step 3: Frontend Route Protection
- [ ] Protect calendar routes with ProtectedRoute component
  - /dashboard/calendar - require "calendar:read" permission
  - /dashboard/calendar/appointments/:id - require "calendar:read" permission
- [ ] Implement role-based route access
  - Redirect unauthorized users
  - Show appropriate error messages

#### Step 4: Frontend Permission Checks
- [ ] Implement permission checks in calendar components
  - Check "calendar:write" before showing create button
  - Check "calendar:delete" before showing delete button
  - Check "calendar:edit" before showing edit button
- [ ] Use usePermission hook in calendar components
- [ ] Conditionally render UI based on permissions
  - Hide create/edit/delete buttons if no permission
  - Disable actions if no permission

#### Step 5: Appointment CRUD Authorization
- [ ] Implement appointment creation authorization
  - Check "calendar:write" permission
  - Check role-specific rules (employees can't create)
- [ ] Implement appointment edit authorization
  - Check "calendar:write" permission
  - Check if user can edit this appointment (role-based)
- [ ] Implement appointment delete authorization
  - Check "calendar:delete" permission
  - Check if user can delete this appointment
- [ ] Implement appointment status change authorization
  - Check appropriate permissions
  - Check role-specific rules

#### Step 6: Integration Testing
- [ ] Write integration tests for calendar authorization
  - Test API endpoint protection
  - Test data filtering by role
  - Test permission checks
  - Test error responses
- [ ] Write E2E tests for calendar authorization
  - Test user flows with different roles
  - Test unauthorized access attempts

### Definition of Done (DoD)

- [ ] All calendar API endpoints protected
- [ ] Data filtering implemented by role
- [ ] Frontend routes protected
- [ ] Permission checks in frontend components
- [ ] Appointment CRUD authorization implemented
- [ ] Integration tests written and passing
- [ ] E2E tests written and passing
- [ ] Code reviewed and approved

### Verification Steps

1. **Manual Testing:**
   - Test calendar access with different roles
   - Test appointment CRUD with different roles
   - Test unauthorized access attempts
   - Verify data filtering works correctly

2. **Automated Testing:**
   ```bash
   npm test calendar/authorization
   npm run test:e2e calendar
   ```

3. **Security Testing:**
   - Test bypass attempts
   - Test permission escalation attempts
   - Verify error messages don't leak information

### Acceptance Criteria

- ✅ Calendar module is fully protected by authorization
- ✅ Data filtering works correctly by role
- ✅ Frontend permission checks work
- ✅ Integration tests passing
- ✅ E2E tests passing
- ✅ Security requirements met

### Technical Details

**Files to Modify:**
- `server/src/presentation/api/routes/calendar.routes.ts` (add middleware)
- `server/src/presentation/api/controllers/CalendarController.ts` (add permission checks)
- `server/src/application/calendar/use-cases/GetAppointmentsUseCase.ts` (add data filtering)
- `server/src/infrastructure/persistence/repositories/AppointmentRepository.ts` (add filtering queries)
- `client/src/components/AppointmentCalendar.tsx` (add permission checks)
- `client/src/components/BookingFlow/**/*.tsx` (add permission checks if needed)

**Files to Create:**
- `server/tests/integration/calendar/authorization.test.ts`
- `client/tests/e2e/calendar-authorization.test.tsx`

**Files to Reference:**
- `doc/authorization/AUTHORIZATION_REQUIREMENTS.md` (from TASK-DOC-014)
- `doc/dashboard/calendar-apointment/CALENDAR_APPOINTMENT_REQUIREMENTS.md`

**Dependencies:**
- Authorization system (TASK-SEC-004)
- Calendar API (TASK-API-006)

**Notes:**
- Ensure performance (authorization checks shouldn't slow down calendar)
- Consider caching permission checks
- Implement proper error handling
- Follow security best practices

---

## TASK-SEC-006: Authorization Integration with Dashboard Modules

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 12 hours
**Dependencies:** TASK-SEC-004, TASK-API-002
**Related Tasks:** TASK-SEC-005

### Description

Integrate the authorization system with all Dashboard modules (Metrics, Promotions, Content Editor, Gallery, Employee Management) to enforce role-based access control. This includes API endpoint protection, frontend route guards, and permission-based UI rendering.

### Requirements / What to Do

#### Step 1: Metrics and Analytics Module Integration
- [ ] Apply authentication/authorization middleware to metrics API endpoints
  - GET /api/metrics/revenue - check "dashboard.metrics:read" and role (Owner/Manager only)
  - GET /api/metrics/appointments - check "dashboard.metrics:read" permission
  - GET /api/metrics/customers - check "dashboard.metrics:read" permission
  - GET /api/metrics/employees - check "dashboard.metrics:read" permission
- [ ] Implement role-based data filtering
  - Employees see limited metrics (no financial data)
  - Receptionist sees operational metrics only
  - Manager/Owner see all metrics
- [ ] Protect frontend metrics routes
- [ ] Implement permission checks in metrics components
  - Conditionally show financial metrics based on role
  - Hide export buttons if no permission

#### Step 2: Promotions Management Module Integration
- [ ] Apply authentication/authorization middleware to promotions API endpoints
  - GET /api/promotions - check "dashboard.promotions:read" permission
  - POST /api/promotions - check "dashboard.promotions:write" permission
  - PUT /api/promotions/:id - check "dashboard.promotions:write" permission
  - DELETE /api/promotions/:id - check "dashboard.promotions:delete" permission
  - POST /api/promotions/:id/send - check "dashboard.promotions:send" permission
- [ ] Protect frontend promotions routes
- [ ] Implement permission checks in promotions components
  - Show create/edit buttons only if "dashboard.promotions:write"
  - Show send button only if "dashboard.promotions:send"
  - Show delete button only if "dashboard.promotions:delete"

#### Step 3: Content Editor Module Integration
- [ ] Apply authentication/authorization middleware to content API endpoints
  - GET /api/content - check "dashboard.content:read" permission
  - PUT /api/content - check "dashboard.content:write" permission
  - POST /api/content/publish - check "dashboard.content:publish" permission
- [ ] Implement role-based content editing restrictions
  - Manager can't edit legal pages
  - Admin can edit all content
- [ ] Protect frontend content editor routes
- [ ] Implement permission checks in content editor components
  - Show edit buttons based on permissions
  - Disable publish if no permission

#### Step 4: Gallery Management Module Integration
- [ ] Apply authentication/authorization middleware to gallery API endpoints
  - GET /api/gallery - check "dashboard.gallery:read" permission
  - POST /api/gallery - check "dashboard.gallery:write" permission
  - PUT /api/gallery/:id - check "dashboard.gallery:write" permission
  - DELETE /api/gallery/:id - check "dashboard.gallery:delete" permission
- [ ] Protect frontend gallery routes
- [ ] Implement permission checks in gallery components
  - Show upload button only if "dashboard.gallery:write"
  - Show delete button only if "dashboard.gallery:delete"
  - Show edit button only if "dashboard.gallery:write"

#### Step 5: Employee Management Module Integration
- [ ] Apply authentication/authorization middleware to employee API endpoints
  - GET /api/employees - check "dashboard.employees:read" permission
  - POST /api/employees - check "dashboard.employees:write" permission
  - PUT /api/employees/:id - check "dashboard.employees:write" permission
  - DELETE /api/employees/:id - check "dashboard.employees:delete" permission
- [ ] Implement role-based employee management restrictions
  - Manager can view/edit employees but not delete
  - Admin/Owner can manage all employees
- [ ] Protect frontend employee management routes
- [ ] Implement permission checks in employee management components
  - Show create button only if "dashboard.employees:write"
  - Show delete button only if "dashboard.employees:delete"
  - Show edit button only if "dashboard.employees:write"

#### Step 6: Dashboard Navigation and Menu Integration
- [ ] Implement permission-based navigation menu
  - Show menu items only if user has required permissions
  - Hide entire sections if no permissions
- [ ] Implement role-based dashboard layout
  - Different layouts for different roles
  - Role-specific widgets and shortcuts
- [ ] Implement permission checks in dashboard header/footer
  - Show admin links only to authorized users

#### Step 7: Integration Testing
- [ ] Write integration tests for each dashboard module authorization
  - Test API endpoint protection
  - Test permission checks
  - Test role-based data filtering
  - Test error responses
- [ ] Write E2E tests for dashboard authorization
  - Test user flows with different roles
  - Test unauthorized access attempts
  - Test permission-based UI rendering

### Definition of Done (DoD)

- [ ] All dashboard API endpoints protected
- [ ] All dashboard frontend routes protected
- [ ] Permission checks in all dashboard components
- [ ] Role-based data filtering implemented
- [ ] Navigation menu is permission-based
- [ ] Integration tests written and passing
- [ ] E2E tests written and passing
- [ ] Code reviewed and approved

### Verification Steps

1. **Manual Testing:**
   - Test each dashboard module with different roles
   - Test permission-based UI rendering
   - Test unauthorized access attempts
   - Verify data filtering works correctly

2. **Automated Testing:**
   ```bash
   npm test dashboard/authorization
   npm run test:e2e dashboard
   ```

3. **Security Testing:**
   - Test bypass attempts for each module
   - Test permission escalation attempts
   - Verify error messages don't leak information

### Acceptance Criteria

- ✅ All dashboard modules are fully protected by authorization
- ✅ Permission-based UI rendering works correctly
- ✅ Role-based data filtering works
- ✅ Navigation menu is permission-based
- ✅ Integration tests passing
- ✅ E2E tests passing
- ✅ Security requirements met

### Technical Details

**Files to Modify:**
- `server/src/presentation/api/routes/metrics.routes.ts` (add middleware)
- `server/src/presentation/api/routes/promotions.routes.ts` (add middleware)
- `server/src/presentation/api/routes/content.routes.ts` (add middleware)
- `server/src/presentation/api/routes/gallery.routes.ts` (add middleware)
- `server/src/presentation/api/routes/employees.routes.ts` (add middleware)
- `server/src/presentation/api/controllers/*Controller.ts` (add permission checks)
- `client/src/components/PerformanceDashboard.tsx` (add permission checks)
- `client/src/components/MarketingCenter.tsx` (add permission checks)
- `client/src/components/GalleryPage.tsx` (add permission checks)
- `client/src/components/dashboard/**/*.tsx` (add permission checks)
- `client/src/components/Layout.tsx` (add permission-based navigation)

**Files to Create:**
- `server/tests/integration/dashboard/authorization.test.ts`
- `client/tests/e2e/dashboard-authorization.test.tsx`

**Files to Reference:**
- `doc/authorization/AUTHORIZATION_REQUIREMENTS.md` (from TASK-DOC-014)
- `doc/DASHBOARD_REQUIREMENTS.md` (for permission matrix)

**Dependencies:**
- Authorization system (TASK-SEC-004)
- Dashboard API (TASK-API-002)

**Notes:**
- Ensure consistent authorization patterns across all modules
- Consider performance (authorization checks)
- Implement proper error handling
- Follow security best practices
- Consider caching permission checks

---

## TASK-TEST-008: Authorization System Testing Suite

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 16 hours
**Dependencies:** TASK-SEC-005, TASK-SEC-006
**Related Tasks:** TASK-DOC-016

### Description

Create comprehensive testing suite for the authorization system including unit tests, integration tests, E2E tests, security tests, and performance tests. Ensure high test coverage and test all authorization scenarios.

### Requirements / What to Do

#### Step 1: Unit Tests (Domain Layer)
- [ ] Write unit tests for value objects
  - UserId, Email, PasswordHash, Role, Permission
  - Test validation, immutability, equality
- [ ] Write unit tests for User entity
  - Test factory methods
  - Test business methods (assignRole, revokePermission, etc.)
  - Test invariants
  - Test domain events
- [ ] Write unit tests for AuthorizationService
  - Test permission checking logic
  - Test role checking logic
  - Test data filtering logic
  - Test edge cases
- [ ] Write unit tests for PasswordService
  - Test password hashing
  - Test password verification
  - Test password policy validation

#### Step 2: Unit Tests (Application Layer)
- [ ] Write unit tests for all use cases
  - LoginUseCase, LogoutUseCase, RefreshTokenUseCase
  - CheckPermissionUseCase, GetUserPermissionsUseCase
  - AssignRoleUseCase, RevokeRoleUseCase
  - GrantPermissionUseCase, RevokePermissionUseCase
  - Mock repository dependencies
  - Test success and error scenarios
- [ ] Write unit tests for mappers
  - Test entity to DTO mapping
  - Test DTO to entity mapping (if applicable)

#### Step 3: Integration Tests (Infrastructure Layer)
- [ ] Write integration tests for repositories
  - Test UserRepository with real database
  - Test SessionRepository
  - Test AuditLogRepository
  - Test CRUD operations
  - Test queries
- [ ] Write integration tests for external services
  - Test JWT token generation/validation
  - Test password hashing/verification
  - Test email service (mock)

#### Step 4: Integration Tests (API Layer)
- [ ] Write integration tests for auth endpoints
  - Test login (success, failure, invalid credentials)
  - Test logout
  - Test token refresh
  - Test invalid tokens
  - Test expired tokens
- [ ] Write integration tests for permission endpoints
  - Test permission checking
  - Test permission granting/revoking
  - Test unauthorized access
- [ ] Write integration tests for middleware
  - Test authentication middleware
  - Test authorization middleware
  - Test role middleware
  - Test error handling

#### Step 5: Integration Tests (Module Integration)
- [ ] Write integration tests for calendar authorization
  - Test API endpoint protection
  - Test data filtering by role
  - Test permission checks
- [ ] Write integration tests for dashboard module authorization
  - Test metrics authorization
  - Test promotions authorization
  - Test content editor authorization
  - Test gallery authorization
  - Test employee management authorization

#### Step 6: E2E Tests
- [ ] Write E2E tests for authentication flow
  - Test login flow
  - Test logout flow
  - Test token refresh flow
  - Test session expiration
- [ ] Write E2E tests for authorization scenarios
  - Test different roles accessing protected resources
  - Test permission-based UI rendering
  - Test unauthorized access attempts
  - Test permission changes in real-time
- [ ] Write E2E tests for calendar authorization
  - Test calendar access with different roles
  - Test appointment CRUD with different roles
- [ ] Write E2E tests for dashboard authorization
  - Test dashboard access with different roles
  - Test module access with different roles

#### Step 7: Security Tests
- [ ] Write security tests for authentication
  - Test brute force protection
  - Test account lockout
  - Test password policy enforcement
  - Test token security (expiration, validation)
- [ ] Write security tests for authorization
  - Test permission bypass attempts
  - Test role escalation attempts
  - Test unauthorized API access
  - Test CSRF protection
- [ ] Write security tests for session management
  - Test session hijacking protection
  - Test session fixation protection
  - Test concurrent session handling

#### Step 8: Performance Tests
- [ ] Write performance tests for authorization checks
  - Test permission check latency
  - Test role check latency
  - Test data filtering performance
- [ ] Write performance tests for token operations
  - Test token generation performance
  - Test token validation performance
- [ ] Write load tests
  - Test authorization system under load
  - Test concurrent authentication requests

#### Step 9: Test Coverage and Reporting
- [ ] Ensure >80% test coverage for domain layer
- [ ] Ensure >70% test coverage for application layer
- [ ] Ensure >60% test coverage for infrastructure layer
- [ ] Generate test coverage reports
- [ ] Document test coverage gaps

### Definition of Done (DoD)

- [ ] Unit tests written for all domain and application layers
- [ ] Integration tests written for infrastructure and API layers
- [ ] E2E tests written for user flows
- [ ] Security tests written
- [ ] Performance tests written
- [ ] Test coverage meets requirements (>80% domain, >70% application, >60% infrastructure)
- [ ] All tests passing
- [ ] Test documentation created
- [ ] Code reviewed and approved

### Verification Steps

1. **Run Test Suite:**
   ```bash
   npm test
   npm run test:coverage
   npm run test:integration
   npm run test:e2e
   npm run test:security
   npm run test:performance
   ```

2. **Review Test Coverage:**
   - Check coverage reports
   - Identify gaps
   - Add tests for uncovered code

3. **Review Test Quality:**
   - Verify tests are meaningful (not just coverage)
   - Verify edge cases are tested
   - Verify error scenarios are tested

### Acceptance Criteria

- ✅ Comprehensive test suite exists
- ✅ All tests passing
- ✅ Test coverage meets requirements
- ✅ Security tests passing
- ✅ Performance tests passing
- ✅ Test documentation exists

### Technical Details

**Files to Create:**
- `server/tests/unit/domain/authorization/**/*.test.ts`
- `server/tests/unit/application/authorization/**/*.test.ts`
- `server/tests/integration/infrastructure/authorization/**/*.test.ts`
- `server/tests/integration/api/authorization/**/*.test.ts`
- `server/tests/integration/calendar/authorization.test.ts`
- `server/tests/integration/dashboard/authorization.test.ts`
- `server/tests/e2e/authorization/**/*.test.ts`
- `server/tests/security/authorization/**/*.test.ts`
- `server/tests/performance/authorization/**/*.test.ts`
- `doc/authorization/AUTHORIZATION_TESTING.md`

**Files to Reference:**
- `doc/authorization/AUTHORIZATION_REQUIREMENTS.md` (from TASK-DOC-014)
- `doc/authorization/AUTHORIZATION_DETAILED_DESIGN.md` (from TASK-DOC-015)

**Dependencies:**
- Jest or Vitest
- Supertest (for API testing)
- Playwright or Cypress (for E2E testing)
- Test database setup

**Notes:**
- Write meaningful tests (not just for coverage)
- Test edge cases and error scenarios
- Use test fixtures and factories
- Mock external dependencies appropriately
- Keep tests maintainable

---

## TASK-DOC-016: Authorization System Documentation

**Status:** PENDING
**Priority:** MEDIUM
**Assignee:** unassigned
**Created:** 2025-01-26
**Updated:** 2025-01-26
**Estimated Time:** 8 hours
**Dependencies:** TASK-TEST-008
**Related Tasks:** None

### Description

Create comprehensive documentation for the authorization system including API documentation, developer guides, user guides, security documentation, and integration guides. This documentation will help developers, users, and maintainers understand and use the authorization system.

### Requirements / What to Do

#### Step 1: API Documentation
- [ ] Document all authorization API endpoints
  - Request/response formats
  - Authentication requirements
  - Authorization requirements
  - Error codes and messages
  - Example requests/responses
- [ ] Document authentication flow
  - Login process
  - Token refresh process
  - Logout process
- [ ] Document authorization flow
  - Permission checking process
  - Role checking process
- [ ] Create OpenAPI/Swagger specification (optional but recommended)

#### Step 2: Developer Documentation
- [ ] Document architecture overview
  - Bounded context
  - Domain model
  - Layer structure
- [ ] Document how to add new permissions
- [ ] Document how to add new roles
- [ ] Document how to integrate authorization in new modules
- [ ] Document middleware usage
- [ ] Document frontend hooks usage (useAuth, usePermission)
- [ ] Document ProtectedRoute component usage
- [ ] Document best practices
- [ ] Document common patterns

#### Step 3: User Documentation
- [ ] Document user roles and permissions
  - Role descriptions
  - Permission matrix
  - What each role can do
- [ ] Document login process for users
- [ ] Document password reset process
- [ ] Document how permissions affect UI
- [ ] Create user guides with screenshots

#### Step 4: Security Documentation
- [ ] Document security architecture
- [ ] Document authentication mechanisms
- [ ] Document authorization mechanisms
- [ ] Document password policy
- [ ] Document session management
- [ ] Document token security
- [ ] Document audit logging
- [ ] Document security best practices
- [ ] Document security incident response

#### Step 5: Integration Documentation
- [ ] Document calendar module integration
  - How authorization is integrated
  - Permission requirements
  - Data filtering implementation
- [ ] Document dashboard modules integration
  - How authorization is integrated in each module
  - Permission requirements for each module
- [ ] Document how to integrate authorization in new features
- [ ] Document integration patterns

#### Step 6: Testing Documentation
- [ ] Document testing strategy
- [ ] Document how to run tests
- [ ] Document test coverage requirements
- [ ] Document how to write new tests
- [ ] Document test fixtures and factories

#### Step 7: Deployment Documentation
- [ ] Document deployment requirements
- [ ] Document environment variables
- [ ] Document database migrations
- [ ] Document seed data setup
- [ ] Document production configuration
- [ ] Document monitoring and logging

### Definition of Done (DoD)

- [ ] API documentation complete
- [ ] Developer documentation complete
- [ ] User documentation complete
- [ ] Security documentation complete
- [ ] Integration documentation complete
- [ ] Testing documentation complete
- [ ] Deployment documentation complete
- [ ] All documentation reviewed and approved
- [ ] Documentation is up-to-date with implementation

### Verification Steps

1. **Documentation Review:**
   - Review all documentation for completeness
   - Check for accuracy
   - Verify examples work
   - Check for broken links

2. **User Testing:**
   - Have developers review developer docs
   - Have users review user docs
   - Gather feedback
   - Update documentation

### Acceptance Criteria

- ✅ Complete documentation exists
- ✅ All documentation is accurate and up-to-date
- ✅ Examples work correctly
- ✅ Documentation is well-organized
- ✅ Documentation is accessible

### Technical Details

**Files to Create:**
- `doc/authorization/AUTHORIZATION_API.md`
- `doc/authorization/AUTHORIZATION_DEVELOPER_GUIDE.md`
- `doc/authorization/AUTHORIZATION_USER_GUIDE.md`
- `doc/authorization/AUTHORIZATION_SECURITY.md`
- `doc/authorization/AUTHORIZATION_INTEGRATION.md`
- `doc/authorization/AUTHORIZATION_TESTING.md`
- `doc/authorization/AUTHORIZATION_DEPLOYMENT.md`
- `doc/authorization/README.md` (index/overview)

**Files to Reference:**
- All previous authorization documentation tasks
- Implementation code
- Test files

**Notes:**
- Keep documentation up-to-date with code
- Use clear, concise language
- Include code examples
- Include diagrams where helpful
- Make documentation searchable

---

**End of Authorization System Tasks**

