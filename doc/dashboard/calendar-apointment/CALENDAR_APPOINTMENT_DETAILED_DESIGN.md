# Calendar and Appointment Viewing - Detailed Design

**Document Version:** 1.1  
**Date:** 2025-01-24  
**Status:** Draft  
**Last Updated:** 2025-01-24  
**Related Tasks:** TASK-DOC-012  
**Related Documents:** 
- [Calendar and Appointment Viewing Architecture](./CALENDAR_APPOINTMENT_ARCHITECTURE.md)
- [Calendar and Appointment Viewing Requirements](./CALENDAR_APPOINTMENT_REQUIREMENTS.md)
- [Dashboard Requirements](../../DASHBOARD_REQUIREMENTS.md#calendar-and-appointment-viewing)

## Table of Contents

1. [Overview](#overview)
2. [Domain Layer Design](#domain-layer-design)
3. [Application Layer Design](#application-layer-design)
4. [Infrastructure Layer Design](#infrastructure-layer-design)
5. [Presentation Layer Design](#presentation-layer-design)
6. [Data Transfer Objects (DTOs)](#data-transfer-objects-dtos)
7. [Validation Schemas](#validation-schemas)
8. [Error Handling](#error-handling)
9. [Design Patterns](#design-patterns)
10. [Implementation Guidelines](#implementation-guidelines)

---

## Overview

### Purpose

This document provides detailed class and component designs for the Calendar and Appointment Viewing system. It defines the structure of code components, classes, modules, interfaces, and data structures following Domain-Driven Design (DDD) principles.

### Design Principles

- **Domain-Driven Design**: Clear separation of concerns across domain, application, infrastructure, and presentation layers
- **Single Responsibility**: Each class/component has one clear purpose
- **Dependency Inversion**: Depend on abstractions (interfaces), not concrete implementations
- **Immutability**: Value objects are immutable and validated
- **Type Safety**: Strong TypeScript typing throughout
- **Testability**: Design for easy unit testing and mocking

### Document Structure

This document is organized by layer:
1. **Domain Layer**: Business entities, value objects, domain services, repository interfaces
2. **Application Layer**: Use cases, application services, DTOs, mappers
3. **Infrastructure Layer**: Repository implementations, database entities, external integrations
4. **Presentation Layer**: API controllers, React components, validation schemas

### Dependency Injection Framework

**Current Server Stack:** Express.js with TypeORM (minimal codebase - only health endpoint)

**Recommended Approach:** **NestJS** - A stable, scalable framework with excellent built-in dependency injection.

**Why NestJS is the Right Choice:**

1. **Mature & Stable**: Production-ready framework used by many enterprise applications
2. **Excellent DI**: Built-in dependency injection container (no additional framework needed)
3. **TypeORM Integration**: First-class support for TypeORM (which we're already using)
4. **Scalability**: Designed for large, maintainable applications
5. **Developer Experience**: 
   - Decorator-based API (clean, readable code)
   - Built-in validation (class-validator)
   - Built-in guards, interceptors, pipes
   - Excellent TypeScript support
   - Comprehensive testing utilities
6. **Migration Cost**: Minimal - current Express codebase is very small (only health endpoint)
7. **Future-Proof**: Industry standard for TypeScript Node.js applications
8. **Documentation**: Extensive, well-maintained documentation and community

**Migration Path:**
- Current Express setup is minimal (just health endpoint)
- NestJS can be adopted incrementally
- TypeORM integration is seamless
- All design patterns in this document align with NestJS conventions

**Note:** All code examples in this document use NestJS patterns (`@Injectable`, `@Controller`, `@InjectRepository`, etc.) as this is the recommended framework for this project.

### NestJS File Structure

The Calendar feature follows NestJS module-based organization while maintaining DDD layer separation:

```
server/src/
├── calendar/                          # Calendar feature module
│   ├── calendar.module.ts             # NestJS module definition
│   ├── calendar.controller.ts         # API controllers (Presentation Layer)
│   ├── dto/                           # Data Transfer Objects
│   │   ├── requests/                  # Request DTOs
│   │   │   ├── create-appointment.dto.ts
│   │   │   ├── update-appointment.dto.ts
│   │   │   └── change-status.dto.ts
│   │   ├── responses/                 # Response DTOs
│   │   │   ├── appointment.dto.ts
│   │   │   └── appointment-list.dto.ts
│   │   └── validation/               # Validation schemas
│   │       └── appointment.schema.ts
│   ├── services/                      # Application services (Application Layer)
│   │   ├── get-appointments.service.ts
│   │   ├── create-appointment.service.ts
│   │   ├── update-appointment.service.ts
│   │   ├── change-appointment-status.service.ts
│   │   ├── bulk-change-status.service.ts
│   │   └── check-availability.service.ts
│   ├── domain/                        # Domain layer
│   │   ├── entities/                  # Domain entities
│   │   │   ├── appointment.entity.ts
│   │   │   └── appointment-status-history.entity.ts
│   │   ├── value-objects/             # Value objects
│   │   │   ├── time-slot.vo.ts
│   │   │   ├── appointment-status.vo.ts
│   │   │   ├── appointment-source.vo.ts
│   │   │   └── service-id-code.vo.ts
│   │   ├── services/                  # Domain services
│   │   │   ├── conflict-detection.service.ts
│   │   │   ├── availability.service.ts
│   │   │   └── service-duration-calculator.service.ts
│   │   ├── repositories/              # Repository interfaces
│   │   │   ├── appointment.repository.interface.ts
│   │   │   └── appointment-status-history.repository.interface.ts
│   │   └── errors/                    # Domain errors
│   │       └── appointment-errors.ts
│   └── infrastructure/                # Infrastructure layer
│       ├── repositories/              # Repository implementations
│       │   ├── appointment.repository.ts
│       │   └── appointment-status-history.repository.ts
│       ├── database/                  # TypeORM entities
│       │   ├── entities/
│       │   │   ├── appointment.entity.ts
│       │   │   ├── appointment-service.entity.ts
│       │   │   └── appointment-status-history.entity.ts
│       │   └── migrations/           # Database migrations
│       └── mappers/                   # Entity mappers
│           └── appointment.mapper.ts
├── common/                            # Shared code across features
│   ├── guards/                        # Authentication/authorization guards
│   ├── decorators/                    # Custom decorators
│   ├── filters/                       # Exception filters
│   ├── interceptors/                  # Interceptors
│   └── pipes/                         # Validation pipes
├── config/                            # Configuration
│   └── database.config.ts
└── main.ts                            # Application entry point
```

**Key Structure Principles:**

1. **Feature Module**: All calendar-related code is in `calendar/` folder
2. **Layer Organization**: Within the module, code is organized by DDD layers (domain, application, infrastructure, presentation)
3. **Naming Conventions**: 
   - Files use kebab-case (e.g., `appointment.entity.ts`)
   - Classes use PascalCase (e.g., `AppointmentEntity`)
   - Value objects use `.vo.ts` suffix
   - Services use `.service.ts` suffix
4. **Module File**: `calendar.module.ts` defines all providers, controllers, and imports
5. **Shared Code**: Common guards, decorators, filters go in `common/` folder

**File Path Examples:**

- Domain Entity: `server/src/calendar/domain/entities/appointment.entity.ts`
- Value Object: `server/src/calendar/domain/value-objects/time-slot.vo.ts`
- Domain Service: `server/src/calendar/domain/services/conflict-detection.service.ts`
- Application Service: `server/src/calendar/services/get-appointments.service.ts`
- Repository: `server/src/calendar/infrastructure/repositories/appointment.repository.ts`
- TypeORM Entity: `server/src/calendar/infrastructure/database/entities/appointment.entity.ts`
- Controller: `server/src/calendar/calendar.controller.ts`
- DTO: `server/src/calendar/dto/requests/create-appointment.dto.ts`

### Injectable Classes Summary

**Classes that need `@Injectable()` decorator:**

1. **Domain Services** (injectable for use in application layer):
   - `ConflictDetectionService` - No dependencies
   - `AvailabilityService` - No dependencies
   - `ServiceDurationCalculator` - No dependencies

2. **Application Services** (injectable, depend on repositories and domain services):
   - `GetAppointmentsService` - Depends on `IAppointmentRepository`
   - `CreateAppointmentService` - Depends on `IAppointmentRepository`, `ConflictDetectionService`, `ServiceDurationCalculator`
   - `UpdateAppointmentService` - Depends on `IAppointmentRepository`, `ConflictDetectionService`
   - `ChangeAppointmentStatusService` - Depends on `IAppointmentRepository`, `IAppointmentStatusHistoryRepository`
   - `BulkChangeStatusService` - Depends on `IAppointmentRepository`, `IAppointmentStatusHistoryRepository`
   - `CheckAvailabilityService` - Depends on `IAppointmentRepository`, `AvailabilityService`

3. **Repository Implementations** (injectable, use `@InjectRepository()` for TypeORM):
   - `AppointmentRepository` - Depends on `Repository<AppointmentEntity>` (via `@InjectRepository()`)
   - `AppointmentStatusHistoryRepository` - Depends on `Repository<AppointmentStatusHistoryEntity>` (via `@InjectRepository()`)

4. **Controllers** (use `@Controller()`, automatically injectable):
   - `CalendarController` - Depends on all application services

**Classes that do NOT need `@Injectable()`:**

1. **Value Objects** - Immutable, no dependencies (e.g., `TimeSlot`, `AppointmentStatus`, `AppointmentSource`, `ServiceIdCode`)
2. **Domain Entities** - Created via static factory methods, no dependencies (e.g., `Appointment`, `AppointmentStatusHistory`)
3. **Mappers** - Use static methods, no dependencies (e.g., `AppointmentMapper`)
4. **DTOs** - Plain interfaces/types, no dependencies
5. **Repository Interfaces** - TypeScript interfaces, no implementation

---

## Domain Layer Design

### Value Objects

Value objects are immutable, validated objects that represent domain concepts without identity.

#### TimeSlot

**Purpose:** Represents a time slot in the calendar

**Location:** `server/src/calendar/domain/value-objects/time-slot.vo.ts`

```typescript
export class TimeSlot {
  private constructor(
    public readonly startTime: Date,
    public readonly endTime: Date
  ) {
    this.validate();
  }

  static create(startTime: Date, endTime: Date): TimeSlot {
    return new TimeSlot(startTime, endTime);
  }

  static fromDuration(startTime: Date, durationMinutes: number): TimeSlot {
    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);
    return new TimeSlot(startTime, endTime);
  }

  private validate(): void {
    if (this.endTime <= this.startTime) {
      throw new Error('End time must be after start time');
    }
  }

  getDurationMinutes(): number {
    return Math.round((this.endTime.getTime() - this.startTime.getTime()) / (60 * 1000));
  }

  overlaps(other: TimeSlot): boolean {
    return this.startTime < other.endTime && this.endTime > other.startTime;
  }

  contains(date: Date): boolean {
    return date >= this.startTime && date < this.endTime;
  }

  equals(other: TimeSlot): boolean {
    return (
      this.startTime.getTime() === other.startTime.getTime() &&
      this.endTime.getTime() === other.endTime.getTime()
    );
  }
}
```

#### AppointmentStatus

**Purpose:** Represents appointment status with validation

**Location:** `server/src/calendar/domain/value-objects/appointment-status.vo.ts`

```typescript
export enum AppointmentStatusEnum {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export class AppointmentStatus {
  private constructor(public readonly value: AppointmentStatusEnum) {}

  static scheduled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.SCHEDULED);
  }

  static completed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.COMPLETED);
  }

  static cancelled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CANCELLED);
  }

  static noShow(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.NO_SHOW);
  }

  static fromString(value: string): AppointmentStatus {
    if (!Object.values(AppointmentStatusEnum).includes(value as AppointmentStatusEnum)) {
      throw new Error(`Invalid appointment status: ${value}`);
    }
    return new AppointmentStatus(value as AppointmentStatusEnum);
  }

  canTransitionTo(newStatus: AppointmentStatus): boolean {
    const validTransitions: Record<AppointmentStatusEnum, AppointmentStatusEnum[]> = {
      [AppointmentStatusEnum.SCHEDULED]: [
        AppointmentStatusEnum.COMPLETED,
        AppointmentStatusEnum.CANCELLED,
        AppointmentStatusEnum.NO_SHOW,
      ],
      [AppointmentStatusEnum.COMPLETED]: [],
      [AppointmentStatusEnum.CANCELLED]: [],
      [AppointmentStatusEnum.NO_SHOW]: [],
    };

    return validTransitions[this.value].includes(newStatus.value);
  }

  equals(other: AppointmentStatus): boolean {
    return this.value === other.value;
  }
}
```

#### AppointmentSource

**Purpose:** Represents the source of appointment creation

**Location:** `server/src/calendar/domain/value-objects/appointment-source.vo.ts`

```typescript
export enum AppointmentSourceEnum {
  BOOKING_SYSTEM = 'BOOKING_SYSTEM',
  MANUAL = 'MANUAL',
}

export class AppointmentSource {
  private constructor(public readonly value: AppointmentSourceEnum) {}

  static bookingSystem(): AppointmentSource {
    return new AppointmentSource(AppointmentSourceEnum.BOOKING_SYSTEM);
  }

  static manual(): AppointmentSource {
    return new AppointmentSource(AppointmentSourceEnum.MANUAL);
  }

  static fromString(value: string): AppointmentSource {
    if (!Object.values(AppointmentSourceEnum).includes(value as AppointmentSourceEnum)) {
      throw new Error(`Invalid appointment source: ${value}`);
    }
    return new AppointmentSource(value as AppointmentSourceEnum);
  }

  equals(other: AppointmentSource): boolean {
    return this.value === other.value;
  }
}
```

#### ServiceIdCode

**Purpose:** Represents service ID code (e.g., "M1", "P5") with validation

**Location:** `server/src/calendar/domain/value-objects/service-id-code.vo.ts`

```typescript
export class ServiceIdCode {
  private constructor(
    public readonly categoryCode: string,
    public readonly serviceNumber: number
  ) {
    this.validate();
  }

  static create(categoryCode: string, serviceNumber: number): ServiceIdCode {
    return new ServiceIdCode(categoryCode, serviceNumber);
  }

  static fromString(code: string): ServiceIdCode {
    const match = code.match(/^([A-Z])(\d+)$/i);
    if (!match) {
      throw new Error(`Invalid service ID code format: ${code}`);
    }
    return new ServiceIdCode(match[1].toUpperCase(), parseInt(match[2], 10));
  }

  private validate(): void {
    if (!/^[A-Z]$/i.test(this.categoryCode)) {
      throw new Error('Category code must be a single letter');
    }
    if (this.serviceNumber < 1) {
      throw new Error('Service number must be positive');
    }
  }

  toString(): string {
    return `${this.categoryCode}${this.serviceNumber}`;
  }

  matchesCategory(categoryCode: string): boolean {
    return this.categoryCode.toUpperCase() === categoryCode.toUpperCase();
  }

  equals(other: ServiceIdCode): boolean {
    return (
      this.categoryCode.toUpperCase() === other.categoryCode.toUpperCase() &&
      this.serviceNumber === other.serviceNumber
    );
  }
}
```

### Domain Entities

Domain entities have identity and contain business logic.

#### Appointment (Domain Entity)

**Purpose:** Core appointment entity with business logic

**Location:** `server/src/calendar/domain/entities/appointment.entity.ts`

```typescript
import { TimeSlot } from '../value-objects/TimeSlot';
import { AppointmentStatus } from '../value-objects/AppointmentStatus';
import { AppointmentSource } from '../value-objects/AppointmentSource';

export class Appointment {
  private constructor(
    public readonly id: string,
    public readonly customerId: string,
    private employeeId: string, // Private to allow modification via reassignEmployee
    public readonly serviceId: string,
    public readonly addonServiceIds: string[],
    private timeSlot: TimeSlot,
    private status: AppointmentStatus,
    public readonly source: AppointmentSource,
    private notes: string | null, // Private to allow modification via updateNotes
    private cancellationReason: string | null, // Private to allow modification via changeStatus
    public readonly createdBy: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    this.validate();
  }

  getEmployeeId(): string {
    return this.employeeId;
  }

  getNotes(): string | null {
    return this.notes;
  }

  getCancellationReason(): string | null {
    return this.cancellationReason;
  }

  static create(params: {
    id: string;
    customerId: string;
    employeeId: string;
    serviceId: string;
    addonServiceIds: string[];
    startTime: Date;
    endTime: Date;
    source: AppointmentSource;
    notes?: string;
    createdBy?: string;
  }): Appointment {
    const now = new Date();
    return new Appointment(
      params.id,
      params.customerId,
      params.employeeId,
      params.serviceId,
      params.addonServiceIds,
      TimeSlot.create(params.startTime, params.endTime),
      AppointmentStatus.scheduled(),
      params.source,
      params.notes || null,
      null,
      params.createdBy || null,
      now,
      now
    );
  }

  private validate(): void {
    if (!this.id) {
      throw new Error('Appointment ID is required');
    }
    if (!this.customerId) {
      throw new Error('Customer ID is required');
    }
    if (!this.employeeId) {
      throw new Error('Employee ID is required');
    }
    if (!this.serviceId) {
      throw new Error('Service ID is required');
    }
  }

  getStartTime(): Date {
    return this.timeSlot.startTime;
  }

  getEndTime(): Date {
    return this.timeSlot.endTime;
  }

  getTimeSlot(): TimeSlot {
    return this.timeSlot;
  }

  getStatus(): AppointmentStatus {
    return this.status;
  }

  getDurationMinutes(): number {
    return this.timeSlot.getDurationMinutes();
  }

  changeStatus(newStatus: AppointmentStatus, reason?: string): void {
    if (!this.status.canTransitionTo(newStatus)) {
      throw new Error(
        `Cannot transition from ${this.status.value} to ${newStatus.value}`
      );
    }
    this.status = newStatus;
    if (newStatus.value === AppointmentStatusEnum.CANCELLED && reason) {
      this.cancellationReason = reason;
    }
  }

  reschedule(newStartTime: Date, newEndTime: Date): void {
    if (newStartTime < new Date()) {
      throw new Error('Cannot reschedule appointment to the past');
    }
    this.timeSlot = TimeSlot.create(newStartTime, newEndTime);
  }

  reassignEmployee(newEmployeeId: string): void {
    if (!newEmployeeId) {
      throw new Error('Employee ID is required');
    }
    this.employeeId = newEmployeeId;
  }

  updateNotes(notes: string): void {
    this.notes = notes;
  }

  overlaps(other: Appointment): boolean {
    if (this.id === other.id) {
      return false; // Same appointment
    }
    return this.timeSlot.overlaps(other.timeSlot);
  }

  conflictsWith(other: Appointment): boolean {
    return (
      this.getEmployeeId() === other.getEmployeeId() &&
      this.overlaps(other)
    );
  }

  isInPast(): boolean {
    return this.timeSlot.endTime < new Date();
  }

  isInFuture(): boolean {
    return this.timeSlot.startTime > new Date();
  }
}
```

#### AppointmentStatusHistory (Domain Entity)

**Purpose:** Tracks status change history for audit purposes

**Location:** `server/src/calendar/domain/entities/appointment-status-history.entity.ts`

```typescript
import { AppointmentStatus } from '../value-objects/AppointmentStatus';

export class AppointmentStatusHistory {
  private constructor(
    public readonly id: string,
    public readonly appointmentId: string,
    public readonly previousStatus: AppointmentStatus | null,
    public readonly newStatus: AppointmentStatus,
    public readonly changedBy: string | null,
    public readonly changeReason: string | null,
    public readonly createdAt: Date
  ) {}

  static create(params: {
    id: string;
    appointmentId: string;
    previousStatus: AppointmentStatus | null;
    newStatus: AppointmentStatus;
    changedBy?: string;
    changeReason?: string;
  }): AppointmentStatusHistory {
    return new AppointmentStatusHistory(
      params.id,
      params.appointmentId,
      params.previousStatus,
      params.newStatus,
      params.changedBy || null,
      params.changeReason || null,
      new Date()
    );
  }
}
```

### Domain Services

Domain services contain business logic that doesn't naturally fit in entities.

#### ConflictDetectionService

**Purpose:** Detects scheduling conflicts between appointments

**Location:** `server/src/calendar/domain/services/conflict-detection.service.ts`

**Dependency Injection:** Injectable domain service that can be injected into application services.

```typescript
import { Injectable } from '@nestjs/common';
import { Appointment } from '../entities/Appointment';

export interface Conflict {
  appointment: Appointment;
  conflictingAppointment: Appointment;
  conflictType: 'EMPLOYEE_OVERLAP' | 'TIME_OVERLAP';
}

@Injectable()
export class ConflictDetectionService {
  detectConflicts(
    appointment: Appointment,
    existingAppointments: Appointment[]
  ): Conflict[] {
    const conflicts: Conflict[] = [];

    for (const existing of existingAppointments) {
      if (appointment.conflictsWith(existing)) {
        conflicts.push({
          appointment,
          conflictingAppointment: existing,
          conflictType: 'EMPLOYEE_OVERLAP',
        });
      } else if (appointment.overlaps(existing)) {
        conflicts.push({
          appointment,
          conflictingAppointment: existing,
          conflictType: 'TIME_OVERLAP',
        });
      }
    }

    return conflicts;
  }

  hasConflicts(
    appointment: Appointment,
    existingAppointments: Appointment[]
  ): boolean {
    return this.detectConflicts(appointment, existingAppointments).length > 0;
  }
}
```

#### AvailabilityService

**Purpose:** Calculates employee availability

**Location:** `server/src/calendar/domain/services/availability.service.ts`

**Dependency Injection:** Injectable domain service that can be injected into application services.

```typescript
import { Injectable } from '@nestjs/common';
import { TimeSlot } from '../value-objects/TimeSlot';
import { Appointment } from '../entities/Appointment';

export interface AvailableTimeSlot {
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class AvailabilityService {
  calculateAvailableSlots(
    date: Date,
    businessHours: { start: number; end: number },
    existingAppointments: Appointment[],
    slotDurationMinutes: number = 15
  ): AvailableTimeSlot[] {
    const availableSlots: AvailableTimeSlot[] = [];
    const startOfDay = new Date(date);
    startOfDay.setHours(businessHours.start, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(businessHours.end, 0, 0, 0);

    let currentTime = new Date(startOfDay);

    while (currentTime < endOfDay) {
      const slotEnd = new Date(
        currentTime.getTime() + slotDurationMinutes * 60 * 1000
      );

      if (slotEnd > endOfDay) {
        break;
      }

      const slot = TimeSlot.create(currentTime, slotEnd);
      const isAvailable = !existingAppointments.some((apt) =>
        slot.overlaps(apt.getTimeSlot())
      );

      if (isAvailable) {
        availableSlots.push({
          startTime: new Date(currentTime),
          endTime: new Date(slotEnd),
        });
      }

      currentTime = new Date(slotEnd);
    }

    return availableSlots;
  }

  isTimeSlotAvailable(
    timeSlot: TimeSlot,
    existingAppointments: Appointment[]
  ): boolean {
    return !existingAppointments.some((apt) =>
      timeSlot.overlaps(apt.getTimeSlot())
    );
  }
}
```

#### ServiceDurationCalculator

**Purpose:** Calculates total appointment duration from services

**Location:** `server/src/calendar/domain/services/service-duration-calculator.service.ts`

**Dependency Injection:** Injectable domain service that can be injected into application services.

```typescript
import { Injectable } from '@nestjs/common';

export interface Service {
  id: string;
  duration: number; // minutes
}

@Injectable()
export class ServiceDurationCalculator {
  calculateTotalDuration(
    mainService: Service,
    addonServices: Service[]
  ): number {
    const mainDuration = mainService.duration;
    const addonDuration = addonServices.reduce(
      (sum, service) => sum + service.duration,
      0
    );
    return mainDuration + addonDuration;
  }

  calculateEndTime(startTime: Date, services: Service[]): Date {
    const totalDuration = services.reduce(
      (sum, service) => sum + service.duration,
      0
    );
    return new Date(startTime.getTime() + totalDuration * 60 * 1000);
  }
}
```

### Repository Interfaces

Repository interfaces define data access contracts without implementation details.

#### IAppointmentRepository

**Purpose:** Repository interface for appointment data access

**Location:** `server/src/calendar/domain/repositories/appointment.repository.interface.ts`

```typescript
import { Appointment } from '../entities/Appointment';
import { AppointmentStatus } from '../value-objects/AppointmentStatus';

export interface AppointmentQuery {
  startDate?: Date;
  endDate?: Date;
  employeeId?: string;
  employeeIds?: string[];
  status?: AppointmentStatus;
  statuses?: AppointmentStatus[];
  customerId?: string;
  serviceId?: string;
  serviceIdCode?: string; // e.g., "M1", "P5"
  dayOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  hourOfDay?: number; // 0-23
  hourRangeStart?: number;
  hourRangeEnd?: number;
  search?: string; // Customer name or appointment ID
  page?: number;
  limit?: number;
  sortBy?: 'startTime' | 'endTime' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}

export interface AppointmentQueryResult {
  appointments: Appointment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IAppointmentRepository {
  findById(id: string): Promise<Appointment | null>;
  findByQuery(query: AppointmentQuery): Promise<AppointmentQueryResult>;
  findByEmployeeAndDateRange(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Appointment[]>;
  findByCustomer(customerId: string): Promise<Appointment[]>;
  save(appointment: Appointment): Promise<Appointment>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
```

#### IAppointmentStatusHistoryRepository

**Purpose:** Repository interface for status history data access

**Location:** `server/src/calendar/domain/repositories/appointment-status-history.repository.interface.ts`

```typescript
import { AppointmentStatusHistory } from '../entities/AppointmentStatusHistory';

export interface IAppointmentStatusHistoryRepository {
  findByAppointmentId(appointmentId: string): Promise<AppointmentStatusHistory[]>;
  save(history: AppointmentStatusHistory): Promise<AppointmentStatusHistory>;
  findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<AppointmentStatusHistory[]>;
}
```

---

## Application Layer Design

### Application Services

Application services orchestrate domain objects and handle business operations. These services follow the project's naming convention of using "Service" suffix (consistent with existing services like `dataService` and `geminiService`).

**Note on Naming Convention:** The project uses "Service" suffix for application layer classes rather than "UseCase" (which is common in Clean Architecture). This maintains consistency with the existing codebase pattern where services are named with descriptive names ending in `Service` (e.g., `GetAppointmentsService`, `CreateAppointmentService`).

#### GetAppointmentsService

**Purpose:** Retrieve appointments with filtering and pagination

**Location:** `server/src/calendar/services/get-appointments.service.ts`

**Dependency Injection:** Injectable application service. Repository is injected via constructor.

```typescript
import { Injectable } from '@nestjs/common';
import { IAppointmentRepository, AppointmentQuery, AppointmentQueryResult } from '../../domain/repositories/IAppointmentRepository';
import { AppointmentStatus } from '../../domain/value-objects/AppointmentStatus';

@Injectable()
export class GetAppointmentsService {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository
  ) {}

  async execute(query: {
    startDate?: string;
    endDate?: string;
    employeeId?: string;
    employeeIds?: string[];
    status?: string;
    statuses?: string[];
    customerId?: string;
    serviceId?: string;
    serviceIdCode?: string;
    dayOfWeek?: number[];
    hourOfDay?: number;
    hourRangeStart?: number;
    hourRangeEnd?: number;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<AppointmentQueryResult> {
    const domainQuery: AppointmentQuery = {
      startDate: query.startDate ? new Date(query.startDate) : undefined,
      endDate: query.endDate ? new Date(query.endDate) : undefined,
      employeeId: query.employeeId,
      employeeIds: query.employeeIds,
      status: query.status ? AppointmentStatus.fromString(query.status) : undefined,
      statuses: query.statuses?.map(s => AppointmentStatus.fromString(s)),
      customerId: query.customerId,
      serviceId: query.serviceId,
      serviceIdCode: query.serviceIdCode,
      dayOfWeek: query.dayOfWeek,
      hourOfDay: query.hourOfDay,
      hourRangeStart: query.hourRangeStart,
      hourRangeEnd: query.hourRangeEnd,
      search: query.search,
      page: query.page || 1,
      limit: query.limit || 50,
      sortBy: query.sortBy as 'startTime' | 'endTime' | 'createdAt' || 'startTime',
      sortOrder: query.sortOrder as 'ASC' | 'DESC' || 'ASC',
    };

    return await this.appointmentRepository.findByQuery(domainQuery);
  }
}
```

#### CreateAppointmentService

**Purpose:** Create a new appointment with validation and conflict checking

**Location:** `server/src/calendar/services/create-appointment.service.ts`

**Dependency Injection:** Injectable application service. Repository and domain services are injected via constructor.

```typescript
import { Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/entities/Appointment';
import { AppointmentSource } from '../../domain/value-objects/AppointmentSource';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { ConflictDetectionService } from '../../domain/services/ConflictDetectionService';
import { ServiceDurationCalculator } from '../../domain/services/ServiceDurationCalculator';
import { v4 as uuidv4 } from 'uuid';

export interface CreateAppointmentRequest {
  customerId: string;
  employeeId: string;
  serviceId: string;
  addonServiceIds?: string[];
  startTime: string; // ISO string
  endTime?: string; // ISO string, optional if services provided
  notes?: string;
  source: 'BOOKING_SYSTEM' | 'MANUAL';
  createdBy?: string;
  services?: Array<{ id: string; duration: number }>; // For duration calculation
}

export interface CreateAppointmentResponse {
  appointment: Appointment;
  conflicts: Array<{
    appointmentId: string;
    conflictType: string;
  }>;
}

@Injectable()
export class CreateAppointmentService {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly conflictDetectionService: ConflictDetectionService,
    private readonly serviceDurationCalculator: ServiceDurationCalculator
  ) {}

  async execute(
    request: CreateAppointmentRequest
  ): Promise<CreateAppointmentResponse> {
    // Calculate end time if not provided
    let endTime: Date;
    if (request.endTime) {
      endTime = new Date(request.endTime);
    } else if (request.services) {
      const mainService = request.services.find(s => s.id === request.serviceId);
      const addonServices = request.services.filter(s =>
        request.addonServiceIds?.includes(s.id)
      );
      if (!mainService) {
        throw new Error('Main service not found');
      }
      const startTime = new Date(request.startTime);
      endTime = this.serviceDurationCalculator.calculateEndTime(
        startTime,
        [mainService, ...addonServices]
      );
    } else {
      throw new Error('Either endTime or services must be provided');
    }

    // Create appointment entity
    const appointment = Appointment.create({
      id: uuidv4(),
      customerId: request.customerId,
      employeeId: request.employeeId,
      serviceId: request.serviceId,
      addonServiceIds: request.addonServiceIds || [],
      startTime: new Date(request.startTime),
      endTime,
      source: AppointmentSource.fromString(request.source),
      notes: request.notes,
      createdBy: request.createdBy,
    });

    // Check for conflicts
    const existingAppointments = await this.appointmentRepository.findByEmployeeAndDateRange(
      request.employeeId,
      appointment.getStartTime(),
      appointment.getEndTime()
    );

    const conflicts = this.conflictDetectionService.detectConflicts(
      appointment,
      existingAppointments
    );

    // Save appointment (even with conflicts, as override may be allowed)
    const savedAppointment = await this.appointmentRepository.save(appointment);

    return {
      appointment: savedAppointment,
      conflicts: conflicts.map(c => ({
        appointmentId: c.conflictingAppointment.id,
        conflictType: c.conflictType,
      })),
    };
  }
}
```

#### UpdateAppointmentService

**Purpose:** Update appointment details with validation

**Location:** `server/src/calendar/services/update-appointment.service.ts`

**Dependency Injection:** Injectable application service. Repository and domain services are injected via constructor.

```typescript
import { Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/entities/Appointment';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { ConflictDetectionService } from '../../domain/services/ConflictDetectionService';

export interface UpdateAppointmentRequest {
  employeeId?: string;
  serviceId?: string;
  addonServiceIds?: string[];
  startTime?: string;
  endTime?: string;
  notes?: string;
}

export interface UpdateAppointmentResponse {
  appointment: Appointment;
  conflicts: Array<{
    appointmentId: string;
    conflictType: string;
  }>;
}

@Injectable()
export class UpdateAppointmentService {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly conflictDetectionService: ConflictDetectionService
  ) {}

  async execute(
    appointmentId: string,
    request: UpdateAppointmentRequest
  ): Promise<UpdateAppointmentResponse> {
    const appointment = await this.appointmentRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Update fields
    if (request.employeeId) {
      appointment.reassignEmployee(request.employeeId);
    }

    if (request.startTime && request.endTime) {
      appointment.reschedule(
        new Date(request.startTime),
        new Date(request.endTime)
      );
    }

    if (request.notes !== undefined) {
      appointment.updateNotes(request.notes);
    }

    // Check for conflicts
    const existingAppointments = await this.appointmentRepository.findByEmployeeAndDateRange(
      appointment.getEmployeeId(),
      appointment.getStartTime(),
      appointment.getEndTime()
    );

    const conflicts = this.conflictDetectionService.detectConflicts(
      appointment,
      existingAppointments.filter(a => a.id !== appointmentId)
    );

    const updatedAppointment = await this.appointmentRepository.save(appointment);

    return {
      appointment: updatedAppointment,
      conflicts: conflicts.map(c => ({
        appointmentId: c.conflictingAppointment.id,
        conflictType: c.conflictType,
      })),
    };
  }
}
```

#### ChangeAppointmentStatusService

**Purpose:** Change appointment status with audit logging

**Location:** `server/src/calendar/services/change-appointment-status.service.ts`

**Dependency Injection:** Injectable application service. Repositories are injected via constructor.

```typescript
import { Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/entities/Appointment';
import { AppointmentStatus } from '../../domain/value-objects/AppointmentStatus';
import { AppointmentStatusHistory } from '../../domain/entities/AppointmentStatusHistory';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { IAppointmentStatusHistoryRepository } from '../../domain/repositories/IAppointmentStatusHistoryRepository';
import { v4 as uuidv4 } from 'uuid';

export interface ChangeStatusRequest {
  status: string;
  reason?: string;
  changedBy?: string;
}

export interface ChangeStatusResponse {
  appointment: Appointment;
  statusHistory: AppointmentStatusHistory;
}

@Injectable()
export class ChangeAppointmentStatusService {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly statusHistoryRepository: IAppointmentStatusHistoryRepository
  ) {}

  async execute(
    appointmentId: string,
    request: ChangeStatusRequest
  ): Promise<ChangeStatusResponse> {
    const appointment = await this.appointmentRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const newStatus = AppointmentStatus.fromString(request.status);
    const previousStatus = appointment.getStatus();

    // Change status
    appointment.changeStatus(newStatus, request.reason);

    // Create status history entry
    const statusHistory = AppointmentStatusHistory.create({
      id: uuidv4(),
      appointmentId,
      previousStatus,
      newStatus,
      changedBy: request.changedBy,
      changeReason: request.reason,
    });

    // Save appointment and history
    const updatedAppointment = await this.appointmentRepository.save(appointment);
    const savedHistory = await this.statusHistoryRepository.save(statusHistory);

    return {
      appointment: updatedAppointment,
      statusHistory: savedHistory,
    };
  }
}
```

#### BulkChangeStatusService

**Purpose:** Change status for multiple appointments

**Location:** `server/src/calendar/services/bulk-change-status.service.ts`

**Dependency Injection:** Injectable application service. Repositories are injected via constructor.

```typescript
import { Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/entities/Appointment';
import { AppointmentStatus } from '../../domain/value-objects/AppointmentStatus';
import { AppointmentStatusHistory } from '../../domain/entities/AppointmentStatusHistory';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { IAppointmentStatusHistoryRepository } from '../../domain/repositories/IAppointmentStatusHistoryRepository';
import { v4 as uuidv4 } from 'uuid';

export interface BulkChangeStatusRequest {
  appointmentIds: string[];
  status: string;
  reason?: string;
  changedBy?: string;
}

export interface BulkChangeStatusResponse {
  updated: number;
  appointments: Appointment[];
  statusHistory: AppointmentStatusHistory[];
  errors: Array<{ appointmentId: string; error: string }>;
}

@Injectable()
export class BulkChangeStatusService {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly statusHistoryRepository: IAppointmentStatusHistoryRepository
  ) {}

  async execute(
    request: BulkChangeStatusRequest
  ): Promise<BulkChangeStatusResponse> {
    const newStatus = AppointmentStatus.fromString(request.status);
    const updatedAppointments: Appointment[] = [];
    const statusHistoryEntries: AppointmentStatusHistory[] = [];
    const errors: Array<{ appointmentId: string; error: string }> = [];

    for (const appointmentId of request.appointmentIds) {
      try {
        const appointment = await this.appointmentRepository.findById(appointmentId);
        if (!appointment) {
          errors.push({
            appointmentId,
            error: 'Appointment not found',
          });
          continue;
        }

        const previousStatus = appointment.getStatus();
        appointment.changeStatus(newStatus, request.reason);

        const statusHistory = AppointmentStatusHistory.create({
          id: uuidv4(),
          appointmentId,
          previousStatus,
          newStatus,
          changedBy: request.changedBy,
          changeReason: request.reason,
        });

        const savedAppointment = await this.appointmentRepository.save(appointment);
        const savedHistory = await this.statusHistoryRepository.save(statusHistory);

        updatedAppointments.push(savedAppointment);
        statusHistoryEntries.push(savedHistory);
      } catch (error) {
        errors.push({
          appointmentId,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return {
      updated: updatedAppointments.length,
      appointments: updatedAppointments,
      statusHistory: statusHistoryEntries,
      errors,
    };
  }
}
```

#### CheckAvailabilityService

**Purpose:** Check employee availability for a time slot

**Location:** `server/src/calendar/services/check-availability.service.ts`

**Dependency Injection:** Injectable application service. Repository and domain service are injected via constructor.

```typescript
import { Injectable } from '@nestjs/common';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';
import { AvailabilityService } from '../../domain/services/AvailabilityService';
import { TimeSlot } from '../../domain/value-objects/TimeSlot';

export interface CheckAvailabilityRequest {
  employeeId: string;
  date: string; // ISO date string
  startTime?: string; // ISO datetime string
  endTime?: string; // ISO datetime string
  duration?: number; // minutes
  excludeAppointmentId?: string;
}

export interface AvailabilityResponse {
  available: boolean;
  conflicts: Array<{
    appointmentId: string;
    startTime: string;
    endTime: string;
  }>;
  availableTimeSlots: Array<{
    startTime: string;
    endTime: string;
  }>;
}

@Injectable()
export class CheckAvailabilityService {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly availabilityService: AvailabilityService
  ) {}

  async execute(
    request: CheckAvailabilityRequest
  ): Promise<AvailabilityResponse> {
    const date = new Date(request.date);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Get existing appointments
    const existingAppointments = await this.appointmentRepository.findByEmployeeAndDateRange(
      request.employeeId,
      startOfDay,
      endOfDay
    );

    // Filter out excluded appointment
    const relevantAppointments = existingAppointments.filter(
      apt => apt.id !== request.excludeAppointmentId
    );

    // If specific time slot requested
    if (request.startTime && request.endTime) {
      const timeSlot = TimeSlot.create(
        new Date(request.startTime),
        new Date(request.endTime)
      );
      const isAvailable = this.availabilityService.isTimeSlotAvailable(
        timeSlot,
        relevantAppointments
      );

      const conflicts = relevantAppointments
        .filter(apt => timeSlot.overlaps(apt.getTimeSlot()))
        .map(apt => ({
          appointmentId: apt.id,
          startTime: apt.getStartTime().toISOString(),
          endTime: apt.getEndTime().toISOString(),
        }));

      return {
        available: isAvailable,
        conflicts,
        availableTimeSlots: [],
      };
    }

    // Calculate available slots for the day
    const businessHours = { start: 9, end: 19 }; // TODO: Get from config
    const slotDuration = request.duration || 15;
    const availableSlots = this.availabilityService.calculateAvailableSlots(
      date,
      businessHours,
      relevantAppointments,
      slotDuration
    );

    return {
      available: availableSlots.length > 0,
      conflicts: [],
      availableTimeSlots: availableSlots.map(slot => ({
        startTime: slot.startTime.toISOString(),
        endTime: slot.endTime.toISOString(),
      })),
    };
  }
}
```

### Mappers

Mappers convert between domain entities and DTOs.

#### AppointmentMapper

**Purpose:** Maps between Appointment domain entity and DTOs

**Location:** `server/src/calendar/infrastructure/mappers/appointment.mapper.ts`

```typescript
import { Appointment } from '../../domain/entities/Appointment';
import { AppointmentResponseDto, AppointmentListResponseDto } from '../dto/AppointmentDto';

export class AppointmentMapper {
  static toDto(appointment: Appointment, includeRelations: {
    customer?: any;
    employee?: any;
    services?: any[];
    statusHistory?: any[];
  } = {}): AppointmentResponseDto {
    return {
      id: appointment.id,
      customerId: appointment.customerId,
      customer: includeRelations.customer ? {
        id: includeRelations.customer.id,
        name: includeRelations.customer.name,
        email: includeRelations.customer.email,
        phone: includeRelations.customer.phone,
      } : undefined,
      employeeId: appointment.getEmployeeId(),
      employee: includeRelations.employee ? {
        id: includeRelations.employee.id,
        name: includeRelations.employee.name,
        color: includeRelations.employee.color,
      } : undefined,
      serviceId: appointment.serviceId,
      services: includeRelations.services || [],
      startTime: appointment.getStartTime().toISOString(),
      endTime: appointment.getEndTime().toISOString(),
      status: appointment.getStatus().value,
      notes: appointment.getNotes() || undefined,
      source: appointment.source.value,
      createdAt: appointment.createdAt.toISOString(),
      updatedAt: appointment.updatedAt.toISOString(),
      createdBy: appointment.createdBy || undefined,
      cancellationReason: appointment.getCancellationReason() || undefined,
      statusHistory: includeRelations.statusHistory || undefined,
    };
  }

  static toListDto(
    appointments: Appointment[],
    includeRelations: {
      customers?: Map<string, any>;
      employees?: Map<string, any>;
      services?: Map<string, any>;
    } = {}
  ): AppointmentListResponseDto {
    return {
      appointments: appointments.map(apt => this.toDto(apt, {
        customer: includeRelations.customers?.get(apt.customerId),
        employee: includeRelations.employees?.get(apt.employeeId),
        services: includeRelations.services
          ? [includeRelations.services.get(apt.serviceId)].filter(Boolean)
          : undefined,
      })),
    };
  }
}
```

---

## Infrastructure Layer Design

### Database Entities (TypeORM)

TypeORM entities map domain entities to database tables.

#### AppointmentEntity (TypeORM)

**Purpose:** TypeORM entity for appointments table

**Location:** `server/src/calendar/infrastructure/database/entities/appointment.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Check,
} from 'typeorm';
import { AppointmentStatusHistoryEntity } from './AppointmentStatusHistoryEntity';
import { AppointmentServiceEntity } from './AppointmentServiceEntity';

@Entity('appointments')
@Index(['employeeId', 'startTime', 'endTime'])
@Index(['customerId', 'startTime'])
@Index(['status', 'startTime'])
@Index(['startTime'])
@Index(['employeeId', 'startTime'])
@Check(`"end_time" > "start_time"`)
@Check(`"start_time" >= "created_at"`)
export class AppointmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'customer_id' })
  customerId: string;

  @Column({ type: 'uuid', name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'uuid', name: 'service_id' })
  serviceId: string;

  @Column({ type: 'timestamp', name: 'start_time' })
  startTime: Date;

  @Column({ type: 'timestamp', name: 'end_time' })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
    default: 'SCHEDULED',
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({
    type: 'enum',
    enum: ['BOOKING_SYSTEM', 'MANUAL'],
    default: 'MANUAL',
    name: 'source',
  })
  source: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'uuid', nullable: true, name: 'created_by' })
  createdBy: string | null;

  @Column({ type: 'text', nullable: true, name: 'cancellation_reason' })
  cancellationReason: string | null;

  @OneToMany(
    () => AppointmentStatusHistoryEntity,
    (history) => history.appointment,
    { cascade: true }
  )
  statusHistory: AppointmentStatusHistoryEntity[];

  @OneToMany(
    () => AppointmentServiceEntity,
    (appointmentService) => appointmentService.appointment,
    { cascade: true }
  )
  appointmentServices: AppointmentServiceEntity[];
}
```

#### AppointmentServiceEntity (TypeORM)

**Purpose:** TypeORM entity for appointment_services junction table

**Location:** `server/src/calendar/infrastructure/database/entities/appointment-service.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
  Index,
} from 'typeorm';
import { AppointmentEntity } from './AppointmentEntity';

@Entity('appointment_services')
@Unique(['appointmentId', 'serviceId'])
@Index(['appointmentId'])
@Index(['serviceId'])
export class AppointmentServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'appointment_id' })
  appointmentId: string;

  @Column({ type: 'uuid', name: 'service_id' })
  serviceId: string;

  @Column({ type: 'boolean', name: 'is_main_service', default: false })
  isMainService: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => AppointmentEntity, (appointment) => appointment.appointmentServices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'appointment_id' })
  appointment: AppointmentEntity;
}
```

#### AppointmentStatusHistoryEntity (TypeORM)

**Purpose:** TypeORM entity for appointment_status_history table

**Location:** `server/src/calendar/infrastructure/database/entities/appointment-status-history.entity.ts`

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { AppointmentEntity } from './AppointmentEntity';

@Entity('appointment_status_history')
@Index(['appointmentId'])
@Index(['createdAt'])
@Index(['changedBy'])
export class AppointmentStatusHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'appointment_id' })
  appointmentId: string;

  @Column({
    type: 'enum',
    enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
    nullable: true,
    name: 'previous_status',
  })
  previousStatus: string | null;

  @Column({
    type: 'enum',
    enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
    name: 'new_status',
  })
  newStatus: string;

  @Column({ type: 'uuid', nullable: true, name: 'changed_by' })
  changedBy: string | null;

  @Column({ type: 'text', nullable: true, name: 'change_reason' })
  changeReason: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => AppointmentEntity, (appointment) => appointment.statusHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'appointment_id' })
  appointment: AppointmentEntity;
}
```

### Repository Implementations

Repository implementations provide concrete data access using TypeORM. All repositories are injectable and use `@InjectRepository()` to inject TypeORM repositories.

#### AppointmentStatusHistoryRepository (Implementation)

**Purpose:** TypeORM implementation of IAppointmentStatusHistoryRepository

**Location:** `server/src/calendar/infrastructure/repositories/appointment-status-history.repository.ts`

**Dependency Injection:** Uses NestJS dependency injection with `@Injectable()` decorator and `@InjectRepository()` for TypeORM repositories.

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAppointmentStatusHistoryRepository } from '../../domain/repositories/IAppointmentStatusHistoryRepository';
import { AppointmentStatusHistory } from '../../domain/entities/AppointmentStatusHistory';
import { AppointmentStatusHistoryEntity } from '../database/entities/AppointmentStatusHistoryEntity';
import { AppointmentStatus } from '../../domain/value-objects/AppointmentStatus';

@Injectable()
export class AppointmentStatusHistoryRepository implements IAppointmentStatusHistoryRepository {
  constructor(
    @InjectRepository(AppointmentStatusHistoryEntity)
    private readonly repository: Repository<AppointmentStatusHistoryEntity>
  ) {}

  async findByAppointmentId(appointmentId: string): Promise<AppointmentStatusHistory[]> {
    const entities = await this.repository.find({
      where: { appointmentId },
      order: { createdAt: 'ASC' },
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async save(history: AppointmentStatusHistory): Promise<AppointmentStatusHistory> {
    const entity = this.toEntity(history);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<AppointmentStatusHistory[]> {
    const entities = await this.repository.find({
      where: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        } as any,
      },
      order: { createdAt: 'DESC' },
    });
    return entities.map(entity => this.toDomain(entity));
  }

  private toDomain(entity: AppointmentStatusHistoryEntity): AppointmentStatusHistory {
    return AppointmentStatusHistory.create({
      id: entity.id,
      appointmentId: entity.appointmentId,
      previousStatus: entity.previousStatus
        ? AppointmentStatus.fromString(entity.previousStatus)
        : null,
      newStatus: AppointmentStatus.fromString(entity.newStatus),
      changedBy: entity.changedBy || undefined,
      changeReason: entity.changeReason || undefined,
    });
  }

  private toEntity(history: AppointmentStatusHistory): AppointmentStatusHistoryEntity {
    const entity = new AppointmentStatusHistoryEntity();
    entity.id = history.id;
    entity.appointmentId = history.appointmentId;
    entity.previousStatus = history.previousStatus?.value || null;
    entity.newStatus = history.newStatus.value;
    entity.changedBy = history.changedBy || null;
    entity.changeReason = history.changeReason || null;
    return entity;
  }
}
```

#### AppointmentRepository (Implementation)

**Purpose:** TypeORM implementation of IAppointmentRepository

**Location:** `server/src/calendar/infrastructure/repositories/appointment.repository.ts`

**Dependency Injection:** Uses NestJS dependency injection with `@Injectable()` decorator and `@InjectRepository()` for TypeORM repositories.

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In, Like, Or } from 'typeorm';
import { IAppointmentRepository, AppointmentQuery, AppointmentQueryResult } from '../../domain/repositories/IAppointmentRepository';
import { Appointment } from '../../domain/entities/Appointment';
import { AppointmentStatus, AppointmentStatusEnum } from '../../domain/value-objects/AppointmentStatus';
import { AppointmentSource } from '../../domain/value-objects/AppointmentSource';
import { AppointmentEntity } from '../database/entities/AppointmentEntity';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly repository: Repository<AppointmentEntity>
  ) {}

  async findById(id: string): Promise<Appointment | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['appointmentServices', 'statusHistory'],
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findByQuery(query: AppointmentQuery): Promise<AppointmentQueryResult> {
    const queryBuilder = this.repository.createQueryBuilder('appointment');

    // Apply filters
    if (query.startDate) {
      queryBuilder.andWhere('appointment.startTime >= :startDate', {
        startDate: query.startDate,
      });
    }
    if (query.endDate) {
      queryBuilder.andWhere('appointment.startTime <= :endDate', {
        endDate: query.endDate,
      });
    }
    if (query.employeeId) {
      queryBuilder.andWhere('appointment.employeeId = :employeeId', {
        employeeId: query.employeeId,
      });
    }
    if (query.employeeIds && query.employeeIds.length > 0) {
      queryBuilder.andWhere('appointment.employeeId IN (:...employeeIds)', {
        employeeIds: query.employeeIds,
      });
    }
    if (query.status) {
      queryBuilder.andWhere('appointment.status = :status', {
        status: query.status.value,
      });
    }
    if (query.statuses && query.statuses.length > 0) {
      queryBuilder.andWhere('appointment.status IN (:...statuses)', {
        statuses: query.statuses.map(s => s.value),
      });
    }
    if (query.customerId) {
      queryBuilder.andWhere('appointment.customerId = :customerId', {
        customerId: query.customerId,
      });
    }
    if (query.serviceId) {
      queryBuilder.andWhere('appointment.serviceId = :serviceId', {
        serviceId: query.serviceId,
      });
    }
    if (query.serviceIdCode) {
      // Service ID code filtering would require joining with services table
      // This is a simplified version - full implementation would join services
      const serviceIdCodePattern = query.serviceIdCode.toUpperCase();
      if (serviceIdCodePattern.length === 1) {
        // Single letter - filter by category
        // Would need to join with services table and filter by category code
      } else {
        // Letter + number - specific service
        // Would need to join with services table and filter by exact ID code
      }
    }
    if (query.dayOfWeek && query.dayOfWeek.length > 0) {
      queryBuilder.andWhere(
        `EXTRACT(DOW FROM appointment.startTime) IN (:...dayOfWeek)`,
        { dayOfWeek: query.dayOfWeek }
      );
    }
    if (query.hourOfDay !== undefined) {
      queryBuilder.andWhere(
        `EXTRACT(HOUR FROM appointment.startTime) = :hourOfDay`,
        { hourOfDay: query.hourOfDay }
      );
    }
    if (query.hourRangeStart !== undefined && query.hourRangeEnd !== undefined) {
      queryBuilder.andWhere(
        `EXTRACT(HOUR FROM appointment.startTime) >= :hourRangeStart AND EXTRACT(HOUR FROM appointment.startTime) < :hourRangeEnd`,
        {
          hourRangeStart: query.hourRangeStart,
          hourRangeEnd: query.hourRangeEnd,
        }
      );
    }
    if (query.search) {
      queryBuilder.andWhere(
        Or([
          { id: Like(`%${query.search}%`) },
          // Customer name search would require joining with users table
        ])
      );
    }

    // Apply sorting
    const sortBy = query.sortBy || 'startTime';
    const sortOrder = query.sortOrder || 'ASC';
    queryBuilder.orderBy(`appointment.${sortBy}`, sortOrder);

    // Apply pagination
    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Execute query
    const [entities, total] = await queryBuilder.getManyAndCount();

    const appointments = entities.map(entity => this.toDomain(entity));

    return {
      appointments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByEmployeeAndDateRange(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Appointment[]> {
    const entities = await this.repository.find({
      where: {
        employeeId,
        startTime: Between(startDate, endDate),
      },
      relations: ['appointmentServices', 'statusHistory'],
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async findByCustomer(customerId: string): Promise<Appointment[]> {
    const entities = await this.repository.find({
      where: { customerId },
      relations: ['appointmentServices', 'statusHistory'],
      order: { startTime: 'DESC' },
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async save(appointment: Appointment): Promise<Appointment> {
    const entity = this.toEntity(appointment);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }

  private toDomain(entity: AppointmentEntity): Appointment {
    // Create appointment with SCHEDULED status (default)
    const appointment = Appointment.create({
      id: entity.id,
      customerId: entity.customerId,
      employeeId: entity.employeeId, // Pass to create, will be accessible via getEmployeeId()
      serviceId: entity.serviceId,
      addonServiceIds: entity.appointmentServices
        ?.filter(as => !as.isMainService)
        .map(as => as.serviceId) || [],
      startTime: entity.startTime,
      endTime: entity.endTime,
      source: AppointmentSource.fromString(entity.source),
      notes: entity.notes || undefined,
      createdBy: entity.createdBy || undefined,
    });
    
    // Restore actual status from database
    const currentStatus = AppointmentStatus.fromString(entity.status);
    if (currentStatus.value !== AppointmentStatusEnum.SCHEDULED) {
      // Change status to match database state
      // Note: This bypasses validation since we're restoring existing state
      appointment.changeStatus(currentStatus, entity.cancellationReason || undefined);
    }
    
    return appointment;
  }

  private toEntity(appointment: Appointment): AppointmentEntity {
    const entity = new AppointmentEntity();
    entity.id = appointment.id;
    entity.customerId = appointment.customerId;
    entity.employeeId = appointment.getEmployeeId();
    entity.serviceId = appointment.serviceId;
    entity.startTime = appointment.getStartTime();
    entity.endTime = appointment.getEndTime();
    entity.status = appointment.getStatus().value;
    entity.source = appointment.source.value;
    entity.notes = appointment.getNotes() || null;
    entity.createdBy = appointment.createdBy || null;
    entity.cancellationReason = appointment.getCancellationReason() || null;
    return entity;
  }
}
```

---

## Presentation Layer Design

### API Controllers

API controllers handle HTTP requests and responses.

#### CalendarController

**Purpose:** REST API controller for calendar endpoints

**Location:** `server/src/calendar/calendar.controller.ts`

**Dependency Injection:** Uses NestJS dependency injection with `@Controller()` and `@Injectable()` decorators. Services are automatically injected via constructor.

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetAppointmentsService } from '../../application/services/GetAppointmentsService';
import { CreateAppointmentService } from '../../application/services/CreateAppointmentService';
import { UpdateAppointmentService } from '../../application/services/UpdateAppointmentService';
import { ChangeAppointmentStatusService } from '../../application/services/ChangeAppointmentStatusService';
import { BulkChangeStatusService } from '../../application/services/BulkChangeStatusService';
import { CheckAvailabilityService } from '../../application/services/CheckAvailabilityService';
import { AppointmentMapper } from '../../application/mappers/AppointmentMapper';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { RolesGuard } from '../guards/RolesGuard';
import { Roles } from '../decorators/Roles';

@Controller('api/calendar')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CalendarController {
  constructor(
    private readonly getAppointmentsService: GetAppointmentsService,
    private readonly createAppointmentService: CreateAppointmentService,
    private readonly updateAppointmentService: UpdateAppointmentService,
    private readonly changeStatusService: ChangeAppointmentStatusService,
    private readonly bulkChangeStatusService: BulkChangeStatusService,
    private readonly checkAvailabilityService: CheckAvailabilityService
  ) {}

  @Get('appointments')
  @Roles('OWNER', 'MANAGER', 'ADMIN', 'RECEPTIONIST', 'EMPLOYEE')
  async getAppointments(@Query() query: any) {
    const result = await this.getAppointmentsService.execute(query);
    return {
      appointments: result.appointments.map(apt =>
        AppointmentMapper.toDto(apt)
      ),
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
      filters: query,
    };
  }

  @Get('appointments/:id')
  @Roles('OWNER', 'MANAGER', 'ADMIN', 'RECEPTIONIST', 'EMPLOYEE')
  async getAppointment(@Param('id') id: string) {
    // Implementation would use GetAppointmentByIdService
    return { appointment: {} };
  }

  @Get('availability')
  @Roles('OWNER', 'MANAGER', 'ADMIN', 'RECEPTIONIST')
  async checkAvailability(@Query() query: any) {
    return await this.checkAvailabilityService.execute(query);
  }

  @Post('appointments')
  @Roles('OWNER', 'MANAGER', 'ADMIN', 'RECEPTIONIST')
  @HttpCode(HttpStatus.CREATED)
  async createAppointment(@Body() body: any) {
    const result = await this.createAppointmentService.execute(body);
    return {
      appointment: AppointmentMapper.toDto(result.appointment),
      conflicts: result.conflicts,
    };
  }

  @Put('appointments/:id')
  @Roles('OWNER', 'MANAGER', 'ADMIN', 'RECEPTIONIST')
  async updateAppointment(
    @Param('id') id: string,
    @Body() body: any
  ) {
    const result = await this.updateAppointmentService.execute(id, body);
    return {
      appointment: AppointmentMapper.toDto(result.appointment),
      conflicts: result.conflicts,
    };
  }

  @Patch('appointments/:id/status')
  @Roles('OWNER', 'MANAGER', 'ADMIN', 'RECEPTIONIST')
  async changeStatus(
    @Param('id') id: string,
    @Body() body: any
  ) {
    const result = await this.changeStatusService.execute(id, body);
    return {
      appointment: AppointmentMapper.toDto(result.appointment),
      statusHistory: result.statusHistory,
    };
  }

  @Patch('appointments/bulk-status')
  @Roles('OWNER', 'MANAGER', 'ADMIN', 'RECEPTIONIST')
  async bulkChangeStatus(@Body() body: any) {
    const result = await this.bulkChangeStatusService.execute(body);
    return {
      updated: result.updated,
      appointments: result.appointments.map(apt =>
        AppointmentMapper.toDto(apt)
      ),
      statusHistory: result.statusHistory,
      errors: result.errors,
    };
  }

  @Delete('appointments/:id')
  @Roles('OWNER', 'MANAGER', 'ADMIN', 'RECEPTIONIST')
  @HttpCode(HttpStatus.OK)
  async deleteAppointment(
    @Param('id') id: string,
    @Query('hardDelete') hardDelete?: boolean
  ) {
    // Implementation would use DeleteAppointmentService
    return { success: true, message: 'Appointment deleted successfully' };
  }
}
```

### React Components

React components for the frontend calendar interface.

#### CalendarLayout Component

**Purpose:** Main container component for calendar interface

**Location:** `client/components/calendar/CalendarLayout.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CalendarViewSwitcher } from './CalendarViewSwitcher';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { CalendarFilters } from './CalendarFilters';
import { AppointmentModal } from './AppointmentModal';
import { AppointmentForm } from './AppointmentForm';
import { calendarService } from '../../services/calendarService';
import { useCalendarFilters } from '../../hooks/useCalendarFilters';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

interface CalendarLayoutProps {
  userRole: 'OWNER' | 'MANAGER' | 'ADMIN' | 'RECEPTIONIST' | 'EMPLOYEE';
  initialView?: 'day' | 'week' | 'month';
  initialDate?: Date;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  userRole,
  initialView = 'week',
  initialDate = new Date(),
}) => {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>(initialView);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false);
  const [formInitialDate, setFormInitialDate] = useState<Date | undefined>();
  const [formInitialTime, setFormInitialTime] = useState<Date | undefined>();
  const [formInitialEmployeeId, setFormInitialEmployeeId] = useState<string | undefined>();

  const { filters, updateFilter, clearFilters } = useCalendarFilters();
  const queryClient = useQueryClient();

  // Fetch appointments
  const { data: appointmentsData, isLoading, error } = useQuery({
    queryKey: ['appointments', filters, selectedDate, currentView],
    queryFn: () => calendarService.getAppointments(filters, selectedDate, currentView),
    staleTime: 30000,
    refetchInterval: 30000,
  });

  // Fetch employees
  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => calendarService.getEmployees(),
  });

  // Fetch services
  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: () => calendarService.getServices(),
  });

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onToday: () => setSelectedDate(new Date()),
    onViewChange: setCurrentView,
    onPrevious: () => {
      const newDate = new Date(selectedDate);
      if (currentView === 'day') newDate.setDate(newDate.getDate() - 1);
      else if (currentView === 'week') newDate.setDate(newDate.getDate() - 7);
      else if (currentView === 'month') newDate.setMonth(newDate.getMonth() - 1);
      setSelectedDate(newDate);
    },
    onNext: () => {
      const newDate = new Date(selectedDate);
      if (currentView === 'day') newDate.setDate(newDate.getDate() + 1);
      else if (currentView === 'week') newDate.setDate(newDate.getDate() + 7);
      else if (currentView === 'month') newDate.setMonth(newDate.getMonth() + 1);
      setSelectedDate(newDate);
    },
    onCloseModal: () => {
      setIsAppointmentModalOpen(false);
      setIsAppointmentFormOpen(false);
    },
  });

  const handleAppointmentClick = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setIsAppointmentModalOpen(true);
  };

  const handleTimeSlotClick = (timeSlot: { date: Date; time: Date }, employeeId?: string) => {
    setFormInitialDate(timeSlot.date);
    setFormInitialTime(timeSlot.time);
    setFormInitialEmployeeId(employeeId);
    setIsAppointmentFormOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setCurrentView('day');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading calendar</div>;

  return (
    <div className="calendar-layout">
      <div className="calendar-header">
        <CalendarViewSwitcher
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <CalendarFilters
          filters={filters}
          onFiltersChange={updateFilter}
          employees={employees || []}
          services={services || []}
          userRole={userRole}
        />
      </div>

      <div className="calendar-content">
        {currentView === 'day' && (
          <DayView
            date={selectedDate}
            appointments={appointmentsData?.appointments || []}
            employees={employees || []}
            selectedEmployeeIds={filters.employeeIds || []}
            onTimeSlotClick={handleTimeSlotClick}
            onAppointmentClick={handleAppointmentClick}
            businessHours={{ start: 9, end: 19 }}
            timeSlotDuration={15}
          />
        )}
        {currentView === 'week' && (
          <WeekView
            startDate={getWeekStart(selectedDate)}
            appointments={appointmentsData?.appointments || []}
            employees={employees || []}
            selectedEmployeeIds={filters.employeeIds || []}
            onTimeSlotClick={handleTimeSlotClick}
            onAppointmentClick={handleAppointmentClick}
            businessHours={{ start: 9, end: 19 }}
            timeSlotDuration={15}
          />
        )}
        {currentView === 'month' && (
          <MonthView
            month={getMonthStart(selectedDate)}
            appointments={appointmentsData?.appointments || []}
            onDayClick={handleDayClick}
            onAppointmentIndicatorClick={handleAppointmentClick}
          />
        )}
      </div>

      {selectedAppointment && (
        <AppointmentModal
          appointmentId={selectedAppointment}
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          onEdit={() => {
            setIsAppointmentModalOpen(false);
            setIsAppointmentFormOpen(true);
          }}
          userRole={userRole}
        />
      )}

      <AppointmentForm
        isOpen={isAppointmentFormOpen}
        onClose={() => setIsAppointmentFormOpen(false)}
        initialDate={formInitialDate}
        initialTime={formInitialTime}
        initialEmployeeId={formInitialEmployeeId}
        employees={employees || []}
        services={services || []}
      />
    </div>
  );
};

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
```

---

## Data Transfer Objects (DTOs)

DTOs define the structure of data transferred between layers.

### Request DTOs

**Location:** `server/src/calendar/dto/requests/`

```typescript
// CreateAppointmentRequestDto.ts
export interface CreateAppointmentRequestDto {
  customerId: string;
  employeeId: string;
  serviceId: string;
  addonServiceIds?: string[];
  startTime: string; // ISO string
  endTime?: string; // ISO string
  notes?: string;
  source: 'BOOKING_SYSTEM' | 'MANUAL';
  notifyCustomer?: boolean;
}

// UpdateAppointmentRequestDto.ts
export interface UpdateAppointmentRequestDto {
  employeeId?: string;
  serviceId?: string;
  addonServiceIds?: string[];
  startTime?: string;
  endTime?: string;
  notes?: string;
  notifyCustomer?: boolean;
}

// ChangeStatusRequestDto.ts
export interface ChangeStatusRequestDto {
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  reason?: string;
  notifyCustomer?: boolean;
}

// BulkChangeStatusRequestDto.ts
export interface BulkChangeStatusRequestDto {
  appointmentIds: string[];
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  reason?: string;
  notifyCustomer?: boolean;
}
```

### Response DTOs

**Location:** `server/src/calendar/dto/responses/`

```typescript
// AppointmentResponseDto.ts
export interface AppointmentResponseDto {
  id: string;
  customerId: string;
  customer?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  employeeId: string;
  employee?: {
    id: string;
    name: string;
    color: string;
  };
  serviceId: string;
  services: Array<{
    id: string;
    name: string;
    isMainService: boolean;
  }>;
  startTime: string; // ISO string
  endTime: string; // ISO string
  status: string;
  notes?: string;
  source: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  createdBy?: string;
  cancellationReason?: string;
  statusHistory?: Array<{
    id: string;
    previousStatus: string | null;
    newStatus: string;
    changedBy?: string;
    changeReason?: string;
    createdAt: string;
  }>;
}

// AppointmentListResponseDto.ts
export interface AppointmentListResponseDto {
  appointments: AppointmentResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters?: Record<string, any>;
}
```

---

## Validation Schemas

Validation schemas using Zod for request validation.

**Location:** `server/src/calendar/dto/validation/appointment.schema.ts`

```typescript
import { z } from 'zod';

export const createAppointmentSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  employeeId: z.string().uuid('Invalid employee ID'),
  serviceId: z.string().uuid('Invalid service ID'),
  addonServiceIds: z.array(z.string().uuid()).optional(),
  startTime: z.string().datetime('Invalid start time format'),
  endTime: z.string().datetime('Invalid end time format').optional(),
  notes: z.string().max(1000, 'Notes too long').optional(),
  source: z.enum(['BOOKING_SYSTEM', 'MANUAL']),
  notifyCustomer: z.boolean().optional(),
});

export const updateAppointmentSchema = z.object({
  employeeId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  addonServiceIds: z.array(z.string().uuid()).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
  notifyCustomer: z.boolean().optional(),
});

export const changeStatusSchema = z.object({
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']),
  reason: z.string().max(500).optional(),
  notifyCustomer: z.boolean().optional(),
});

export const bulkChangeStatusSchema = z.object({
  appointmentIds: z.array(z.string().uuid()).min(1, 'At least one appointment ID required'),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']),
  reason: z.string().max(500).optional(),
  notifyCustomer: z.boolean().optional(),
});

export const appointmentQuerySchema = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
  employeeId: z.string().uuid().optional(),
  employeeIds: z.string().optional(), // Comma-separated UUIDs
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
  statuses: z.string().optional(), // Comma-separated statuses
  customerId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  serviceIdCode: z.string().optional(), // e.g., "M1", "P5"
  dayOfWeek: z.string().optional(), // Comma-separated numbers (0-6)
  hourOfDay: z.number().int().min(0).max(23).optional(),
  hourRangeStart: z.number().int().min(0).max(23).optional(),
  hourRangeEnd: z.number().int().min(0).max(23).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  sortBy: z.enum(['startTime', 'endTime', 'createdAt']).optional(),
  sortOrder: z.enum(['ASC', 'DESC']).optional(),
});
```

---

## Error Handling

### Error Types

**Location:** `server/src/calendar/domain/errors/appointment-errors.ts`

```typescript
export class AppointmentNotFoundError extends Error {
  constructor(appointmentId: string) {
    super(`Appointment not found: ${appointmentId}`);
    this.name = 'AppointmentNotFoundError';
  }
}

export class AppointmentConflictError extends Error {
  constructor(conflicts: Array<{ appointmentId: string; conflictType: string }>) {
    super('Appointment conflicts with existing appointments');
    this.name = 'AppointmentConflictError';
    this.conflicts = conflicts;
  }
  conflicts: Array<{ appointmentId: string; conflictType: string }>;
}

export class InvalidStatusTransitionError extends Error {
  constructor(from: string, to: string) {
    super(`Cannot transition from ${from} to ${to}`);
    this.name = 'InvalidStatusTransitionError';
  }
}

export class PastAppointmentError extends Error {
  constructor() {
    super('Cannot create or reschedule appointments in the past');
    this.name = 'PastAppointmentError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, field?: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
  field?: string;
}
```

### Error Response Format

All API errors follow this format:

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}
```

---

## Design Patterns

### Repository Pattern

- **Purpose**: Abstract data access logic
- **Implementation**: `IAppointmentRepository` interface with `AppointmentRepository` implementation
- **Benefits**: Testability, flexibility to swap implementations

### Service Pattern

- **Purpose**: Encapsulate business logic for specific operations
- **Implementation**: Separate service classes (e.g., `CreateAppointmentService`)
- **Benefits**: Single responsibility, testability, clear business logic flow
- **Naming Convention**: Follows project convention of using "Service" suffix (e.g., `dataService`, `calendarService`)

### Value Object Pattern

- **Purpose**: Represent domain concepts without identity
- **Implementation**: Immutable classes like `TimeSlot`, `AppointmentStatus`
- **Benefits**: Type safety, validation, immutability

### DTO Pattern

- **Purpose**: Transfer data between layers
- **Implementation**: Request/Response DTOs
- **Benefits**: Decoupling, versioning, validation

### Mapper Pattern

- **Purpose**: Convert between domain entities and DTOs
- **Implementation**: `AppointmentMapper` class
- **Benefits**: Separation of concerns, maintainability

---

## Implementation Guidelines

### Dependency Injection Framework Decision

**Current State:** The server uses Express.js with TypeORM, minimal codebase (only health endpoint).

**Recommendation:** **Migrate to NestJS** - A stable, scalable framework with excellent built-in dependency injection.

**Why NestJS is the Right Choice:**

1. **Mature & Production-Ready**: Used by many enterprise applications, battle-tested
2. **Excellent DI**: Built-in dependency injection container (no additional framework needed)
3. **TypeORM Integration**: First-class support for TypeORM with `@InjectRepository()` decorator
4. **Scalability**: Designed for large, maintainable applications with clear architecture
5. **Developer Experience**:
   - Clean decorator-based API
   - Built-in validation (class-validator, class-transformer)
   - Built-in guards, interceptors, pipes, filters
   - Excellent TypeScript support
   - Comprehensive testing utilities
6. **Migration Cost**: **Minimal** - current Express codebase is very small (only health endpoint)
7. **Future-Proof**: Industry standard for TypeScript Node.js applications
8. **Documentation**: Extensive, well-maintained documentation and active community

**Installation:**
```bash
npm install @nestjs/common @nestjs/core @nestjs/platform-express
npm install @nestjs/typeorm typeorm
npm install reflect-metadata rxjs
npm install --save-dev @types/node
```

**Required TypeScript Configuration:**
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictPropertyInitialization": false
  }
}
```

**Migration Path:**
1. Install NestJS dependencies
2. Create NestJS application module
3. Migrate health endpoint to NestJS controller
4. Set up TypeORM module
5. Implement calendar module incrementally

**Benefits Over Manual DI or InversifyJS:**
- No need to manually wire dependencies
- Built-in validation, guards, interceptors
- Better testing utilities
- More structured application architecture
- Less boilerplate code

### Code Organization

```
server/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── services/
│   │   └── repositories/
│   ├── application/
│   │   ├── services/
│   │   ├── dto/
│   │   └── mappers/
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── entities/
│   │   └── repositories/
│   ├── presentation/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── validation/
│   └── container/          # DI container configuration (if using InversifyJS)
│       └── bindings.ts
```

### Dependency Injection Setup (NestJS)

**NestJS Module Structure:**

All injectable classes must be registered in the module's `providers` array. NestJS will automatically inject dependencies based on constructor parameters.

```typescript
// server/src/calendar/calendar.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarController } from './calendar.controller';
import { GetAppointmentsService } from './services/get-appointments.service';
import { CreateAppointmentService } from './services/create-appointment.service';
import { UpdateAppointmentService } from './services/update-appointment.service';
import { ChangeAppointmentStatusService } from './services/change-appointment-status.service';
import { BulkChangeStatusService } from './services/bulk-change-status.service';
import { CheckAvailabilityService } from './services/check-availability.service';
import { AppointmentRepository } from './infrastructure/repositories/appointment.repository';
import { AppointmentStatusHistoryRepository } from './infrastructure/repositories/appointment-status-history.repository';
import { ConflictDetectionService } from './domain/services/conflict-detection.service';
import { AvailabilityService } from './domain/services/availability.service';
import { ServiceDurationCalculator } from './domain/services/service-duration-calculator.service';
import { AppointmentEntity } from './infrastructure/database/entities/appointment.entity';
import { AppointmentStatusHistoryEntity } from './infrastructure/database/entities/appointment-status-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity, AppointmentStatusHistoryEntity]),
  ],
  controllers: [CalendarController],
  providers: [
    // Repositories
    AppointmentRepository,
    AppointmentStatusHistoryRepository,
    // Domain Services (injectable)
    ConflictDetectionService,
    AvailabilityService,
    ServiceDurationCalculator,
    // Application Services (injectable)
    GetAppointmentsService,
    CreateAppointmentService,
    UpdateAppointmentService,
    ChangeAppointmentStatusService,
    BulkChangeStatusService,
    CheckAvailabilityService,
  ],
  exports: [
    // Export repositories for use in other modules
    AppointmentRepository,
    AppointmentStatusHistoryRepository,
  ],
})
export class CalendarModule {}
```

**Dependency Injection Flow:**

1. **Domain Services** (`@Injectable()`):
   - `ConflictDetectionService` - No dependencies (pure domain logic)
   - `AvailabilityService` - No dependencies (pure domain logic)
   - `ServiceDurationCalculator` - No dependencies (pure domain logic)

2. **Application Services** (`@Injectable()`):
   - `GetAppointmentsService` → depends on `IAppointmentRepository`
   - `CreateAppointmentService` → depends on `IAppointmentRepository`, `ConflictDetectionService`, `ServiceDurationCalculator`
   - `UpdateAppointmentService` → depends on `IAppointmentRepository`, `ConflictDetectionService`
   - `ChangeAppointmentStatusService` → depends on `IAppointmentRepository`, `IAppointmentStatusHistoryRepository`
   - `BulkChangeStatusService` → depends on `IAppointmentRepository`, `IAppointmentStatusHistoryRepository`
   - `CheckAvailabilityService` → depends on `IAppointmentRepository`, `AvailabilityService`

3. **Repositories** (`@Injectable()`):
   - `AppointmentRepository` → depends on `Repository<AppointmentEntity>` (injected via `@InjectRepository()`)
   - `AppointmentStatusHistoryRepository` → depends on `Repository<AppointmentStatusHistoryEntity>` (injected via `@InjectRepository()`)

4. **Controllers** (`@Controller()`):
   - `CalendarController` → depends on all application services (automatically injected)

**Note:** `AppointmentMapper` uses static methods and doesn't need `@Injectable()` since it has no dependencies.

```typescript
// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarModule } from './calendar/calendar.module';
import { dataSourceOptions } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CalendarModule,
  ],
})
export class AppModule {}
```

```typescript
// server/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  // CORS
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

**Benefits:**
- Automatic dependency injection - no manual wiring
- Type-safe - TypeScript knows all dependencies
- Testable - easy to mock dependencies in tests
- Modular - clear module boundaries
- Scalable - add new modules without refactoring existing code

### Testing Strategy

1. **Domain Layer**: Unit tests for entities, value objects, domain services
2. **Application Layer**: Unit tests for application services with mocked repositories
3. **Infrastructure Layer**: Integration tests for repositories
4. **Presentation Layer**: E2E tests for API endpoints

### Error Handling Guidelines

1. Use domain-specific error types
2. Map domain errors to HTTP status codes in controllers
3. Provide meaningful error messages
4. Log errors appropriately

### Validation Guidelines

1. Validate at presentation layer (request DTOs)
2. Re-validate in domain layer (entity creation)
3. Use Zod schemas for request validation
4. Return clear validation error messages

### Performance Considerations

1. Use database indexes for common queries
2. Implement pagination for large result sets
3. Cache frequently accessed data (employees, services)
4. Optimize N+1 queries with proper joins

---

## Next Steps

1. **Implementation Phase**: Begin implementing domain layer (entities, value objects)
2. **Database Migrations**: Create TypeORM migrations for schema
3. **Repository Implementation**: Implement repository classes
4. **Application Service Implementation**: Implement application services
5. **API Implementation**: Implement REST API controllers
6. **Frontend Implementation**: Implement React components
7. **Testing**: Write comprehensive test suite

---

**Document History:**

- **v1.0** (2025-01-24): Initial detailed design document created

---

**End of Document**

