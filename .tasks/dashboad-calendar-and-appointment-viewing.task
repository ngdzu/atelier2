# Calendar and Appointment Viewing - Dashboard Functional Requirement

**Related Document:** [Dashboard Requirements - Calendar and Appointment Viewing](../doc/DASHBOARD_REQUIREMENTS.md#calendar-and-appointment-viewing)

**Status:** ACTIVE  
**Created:** 2025-01-24  
**Last Updated:** 2025-01-24

## Overview

This task file contains all tasks related to implementing the Calendar and Appointment Viewing functionality for the Dashboard Management System. Tasks are organized following the Software Development Lifecycle (SDL) phases from requirements analysis through deployment.

**Functional Scope:**

- Calendar interface (day, week, month views)
- Employee-based calendar filtering
- Time slot display
- Appointment display and details
- Appointment management (view, edit, create, cancel/delete)
- Appointment status management
- Calendar filtering and search
- Integration with booking system, employee management, and metrics
- Calendar export and printing

## Requirements Reference

See `doc/DASHBOARD_REQUIREMENTS.md` sections:
- **REQ-CAL-001** through **REQ-CAL-015**: Calendar Interface, Appointment Management, Filtering, Integration, Export

## Tasks

This file contains 9 tasks organized across 8 SDL phases:

1. **TASK-DOC-011**: Calendar and Appointment Viewing Requirements Analysis
2. **TASK-FEAT-025**: Calendar and Appointment Viewing Architecture and Design
3. **TASK-DOC-012**: Calendar and Appointment Viewing Detailed Design
4. **TASK-DB-007**: Calendar and Appointment Viewing Database Schema
5. **TASK-API-006**: Calendar and Appointment Viewing Backend API Implementation
6. **TASK-FEAT-026**: Calendar and Appointment Viewing Frontend Implementation
7. **TASK-TEST-007**: Calendar and Appointment Viewing Testing Suite
8. **TASK-DOC-013**: Calendar and Appointment Viewing User Guide
9. **TASK-OPS-008**: Calendar and Appointment Viewing Deployment

All tasks are registered in `.tasks/TASK_REGISTRY.json` and ordered in `.tasks/TASK_ORDER.json`.

---

### Phase 1: Requirements Analysis

## TASK-DOC-011: Calendar and Appointment Viewing Requirements Analysis

**Status:** COMPLETED
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 3 hours
**Dependencies:** TASK-DOC-002
**Related Tasks:** TASK-FEAT-014

### Description

Conduct detailed requirements analysis specifically for the Calendar and Appointment Viewing functionality. While high-level requirements exist in DASHBOARD_REQUIREMENTS.md, this task creates a focused requirements document that expands on calendar-specific needs, user workflows, integration points, and technical specifications.

### Requirements / What to Do

#### Step 1: Review Existing Requirements
- [x] Review `doc/DASHBOARD_REQUIREMENTS.md` sections REQ-CAL-001 through REQ-CAL-015
- [x] Extract all calendar and appointment viewing requirements
- [x] Identify any gaps or ambiguities in existing requirements
- [x] Document integration requirements with booking system, employee management, and metrics

#### Step 2: Expand Calendar Interface Requirements
- [x] Define detailed calendar view specifications:
  - Day view: Hourly time slots, business hours, time increments (15/30 minutes)
  - Week view: Daily columns, week start day (Sunday/Monday), week navigation
  - Month view: Calendar grid, appointment indicators, month navigation
- [x] Document navigation requirements:
  - Previous/next day/week/month controls
  - Jump to today functionality
  - Date picker for quick navigation
  - Keyboard shortcuts (optional)
- [x] Define time slot display requirements:
  - Business hours configuration (start/end time)
  - Time slot granularity (15 vs 30 minutes)
  - Available vs booked slot visualization
  - Time slot click behavior

#### Step 3: Expand Appointment Management Requirements
- [x] Document appointment creation workflow:
  - Manual appointment creation from calendar
  - Required fields vs optional fields
  - Validation rules (time conflicts, employee availability)
  - Customer selection (search/autocomplete)
- [x] Document appointment editing workflow:
  - Editable fields and restrictions
  - Conflict detection and resolution
  - Change notification requirements
- [x] Document appointment status workflow:
  - Status transition rules (SCHEDULED → COMPLETED, etc.)
  - Status change permissions by role
  - Status change audit logging
- [x] Document appointment cancellation/deletion:
  - Soft delete vs hard delete
  - Cancellation reason tracking
  - Customer notification requirements

#### Step 4: Define Integration Requirements
- [x] Document booking system integration:
  - Real-time sync requirements
  - Conflict resolution strategy
  - Data consistency requirements
- [x] Document employee management integration:
  - Employee availability display
  - Employee color coding
  - Employee filter functionality
- [x] Document metrics integration:
  - Appointment data for metrics calculations
  - Real-time updates to metrics
  - Historical data requirements

#### Step 5: Define Filtering and Search Requirements
- [x] Document filter combinations:
  - Employee + Date range
  - Service type + Status
  - Customer + Employee
  - Multiple simultaneous filters
- [x] Document search functionality:
  - Search by customer name (fuzzy matching)
  - Search by service name
  - Search by appointment ID
  - Search result highlighting

#### Step 6: Define Export and Printing Requirements
- [x] Document PDF export specifications:
  - Calendar view format
  - Appointment details included
  - Date range in export
  - Employee filter in export
- [x] Document CSV export specifications:
  - Column definitions
  - Date format
  - Include/exclude fields
- [x] Document print view requirements:
  - Print-friendly layout
  - Page breaks
  - Header/footer information

#### Step 7: Create Requirements Document
- [x] Create `doc/dashboard/calendar-apointment/CALENDAR_APPOINTMENT_REQUIREMENTS.md`
- [x] Document all findings from steps 1-6
- [x] Include detailed user workflows
- [ ] Create sequence diagrams for key workflows (optional, can be done in architecture phase)
- [x] Document technical constraints
- [ ] Include mockups or wireframes (if available - not required for requirements phase)

### Definition of Done (DoD)

- [ ] Calendar interface requirements fully documented
- [ ] Appointment management requirements fully documented
- [ ] Integration requirements clearly defined
- [ ] Filtering and search requirements specified
- [ ] Export and printing requirements documented
- [ ] Requirements document created and reviewed
- [ ] All REQ-CAL requirements from DASHBOARD_REQUIREMENTS.md addressed

### Verification Steps

1. **Requirements Review:**
   - Review requirements document for completeness
   - Verify all calendar views are covered
   - Check appointment management workflows are clear
   - Ensure integration points are well-defined

2. **Stakeholder Validation:**
   - Present requirements to stakeholders
   - Gather feedback on workflows
   - Get sign-off on requirements document

### Acceptance Criteria

- ✅ Complete requirements document exists for calendar/appointment viewing
- ✅ All calendar view types (day/week/month) fully specified
- ✅ Appointment management workflows clearly defined
- ✅ Integration requirements documented
- ✅ Export and printing requirements specified
- ✅ Requirements are testable and measurable

### Technical Details

**Files to Create:**
- `doc/CALENDAR_APPOINTMENT_REQUIREMENTS.md`

**Sections to Include:**
- Overview and Scope
- Calendar Interface Requirements
- Appointment Management Requirements
- Integration Requirements
- Filtering and Search Requirements
- Export and Printing Requirements
- User Workflows
- Technical Constraints
- Glossary

---

### Phase 2: Architecture and Design

## TASK-FEAT-025: Calendar and Appointment Viewing Architecture and Design

**Status:** COMPLETED
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-12-26
**Estimated Time:** 6 hours
**Dependencies:** TASK-DOC-011, TASK-FEAT-014
**Related Tasks:** TASK-DB-007, TASK-API-006, TASK-FEAT-026

### Description

Design the complete architecture for the Calendar and Appointment Viewing system including database schema extensions, API design, component structure, and data flow. Create architecture diagrams and design documents that will guide implementation.

### Requirements / What to Do

#### Step 1: Database Schema Design for Calendar
- [x] Review existing Appointment entity from TASK-DB-003
- [x] Design schema extensions if needed:
  - Appointment status history/audit log
  - Appointment notes/attachments
  - Recurring appointment support (if applicable)
- [x] Design indexes for calendar queries:
  - Date range queries
  - Employee + date queries
  - Status filtering
  - Customer search
- [x] Create Entity Relationship Diagram (ERD) for calendar entities
- [x] Document relationships with existing entities (Employee, Customer, Service)

#### Step 2: API Design for Calendar and Appointments
- [x] Design RESTful API endpoints:
  - `GET /api/calendar/appointments` - List appointments with filters
  - `GET /api/calendar/appointments/:id` - Get appointment details
  - `POST /api/calendar/appointments` - Create appointment
  - `PUT /api/calendar/appointments/:id` - Update appointment
  - `PATCH /api/calendar/appointments/:id/status` - Update status
  - `DELETE /api/calendar/appointments/:id` - Delete appointment
  - `GET /api/calendar/availability` - Check employee availability
  - `GET /api/calendar/export` - Export calendar data
- [x] Document request/response schemas
- [x] Define query parameters for filtering, sorting, pagination
- [x] Document authentication/authorization requirements
- [x] Specify error handling and status codes

#### Step 3: Frontend Component Architecture
- [x] Design component hierarchy:
  - **CalendarLayout**: Main calendar container
  - **CalendarView**: Day/Week/Month view switcher
  - **DayView**: Hourly time slot view
  - **WeekView**: Daily columns view
  - **MonthView**: Calendar grid view
  - **AppointmentCard**: Appointment display component
  - **AppointmentModal**: Appointment details/edit modal
  - **AppointmentForm**: Create/edit appointment form
  - **CalendarFilters**: Filter and search component
  - **EmployeeSelector**: Employee filter dropdown
- [x] Define component props and state management
- [x] Plan for shared components (modals, forms, date pickers)
- [x] Design routing structure for calendar views

#### Step 4: State Management Design
- [x] Design state management approach:
  - Local component state (useState) for UI state (view type, selected date)
  - Context API for calendar configuration (business hours, time slots)
  - React Query for server state (appointments, availability)
  - Form state (React Hook Form for appointment form)
- [x] Define data fetching strategies:
  - Caching appointments by date range
  - Real-time updates (polling or WebSocket)
  - Optimistic updates for appointment changes
- [x] Plan for state synchronization with booking system

#### Step 5: Integration Architecture
- [x] Design booking system integration:
  - API endpoints for syncing appointments
  - Conflict resolution strategy
  - Data consistency approach
- [x] Design employee management integration:
  - Employee availability API
  - Employee color coding
  - Employee filter data flow
- [x] Design metrics integration:
  - Appointment data for metrics calculations
  - Real-time metrics updates

#### Step 6: Create Architecture Documentation
- [x] Create `doc/dashboard/calendar-apointment/CALENDAR_APPOINTMENT_ARCHITECTURE.md`
- [x] Include system architecture diagram
- [x] Include database schema diagram (ERD)
- [x] Document API endpoints with examples
- [x] Include component architecture diagram
- [x] Document data flow diagrams
- [x] Create sequence diagrams for key workflows:
  - Create appointment workflow
  - Edit appointment workflow
  - View calendar workflow
  - Export calendar workflow

### Definition of Done (DoD)

- [x] Database schema designed with ERD
- [x] API endpoints fully specified
- [x] Frontend component architecture designed
- [x] State management approach defined
- [x] Integration architecture planned
- [x] Architecture documentation created
- [x] Diagrams created (architecture, ERD, component hierarchy, data flow, sequences)

### Verification Steps

1. **Architecture Review:**
   - Review architecture for completeness
   - Verify database schema supports all requirements
   - Check API design follows RESTful principles
   - Ensure component architecture is maintainable

2. **Design Validation:**
   - Validate database schema relationships
   - Verify API endpoints cover all use cases
   - Check component structure aligns with requirements
   - Ensure integration points are well-defined

### Acceptance Criteria

- ✅ Complete architecture documentation exists
- ✅ Database schema designed with all required entities
- ✅ API endpoints fully specified with schemas
- ✅ Component architecture supports all features
- ✅ Integration architecture addresses all integration points
- ✅ Diagrams clearly illustrate system design

### Technical Details

**Files Created:**
- `doc/dashboard/calendar-apointment/CALENDAR_APPOINTMENT_ARCHITECTURE.md`
- `doc/diagrams/calendar-system-architecture.mmd` (and .svg)
- `doc/diagrams/calendar-erd.mmd` (and .svg)
- `doc/diagrams/calendar-component-hierarchy.mmd` (and .svg)
- `doc/diagrams/calendar-data-flow.mmd` (and .svg)
- `doc/diagrams/calendar-sequence-diagrams.mmd` (and .svg)

**Tools:**
- Mermaid for diagrams
- TypeORM for database ORM
- Express.js for API
- React + TypeScript for frontend

---

### Phase 3: Detailed Design (Class/Component Design)

## TASK-DOC-012: Calendar and Appointment Viewing Detailed Design

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 8 hours
**Dependencies:** TASK-FEAT-025
**Related Tasks:** TASK-DB-007, TASK-API-006

### Description

Design the detailed structure of code components, classes, and modules for the Calendar and Appointment Viewing system following DDD principles. This includes designing domain entities, value objects, application services, repository interfaces, API controllers, and React components with their interfaces, props, and interactions.

### Requirements / What to Do

#### Step 1: Domain Layer Detailed Design
- [ ] Design domain entity classes:
  - **Appointment Entity**: Properties, business methods, invariants
  - **TimeSlot Entity**: Time slot validation, availability checking
  - **CalendarView Entity**: View configuration, date range management
- [ ] Design value objects with validation:
  - AppointmentTime (start/end time validation)
  - DateRange (date range validation)
  - AppointmentStatus (status enum with transitions)
  - EmployeeAvailability
- [ ] Define aggregate boundaries:
  - Appointment as aggregate root
  - Invariants (no overlapping appointments for same employee)
- [ ] Design domain service interfaces:
  - IAppointmentConflictService
  - IAvailabilityService
  - IAppointmentStatusService
- [ ] Design repository interfaces:
  - IAppointmentRepository
  - ICalendarRepository
- [ ] Document domain events:
  - AppointmentCreatedEvent
  - AppointmentUpdatedEvent
  - AppointmentStatusChangedEvent
  - AppointmentCancelledEvent

#### Step 2: Application Layer Detailed Design
- [ ] Design use cases/application services:
  - **GetCalendarAppointments**: Get appointments for date range with filters
  - **GetAppointmentDetails**: Get single appointment with full details
  - **CreateAppointment**: Create new appointment with validation
  - **UpdateAppointment**: Update appointment with conflict checking
  - **ChangeAppointmentStatus**: Update status with workflow validation
  - **CancelAppointment**: Cancel appointment with notifications
  - **DeleteAppointment**: Hard delete appointment
  - **CheckAvailability**: Check employee availability for time slot
  - **ExportCalendar**: Export calendar data to PDF/CSV
- [ ] Design DTOs:
  - AppointmentDto, AppointmentListDto
  - CreateAppointmentRequest, UpdateAppointmentRequest
  - AppointmentResponse, CalendarExportResponse
- [ ] Design mappers between layers:
  - Domain entity to DTO mappers
  - DTO to domain entity mappers

#### Step 3: Infrastructure Layer Detailed Design
- [ ] Design repository implementations:
  - AppointmentRepository (TypeORM implementation)
  - CalendarRepository (TypeORM implementation)
- [ ] Design database entities (TypeORM):
  - AppointmentEntity (extend existing if applicable)
  - AppointmentStatusHistoryEntity (for audit log)
- [ ] Design external service integrations:
  - BookingSystemSyncService (if separate system)
  - NotificationService (for appointment notifications)

#### Step 4: Presentation Layer Detailed Design
- [ ] Design API controllers:
  - CalendarController: methods, request/response handling
  - AppointmentController: CRUD operations, status management
- [ ] Design API routes structure:
  - Route definitions with middleware
  - Authentication/authorization middleware placement
  - Validation middleware
  - Error handling middleware
- [ ] Design request/response DTOs:
  - Request validation schemas (class-validator or zod)
  - Response format standardization
  - Error response format

#### Step 5: Frontend Component Detailed Design
- [ ] Design React component structure:
  - **CalendarLayout**: Main container with navigation
  - **CalendarViewSwitcher**: Day/Week/Month view selector
  - **DayView**: Hourly time slots, appointment rendering
  - **WeekView**: Daily columns, appointment positioning
  - **MonthView**: Calendar grid, appointment indicators
  - **AppointmentCard**: Appointment display with details
  - **AppointmentModal**: Appointment details/edit modal
  - **AppointmentForm**: Create/edit form with validation
  - **CalendarFilters**: Filter controls (employee, status, date range)
  - **EmployeeSelector**: Employee dropdown with colors
  - **TimeSlot**: Individual time slot component
- [ ] Design component props interfaces:
  - Define TypeScript interfaces for all component props
  - Document required vs optional props
  - Define prop types and validation
- [ ] Design component state management:
  - Local state (useState) for UI state
  - Context API for calendar configuration
  - React Query for server state
  - Form state (React Hook Form)
- [ ] Design custom hooks:
  - useCalendar: Calendar data fetching and management
  - useAppointments: Appointment CRUD operations
  - useAvailability: Employee availability checking
  - useCalendarFilters: Filter state management
- [ ] Design routing structure:
  - Route definitions for calendar views
  - Protected routes
  - Route parameters (date, view type)

#### Step 6: Data Flow Design
- [ ] Design data flow diagrams:
  - User action → API request → Application service → Domain → Repository → Database
  - Response flow: Database → Repository → Domain → Application → DTO → API → Frontend
- [ ] Design error handling flow:
  - Domain errors → Application errors → API errors → Frontend error handling
- [ ] Design validation flow:
  - Frontend validation → API validation → Domain validation

#### Step 7: Create Detailed Design Documentation
- [ ] Create `doc/CALENDAR_APPOINTMENT_DETAILED_DESIGN.md`
- [ ] Document all domain entities with class diagrams
- [ ] Document all value objects with properties and validation rules
- [ ] Document all use cases with input/output specifications
- [ ] Document all API endpoints with request/response schemas
- [ ] Document all React components with props interfaces
- [ ] Include data flow diagrams
- [ ] Include sequence diagrams for key workflows
- [ ] Document design patterns used
- [ ] Document design decisions and rationale

### Definition of Done (DoD)

- [ ] All domain entities designed with properties and methods
- [ ] All value objects designed with validation rules
- [ ] All repository interfaces defined
- [ ] All use cases designed with input/output specifications
- [ ] All DTOs designed
- [ ] All API controllers and routes designed
- [ ] All React components designed with props interfaces
- [ ] All custom hooks designed
- [ ] Data flow diagrams created
- [ ] Detailed design documentation complete
- [ ] Design reviewed for DDD compliance
- [ ] Design aligns with architecture from TASK-FEAT-019

### Verification Steps

1. **Design Review:**
   - Review all entity designs for completeness
   - Verify value objects are immutable and validated
   - Check repository interfaces are properly abstracted
   - Ensure use cases follow application service pattern
   - Validate component props interfaces are complete

2. **DDD Compliance:**
   - Verify domain layer has no infrastructure dependencies
   - Check aggregates maintain invariants
   - Validate repository pattern abstraction
   - Ensure ubiquitous language is used consistently

### Acceptance Criteria

- ✅ Complete detailed design documentation exists
- ✅ All domain entities and value objects designed
- ✅ All use cases designed with clear specifications
- ✅ All API endpoints designed with request/response schemas
- ✅ All React components designed with props interfaces
- ✅ Data flow diagrams created
- ✅ Design follows DDD principles
- ✅ Design aligns with architecture
- ✅ Design is ready for implementation

### Technical Details

**Files to Create:**
- `doc/CALENDAR_APPOINTMENT_DETAILED_DESIGN.md`
- `doc/diagrams/calendar-class-diagram.mmd` (and .svg)
- `doc/diagrams/calendar-component-hierarchy.mmd` (and .svg)
- `doc/diagrams/calendar-data-flow.mmd` (and .svg)
- `doc/diagrams/calendar-sequence-diagrams.mmd` (and .svg)

**Key Design Decisions to Document:**
- Entity vs value object decisions
- Aggregate boundaries
- Repository method signatures
- Use case input/output structures
- Component prop interfaces
- State management approach
- Error handling strategy

---

### Phase 4: Database Schema Implementation

## TASK-DB-007: Calendar and Appointment Viewing Database Schema

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 4 hours
**Dependencies:** TASK-DOC-012, TASK-DB-003
**Related Tasks:** TASK-API-006

### Description

Implement the database schema extensions for the Calendar and Appointment Viewing system. This includes creating or extending TypeORM entities, relationships, migrations, and indexes to support calendar functionality, appointment management, and status tracking.

### Requirements / What to Do

#### Step 1: Review Existing Schema
- [ ] Review existing Appointment entity from TASK-DB-003
- [ ] Identify fields needed for calendar functionality
- [ ] Check if extensions are needed or new entities required
- [ ] Document any schema changes needed

#### Step 2: Create/Extend Appointment Entity
- [ ] Review `server/src/entities/Appointment.entity.ts` (if exists)
- [ ] Ensure all required fields exist:
  - id, customer_id, employee_id, date, start_time, end_time
  - status (SCHEDULED, COMPLETED, CANCELLED, NO_SHOW)
  - notes, created_at, updated_at
  - service_ids (if many-to-many relationship)
- [ ] Add calendar-specific fields if needed:
  - timezone (if multi-timezone support)
  - recurrence_pattern (if recurring appointments)
  - parent_appointment_id (for recurring series)
- [ ] Add indexes for calendar queries:
  - Index on (employee_id, date, start_time)
  - Index on (customer_id, date)
  - Index on (status, date)
  - Index on date for date range queries

#### Step 3: Create Appointment Status History Entity (Optional but Recommended)
- [ ] Create `server/src/entities/AppointmentStatusHistory.entity.ts`:
  - id (UUID)
  - appointment_id (foreign key to Appointment)
  - previous_status (string, nullable)
  - new_status (string)
  - changed_by (foreign key to User)
  - change_reason (text, nullable)
  - created_at timestamp
- [ ] Add indexes:
  - Index on appointment_id
  - Index on created_at for audit queries

#### Step 4: Create Entity Relationships
- [ ] Define foreign key relationships:
  - Appointment.customer_id → User.id (or Customer.id)
  - Appointment.employee_id → Employee.id
  - AppointmentStatusHistory.appointment_id → Appointment.id (CASCADE DELETE)
  - AppointmentStatusHistory.changed_by → User.id
- [ ] Set up cascade delete policies appropriately
- [ ] Document relationship constraints

#### Step 5: Create Database Migrations
- [ ] Create migration for Appointment entity extensions (if needed)
  - Add any new fields
  - Add indexes
  - Add constraints
- [ ] Create migration for AppointmentStatusHistory table (if created)
  - Create table with all columns
  - Add foreign keys and indexes
- [ ] Test migrations (up and down)

#### Step 6: Update Repository Pattern
- [ ] Create or update `server/src/repositories/AppointmentRepository.ts`:
  - Implement IAppointmentRepository interface
  - Methods for calendar queries:
    - findByDateRange(startDate, endDate, filters)
    - findByEmployeeAndDate(employeeId, date)
    - findAvailableTimeSlots(employeeId, date, duration)
    - checkConflicts(employeeId, startTime, endTime, excludeAppointmentId)
- [ ] Create `server/src/repositories/CalendarRepository.ts`:
  - Methods for calendar-specific queries
  - Aggregation queries for calendar views

#### Step 7: Update Database Configuration
- [ ] Ensure TypeORM configuration includes all entities
- [ ] Configure connection pooling appropriately
- [ ] Set up migration configuration
- [ ] Configure entity metadata properly

### Definition of Done (DoD)

- [ ] Appointment entity created/extended with all required fields
- [ ] AppointmentStatusHistory entity created (if applicable)
- [ ] All relationships defined correctly
- [ ] Indexes created for performance
- [ ] Migrations created and tested
- [ ] Migrations can run up and down successfully
- [ ] Database schema matches architecture design
- [ ] Foreign key constraints properly set
- [ ] Repository pattern implemented
- [ ] TypeScript types compile without errors

### Verification Steps

1. **Schema Verification:**
   ```bash
   # Run migrations
   cd server
   npm run migration:run
   
   # Verify tables created
   # Connect to database and check table structure
   
   # Test rollback
   npm run migration:revert
   npm run migration:run
   ```

2. **Entity Verification:**
   - Verify all entities can be instantiated
   - Check relationships load correctly
   - Test cascade delete behavior
   - Verify indexes are created

3. **Performance:**
   - Verify indexes are used in query plans
   - Test query performance with sample data
   - Check date range queries are optimized

### Acceptance Criteria

- ✅ All database entities created and match architecture design
- ✅ Relationships properly defined with foreign keys
- ✅ Migrations run successfully without errors
- ✅ Indexes created for optimal query performance
- ✅ Schema supports all calendar features
- ✅ Repository pattern implemented correctly
- ✅ TypeScript types align with database schema

### Technical Details

**Files to Create/Modify:**
- `server/src/entities/Appointment.entity.ts` (extend if exists)
- `server/src/entities/AppointmentStatusHistory.entity.ts` (optional)
- `server/src/repositories/AppointmentRepository.ts`
- `server/src/repositories/CalendarRepository.ts`
- `server/src/database/migrations/[timestamp]-calendar-appointment-schema.ts`

**Dependencies:**
- TypeORM
- PostgreSQL
- UUID generation library

---

### Phase 5: Implementation

## TASK-API-006: Calendar and Appointment Viewing Backend API Implementation

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 12 hours
**Dependencies:** TASK-DB-007, TASK-API-005
**Related Tasks:** TASK-SEC-002, TASK-FEAT-026

### Description

Implement the complete backend API for the Calendar and Appointment Viewing system including endpoints for viewing appointments, creating/editing appointments, managing appointment status, checking availability, and exporting calendar data. This task uses the authentication and authorization middleware already implemented in TASK-API-005.

### Requirements / What to Do

#### Step 1: Integrate Authentication and Authorization Middleware
- [ ] Use existing authentication middleware from TASK-API-005
- [ ] Apply authentication middleware to all calendar API routes
- [ ] Apply authorization middleware based on endpoint requirements:
  - View calendar: MANAGER+ (OWNER, ADMIN, MANAGER, EMPLOYEE with limited view)
  - Create/Edit appointments: MANAGER+
  - Delete appointments: MANAGER+
  - Export calendar: MANAGER+

#### Step 2: Implement Calendar API Endpoints
- [ ] Create `server/src/routes/calendar.routes.ts`:
  - `GET /api/calendar/appointments`
    - List appointments with filtering (employee, date range, status, customer)
    - Query params: startDate, endDate, employeeId, status, customerId, serviceId
    - Pagination support
    - Response: { appointments: [...], total, page, limit }
  - `GET /api/calendar/appointments/:id`
    - Get single appointment with full details
    - Include customer, employee, services information
    - Response: { appointment: {...} }
  - `GET /api/calendar/availability`
    - Check employee availability for time slot
    - Query params: employeeId, date, startTime, endTime, duration
    - Response: { available: boolean, conflicts: [...] }
- [ ] Create `server/src/services/calendar.service.ts`:
  - Business logic for calendar queries
  - Date range filtering
  - Employee availability checking
  - Conflict detection

#### Step 3: Implement Appointment Management API Endpoints
- [ ] Create `server/src/routes/appointments.routes.ts`:
  - `POST /api/calendar/appointments`
    - Create new appointment
    - Request validation
    - Conflict checking
    - Save to database
    - Response: { appointment: {...} }
  - `PUT /api/calendar/appointments/:id`
    - Update appointment details
    - Request validation
    - Conflict checking (exclude current appointment)
    - Response: { appointment: {...} }
  - `PATCH /api/calendar/appointments/:id/status`
    - Update appointment status
    - Status transition validation
    - Create status history entry
    - Response: { appointment: {...} }
  - `DELETE /api/calendar/appointments/:id`
    - Delete appointment (soft delete or hard delete)
    - Check permissions
    - Response: { success: true }
- [ ] Create `server/src/services/appointment.service.ts`:
  - Appointment CRUD logic
  - Conflict detection logic
  - Status transition logic
  - Validation logic

#### Step 4: Implement Calendar Export Endpoints
- [ ] Add export endpoints to `server/src/routes/calendar.routes.ts`:
  - `GET /api/calendar/export/pdf`
    - Export calendar view to PDF
    - Query params: startDate, endDate, employeeId
    - Response: PDF file
  - `GET /api/calendar/export/csv`
    - Export appointments to CSV
    - Query params: startDate, endDate, employeeId, filters
    - Response: CSV file
- [ ] Create `server/src/services/export.service.ts`:
  - PDF generation logic (using pdfkit or similar)
  - CSV generation logic
  - Data formatting for export

#### Step 5: Request Validation and Error Handling
- [ ] Create validation schemas using Zod or class-validator:
  - CreateAppointmentRequest schema
  - UpdateAppointmentRequest schema
  - ChangeStatusRequest schema
  - CalendarQueryParams schema
- [ ] Create `server/src/middleware/validation.middleware.ts` (if not exists):
  - Validate request bodies
  - Validate query parameters
  - Return 400 with validation errors
- [ ] Create `server/src/middleware/error.middleware.ts` (if not exists):
  - Global error handler
  - Format error responses
  - Handle different error types (validation, not found, conflict, unauthorized)

#### Step 6: Integration with Booking System
- [ ] Create `server/src/services/bookingSync.service.ts`:
  - Sync appointments from booking system
  - Handle conflicts
  - Real-time updates (polling or WebSocket)
- [ ] Implement conflict resolution strategy
- [ ] Document sync process

#### Step 7: API Documentation
- [ ] Create `server/src/docs/calendar-api-docs.md`:
  - Document all endpoints
  - Include request/response examples
  - Document authentication requirements
  - Include error codes and messages
- [ ] Add JSDoc comments to all route handlers
- [ ] Consider adding Swagger/OpenAPI documentation

#### Step 8: Testing Infrastructure
- [ ] Set up test database
- [ ] Create test utilities (test appointment creation, authentication helpers)
- [ ] Write integration tests for key endpoints
- [ ] Test error scenarios

### Definition of Done (DoD)

- [ ] All API endpoints implemented
- [ ] Authentication and authorization middleware working
- [ ] Request validation implemented
- [ ] Error handling comprehensive
- [ ] All endpoints return proper status codes
- [ ] API documentation created
- [ ] Integration tests written for endpoints
- [ ] Conflict detection working correctly
- [ ] Export functionality working
- [ ] TypeScript compiles without errors

### Verification Steps

1. **API Testing:**
   ```bash
   # Start server
   cd server
   npm run dev
   
   # Test endpoints with curl or Postman
   # Test authentication
   # Test calendar endpoints
   # Test appointment CRUD
   # Test export endpoints
   ```

2. **Integration Testing:**
   ```bash
   npm run test
   # Run integration tests
   ```

3. **Manual Testing:**
   - Test all CRUD operations
   - Test conflict detection
   - Test status transitions
   - Test filtering and search
   - Test export functionality

### Acceptance Criteria

- ✅ All API endpoints implemented and functional
- ✅ Authentication and authorization working correctly
- ✅ Request validation prevents invalid data
- ✅ Error handling returns appropriate responses
- ✅ Conflict detection working correctly
- ✅ Export functionality working
- ✅ API documentation complete and accurate
- ✅ Integration tests passing
- ✅ API performance acceptable (< 200ms for most endpoints)

### Technical Details

**Files to Create:**
- `server/src/routes/calendar.routes.ts`
- `server/src/routes/appointments.routes.ts`
- `server/src/services/calendar.service.ts`
- `server/src/services/appointment.service.ts`
- `server/src/services/export.service.ts`
- `server/src/services/bookingSync.service.ts`
- `server/src/validators/appointment.validator.ts`
- `server/src/docs/calendar-api-docs.md`

**Dependencies:**
- Express.js
- TypeORM
- Zod or class-validator (validation)
- pdfkit or similar (PDF export)
- csv-writer or similar (CSV export)

---

## TASK-FEAT-026: Calendar and Appointment Viewing Frontend Implementation

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 16 hours
**Dependencies:** TASK-API-006
**Related Tasks:** TASK-FEAT-015

### Description

Implement the frontend interface for Calendar and Appointment Viewing including calendar views (day/week/month), appointment management, filtering, search, and export functionality. Create a comprehensive calendar interface that allows managers and owners to view and manage appointments effectively.

### Requirements / What to Do

#### Step 1: Set Up API Service Layer
- [ ] Create `client/services/calendarService.ts`:
  - `getAppointments(filters)`: Fetch appointments with filters
  - `getAppointment(id)`: Get single appointment
  - `createAppointment(appointmentData)`: Create new appointment
  - `updateAppointment(id, appointmentData)`: Update appointment
  - `deleteAppointment(id)`: Delete appointment
  - `changeAppointmentStatus(id, status)`: Change status
  - `checkAvailability(employeeId, date, timeSlot)`: Check availability
  - `exportCalendar(format, filters)`: Export calendar data
  - Error handling for all API calls
  - Type definitions for all responses

#### Step 2: Create Calendar Layout Component
- [ ] Create `client/components/calendar/CalendarLayout.tsx`:
  - Main calendar container
  - Navigation header (date picker, view switcher, filters)
  - Calendar view area
  - Loading and error states
  - Responsive layout

#### Step 3: Implement Calendar View Switcher
- [ ] Create `client/components/calendar/CalendarViewSwitcher.tsx`:
  - Day/Week/Month view buttons
  - Active view indicator
  - View change handler

#### Step 4: Implement Day View
- [ ] Create `client/components/calendar/views/DayView.tsx`:
  - Display hourly time slots (e.g., 9:00 AM - 7:00 PM)
  - Show appointments in time slots
  - Click time slot to create appointment
  - Click appointment to view/edit
  - Current time indicator
  - Scroll to current time on load

#### Step 5: Implement Week View
- [ ] Create `client/components/calendar/views/WeekView.tsx`:
  - Display daily columns (Sunday-Saturday or Monday-Sunday)
  - Show appointments positioned by time
  - Click time slot to create appointment
  - Click appointment to view/edit
  - Week navigation (previous/next week)
  - Current day indicator

#### Step 6: Implement Month View
- [ ] Create `client/components/calendar/views/MonthView.tsx`:
  - Display calendar grid (weeks × days)
  - Show appointment indicators on days
  - Click day to view day details
  - Click appointment indicator to view appointment
  - Month navigation (previous/next month)
  - Current date indicator

#### Step 7: Implement Appointment Components
- [ ] Create `client/components/calendar/AppointmentCard.tsx`:
  - Display appointment information (customer, service, time)
  - Color coding by status or service type
  - Hover tooltip with details
  - Click to open details modal
- [ ] Create `client/components/calendar/AppointmentModal.tsx`:
  - Display full appointment details
  - Edit button (if permission)
  - Cancel/Delete button (if permission)
  - Status change dropdown
  - Close button
- [ ] Create `client/components/calendar/AppointmentForm.tsx`:
  - Form for creating/editing appointments
  - Fields: customer (search/select), employee, services, date, time, notes
  - Validation
  - Conflict detection display
  - Save and Cancel buttons
  - Use React Hook Form

#### Step 8: Implement Calendar Filters
- [ ] Create `client/components/calendar/CalendarFilters.tsx`:
  - Employee filter (dropdown with colors)
  - Status filter (checkboxes)
  - Service filter (multi-select)
  - Date range filter
  - Customer search
  - Clear filters button
  - Active filter indicators

#### Step 9: Implement Employee Selector
- [ ] Create `client/components/calendar/EmployeeSelector.tsx`:
  - Dropdown with employee list
  - Employee color coding
  - "All Employees" option
  - Multi-select support (if needed)

#### Step 10: Add Calendar Navigation
- [ ] Implement date navigation:
  - Previous/next day/week/month buttons
  - Jump to today button
  - Date picker for quick navigation
  - Keyboard shortcuts (optional)

#### Step 11: Add Export Functionality
- [ ] Create export button component
- [ ] Implement PDF export (call API endpoint)
- [ ] Implement CSV export (call API endpoint)
- [ ] Show export options dialog
- [ ] Handle export download

#### Step 12: Add Real-time Updates
- [ ] Implement polling for appointment updates (optional)
- [ ] Or implement WebSocket connection (if available)
- [ ] Update calendar when new appointments created
- [ ] Handle conflicts gracefully

#### Step 13: Performance Optimization
- [ ] Implement data caching using React Query
- [ ] Add debouncing for filter changes
- [ ] Lazy load calendar views
- [ ] Optimize re-renders with React.memo
- [ ] Virtual scrolling for large date ranges (if needed)

### Definition of Done (DoD)

- [ ] All calendar views (day/week/month) implemented
- [ ] Appointment CRUD operations working
- [ ] Filtering and search working
- [ ] Export functionality working
- [ ] Real-time updates working (if implemented)
- [ ] Loading and error states implemented
- [ ] Responsive design working on all screen sizes
- [ ] Performance optimized
- [ ] TypeScript types correct
- [ ] No console errors

### Verification Steps

1. **Manual Testing:**
   - Navigate to calendar
   - Test all view types (day/week/month)
   - Create appointment
   - Edit appointment
   - Change appointment status
   - Delete appointment
   - Test filtering
   - Test search
   - Test export
   - Test on mobile and desktop

2. **Integration Testing:**
   - Verify API calls are made correctly
   - Check data flows correctly
   - Verify error handling works
   - Test conflict detection

### Acceptance Criteria

- ✅ Calendar displays appointments correctly in all views
- ✅ Users can create, edit, and delete appointments
- ✅ Filtering and search work correctly
- ✅ Export functionality works
- ✅ Calendar is responsive and works on mobile
- ✅ Performance is acceptable (calendar loads < 2 seconds)
- ✅ User can easily manage appointments

### Technical Details

**Files to Create:**
- `client/services/calendarService.ts`
- `client/components/calendar/CalendarLayout.tsx`
- `client/components/calendar/CalendarViewSwitcher.tsx`
- `client/components/calendar/views/DayView.tsx`
- `client/components/calendar/views/WeekView.tsx`
- `client/components/calendar/views/MonthView.tsx`
- `client/components/calendar/AppointmentCard.tsx`
- `client/components/calendar/AppointmentModal.tsx`
- `client/components/calendar/AppointmentForm.tsx`
- `client/components/calendar/CalendarFilters.tsx`
- `client/components/calendar/EmployeeSelector.tsx`

**Files to Modify:**
- `client/components/AppointmentCalendar.tsx` (enhance existing or replace)
- `client/App.tsx` (add calendar route)

**Dependencies:**
- React Query or SWR for data fetching
- date-fns for date manipulation
- React Hook Form for forms
- A calendar library (react-big-calendar, fullcalendar, or custom)

---

### Phase 6: Testing

## TASK-TEST-007: Calendar and Appointment Viewing Testing Suite

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 12 hours
**Dependencies:** TASK-FEAT-026, TASK-API-006
**Related Tasks:** TASK-TEST-002

### Description

Create comprehensive testing suite for the Calendar and Appointment Viewing system including unit tests, integration tests, and end-to-end tests. Ensure high test coverage for critical functionality including calendar views, appointment management, conflict detection, and export functionality.

### Requirements / What to Do

#### Step 1: Backend Unit Tests
- [ ] Test calendar service:
  - Date range queries
  - Filtering logic
  - Availability checking
- [ ] Test appointment service:
  - Appointment CRUD operations
  - Conflict detection logic
  - Status transition logic
  - Validation logic
- [ ] Test export service:
  - PDF generation
  - CSV generation
  - Data formatting

#### Step 2: Backend Integration Tests
- [ ] Test API endpoints:
  - GET /api/calendar/appointments (with filters)
  - GET /api/calendar/appointments/:id
  - POST /api/calendar/appointments
  - PUT /api/calendar/appointments/:id
  - PATCH /api/calendar/appointments/:id/status
  - DELETE /api/calendar/appointments/:id
  - GET /api/calendar/availability
  - GET /api/calendar/export/pdf
  - GET /api/calendar/export/csv
- [ ] Test error handling:
  - Invalid inputs
  - Unauthorized access
  - Conflict errors
  - Not found errors

#### Step 3: Frontend Unit Tests
- [ ] Test calendar services:
  - calendarService methods
  - Error handling
- [ ] Test utility functions:
  - Date formatting
  - Time slot calculations
  - Appointment positioning logic
- [ ] Test custom hooks:
  - useCalendar
  - useAppointments
  - useAvailability
  - useCalendarFilters

#### Step 4: Frontend Component Tests
- [ ] Test calendar components:
  - CalendarLayout rendering
  - CalendarViewSwitcher
  - DayView, WeekView, MonthView
  - AppointmentCard
  - AppointmentModal
  - AppointmentForm validation
  - CalendarFilters
  - EmployeeSelector
- [ ] Test user interactions:
  - View switching
  - Date navigation
  - Appointment creation
  - Appointment editing
  - Filter application

#### Step 5: Integration Tests
- [ ] Test complete user flows:
  - View calendar → Create appointment → Edit appointment → Delete appointment
  - Filter calendar → View appointment → Change status
  - Export calendar → Download file
- [ ] Test API integration:
  - Data fetching
  - Data mutations
  - Error handling
  - Loading states

#### Step 6: End-to-End Tests (Optional but Recommended)
- [ ] Set up E2E testing framework
- [ ] Test critical user journeys:
  - Complete calendar viewing flow
  - Complete appointment creation flow
  - Complete appointment management flow
  - Export calendar flow

#### Step 7: Performance Tests
- [ ] Test API response times
- [ ] Test with large date ranges (many appointments)
- [ ] Test calendar rendering performance
- [ ] Test filter performance

#### Step 8: Test Coverage
- [ ] Set up test coverage reporting
- [ ] Aim for >80% code coverage
- [ ] Focus on critical paths (conflict detection, status transitions)

### Definition of Done (DoD)

- [ ] Unit tests written for all services
- [ ] Integration tests for all API endpoints
- [ ] Component tests for all major components
- [ ] E2E tests for critical user flows (if implemented)
- [ ] Test coverage >80%
- [ ] All tests passing
- [ ] Test documentation complete

### Verification Steps

1. **Run Test Suite:**
   ```bash
   # Backend tests
   cd server
   npm run test
   npm run test:coverage
   
   # Frontend tests
   cd client
   npm run test
   npm run test:coverage
   ```

2. **Verify Coverage:**
   - Check coverage reports
   - Verify critical paths are covered

### Acceptance Criteria

- ✅ Comprehensive test suite covers all major functionality
- ✅ Test coverage meets project standards (>80%)
- ✅ All tests pass consistently
- ✅ Critical user flows are tested
- ✅ Test documentation is complete

### Technical Details

**Files to Create:**
- `server/src/__tests__/services/calendar.service.test.ts`
- `server/src/__tests__/services/appointment.service.test.ts`
- `server/src/__tests__/routes/calendar.routes.test.ts`
- `server/src/__tests__/routes/appointments.routes.test.ts`
- `client/src/__tests__/services/calendarService.test.ts`
- `client/src/__tests__/components/calendar/*.test.tsx`
- `e2e/calendar.spec.ts` (if E2E testing)

**Testing Tools:**
- Jest (backend and frontend unit tests)
- Supertest (backend API tests)
- React Testing Library (frontend component tests)
- Playwright or Cypress (E2E tests)

---

### Phase 7: Documentation

## TASK-DOC-013: Calendar and Appointment Viewing User Guide

**Status:** PENDING
**Priority:** MEDIUM
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 4 hours
**Dependencies:** TASK-FEAT-026
**Related Tasks:** TASK-DOC-009

### Description

Create comprehensive user-facing documentation for the Calendar and Appointment Viewing functionality. This includes user guides for different roles, step-by-step tutorials, FAQ sections, and troubleshooting guides.

### Requirements / What to Do

#### Step 1: Create User Guide Structure
- [ ] Create `doc/CALENDAR_USER_GUIDE.md` as main guide
- [ ] Create role-specific sections:
  - Owner/Manager guide (full access)
  - Employee guide (limited view)
- [ ] Create feature-specific sections:
  - Calendar views guide
  - Appointment management guide
  - Filtering and search guide
  - Export guide

#### Step 2: Document Calendar Views
- [ ] How to switch between day/week/month views
- [ ] How to navigate dates (previous/next, jump to today)
- [ ] How to read calendar displays
- [ ] Understanding time slots
- [ ] Understanding appointment indicators

#### Step 3: Document Appointment Management
- [ ] How to view appointment details
- [ ] How to create appointments manually
- [ ] How to edit appointments
- [ ] How to change appointment status
- [ ] How to cancel/delete appointments
- [ ] Understanding appointment conflicts

#### Step 4: Document Filtering and Search
- [ ] How to filter by employee
- [ ] How to filter by status
- [ ] How to filter by service
- [ ] How to filter by date range
- [ ] How to search for appointments
- [ ] How to clear filters

#### Step 5: Document Export Functionality
- [ ] How to export calendar to PDF
- [ ] How to export appointments to CSV
- [ ] What data is included in exports
- [ ] How to use exported data

#### Step 6: Create FAQ Section
- [ ] Common questions about calendar views
- [ ] Common questions about appointment management
- [ ] Questions about conflicts and availability
- [ ] Questions about permissions

#### Step 7: Create Troubleshooting Guide
- [ ] Calendar not loading
- [ ] Appointments not appearing
- [ ] Cannot create appointment (conflicts)
- [ ] Export not working
- [ ] Performance issues

#### Step 8: Add Visual Aids
- [ ] Screenshots for key workflows
- [ ] Annotated screenshots showing UI elements
- [ ] Step-by-step visual guides

### Definition of Done (DoD)

- [ ] Main user guide created
- [ ] All calendar views documented
- [ ] All appointment management features documented
- [ ] Filtering and search documented
- [ ] Export functionality documented
- [ ] FAQ section with common questions
- [ ] Troubleshooting guide created
- [ ] Visual aids included
- [ ] Documentation reviewed for accuracy

### Acceptance Criteria

- ✅ Complete user guide exists for calendar/appointment viewing
- ✅ All features are documented with step-by-step instructions
- ✅ FAQ section addresses common questions
- ✅ Troubleshooting guide helps resolve common issues
- ✅ Documentation is clear, accurate, and easy to follow

### Technical Details

**Files to Create:**
- `doc/CALENDAR_USER_GUIDE.md`

**Sections to Include:**
- Getting Started
- Calendar Views
- Appointment Management
- Filtering and Search
- Export Functionality
- FAQ
- Troubleshooting

---

### Phase 8: Deployment

## TASK-OPS-008: Calendar and Appointment Viewing Deployment

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-24
**Updated:** 2025-01-24
**Estimated Time:** 2 hours
**Dependencies:** TASK-TEST-007, TASK-OPS-007
**Related Tasks:** TASK-OPS-007

### Description

Deploy the Calendar and Appointment Viewing functionality to production environment. This includes running deployment checks, deploying to staging and production, performing smoke tests, and verifying integration with existing dashboard features.

### Requirements / What to Do

#### Step 1: Pre-Deployment Checks
- [ ] Run full test suite (unit, integration, E2E)
- [ ] Verify all calendar features work in staging
- [ ] Check database migrations are ready
- [ ] Verify API endpoints are accessible
- [ ] Check frontend builds successfully

#### Step 2: Staging Deployment
- [ ] Deploy backend API changes
- [ ] Deploy frontend changes
- [ ] Run database migrations on staging
- [ ] Smoke test calendar functionality:
  - View calendar (day/week/month)
  - Create appointment
  - Edit appointment
  - Filter appointments
  - Export calendar

#### Step 3: Production Deployment
- [ ] Deploy to production
- [ ] Run database migrations
- [ ] Verify calendar is accessible
- [ ] Smoke test key features

#### Step 4: Post-Deployment Verification
- [ ] Test calendar views
- [ ] Test appointment management
- [ ] Test filtering and search
- [ ] Test export functionality
- [ ] Verify integration with metrics
- [ ] Verify integration with employee management

### Definition of Done (DoD)

- [ ] All tests passing
- [ ] Staging deployment successful
- [ ] Staging smoke tests passing
- [ ] Production deployment successful
- [ ] Production smoke tests passing
- [ ] Calendar functionality verified
- [ ] Integration with other features verified

### Acceptance Criteria

- ✅ Calendar successfully deployed to production
- ✅ All smoke tests passing
- ✅ All key features functional
- ✅ Integration with other dashboard features working
- ✅ Zero critical issues in production

### Technical Details

**Deployment Checklist:**
- [ ] Backend API deployed
- [ ] Frontend deployed
- [ ] Database migrations run
- [ ] Calendar accessible
- [ ] All features tested
- [ ] Integration verified

---

**Note:** This task file contains all tasks for implementing the Calendar and Appointment Viewing functionality following the Software Development Lifecycle phases from requirements analysis through deployment.

