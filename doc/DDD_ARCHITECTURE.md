# Domain-Driven Design (DDD) Architecture

**Document Version:** 1.0  
**Date:** 2025-01-24  
**Status:** Draft  
**Related Tasks:** TASK-ARCH-003

## Table of Contents

1. [Overview](#overview)
2. [Bounded Contexts](#bounded-contexts)
3. [Domain Model](#domain-model)
4. [Layered Architecture](#layered-architecture)
5. [Project Structure](#project-structure)
6. [Domain Entities and Value Objects](#domain-entities-and-value-objects)
7. [Aggregates](#aggregates)
8. [Domain Services](#domain-services)
9. [Application Services](#application-services)
10. [Repository Pattern](#repository-pattern)
11. [Context Mapping](#context-mapping)
12. [Implementation Guidelines](#implementation-guidelines)

---

## Overview

This document defines the Domain-Driven Design (DDD) architecture for the LuxeNail salon website application. DDD helps us organize complex business logic, maintain clear boundaries between different parts of the system, and ensure that the code structure reflects the business domain.

### Key DDD Concepts

- **Bounded Context**: A boundary within which a particular domain model applies. Each bounded context has its own domain model, language (Ubiquitous Language), and implementation.
- **Domain Model**: The representation of the business concepts, rules, and logic in code.
- **Aggregate**: A cluster of domain objects treated as a single unit with a clear boundary and a root entity.
- **Entity**: An object with a unique identity that persists over time.
- **Value Object**: An object defined by its attributes rather than identity (e.g., Money, Address).
- **Domain Service**: Operations that don't naturally fit within an entity or value object.
- **Repository**: Abstraction for accessing aggregates from persistence.
- **Application Service**: Orchestrates domain objects to perform use cases.

---

## Bounded Contexts

The LuxeNail application consists of multiple bounded contexts, each representing a distinct area of the business domain with its own domain model and language.

### 1. Dashboard Management Context

**Scope**: Administrative interface for managing business operations, metrics, promotions, content, and employees.

**Responsibilities**:
- Business metrics and analytics
- Promotion campaign management
- Website content editing and versioning
- Gallery image management
- Employee account management
- Calendar and appointment viewing
- Role-based access control

**Domain Entities**:
- `Metric` (revenue, appointments, customers)
- `Promotion` (campaigns, discounts, targeting)
- `ContentVersion` (content history and versioning)
- `GalleryImage` (image metadata and organization)
- `Employee` (admin users with roles and permissions)
- `DashboardUser` (authentication and authorization)

**Key Use Cases**:
- View business performance metrics
- Create and send promotional campaigns
- Edit and publish website content
- Manage gallery images
- Manage employee accounts
- View and manage appointments

**Out of Scope**:
- Customer-facing booking (separate bounded context)
- Payment processing
- Complex employee scheduling

### 2. Booking Context (Existing)

**Scope**: Customer-facing appointment booking system.

**Responsibilities**:
- Service selection and booking
- Appointment creation and management
- Customer account management (basic)
- Service availability checking
- Booking flow orchestration

**Domain Entities**:
- `Appointment` (customer bookings)
- `Service` (available services with pricing)
- `Customer` (customer information)
- `TimeSlot` (available booking times)
- `BookingSession` (temporary booking state)

### 3. Shared Kernel

**Shared concepts used across multiple contexts**:
- Common types (User, Service, Appointment basic structure)
- Authentication/Authorization infrastructure
- Common value objects (Email, PhoneNumber, Money, DateTimeRange)

---

## Domain Model

### Core Domain Entities

#### Dashboard Management Context

**Promotion Aggregate**
```
Promotion (Aggregate Root)
├── PromotionId (Value Object)
├── Name (Value Object)
├── Description (Value Object)
├── DiscountType (Enum: Percentage, Dollar, FreeService, BOGO)
├── DiscountValue (Value Object: Money or Percentage)
├── TargetServices (Collection of ServiceId)
├── TargetSegment (Value Object)
├── ExpirationDate (Value Object)
├── Status (Enum: Draft, Scheduled, Sent, Completed, Cancelled)
├── DeliveryMethods (Value Object)
├── ScheduledSendDate (Optional DateTime)
├── Recipients (Collection of CustomerId)
└── Analytics (Embedded Value Object)
    ├── DeliveryStatus
    ├── OpenRate
    ├── ClickRate
    └── RedemptionRate
```

**Metric Aggregate**
```
Metric (Aggregate Root)
├── MetricId (Value Object)
├── MetricType (Enum: Revenue, Appointments, Customers, EmployeePerformance)
├── DateRange (Value Object)
├── TimeGranularity (Enum: Hourly, Daily, Weekly, Monthly, Yearly)
├── DataPoints (Collection of MetricDataPoint)
└── ComparisonData (Optional Value Object for period comparison)
```

**ContentVersion Aggregate**
```
ContentVersion (Aggregate Root)
├── ContentVersionId (Value Object)
├── ContentSection (Enum: LandingHero, Services, About, Contact, Legal)
├── Content (Value Object: RichText or StructuredData)
├── Status (Enum: Draft, Published, Archived)
├── VersionNumber (Value Object)
├── CreatedBy (UserId)
├── CreatedAt (DateTime)
├── PublishedAt (Optional DateTime)
└── Metadata (Value Object: ChangeNotes, etc.)
```

**GalleryImage Aggregate**
```
GalleryImage (Aggregate Root)
├── GalleryImageId (Value Object)
├── Filename (Value Object)
├── Url (Value Object)
├── Category (Enum: Manicure, Pedicure, Eyelash, Waxing, General)
├── Title (Optional Value Object)
├── Description (Optional Value Object)
├── AltText (Optional Value Object)
├── DisplayOrder (Value Object)
├── Status (Enum: Active, Hidden, Archived)
├── UploadedBy (UserId)
└── UploadDate (DateTime)
```

**Employee Aggregate** (Dashboard Management)
```
Employee (Aggregate Root)
├── EmployeeId (Value Object)
├── UserId (Reference to User in Shared Kernel)
├── Specialties (Collection of Specialty Enum)
├── CalendarColor (Value Object)
├── Status (Enum: Active, Inactive, Suspended)
├── PerformanceMetrics (Optional Embedded Value Object)
└── Notes (Optional Value Object)
```

**DashboardUser Aggregate**
```
DashboardUser (Aggregate Root)
├── UserId (Value Object)
├── Email (Value Object)
├── PasswordHash (Value Object)
├── Role (Enum: Owner, Manager, Admin, Employee)
├── Permissions (Collection of Permission Enum)
├── LastLogin (Optional DateTime)
└── CreatedAt (DateTime)
```

---

## Layered Architecture

The application follows a layered architecture pattern with clear separation of concerns:

### 1. Domain Layer

**Purpose**: Contains business logic, entities, value objects, and domain services. This layer has no dependencies on infrastructure or application layers.

**Structure**:
```
domain/
├── entities/              # Aggregate roots and entities
│   ├── promotion/
│   │   ├── Promotion.ts
│   │   ├── PromotionId.ts
│   │   └── PromotionStatus.ts
│   ├── metric/
│   ├── content/
│   ├── gallery/
│   ├── employee/
│   └── user/
├── value-objects/         # Immutable value objects
│   ├── Money.ts
│   ├── Email.ts
│   ├── PhoneNumber.ts
│   ├── DateTimeRange.ts
│   └── Percentage.ts
├── domain-services/       # Domain logic that doesn't fit in entities
│   ├── PromotionDeliveryService.ts
│   ├── MetricCalculationService.ts
│   └── ContentVersioningService.ts
├── repositories/          # Repository interfaces (not implementations)
│   ├── IPromotionRepository.ts
│   ├── IMetricRepository.ts
│   ├── IContentRepository.ts
│   └── IGalleryRepository.ts
└── events/                # Domain events
    ├── PromotionSentEvent.ts
    └── ContentPublishedEvent.ts
```

**Principles**:
- Entities contain business logic, not just data
- Value objects are immutable
- No infrastructure dependencies
- Domain services contain operations that don't naturally belong to entities
- Repository interfaces defined here, implementations in infrastructure

### 2. Application Layer

**Purpose**: Orchestrates domain objects to fulfill use cases. Contains application services, DTOs, and command/query handlers.

**Structure**:
```
application/
├── use-cases/             # Use case implementations
│   ├── metrics/
│   │   ├── GetRevenueMetrics.ts
│   │   ├── GetEmployeePerformance.ts
│   │   └── ExportMetrics.ts
│   ├── promotions/
│   │   ├── CreatePromotion.ts
│   │   ├── SendPromotion.ts
│   │   ├── SchedulePromotion.ts
│   │   └── TrackPromotionPerformance.ts
│   ├── content/
│   │   ├── EditContent.ts
│   │   ├── PublishContent.ts
│   │   └── RevertContentVersion.ts
│   ├── gallery/
│   │   ├── UploadImage.ts
│   │   ├── UpdateImageMetadata.ts
│   │   └── DeleteImage.ts
│   └── employees/
│       ├── CreateEmployee.ts
│       ├── UpdateEmployee.ts
│       └── DeactivateEmployee.ts
├── dto/                   # Data Transfer Objects
│   ├── MetricDto.ts
│   ├── PromotionDto.ts
│   ├── ContentDto.ts
│   └── EmployeeDto.ts
├── commands/              # Command objects (CQRS pattern)
│   ├── CreatePromotionCommand.ts
│   ├── SendPromotionCommand.ts
│   └── PublishContentCommand.ts
├── queries/               # Query objects (CQRS pattern)
│   ├── GetMetricsQuery.ts
│   ├── GetPromotionAnalyticsQuery.ts
│   └── GetContentHistoryQuery.ts
└── mappers/               # Entity to DTO mappers
    ├── PromotionMapper.ts
    ├── MetricMapper.ts
    └── EmployeeMapper.ts
```

**Principles**:
- Application services coordinate domain objects
- No business logic in application layer
- DTOs for data transfer across layer boundaries
- Use cases are thin, delegate to domain
- Optional: CQRS pattern for complex read/write separation

### 3. Infrastructure Layer

**Purpose**: Provides technical capabilities: database access, external services, file storage, etc.

**Structure**:
```
infrastructure/
├── persistence/           # Database implementations
│   ├── repositories/
│   │   ├── PromotionRepository.ts
│   │   ├── MetricRepository.ts
│   │   ├── ContentRepository.ts
│   │   └── GalleryRepository.ts
│   ├── entities/         # Database entities (TypeORM/Prisma)
│   │   ├── PromotionEntity.ts
│   │   ├── MetricEntity.ts
│   │   └── ...
│   └── mappers/          # Domain entity <-> DB entity mappers
│       ├── PromotionMapper.ts
│       └── ...
├── external-services/     # External service integrations
│   ├── email/
│   │   └── EmailService.ts
│   ├── sms/
│   │   └── SmsService.ts
│   ├── ai/
│   │   └── GeminiService.ts
│   └── storage/
│       └── FileStorageService.ts
├── database/             # Database configuration
│   ├── data-source.ts
│   └── migrations/
└── config/               # Configuration
    └── env.ts
```

**Principles**:
- Implements interfaces defined in domain layer
- Handles all technical concerns
- Isolated from business logic
- Database entities separate from domain entities (optional but recommended)

### 4. Presentation Layer

**Purpose**: User interface and API endpoints. Handles HTTP requests, validation, authentication.

**Structure**:
```
presentation/
├── api/                  # REST API endpoints
│   ├── routes/
│   │   ├── metrics.routes.ts
│   │   ├── promotions.routes.ts
│   │   ├── content.routes.ts
│   │   ├── gallery.routes.ts
│   │   └── employees.routes.ts
│   ├── controllers/
│   │   ├── MetricsController.ts
│   │   ├── PromotionsController.ts
│   │   ├── ContentController.ts
│   │   └── GalleryController.ts
│   ├── middleware/
│   │   ├── authentication.ts
│   │   ├── authorization.ts
│   │   └── validation.ts
│   └── dto/              # Request/Response DTOs
│       ├── CreatePromotionRequest.ts
│       └── MetricResponse.ts
└── client/               # React frontend (separate package)
    ├── components/
    ├── services/         # API client services
    └── ...
```

**Principles**:
- Thin controllers, delegate to application services
- Input validation at API boundary
- Authentication/authorization middleware
- Transform DTOs to/from domain objects

---

## Project Structure

### Recommended Server Structure

```
server/
├── src/
│   ├── domain/                    # Domain layer
│   │   ├── dashboard/             # Dashboard bounded context
│   │   │   ├── entities/
│   │   │   ├── value-objects/
│   │   │   ├── domain-services/
│   │   │   ├── repositories/
│   │   │   └── events/
│   │   ├── booking/               # Booking bounded context
│   │   │   └── ...
│   │   └── shared-kernel/         # Shared code
│   │       ├── entities/
│   │       └── value-objects/
│   ├── application/               # Application layer
│   │   ├── dashboard/
│   │   │   ├── use-cases/
│   │   │   ├── dto/
│   │   │   ├── commands/
│   │   │   └── queries/
│   │   └── booking/
│   │       └── ...
│   ├── infrastructure/            # Infrastructure layer
│   │   ├── persistence/
│   │   ├── external-services/
│   │   ├── database/
│   │   └── config/
│   ├── presentation/              # Presentation layer
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   └── dto/
│   │   └── validation/
│   └── index.ts                   # Application entry point
├── tests/
│   ├── unit/
│   │   ├── domain/
│   │   └── application/
│   ├── integration/
│   │   └── api/
│   └── e2e/
├── package.json
└── tsconfig.json
```

### Client Structure (Frontend)

The client can remain more feature-focused since it's primarily a presentation layer:

```
client/
├── src/
│   ├── components/                # React components
│   │   ├── dashboard/             # Dashboard features
│   │   │   ├── metrics/
│   │   │   ├── promotions/
│   │   │   ├── content/
│   │   │   ├── gallery/
│   │   │   └── employees/
│   │   ├── booking/               # Booking features
│   │   └── shared/                # Shared UI components
│   ├── services/                  # API client services
│   │   ├── api/
│   │   │   ├── metricsApi.ts
│   │   │   ├── promotionsApi.ts
│   │   │   └── ...
│   │   └── ...
│   ├── types/                     # TypeScript types (shared with server)
│   ├── hooks/                     # React hooks
│   └── utils/                     # Utility functions
└── ...
```

---

## Domain Entities and Value Objects

### Entities

Entities have identity and lifecycle. Examples:

```typescript
// Domain Entity Example
export class Promotion {
  private constructor(
    private readonly id: PromotionId,
    private name: PromotionName,
    private description: PromotionDescription,
    private discountType: DiscountType,
    private discountValue: DiscountValue,
    // ... other fields
  ) {}

  // Factory method
  static create(props: CreatePromotionProps): Promotion {
    // Validation and business rules
    return new Promotion(...);
  }

  // Business methods
  schedule(sendDate: DateTime): void {
    // Business logic for scheduling
    this.status = PromotionStatus.Scheduled;
    this.scheduledSendDate = sendDate;
  }

  send(recipients: CustomerId[]): void {
    // Business logic for sending
    if (this.status !== PromotionStatus.Scheduled && 
        this.status !== PromotionStatus.Draft) {
      throw new Error('Cannot send promotion in current state');
    }
    this.status = PromotionStatus.Sent;
    this.recipients = recipients;
    // Publish domain event
    DomainEvents.publish(new PromotionSentEvent(this.id));
  }
}
```

### Value Objects

Value objects are immutable and defined by their attributes:

```typescript
// Value Object Example
export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: string = 'USD'
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  static create(amount: number, currency: string = 'USD'): Money {
    return new Money(amount, currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

export class Email {
  private constructor(public readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email address');
    }
  }

  static create(email: string): Email {
    return new Email(email);
  }

  private isValid(email: string): boolean {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
```

---

## Aggregates

Aggregates are consistency boundaries. Each aggregate has one root entity.

### Promotion Aggregate

**Root**: `Promotion`

**Boundary**: 
- Promotion and its analytics (embedded value object)
- Promotion recipients (collection of IDs, not full entities)

**Invariants**:
- Promotion cannot be sent if expired
- Promotion cannot be scheduled in the past
- Discount value must be valid for discount type

**Access**: Always through Promotion root entity

### Metric Aggregate

**Root**: `Metric`

**Boundary**:
- Metric and its data points

**Invariants**:
- Data points must be within date range
- Metric type must match data point structure

### ContentVersion Aggregate

**Root**: `ContentVersion`

**Boundary**:
- Single content version (immutable once published)

**Invariants**:
- Version number must be sequential
- Cannot modify published version (must create new version)

---

## Domain Services

Domain services contain operations that don't naturally fit within entities:

```typescript
export class PromotionDeliveryService {
  constructor(
    private emailService: IEmailService,
    private smsService: ISmsService
  ) {}

  async deliver(promotion: Promotion, recipients: CustomerId[]): Promise<DeliveryResult> {
    // Orchestrates delivery across multiple channels
    // This logic doesn't belong in Promotion entity
    // because it involves external services
  }
}

export class MetricCalculationService {
  calculateRevenueMetrics(
    dateRange: DateTimeRange,
    granularity: TimeGranularity
  ): RevenueMetrics {
    // Complex calculation logic that involves
    // multiple data sources
  }
}
```

---

## Application Services

Application services orchestrate domain objects to fulfill use cases:

```typescript
export class CreatePromotionUseCase {
  constructor(
    private promotionRepository: IPromotionRepository,
    private aiService: IAIService
  ) {}

  async execute(command: CreatePromotionCommand): Promise<PromotionDto> {
    // 1. Validate command
    // 2. Optionally use AI to generate content
    // 3. Create domain entity
    const promotion = Promotion.create({
      name: PromotionName.create(command.name),
      description: command.useAI 
        ? await this.generateDescription(command)
        : PromotionDescription.create(command.description),
      // ... other fields
    });

    // 4. Persist
    await this.promotionRepository.save(promotion);

    // 5. Return DTO
    return PromotionMapper.toDto(promotion);
  }

  private async generateDescription(command: CreatePromotionCommand): Promise<PromotionDescription> {
    const generated = await this.aiService.generatePromotionDescription({
      type: command.discountType,
      value: command.discountValue,
      services: command.targetServices
    });
    return PromotionDescription.create(generated);
  }
}
```

---

## Repository Pattern

Repositories provide abstraction for data access:

```typescript
// Domain layer (interface)
export interface IPromotionRepository {
  findById(id: PromotionId): Promise<Promotion | null>;
  findByStatus(status: PromotionStatus): Promise<Promotion[]>;
  save(promotion: Promotion): Promise<void>;
  delete(id: PromotionId): Promise<void>;
}

// Infrastructure layer (implementation)
export class PromotionRepository implements IPromotionRepository {
  constructor(private dataSource: DataSource) {}

  async findById(id: PromotionId): Promise<Promotion | null> {
    const entity = await this.dataSource
      .getRepository(PromotionEntity)
      .findOne({ where: { id: id.value } });
    
    return entity ? PromotionMapper.toDomain(entity) : null;
  }

  async save(promotion: Promotion): Promise<void> {
    const entity = PromotionMapper.toEntity(promotion);
    await this.dataSource.getRepository(PromotionEntity).save(entity);
  }

  // ... other methods
}
```

---

## Context Mapping

Context mapping shows relationships between bounded contexts:

```
┌─────────────────────────┐
│ Dashboard Management    │
│ Context                 │
│                         │
│ - Promotion             │
│ - Metric                │
│ - Content               │
│ - Gallery               │
└────────────┬────────────┘
             │
             │ Uses (Read-only)
             │
┌────────────▼────────────┐
│ Booking Context         │
│                         │
│ - Appointment           │
│ - Service               │
│ - Customer              │
└─────────────────────────┘

┌─────────────────────────┐
│ Shared Kernel           │
│                         │
│ - User (base)           │
│ - Service (basic)       │
│ - Authentication        │
└─────────────────────────┘
```

**Relationship Types**:
- **Shared Kernel**: Common code shared between contexts
- **Customer-Supplier**: One context depends on another (Dashboard reads from Booking)
- **Conformist**: Dashboard must conform to Booking's data model for appointments
- **Anticorruption Layer**: Translation layer if needed

---

## Implementation Guidelines

### 1. Start with Domain Layer

- Define entities, value objects, and domain services
- Establish aggregate boundaries
- Define repository interfaces
- No infrastructure dependencies

### 2. Implement Application Layer

- Create use cases for each requirement
- Use DTOs for data transfer
- Keep use cases thin, delegate to domain

### 3. Implement Infrastructure Layer

- Implement repository interfaces
- Integrate external services
- Handle database concerns

### 4. Implement Presentation Layer

- Create API endpoints
- Add authentication/authorization
- Validate inputs
- Transform DTOs

### 5. Testing Strategy

- **Unit Tests**: Domain entities, value objects, domain services
- **Integration Tests**: Use cases with real repositories
- **E2E Tests**: API endpoints

### 6. Code Organization Principles

- **Feature-first structure**: Organize by bounded context, then by layer
- **Dependency rule**: Inner layers don't depend on outer layers
- **Domain events**: Use for cross-aggregate communication
- **Immutable value objects**: Always create new instances

### 7. Migration Path

If refactoring existing code:

1. Identify bounded contexts
2. Extract domain entities from existing code
3. Create value objects for complex types
4. Move business logic into domain layer
5. Create application services to replace service layer
6. Implement repositories
7. Update presentation layer to use application services

---

## Related Documentation

- [Dashboard Requirements](DASHBOARD_REQUIREMENTS.md) - Requirements for dashboard features
- [Backend Architecture](BACKEND_ARCHITECTURE.md) - *To be created* - Technical architecture details
- [Database Design](DATABASE_DESIGN.md) - *To be created* - Database schema design

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-24 | AI Assistant | Initial DDD architecture document |

---

**End of Document**

