# Architecture and Design Tasks

## TASK-ARCH-003: Domain-Driven Design (DDD) Architecture Design

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 10 hours
**Dependencies:** TASK-DOC-002, TASK-ARCH-001
**Related Tasks:** TASK-DB-006, TASK-API-001

### Description

Design the Domain-Driven Design (DDD) architecture for the LuxeNail application. This includes identifying bounded contexts, designing domain models, defining aggregates, establishing layered architecture, and creating a project structure that follows DDD principles. The goal is to organize the codebase around business domains rather than technical layers, making the system more maintainable and aligned with business logic.

### Requirements / What to Do

#### Step 1: Identify Bounded Contexts
- [ ] Analyze the application scope and identify distinct bounded contexts:
  - **Dashboard Management Context**: Administrative interface (metrics, promotions, content, gallery, employees)
  - **Booking Context**: Customer-facing appointment booking system (existing)
  - **Shared Kernel**: Common types and infrastructure (User, Service, authentication)
- [ ] Document each bounded context:
  - Scope and responsibilities
  - Domain entities and aggregates
  - Ubiquitous language (domain terms)
  - Integration points with other contexts
- [ ] Create context mapping diagram showing relationships between contexts
- [ ] File location: `.cursor/rules/ddd.mdc` (already created as draft - moved from doc/)

#### Step 2: Design Domain Model for Dashboard Context
- [ ] Identify core aggregates and their boundaries:
  - **Promotion Aggregate**: Campaign management, discount logic, targeting
  - **Metric Aggregate**: Business metrics, analytics, calculations
  - **ContentVersion Aggregate**: Website content, versioning, publishing
  - **GalleryImage Aggregate**: Image metadata, organization, categorization
  - **Employee Aggregate**: Employee accounts, specialties, calendar integration
  - **DashboardUser Aggregate**: Authentication, authorization, roles
- [ ] Design aggregate roots (entities with identity):
  - Define entity properties and business logic
  - Identify value objects (immutable, no identity)
  - Define aggregate boundaries and invariants
  - Document entity relationships
- [ ] Design value objects:
  - Money (amount, currency)
  - Email (validation, immutability)
  - PhoneNumber (validation, formatting)
  - DateTimeRange (start, end, validation)
  - Percentage (value, validation)
  - PromotionName, PromotionDescription
  - MetricType, DateRange
- [ ] Document domain events:
  - PromotionSentEvent
  - ContentPublishedEvent
  - EmployeeCreatedEvent
  - MetricCalculatedEvent
- [ ] Create domain model diagrams (aggregates, entities, value objects)

#### Step 3: Design Layered Architecture
- [ ] Define four layers with clear responsibilities:
  - **Domain Layer**: Entities, value objects, domain services, repository interfaces
    - No dependencies on infrastructure or application layers
    - Contains all business logic
  - **Application Layer**: Use cases, DTOs, application services, command/query handlers
    - Orchestrates domain objects
    - No business logic (delegates to domain)
  - **Infrastructure Layer**: Repository implementations, database, external services
    - Implements interfaces from domain layer
    - Handles all technical concerns
  - **Presentation Layer**: API controllers, routes, middleware, React frontend
    - Thin controllers, delegates to application services
    - Input validation and transformation
- [ ] Define dependency rules:
  - Inner layers don't depend on outer layers
  - Domain layer has no dependencies
  - Application depends on domain only
  - Infrastructure implements domain interfaces
  - Presentation depends on application and infrastructure
- [ ] Create layer dependency diagram

#### Step 4: Design Project Structure
- [ ] Design server-side structure following DDD:
  ```
  server/
  ├── src/
  │   ├── domain/                    # Domain layer
  │   │   ├── dashboard/             # Dashboard bounded context
  │   │   │   ├── entities/
  │   │   │   ├── value-objects/
  │   │   │   ├── domain-services/
  │   │   │   ├── repositories/      # Interfaces only
  │   │   │   └── events/
  │   │   ├── booking/               # Booking bounded context
  │   │   └── shared-kernel/
  │   ├── application/               # Application layer
  │   │   ├── dashboard/
  │   │   │   ├── use-cases/
  │   │   │   ├── dto/
  │   │   │   ├── commands/
  │   │   │   └── queries/
  │   ├── infrastructure/            # Infrastructure layer
  │   │   ├── persistence/
  │   │   ├── external-services/
  │   │   └── database/
  │   └── presentation/              # Presentation layer
  │       └── api/
  ```
- [ ] Design client-side structure (React frontend):
  - Keep feature-based organization
  - Services layer for API communication
  - Separate concerns from domain logic
- [ ] Document structure decisions and rationale
- [ ] Create directory structure guide

#### Step 5: Design Aggregates and Invariants
- [ ] Define aggregate roots and boundaries:
  - Promotion aggregate: Root = Promotion, contains PromotionId, Analytics
  - Metric aggregate: Root = Metric, contains DataPoints
  - ContentVersion aggregate: Root = ContentVersion (immutable after publish)
  - GalleryImage aggregate: Root = GalleryImage
  - Employee aggregate: Root = Employee
- [ ] Define aggregate invariants (rules that must always be true):
  - Promotion cannot be sent if expired
  - Promotion cannot be scheduled in the past
  - ContentVersion cannot be modified after publication
  - Metric data points must be within date range
- [ ] Design aggregate access patterns:
  - Always access aggregates through root entity
  - Ensure transactional boundaries
  - Define aggregate size and complexity limits
- [ ] Document aggregate design decisions

#### Step 6: Design Domain Services
- [ ] Identify operations that don't fit in entities:
  - PromotionDeliveryService: Orchestrates delivery across channels
  - MetricCalculationService: Complex metric calculations
  - ContentVersioningService: Version management logic
  - EmployeePerformanceService: Performance calculations
- [ ] Design domain service interfaces and implementations
- [ ] Document when to use domain services vs. entities

#### Step 7: Design Repository Pattern
- [ ] Define repository interfaces in domain layer:
  - IPromotionRepository
  - IMetricRepository
  - IContentRepository
  - IGalleryRepository
  - IEmployeeRepository
- [ ] Design repository methods:
  - findById(id): Promise<Aggregate | null>
  - findByCriteria(criteria): Promise<Aggregate[]>
  - save(aggregate): Promise<void>
  - delete(id): Promise<void>
- [ ] Plan repository implementations in infrastructure layer:
  - TypeORM/Prisma integration
  - Database entity mapping
  - Domain entity <-> DB entity mappers
- [ ] Document repository pattern usage

#### Step 8: Design Application Services (Use Cases)
- [ ] Design use cases for dashboard features:
  - Metrics: GetRevenueMetrics, GetEmployeePerformance, ExportMetrics
  - Promotions: CreatePromotion, SendPromotion, SchedulePromotion, TrackPromotionPerformance
  - Content: EditContent, PublishContent, RevertContentVersion
  - Gallery: UploadImage, UpdateImageMetadata, DeleteImage
  - Employees: CreateEmployee, UpdateEmployee, DeactivateEmployee
- [ ] Design use case structure:
  - Input: Command/Query objects
  - Process: Orchestrate domain objects
  - Output: DTOs
- [ ] Document use case patterns and conventions
- [ ] Optional: Design CQRS pattern for complex read/write separation

#### Step 9: Design Value Objects
- [ ] Design core value objects with validation:
  - Money: amount, currency, immutability, validation
  - Email: value, validation, immutability
  - PhoneNumber: value, validation, formatting
  - DateTimeRange: start, end, validation, duration calculations
  - Percentage: value, validation, formatting
- [ ] Design domain-specific value objects:
  - PromotionName, PromotionDescription
  - MetricType, TimeGranularity
  - ContentSection, ContentStatus
  - GalleryCategory, ImageStatus
- [ ] Document value object design principles:
  - Immutability
  - Validation in constructor
  - Equality based on value, not identity
  - Factory methods for creation

#### Step 10: Design Context Mapping and Integration
- [ ] Map relationships between bounded contexts:
  - Dashboard Management → Booking Context (reads appointments, services)
  - Shared Kernel usage (User, Service basic types)
- [ ] Design integration patterns:
  - Customer-Supplier: Dashboard reads from Booking
  - Conformist: Dashboard conforms to Booking's data model
  - Anticorruption Layer: Translation if needed
- [ ] Design shared kernel boundaries:
  - What is shared (User base, Service basic, Auth)
  - What is not shared (domain-specific logic)
- [ ] Create context mapping diagram

#### Step 11: Create Implementation Guidelines
- [ ] Document DDD implementation patterns:
  - How to create entities
  - How to create value objects
  - How to design aggregates
  - How to implement repositories
  - How to write use cases
  - How to handle domain events
- [ ] Create code examples and templates:
  - Entity template
  - Value object template
  - Repository interface template
  - Use case template
  - Domain service template
- [ ] Document migration strategy from existing code:
  - How to extract domain logic from services
  - How to create domain entities from types
  - How to refactor to layered architecture
- [ ] Document testing strategy:
  - Unit tests for domain layer
  - Integration tests for use cases
  - Repository tests

#### Step 12: Create Architecture Documentation
- [ ] Complete `.cursor/rules/ddd.mdc` with all sections:
  - Overview and key concepts
  - Bounded contexts documentation
  - Domain model design
  - Layered architecture details
  - Project structure
  - Aggregates and invariants
  - Domain services
  - Application services
  - Repository pattern
  - Value objects
  - Context mapping
  - Implementation guidelines
- [ ] Create architecture diagrams:
  - Bounded contexts diagram
  - Layer architecture diagram
  - Aggregate diagrams
  - Context mapping diagram
  - Domain model diagram
- [ ] Document DDD principles and practices:
  - Ubiquitous language
  - Domain model design patterns
  - Aggregate design guidelines
  - Repository pattern best practices

### Definition of Done (DoD)

- [ ] All bounded contexts identified and documented
- [ ] Domain model designed for dashboard context
- [ ] Aggregates defined with clear boundaries
- [ ] Layered architecture designed and documented
- [ ] Project structure following DDD principles designed
- [ ] Repository pattern designed
- [ ] Application services (use cases) designed
- [ ] Value objects designed
- [ ] Context mapping completed
- [ ] Implementation guidelines created
- [ ] Architecture documentation complete with diagrams
- [ ] Code examples and templates provided
- [ ] Migration strategy documented
- [ ] Architecture reviewed for DDD best practices

### Verification Steps

1. **Architecture Review:**
   - Review bounded context identification
   - Verify domain model aligns with business requirements
   - Check aggregate boundaries are appropriate
   - Validate layer dependencies follow DDD principles
   - Ensure project structure supports DDD

2. **DDD Principles Validation:**
   - Verify domain layer has no infrastructure dependencies
   - Check aggregates maintain invariants
   - Validate repository pattern abstraction
   - Ensure ubiquitous language is used consistently
   - Review aggregate size and complexity

3. **Documentation Review:**
   - Verify all sections are complete
   - Check diagrams are clear and accurate
   - Validate code examples are correct
   - Ensure implementation guidelines are actionable

### Acceptance Criteria

- ✅ Complete DDD architecture documentation exists
- ✅ Bounded contexts are clearly identified and documented
- ✅ Domain model reflects business domain accurately
- ✅ Aggregates are properly designed with clear boundaries
- ✅ Layered architecture follows DDD principles
- ✅ Project structure supports DDD implementation
- ✅ Repository pattern is properly abstracted
- ✅ Use cases are designed following application service pattern
- ✅ Value objects are designed with validation and immutability
- ✅ Context mapping shows clear relationships
- ✅ Implementation guidelines are clear and actionable
- ✅ Architecture is maintainable and scalable

### Technical Details

**Files to Create/Update:**
- `.cursor/rules/ddd.mdc` (complete the draft)
- `doc/diagrams/ddd-bounded-contexts.mmd` (and .svg)
- `doc/diagrams/ddd-layered-architecture.mmd` (and .svg)
- `doc/diagrams/ddd-aggregates.mmd` (and .svg)
- `doc/diagrams/ddd-context-mapping.mmd` (and .svg)
- `doc/diagrams/ddd-domain-model.mmd` (and .svg)

**Key Design Decisions to Document:**
- Bounded context boundaries and rationale
- Aggregate design decisions
- Layer separation strategy
- Repository pattern approach
- Value object vs entity decisions
- Integration patterns between contexts

**Related Documents:**
- [Dashboard Requirements](doc/DASHBOARD_REQUIREMENTS.md)
- [Backend Architecture](doc/ARCHITECTURE.md) - *To be created in TASK-ARCH-001*
- [Database Design](doc/DATABASE_DESIGN.md) - *To be created in TASK-DB-006*

**Completion Date:**
**Completed By:**
**Notes:**

