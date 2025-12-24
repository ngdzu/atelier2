# Customer Data Management and Automated Promotions System Tasks

## TASK-DOC-004: Customer Management and Automated Promotions Requirements Analysis

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-22
**Updated:** 2025-01-22
**Estimated Time:** 6 hours
**Dependencies:** none
**Related Tasks:** TASK-DB-004, TASK-API-004, TASK-FEAT-023

### Description

Conduct comprehensive requirements analysis for customer data management, promotion automation system, and email/SMS delivery infrastructure. Document all requirements categorized by functional areas, including customer data persistence, automated promotion rules, and communication delivery channels.

### Requirements / What to Do

#### Step 1: Customer Data Requirements

##### Functional Requirements
- [ ] **Customer Profile Data:**
  - Basic information: name, email, phone number
  - Birthday (date of birth, required for automated promotions)
  - Contact preferences (email, SMS, both, neither)
  - Marketing consent (opt-in/opt-out status)
  - Customer segmentation tags (VIP, New Customer, Inactive, etc.)
  - Preferred contact method (email preferred, SMS preferred, both)
- [ ] **Customer History Data:**
  - Visit history (dates, services received, employees)
  - Total spent (calculated from appointments)
  - Last visit date
  - Average spend per visit
  - Favorite services/categories
  - Customer lifetime value (CLV)
- [ ] **Customer Notes and Preferences:**
  - Internal notes (staff notes, preferences, allergies)
  - Service preferences
  - Preferred employees
  - Appointment preferences (time of day, day of week)

##### Data Categories
- [ ] **Personal Information:** Name, email, phone, birthday
- [ ] **Transactional Data:** Visits, spending, services
- [ ] **Communication Preferences:** Email/SMS consent, preferred channel
- [ ] **Behavioral Data:** Last visit, visit frequency, preferred services
- [ ] **Segmentation Data:** Customer tags, VIP status, lifetime value

#### Step 2: Automated Promotion Requirements

##### Functional Requirements
- [ ] **Birthday Promotion Automation:**
  - Automatic sending of birthday promotions to customers
  - Configurable promotion template (discount amount, service category, validity period)
  - Send timing (day of birthday, 1 day before, customizable)
  - Multiple send attempts if customer doesn't respond (optional)
  - Track if birthday promotion was sent and redeemed
- [ ] **Promotion Rule Configuration:**
  - Define promotion rules in dashboard
  - Rule types: Birthday, Anniversary, Inactive Customer, New Customer Welcome
  - Rule triggers: Date-based (birthday, anniversary), Time-based (days since last visit), Event-based (new customer signup)
  - Rule conditions: Customer segmentation filters (VIP only, specific tags, etc.)
  - Rule actions: Send promotion template, apply discount, set validity period
- [ ] **Promotion Templates:**
  - Template library for common promotions (birthday, welcome, reactivation)
  - Customizable message content (text and HTML for email)
  - Variable substitution (customer name, discount amount, expiration date)
  - Multiple template versions (email and SMS)
- [ ] **Promotion Scheduling:**
  - Schedule promotion sends (immediate, scheduled date/time)
  - Recurring promotions (monthly, weekly)
  - Time zone handling for send times

##### Automation Categories
- [ ] **Time-Based Automation:** Birthday, anniversary, days since last visit
- [ ] **Event-Based Automation:** New customer welcome, milestone achievements
- [ ] **Behavioral Automation:** Inactive customer reactivation, VIP rewards
- [ ] **Conditional Automation:** Customer segmentation-based rules

#### Step 3: Communication Delivery Requirements

##### Email Requirements
- [ ] **Email Service Integration:**
  - Integrate with email service provider (SendGrid, Mailgun, AWS SES, or similar)
  - SMTP configuration for transactional emails
  - Email template system (HTML and plain text)
  - Email deliverability tracking (sent, delivered, opened, clicked, bounced)
- [ ] **Email Features:**
  - HTML email templates with branding
  - Plain text fallback
  - Unsubscribe links
  - Personalized content (customer name, custom offers)
  - Link tracking for analytics
  - Email preview/testing

##### SMS Requirements
- [ ] **SMS Service Integration:**
  - Integrate with SMS service provider (Twilio, AWS SNS, or similar)
  - SMS API configuration
  - Short code or long code setup
  - SMS delivery tracking (sent, delivered, failed)
- [ ] **SMS Features:**
  - Character limit compliance (160-320 characters for standard SMS)
  - Short links for promotions (URL shortener integration)
  - Opt-out handling (STOP keyword)
  - Personalization within character limits
  - Delivery status tracking

##### Communication Preferences
- [ ] **Customer Preferences:**
  - Respect customer communication preferences (email only, SMS only, both, neither)
  - Handle opt-outs gracefully
  - Update preferences through customer portal or admin
  - Preference change history/audit log

#### Step 4: Promotion Analytics and Tracking

##### Functional Requirements
- [ ] **Promotion Tracking:**
  - Track promotion sends (who, when, which promotion)
  - Track email opens and clicks
  - Track SMS delivery status
  - Track promotion redemptions (link clicks, coupon code usage)
  - Calculate promotion effectiveness (open rate, click rate, redemption rate, revenue impact)
- [ ] **Analytics Dashboard:**
  - Promotion performance metrics
  - Customer engagement metrics
  - Revenue attribution to promotions
  - A/B testing capabilities (optional)

#### Step 5: Integration Requirements

- [ ] **Backend API Integration:**
  - Customer CRUD endpoints
  - Promotion rule configuration endpoints
  - Promotion send endpoints
  - Analytics endpoints
- [ ] **Dashboard Integration:**
  - Customer management UI
  - Promotion rule configuration UI
  - Promotion template editor
  - Analytics/reporting views
- [ ] **Third-Party Service Integration:**
  - Email service provider API
  - SMS service provider API
  - Calendar/scheduling system (for birthday tracking)

#### Step 6: Security and Compliance Requirements

- [ ] **Data Privacy:**
  - GDPR compliance (if applicable)
  - Customer data encryption
  - Consent management
  - Data retention policies
- [ ] **Security:**
  - Secure API endpoints
  - Authentication for customer data access
  - Rate limiting for promotion sends
  - Prevention of promotion abuse

#### Step 7: Non-Functional Requirements

- [ ] **Performance:**
  - Handle large customer lists (thousands of customers)
  - Efficient birthday promotion processing (daily batch jobs)
  - Fast promotion send times
- [ ] **Reliability:**
  - Email/SMS delivery reliability
  - Retry logic for failed sends
  - Error handling and logging
- [ ] **Scalability:**
  - Support growing customer base
  - Handle peak promotion send volumes
  - Efficient database queries

#### Step 8: Create Requirements Document

- [ ] Create `doc/CUSTOMER_PROMOTIONS_REQUIREMENTS.md`
- [ ] Document all requirements categorized by functional area:
  - Customer Data Requirements
  - Automated Promotion Requirements
  - Communication Delivery Requirements
  - Analytics and Tracking Requirements
  - Integration Requirements
  - Security and Compliance Requirements
- [ ] Include user stories with acceptance criteria
- [ ] Create use case diagrams
- [ ] Document assumptions and constraints
- [ ] Create requirements traceability matrix

### Definition of Done (DoD)

- [ ] All customer data requirements documented
- [ ] All automated promotion requirements documented
- [ ] Email and SMS delivery requirements specified
- [ ] Promotion analytics requirements defined
- [ ] Integration requirements documented
- [ ] Security and compliance requirements specified
- [ ] Requirements categorized by functional area
- [ ] Requirements document created and reviewed
- [ ] User stories written with acceptance criteria

### Verification Steps

1. **Requirements Review:**
   - Review requirements document for completeness
   - Verify all functional areas are covered
   - Check that requirements are testable
   - Ensure requirements align with business goals

2. **Stakeholder Validation:**
   - Present requirements to stakeholders
   - Gather feedback from store owners, managers
   - Incorporate changes
   - Get sign-off on requirements document

### Acceptance Criteria

- ✅ Complete requirements document exists with categorized requirements
- ✅ Customer data requirements fully specified
- ✅ Automated promotion requirements fully specified
- ✅ Email/SMS delivery requirements specified
- ✅ Analytics and tracking requirements defined
- ✅ Integration requirements documented
- ✅ Security and compliance requirements specified
- ✅ Requirements are testable and measurable

### Technical Details

**Files to Create:**
- `doc/CUSTOMER_PROMOTIONS_REQUIREMENTS.md`
- `doc/requirements/CUSTOMER_DATA_REQUIREMENTS.md`
- `doc/requirements/PROMOTION_AUTOMATION_REQUIREMENTS.md`
- `doc/requirements/COMMUNICATION_DELIVERY_REQUIREMENTS.md`

**Key Decisions to Document:**
- Email service provider choice (SendGrid, Mailgun, AWS SES)
- SMS service provider choice (Twilio, AWS SNS)
- Birthday promotion send timing strategy
- Customer data retention policy
- Promotion template system architecture

---

**Completion Date:** 
**Completed By:** 
**Notes:**

---

## TASK-DB-004: Customer Data and Promotion Automation Database Schema

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-22
**Updated:** 2025-01-22
**Estimated Time:** 8 hours
**Dependencies:** TASK-DOC-004
**Related Tasks:** TASK-API-004

### Description

Design and implement database schema for customer data management and promotion automation system. This includes extending the Customer entity, creating promotion automation rules table, promotion templates table, communication preferences table, and promotion tracking tables.

### Requirements / What to Do

#### Step 1: Extend Customer Entity

- [ ] Update `server/src/entities/Customer.entity.ts` (or User entity if Customer extends User):
  - Add `birthday` field (DATE, nullable for existing customers)
  - Add `emailOptIn` field (BOOLEAN, default true)
  - Add `smsOptIn` field (BOOLEAN, default true)
  - Add `preferredContactMethod` field (ENUM: 'EMAIL', 'SMS', 'BOTH', default 'BOTH')
  - Add `marketingConsentDate` field (TIMESTAMP, nullable)
  - Add `customerSegment` field (JSONB or separate table for tags: VIP, New, Inactive, etc.)
  - Add `totalSpent` field (DECIMAL, calculated field or cached)
  - Add `lastVisitDate` field (DATE, nullable)
  - Add `visitCount` field (INTEGER, default 0)
  - Add `averageSpendPerVisit` field (DECIMAL, nullable, calculated)
  - Add `customerLifetimeValue` field (DECIMAL, nullable, calculated)
  - Add `notes` field (TEXT, nullable, for internal notes)
  - Add `preferredEmployeeIds` field (JSONB, array of employee IDs)
  - Add `createdAt` field (TIMESTAMP, auto-generated)
  - Add `updatedAt` field (TIMESTAMP, auto-updated)

#### Step 2: Create Promotion Automation Rules Entity

- [ ] Create `server/src/entities/PromotionAutomationRule.entity.ts`:
  - `id` (UUID, primary key)
  - `name` (VARCHAR, required, e.g., "Birthday Promotion", "Inactive Customer Reactivation")
  - `description` (TEXT, nullable)
  - `ruleType` (ENUM: 'BIRTHDAY', 'ANNIVERSARY', 'INACTIVE_CUSTOMER', 'NEW_CUSTOMER', 'CUSTOM', required)
  - `isActive` (BOOLEAN, default true)
  - `triggerConfig` (JSONB, stores trigger-specific configuration):
    - For BIRTHDAY: { sendOn: 'BIRTHDAY' | 'BEFORE_BIRTHDAY', daysBefore: number }
    - For INACTIVE_CUSTOMER: { daysSinceLastVisit: number }
    - For NEW_CUSTOMER: { daysAfterSignup: number }
  - `conditionConfig` (JSONB, nullable, customer segmentation filters):
    - { segments: string[], minSpent: number, minVisits: number, etc. }
  - `promotionTemplateId` (UUID, foreign key to PromotionTemplate, required)
  - `channel` (ENUM: 'EMAIL', 'SMS', 'BOTH', required)
  - `scheduleConfig` (JSONB, nullable, for recurring or scheduled rules)
  - `createdBy` (UUID, foreign key to User, required)
  - `createdAt` (TIMESTAMP, auto-generated)
  - `updatedAt` (TIMESTAMP, auto-updated)
  - Indexes: `ruleType`, `isActive`, `createdBy`

#### Step 3: Create Promotion Template Entity

- [ ] Create `server/src/entities/PromotionTemplate.entity.ts`:
  - `id` (UUID, primary key)
  - `name` (VARCHAR, required, e.g., "Birthday 20% Off", "Welcome New Customer")
  - `description` (TEXT, nullable)
  - `discountType` (ENUM: 'PERCENTAGE', 'FIXED_AMOUNT', 'SERVICE_SPECIFIC', required)
  - `discountValue` (DECIMAL, required, e.g., 20 for 20%, 10 for $10 off)
  - `applicableServices` (JSONB, nullable, array of service IDs, null means all services)
  - `validityDays` (INTEGER, required, promotion validity period in days)
  - `emailSubject` (VARCHAR, required for email promotions)
  - `emailBodyHtml` (TEXT, required for email promotions, with variable placeholders)
  - `emailBodyText` (TEXT, required for email promotions, plain text version)
  - `smsBody` (VARCHAR, required for SMS promotions, max 320 chars, with variable placeholders)
  - `couponCodePrefix` (VARCHAR, nullable, e.g., "BDAY" for birthday promotions)
  - `isActive` (BOOLEAN, default true)
  - `createdBy` (UUID, foreign key to User, required)
  - `createdAt` (TIMESTAMP, auto-generated)
  - `updatedAt` (TIMESTAMP, auto-updated)
  - Indexes: `isActive`, `createdBy`

#### Step 4: Create Customer Promotion History Entity

- [ ] Create `server/src/entities/CustomerPromotion.entity.ts`:
  - `id` (UUID, primary key)
  - `customerId` (UUID, foreign key to Customer, required)
  - `promotionTemplateId` (UUID, foreign key to PromotionTemplate, required)
  - `promotionAutomationRuleId` (UUID, foreign key to PromotionAutomationRule, nullable, if sent via automation)
  - `couponCode` (VARCHAR, unique, required, generated code)
  - `discountType` (ENUM: 'PERCENTAGE', 'FIXED_AMOUNT', 'SERVICE_SPECIFIC', required)
  - `discountValue` (DECIMAL, required)
  - `channel` (ENUM: 'EMAIL', 'SMS', required)
  - `sentAt` (TIMESTAMP, required)
  - `sentBy` (UUID, foreign key to User, nullable, null for automated sends)
  - `validFrom` (DATE, required)
  - `validTo` (DATE, required)
  - `redeemedAt` (TIMESTAMP, nullable)
  - `redeemedInAppointmentId` (UUID, foreign key to Appointment, nullable)
  - `emailSent` (BOOLEAN, default false, if sent via email)
  - `emailDelivered` (BOOLEAN, nullable)
  - `emailOpened` (BOOLEAN, nullable)
  - `emailClicked` (BOOLEAN, nullable)
  - `smsSent` (BOOLEAN, default false, if sent via SMS)
  - `smsDelivered` (BOOLEAN, nullable)
  - `createdAt` (TIMESTAMP, auto-generated)
  - `updatedAt` (TIMESTAMP, auto-updated)
  - Indexes: `customerId`, `couponCode`, `validTo`, `redeemedAt`, `promotionAutomationRuleId`

#### Step 5: Create Communication Preferences Entity (Optional - can be part of Customer)

- [ ] If separate table needed, create `server/src/entities/CommunicationPreference.entity.ts`:
  - `id` (UUID, primary key)
  - `customerId` (UUID, foreign key to Customer, unique, required)
  - `emailOptIn` (BOOLEAN, default true)
  - `smsOptIn` (BOOLEAN, default true)
  - `preferredContactMethod` (ENUM: 'EMAIL', 'SMS', 'BOTH', default 'BOTH')
  - `consentDate` (TIMESTAMP, nullable)
  - `unsubscribedAt` (TIMESTAMP, nullable)
  - `unsubscribeReason` (TEXT, nullable)
  - `updatedAt` (TIMESTAMP, auto-updated)
  - Indexes: `customerId`

#### Step 6: Create Promotion Send Queue Entity (for async processing)

- [ ] Create `server/src/entities/PromotionSendQueue.entity.ts`:
  - `id` (UUID, primary key)
  - `customerId` (UUID, foreign key to Customer, required)
  - `promotionTemplateId` (UUID, foreign key to PromotionTemplate, required)
  - `promotionAutomationRuleId` (UUID, foreign key to PromotionAutomationRule, nullable)
  - `channel` (ENUM: 'EMAIL', 'SMS', 'BOTH', required)
  - `scheduledSendAt` (TIMESTAMP, required)
  - `status` (ENUM: 'PENDING', 'PROCESSING', 'SENT', 'FAILED', 'CANCELLED', default 'PENDING')
  - `errorMessage` (TEXT, nullable)
  - `retryCount` (INTEGER, default 0)
  - `processedAt` (TIMESTAMP, nullable)
  - `createdAt` (TIMESTAMP, auto-generated)
  - `updatedAt` (TIMESTAMP, auto-updated)
  - Indexes: `status`, `scheduledSendAt`, `customerId`

#### Step 7: Create Database Migrations

- [ ] Create migration for Customer entity updates:
  - `server/src/migrations/XXXXXX-AddCustomerFields.ts`
  - Add all new customer fields
  - Handle existing customer data (set defaults, migrate data)
- [ ] Create migration for PromotionAutomationRule entity:
  - `server/src/migrations/XXXXXX-CreatePromotionAutomationRule.ts`
- [ ] Create migration for PromotionTemplate entity:
  - `server/src/migrations/XXXXXX-CreatePromotionTemplate.ts`
- [ ] Create migration for CustomerPromotion entity:
  - `server/src/migrations/XXXXXX-CreateCustomerPromotion.ts`
- [ ] Create migration for PromotionSendQueue entity:
  - `server/src/migrations/XXXXXX-CreatePromotionSendQueue.ts`

#### Step 8: Update Entity Relationships

- [ ] Define relationships:
  - Customer → CustomerPromotion (one-to-many)
  - Customer → PromotionSendQueue (one-to-many)
  - PromotionTemplate → CustomerPromotion (one-to-many)
  - PromotionTemplate → PromotionAutomationRule (many-to-one)
  - PromotionAutomationRule → CustomerPromotion (one-to-many)
  - PromotionAutomationRule → PromotionSendQueue (one-to-many)
  - User → PromotionAutomationRule (createdBy, one-to-many)
  - User → PromotionTemplate (createdBy, one-to-many)
  - Appointment → CustomerPromotion (redeemedInAppointmentId, many-to-one)

#### Step 9: Create Seed Data

- [ ] Create seed data for PromotionTemplate:
  - Default birthday promotion template
  - Default new customer welcome template
  - Default inactive customer reactivation template
- [ ] Create seed data for PromotionAutomationRule:
  - Default birthday promotion rule (if enabled)

#### Step 10: Update ERD Diagram

- [ ] Update database ERD to include new entities
- [ ] Document relationships
- [ ] Include indexes and constraints

### Definition of Done (DoD)

- [ ] Customer entity extended with all required fields
- [ ] PromotionAutomationRule entity created
- [ ] PromotionTemplate entity created
- [ ] CustomerPromotion entity created
- [ ] PromotionSendQueue entity created (if needed)
- [ ] All database migrations created and tested
- [ ] Entity relationships defined
- [ ] Seed data created
- [ ] ERD updated
- [ ] Database schema reviewed and approved

### Verification Steps

1. **Run Migrations:**
   - Execute migration scripts on development database
   - Verify all tables and columns are created correctly
   - Test data insertion

2. **Schema Inspection:**
   - Use database client to inspect schema
   - Check data types, constraints, and relationships
   - Verify indexes are created

3. **Data Integrity Test:**
   - Insert sample data into all new tables
   - Verify relationships work correctly
   - Test foreign key constraints

### Acceptance Criteria

- ✅ Database schema supports all customer data requirements
- ✅ Database schema supports promotion automation requirements
- ✅ All migrations successfully apply
- ✅ Data integrity maintained across relationships
- ✅ Performance considerations addressed with indexing

### Technical Details

**Files to Create:**
- `server/src/entities/Customer.entity.ts` (update existing)
- `server/src/entities/PromotionAutomationRule.entity.ts`
- `server/src/entities/PromotionTemplate.entity.ts`
- `server/src/entities/CustomerPromotion.entity.ts`
- `server/src/entities/PromotionSendQueue.entity.ts`
- `server/src/migrations/XXXXXX-AddCustomerFields.ts`
- `server/src/migrations/XXXXXX-CreatePromotionAutomationRule.ts`
- `server/src/migrations/XXXXXX-CreatePromotionTemplate.ts`
- `server/src/migrations/XXXXXX-CreateCustomerPromotion.ts`
- `server/src/migrations/XXXXXX-CreatePromotionSendQueue.ts`

**Tools:**
- TypeORM for ORM and migrations
- PostgreSQL (existing database)

---

**Completion Date:** 
**Completed By:** 
**Notes:**

---

## TASK-API-004: Customer Management and Promotion Automation API

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-22
**Updated:** 2025-01-22
**Estimated Time:** 16 hours
**Dependencies:** TASK-DB-004
**Related Tasks:** TASK-FEAT-023, TASK-FEAT-024

### Description

Implement backend API endpoints for customer management (CRUD operations), promotion template management, promotion automation rule configuration, promotion sending, and promotion analytics. Integrate with email and SMS service providers for communication delivery.

### Requirements / What to Do

#### Step 1: Customer Management API Endpoints

- [ ] Create `server/src/routes/customer.routes.ts`:
  - `GET /api/customers` - List all customers (with pagination, filtering, sorting)
    - Query params: page, limit, search (name/email/phone), segment, sortBy, sortOrder
    - Response: { customers: Customer[], total: number, page: number, limit: number }
  - `GET /api/customers/:id` - Get single customer by ID
    - Response: Customer object with full details
  - `POST /api/customers` - Create new customer
    - Body: { name, email, phone, birthday?, emailOptIn?, smsOptIn?, preferredContactMethod?, notes? }
    - Response: Created customer object
  - `PUT /api/customers/:id` - Update customer
    - Body: Partial customer data
    - Response: Updated customer object
  - `DELETE /api/customers/:id` - Delete customer (soft delete or hard delete)
    - Response: { success: true, message: "Customer deleted" }
  - `GET /api/customers/:id/history` - Get customer visit and purchase history
    - Response: { appointments: Appointment[], totalSpent: number, visitCount: number }
  - `PUT /api/customers/:id/preferences` - Update communication preferences
    - Body: { emailOptIn?, smsOptIn?, preferredContactMethod? }
    - Response: Updated preferences

- [ ] Create `server/src/controllers/CustomerController.ts`:
  - Implement all route handlers
  - Input validation
  - Error handling
  - Business logic for customer operations

- [ ] Create `server/src/services/CustomerService.ts`:
  - Customer CRUD operations
  - Customer search and filtering logic
  - Customer statistics calculation (totalSpent, visitCount, CLV)
  - Customer segmentation logic

#### Step 2: Promotion Template API Endpoints

- [ ] Create `server/src/routes/promotionTemplate.routes.ts`:
  - `GET /api/promotion-templates` - List all promotion templates
    - Query params: isActive, search
    - Response: PromotionTemplate[]
  - `GET /api/promotion-templates/:id` - Get single template
    - Response: PromotionTemplate object
  - `POST /api/promotion-templates` - Create new template
    - Body: Full PromotionTemplate data
    - Response: Created template
  - `PUT /api/promotion-templates/:id` - Update template
    - Body: Partial template data
    - Response: Updated template
  - `DELETE /api/promotion-templates/:id` - Delete template
    - Response: { success: true }
  - `POST /api/promotion-templates/:id/test` - Test template (preview with sample data)
    - Response: Rendered email/SMS with sample data

- [ ] Create `server/src/controllers/PromotionTemplateController.ts`
- [ ] Create `server/src/services/PromotionTemplateService.ts`:
  - Template CRUD operations
  - Template variable substitution logic
  - Template validation

#### Step 3: Promotion Automation Rules API Endpoints

- [ ] Create `server/src/routes/promotionAutomation.routes.ts`:
  - `GET /api/promotion-automation/rules` - List all automation rules
    - Query params: isActive, ruleType
    - Response: PromotionAutomationRule[]
  - `GET /api/promotion-automation/rules/:id` - Get single rule
    - Response: PromotionAutomationRule object
  - `POST /api/promotion-automation/rules` - Create new rule
    - Body: Full rule data including triggerConfig, conditionConfig
    - Response: Created rule
  - `PUT /api/promotion-automation/rules/:id` - Update rule
    - Body: Partial rule data
    - Response: Updated rule
  - `DELETE /api/promotion-automation/rules/:id` - Delete rule
    - Response: { success: true }
  - `POST /api/promotion-automation/rules/:id/activate` - Activate rule
  - `POST /api/promotion-automation/rules/:id/deactivate` - Deactivate rule
  - `POST /api/promotion-automation/rules/:id/test` - Test rule (preview which customers would receive promotion)
    - Response: { matchingCustomers: Customer[], count: number }

- [ ] Create `server/src/controllers/PromotionAutomationController.ts`
- [ ] Create `server/src/services/PromotionAutomationService.ts`:
  - Rule CRUD operations
  - Rule trigger evaluation logic
  - Customer matching logic (based on conditions)
  - Rule validation

#### Step 4: Promotion Sending API Endpoints

- [ ] Create `server/src/routes/promotionSend.routes.ts`:
  - `POST /api/promotions/send` - Send promotion to customers
    - Body: { customerIds: UUID[], promotionTemplateId: UUID, channel: 'EMAIL' | 'SMS' | 'BOTH', scheduledAt?: ISO string }
    - Response: { queued: number, promotionIds: UUID[] }
  - `POST /api/promotions/send-to-segment` - Send promotion to customer segment
    - Body: { segment: string, promotionTemplateId: UUID, channel: 'EMAIL' | 'SMS' | 'BOTH', scheduledAt?: ISO string }
    - Response: { queued: number, promotionIds: UUID[] }
  - `GET /api/promotions/:id` - Get promotion details
    - Response: CustomerPromotion object with tracking data
  - `GET /api/promotions` - List promotions (with filtering)
    - Query params: customerId, promotionTemplateId, status (sent, redeemed, expired), dateRange
    - Response: CustomerPromotion[]
  - `POST /api/promotions/:id/resend` - Resend failed promotion
    - Response: Updated CustomerPromotion

- [ ] Create `server/src/controllers/PromotionSendController.ts`
- [ ] Create `server/src/services/PromotionSendService.ts`:
  - Promotion sending logic
  - Queue management
  - Email/SMS integration
  - Coupon code generation
  - Promotion tracking updates

#### Step 5: Email Service Integration

- [ ] Create `server/src/services/EmailService.ts`:
  - Initialize email service provider (SendGrid, Mailgun, or AWS SES)
  - `sendEmail(to: string, subject: string, htmlBody: string, textBody: string): Promise<EmailResult>`
  - `sendPromotionEmail(customer: Customer, promotion: CustomerPromotion, template: PromotionTemplate): Promise<EmailResult>`
  - Handle email delivery callbacks/webhooks (for tracking opens/clicks)
  - Error handling and retry logic

- [ ] Configure email service:
  - Set up API keys/credentials (environment variables)
  - Configure sender email address
  - Set up email templates
  - Configure webhook endpoints for delivery tracking

#### Step 6: SMS Service Integration

- [ ] Create `server/src/services/SmsService.ts`:
  - Initialize SMS service provider (Twilio, AWS SNS, or similar)
  - `sendSms(to: string, message: string): Promise<SmsResult>`
  - `sendPromotionSms(customer: Customer, promotion: CustomerPromotion, template: PromotionTemplate): Promise<SmsResult>`
  - Handle SMS delivery callbacks/webhooks
  - Handle opt-out keywords (STOP)
  - Error handling and retry logic

- [ ] Configure SMS service:
  - Set up API keys/credentials (environment variables)
  - Configure sender phone number (short code or long code)
  - Set up webhook endpoints for delivery tracking and opt-outs

#### Step 7: Promotion Automation Scheduler Service

- [ ] Create `server/src/services/PromotionAutomationSchedulerService.ts`:
  - Daily job to process birthday promotions (runs daily, checks for customers with birthdays)
  - Daily job to process inactive customer promotions (checks customers who haven't visited in X days)
  - Job to process scheduled promotions from PromotionSendQueue
  - Job to evaluate and execute active automation rules
  - Error handling and logging

- [ ] Set up scheduled jobs:
  - Use cron jobs, node-cron, or similar scheduler
  - Configure job schedule (daily at specific time)
  - Set up job monitoring and alerting

#### Step 8: Promotion Analytics API Endpoints

- [ ] Create `server/src/routes/promotionAnalytics.routes.ts`:
  - `GET /api/promotions/analytics/summary` - Get promotion analytics summary
    - Query params: dateRange, promotionTemplateId
    - Response: { totalSent, totalDelivered, totalOpened, totalClicked, totalRedeemed, redemptionRate, revenue }
  - `GET /api/promotions/analytics/by-template` - Analytics grouped by template
    - Response: Array of { templateId, templateName, metrics }
  - `GET /api/promotions/analytics/by-channel` - Analytics grouped by channel (EMAIL/SMS)
    - Response: { email: metrics, sms: metrics }
  - `GET /api/promotions/:id/analytics` - Analytics for specific promotion
    - Response: Detailed promotion metrics

- [ ] Create `server/src/services/PromotionAnalyticsService.ts`:
  - Calculate promotion metrics
  - Aggregate analytics data
  - Generate reports

#### Step 9: Input Validation and Error Handling

- [ ] Create validation schemas (using class-validator or similar):
  - Customer create/update validation
  - Promotion template validation
  - Automation rule validation
  - Promotion send request validation
- [ ] Implement comprehensive error handling:
  - Validation errors
  - Email/SMS service errors
  - Database errors
  - Business logic errors
- [ ] Create custom error classes if needed

#### Step 10: API Documentation

- [ ] Update API documentation:
  - Document all new endpoints
  - Include request/response examples
  - Document error codes and messages
  - Include authentication requirements

### Definition of Done (DoD)

- [ ] All customer management endpoints implemented
- [ ] All promotion template endpoints implemented
- [ ] All automation rule endpoints implemented
- [ ] Promotion sending endpoints implemented
- [ ] Email service integrated and working
- [ ] SMS service integrated and working
- [ ] Automation scheduler service implemented
- [ ] Analytics endpoints implemented
- [ ] Input validation implemented
- [ ] Error handling comprehensive
- [ ] API documentation updated
- [ ] Integration tests written

### Verification Steps

1. **API Testing:**
   - Test all endpoints with Postman/Insomnia
   - Test with valid and invalid data
   - Test authentication and authorization
   - Verify database persistence

2. **Email/SMS Testing:**
   - Test email sending with real email addresses
   - Test SMS sending with real phone numbers
   - Verify delivery tracking
   - Test error scenarios

3. **Automation Testing:**
   - Test birthday promotion automation (create test customer with today's birthday)
   - Test inactive customer automation
   - Verify scheduled jobs run correctly

### Acceptance Criteria

- ✅ All API endpoints functional
- ✅ Customer CRUD operations work correctly
- ✅ Promotion templates can be created and managed
- ✅ Automation rules can be configured
- ✅ Promotions can be sent via email and SMS
- ✅ Automated promotions are sent on schedule
- ✅ Promotion analytics are accurate
- ✅ Email and SMS delivery is reliable

### Technical Details

**Files to Create:**
- `server/src/routes/customer.routes.ts`
- `server/src/routes/promotionTemplate.routes.ts`
- `server/src/routes/promotionAutomation.routes.ts`
- `server/src/routes/promotionSend.routes.ts`
- `server/src/routes/promotionAnalytics.routes.ts`
- `server/src/controllers/CustomerController.ts`
- `server/src/controllers/PromotionTemplateController.ts`
- `server/src/controllers/PromotionAutomationController.ts`
- `server/src/controllers/PromotionSendController.ts`
- `server/src/services/CustomerService.ts`
- `server/src/services/PromotionTemplateService.ts`
- `server/src/services/PromotionAutomationService.ts`
- `server/src/services/PromotionSendService.ts`
- `server/src/services/PromotionAutomationSchedulerService.ts`
- `server/src/services/PromotionAnalyticsService.ts`
- `server/src/services/EmailService.ts`
- `server/src/services/SmsService.ts`

**Dependencies:**
- Express.js
- TypeORM
- Email service provider SDK (SendGrid/Mailgun/AWS SES)
- SMS service provider SDK (Twilio/AWS SNS)
- node-cron or similar for scheduling
- class-validator for validation

---

**Completion Date:** 
**Completed By:** 
**Notes:**

---

## TASK-FEAT-023: Dashboard - Customer Management UI

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-22
**Updated:** 2025-01-22
**Estimated Time:** 12 hours
**Dependencies:** TASK-API-004
**Related Tasks:** TASK-FEAT-024

### Description

Develop the customer management interface in the dashboard, allowing store managers and owners to view, create, edit, and manage customer data. This includes customer list view, customer detail view, customer creation/edit forms, and customer search/filtering capabilities.

### Requirements / What to Do

#### Step 1: Customer List View

- [ ] Create `client/src/components/dashboard/CustomerList.tsx`:
  - Display customers in table or card grid view
  - Columns/cards: Name, Email, Phone, Birthday, Total Spent, Last Visit, Customer Segment
  - Pagination support
  - Search functionality (by name, email, phone)
  - Filtering by customer segment (VIP, New, Inactive, etc.)
  - Sorting by name, total spent, last visit date
  - Bulk actions (if needed): Export, Tag, etc.
  - Actions per customer: View Details, Edit, Delete

#### Step 2: Customer Detail View

- [ ] Create `client/src/components/dashboard/CustomerDetail.tsx`:
  - Display full customer profile:
    - Basic information (name, email, phone, birthday)
    - Communication preferences (email opt-in, SMS opt-in, preferred method)
    - Statistics (total spent, visit count, average spend, lifetime value)
    - Customer segment/tags
    - Internal notes
  - Customer history section:
    - List of past appointments
    - Visit timeline
    - Services received
  - Promotion history section:
    - List of promotions sent to customer
    - Promotion redemption status
  - Quick actions: Edit Customer, Send Promotion, Add Note

#### Step 3: Customer Create/Edit Form

- [ ] Create `client/src/components/dashboard/CustomerForm.tsx`:
  - Form fields:
    - Name (required)
    - Email (required, validated)
    - Phone (required, validated)
    - Birthday (date picker, optional)
    - Email Opt-In (checkbox)
    - SMS Opt-In (checkbox)
    - Preferred Contact Method (radio: Email, SMS, Both)
    - Customer Segment/Tags (multi-select or tags input)
    - Notes (textarea)
  - Form validation:
    - Required field validation
    - Email format validation
    - Phone format validation
    - Birthday date validation (not in future)
  - Submit handling:
    - Create new customer (POST)
    - Update existing customer (PUT)
    - Success/error feedback
    - Redirect after successful create/edit

#### Step 4: Customer Search and Filter

- [ ] Implement search functionality:
  - Search input field
  - Real-time search (debounced)
  - Search by name, email, phone
  - Clear search button
- [ ] Implement filter functionality:
  - Filter by customer segment (dropdown or multi-select)
  - Filter by communication preference
  - Filter by last visit date range
  - Filter by total spent range
  - Clear filters button
  - Active filters display

#### Step 5: Customer Communication Preferences Management

- [ ] Create `client/src/components/dashboard/CustomerPreferences.tsx`:
  - Display current preferences
  - Allow updating preferences
  - Show consent date
  - Show unsubscribe status (if applicable)
- [ ] Integrate into customer detail/edit views

#### Step 6: Customer Statistics Display

- [ ] Create `client/src/components/dashboard/CustomerStats.tsx`:
  - Display customer statistics as cards:
    - Total Spent
    - Visit Count
    - Average Spend Per Visit
    - Customer Lifetime Value
    - Last Visit Date
    - Days Since Last Visit
- [ ] Add visualizations (optional):
  - Spending trend chart
  - Visit frequency chart

#### Step 7: Customer Notes Management

- [ ] Create notes section in customer detail view:
  - Display existing notes
  - Add new note form
  - Edit/delete notes (if allowed)
  - Show note author and timestamp

#### Step 8: Integration with Dashboard Navigation

- [ ] Add "Customers" section to dashboard navigation:
  - Add to Layout component navigation
  - Add route in App.tsx: `/dashboard/customers`
  - Add sub-routes:
    - `/dashboard/customers` - List view
    - `/dashboard/customers/new` - Create customer
    - `/dashboard/customers/:id` - Customer detail
    - `/dashboard/customers/:id/edit` - Edit customer
- [ ] Add role-based access control (only ADMIN, OWNER, MANAGER can access)

#### Step 9: Customer Service Integration

- [ ] Create `client/src/services/customerService.ts`:
  - `getCustomers(filters, pagination): Promise<Customer[]>`
  - `getCustomerById(id): Promise<Customer>`
  - `createCustomer(data): Promise<Customer>`
  - `updateCustomer(id, data): Promise<Customer>`
  - `deleteCustomer(id): Promise<void>`
  - `updateCustomerPreferences(id, preferences): Promise<Customer>`
  - `getCustomerHistory(id): Promise<CustomerHistory>`
  - Error handling

#### Step 10: State Management

- [ ] Update state management (if using Redux/Context):
  - Customer list state
  - Selected customer state
  - Loading and error states
- [ ] Implement data caching:
  - Cache customer list
  - Cache customer details
  - Refresh on create/update/delete

### Definition of Done (DoD)

- [ ] Customer list view implemented with search and filtering
- [ ] Customer detail view shows all customer information
- [ ] Customer create/edit form functional with validation
- [ ] Customer search and filtering working
- [ ] Communication preferences can be updated
- [ ] Customer statistics displayed
- [ ] Customer notes can be managed
- [ ] All views integrated into dashboard navigation
- [ ] Customer service integrated with backend API
- [ ] Role-based access control implemented
- [ ] Loading and error states handled
- [ ] Responsive design for mobile/tablet

### Verification Steps

1. **Functional Testing:**
   - Create new customer
   - Edit existing customer
   - Search for customers
   - Filter customers
   - View customer details
   - Update communication preferences
   - Delete customer

2. **Data Validation:**
   - Verify data is saved correctly to database
   - Verify API calls are correct
   - Verify error handling works

### Acceptance Criteria

- ✅ Users can view list of all customers
- ✅ Users can create new customers
- ✅ Users can edit customer information
- ✅ Users can search and filter customers
- ✅ Customer details are displayed correctly
- ✅ Communication preferences can be managed
- ✅ UI is intuitive and responsive
- ✅ Data persists correctly to database

### Technical Details

**Files to Create:**
- `client/src/components/dashboard/CustomerList.tsx`
- `client/src/components/dashboard/CustomerDetail.tsx`
- `client/src/components/dashboard/CustomerForm.tsx`
- `client/src/components/dashboard/CustomerPreferences.tsx`
- `client/src/components/dashboard/CustomerStats.tsx`
- `client/src/services/customerService.ts`

**Files to Modify:**
- `client/src/App.tsx` (add customer routes)
- `client/src/components/Layout.tsx` (add customers navigation item)
- `client/src/types.ts` (extend Customer interface if needed)

**Dependencies:**
- React, TypeScript
- React Router
- Tailwind CSS
- Date picker library (react-datepicker or similar)
- Form validation library (if not using built-in HTML5 validation)

---

**Completion Date:** 
**Completed By:** 
**Notes:**

---

## TASK-FEAT-024: Dashboard - Promotion Automation Configuration UI

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-22
**Updated:** 2025-01-22
**Estimated Time:** 16 hours
**Dependencies:** TASK-API-004, TASK-FEAT-023
**Related Tasks:** none

### Description

Develop the promotion automation configuration interface in the dashboard, allowing store managers and owners to create and manage promotion templates, configure automation rules (especially birthday promotions), and monitor promotion performance. This includes promotion template editor, automation rule configuration, and promotion analytics dashboard.

### Requirements / What to Do

#### Step 1: Promotion Template Management

- [ ] Create `client/src/components/dashboard/PromotionTemplateList.tsx`:
  - Display list of all promotion templates
  - Columns: Name, Discount Type, Discount Value, Validity Days, Status (Active/Inactive)
  - Actions: View, Edit, Delete, Duplicate, Toggle Active/Inactive
  - Filter by status (Active/Inactive)
  - Search by name

- [ ] Create `client/src/components/dashboard/PromotionTemplateForm.tsx`:
  - Form fields:
    - Name (required)
    - Description (optional)
    - Discount Type (radio: Percentage, Fixed Amount, Service Specific)
    - Discount Value (required, number input)
    - Applicable Services (multi-select, optional, for service-specific discounts)
    - Validity Days (required, number input)
    - Email Subject (required, for email promotions)
    - Email Body HTML (rich text editor, required)
    - Email Body Text (plain text, required)
    - SMS Body (textarea, required, character counter showing 320 char limit)
    - Coupon Code Prefix (optional, text input)
    - Active Status (checkbox)
  - Form validation:
    - Required fields
    - Discount value validation (positive number)
    - SMS body character limit (320 chars)
    - Email subject length validation
  - Preview functionality:
    - Preview email with sample data
    - Preview SMS with sample data
  - Variable placeholders documentation:
    - Show available variables: {{customerName}}, {{discountAmount}}, {{expirationDate}}, {{couponCode}}, etc.
    - Tooltip/help text explaining variables

#### Step 2: Promotion Automation Rules Management

- [ ] Create `client/src/components/dashboard/PromotionAutomationRuleList.tsx`:
  - Display list of all automation rules
  - Columns: Name, Rule Type, Template, Status (Active/Inactive), Last Triggered
  - Actions: View, Edit, Delete, Activate/Deactivate, Test Rule
  - Filter by rule type and status

- [ ] Create `client/src/components/dashboard/PromotionAutomationRuleForm.tsx`:
  - Form sections:
    - **Basic Information:**
      - Name (required)
      - Description (optional)
      - Rule Type (dropdown: Birthday, Anniversary, Inactive Customer, New Customer, Custom)
    - **Trigger Configuration** (dynamic based on rule type):
      - **Birthday:**
        - Send On (radio: Birthday, Before Birthday)
        - Days Before (number, if "Before Birthday" selected)
      - **Inactive Customer:**
        - Days Since Last Visit (number)
      - **New Customer:**
        - Days After Signup (number)
      - **Custom:**
        - Custom trigger configuration (JSON editor or structured form)
    - **Condition Configuration:**
      - Customer Segments (multi-select: VIP, New, Inactive, etc.)
      - Minimum Total Spent (number, optional)
      - Minimum Visit Count (number, optional)
      - Additional filters (expandable section)
    - **Promotion Configuration:**
      - Promotion Template (dropdown, required)
      - Channel (radio: Email, SMS, Both)
    - **Schedule Configuration** (optional):
      - Recurring schedule settings
    - **Status:**
      - Active/Inactive toggle
  - Form validation:
    - Required fields
    - Trigger configuration validation
    - Condition configuration validation
  - Test Rule functionality:
    - Button to test rule
    - Shows matching customers count
    - Preview of which customers would receive promotion

#### Step 3: Birthday Promotion Configuration (Specific Focus)

- [ ] Create `client/src/components/dashboard/BirthdayPromotionConfig.tsx`:
  - Simplified view for configuring birthday promotions
  - Pre-configured rule type: Birthday
  - Key settings:
    - Enable/Disable birthday promotions (toggle)
    - Promotion template selection (dropdown)
    - Send timing (on birthday or X days before)
    - Channel (Email, SMS, Both)
    - Customer filters (segments, min spent, etc.)
  - Quick enable/disable toggle
  - Preview of current configuration
  - Link to full automation rule editor for advanced settings

#### Step 4: Promotion Send Interface

- [ ] Create `client/src/components/dashboard/PromotionSendModal.tsx`:
  - Modal for manually sending promotions
  - Options:
    - Select customers (multi-select or segment selection)
    - Select promotion template
    - Select channel (Email, SMS, Both)
    - Schedule send (optional date/time)
  - Preview of promotion content
  - Confirmation before sending
  - Send progress indicator
  - Success/error feedback

#### Step 5: Promotion Analytics Dashboard

- [ ] Create `client/src/components/dashboard/PromotionAnalytics.tsx`:
  - Summary metrics cards:
    - Total Promotions Sent
    - Delivery Rate (Email/SMS)
    - Open Rate (Email)
    - Click Rate (Email)
    - Redemption Rate
    - Revenue from Promotions
  - Charts/visualizations:
    - Promotions sent over time (line chart)
    - Redemption rate by template (bar chart)
    - Channel performance comparison (Email vs SMS)
    - Revenue impact chart
  - Filters:
    - Date range selector
    - Filter by promotion template
    - Filter by channel
    - Filter by automation rule
  - Detailed promotion list:
    - List of all promotions sent
    - Columns: Customer, Template, Channel, Sent Date, Status, Redeemed, Revenue
    - Click to view promotion details

#### Step 6: Promotion Tracking and History

- [ ] Create `client/src/components/dashboard/PromotionHistory.tsx`:
  - Display promotion history for a customer (if accessed from customer detail)
  - Display all promotions (if accessed from promotions section)
  - Columns: Customer, Template, Channel, Sent Date, Delivery Status, Open Status (email), Click Status (email), Redeemed, Redemption Date
  - Filtering and sorting
  - Promotion details modal:
    - Full promotion details
    - Customer information
    - Delivery tracking information
    - Redemption details (if redeemed)

#### Step 7: Integration with Dashboard Navigation

- [ ] Add "Promotions" section to dashboard navigation:
  - Add to Layout component navigation
  - Add routes in App.tsx:
    - `/dashboard/promotions/templates` - Template list
    - `/dashboard/promotions/templates/new` - Create template
    - `/dashboard/promotions/templates/:id` - Template detail/edit
    - `/dashboard/promotions/automation` - Automation rules list
    - `/dashboard/promotions/automation/new` - Create rule
    - `/dashboard/promotions/automation/:id` - Rule detail/edit
    - `/dashboard/promotions/birthday` - Birthday promotion config
    - `/dashboard/promotions/analytics` - Promotion analytics
    - `/dashboard/promotions/history` - Promotion history
- [ ] Add role-based access control (only ADMIN, OWNER, MANAGER)

#### Step 8: Rich Text Editor Integration

- [ ] Integrate rich text editor for email body HTML:
  - Use library like React Quill, TinyMCE, or similar
  - Support for formatting (bold, italic, links, etc.)
  - Variable placeholder insertion
  - HTML source view toggle
  - Preview mode

#### Step 9: Promotion Service Integration

- [ ] Create `client/src/services/promotionService.ts`:
  - Template CRUD methods
  - Automation rule CRUD methods
  - Send promotion methods
  - Get analytics methods
  - Get promotion history methods
  - Error handling

#### Step 10: State Management

- [ ] Update state management:
  - Promotion templates state
  - Automation rules state
  - Promotion analytics state
  - Promotion history state
  - Loading and error states

### Definition of Done (DoD)

- [ ] Promotion template management UI implemented
- [ ] Automation rule configuration UI implemented
- [ ] Birthday promotion configuration interface implemented
- [ ] Promotion send interface functional
- [ ] Promotion analytics dashboard displays metrics
- [ ] Promotion history tracking implemented
- [ ] All views integrated into dashboard navigation
- [ ] Rich text editor integrated for email templates
- [ ] Promotion service integrated with backend API
- [ ] Role-based access control implemented
- [ ] Loading and error states handled
- [ ] Responsive design implemented

### Verification Steps

1. **Functional Testing:**
   - Create promotion template
   - Edit promotion template
   - Create automation rule (especially birthday)
   - Test automation rule (preview matching customers)
   - Configure birthday promotions
   - Send manual promotion
   - View promotion analytics
   - View promotion history

2. **Data Validation:**
   - Verify templates are saved correctly
   - Verify automation rules are saved correctly
   - Verify promotions are sent correctly
   - Verify analytics data is accurate

### Acceptance Criteria

- ✅ Users can create and manage promotion templates
- ✅ Users can configure automation rules (especially birthday)
- ✅ Birthday promotions can be easily configured
- ✅ Promotions can be sent manually to customers
- ✅ Promotion analytics are displayed accurately
- ✅ Promotion history is tracked and displayed
- ✅ Email templates support rich formatting
- ✅ UI is intuitive and user-friendly
- ✅ Data persists correctly to database

### Technical Details

**Files to Create:**
- `client/src/components/dashboard/PromotionTemplateList.tsx`
- `client/src/components/dashboard/PromotionTemplateForm.tsx`
- `client/src/components/dashboard/PromotionAutomationRuleList.tsx`
- `client/src/components/dashboard/PromotionAutomationRuleForm.tsx`
- `client/src/components/dashboard/BirthdayPromotionConfig.tsx`
- `client/src/components/dashboard/PromotionSendModal.tsx`
- `client/src/components/dashboard/PromotionAnalytics.tsx`
- `client/src/components/dashboard/PromotionHistory.tsx`
- `client/src/services/promotionService.ts`

**Files to Modify:**
- `client/src/App.tsx` (add promotion routes)
- `client/src/components/Layout.tsx` (add promotions navigation)

**Dependencies:**
- React, TypeScript
- React Router
- Tailwind CSS
- Rich text editor (React Quill, TinyMCE, or similar)
- Charting library (Recharts, Chart.js, or similar)
- Date picker library

---

**Completion Date:** 
**Completed By:** 
**Notes:**

---

## TASK-OPS-006: Email and SMS Service Integration Setup

**Status:** PENDING
**Priority:** HIGH
**Assignee:** unassigned
**Created:** 2025-01-22
**Updated:** 2025-01-22
**Estimated Time:** 6 hours
**Dependencies:** TASK-API-004
**Related Tasks:** none

### Description

Set up and configure email and SMS service provider integrations, including account setup, API key configuration, webhook setup for delivery tracking, and testing the integration. This ensures reliable communication delivery for customer promotions.

### Requirements / What to Do

#### Step 1: Email Service Provider Selection and Setup

- [ ] Evaluate email service providers:
  - SendGrid (recommended for simplicity)
  - Mailgun (good for developers)
  - AWS SES (cost-effective for high volume)
  - Other options as needed
- [ ] Set up email service provider account:
  - Create account
  - Verify domain (for better deliverability)
  - Set up sender email address
  - Configure SPF and DKIM records
- [ ] Obtain API credentials:
  - API key or access token
  - Store securely (environment variables)
- [ ] Configure email service:
  - Set default from address
  - Configure reply-to address
  - Set up email templates (if using provider templates)

#### Step 2: SMS Service Provider Selection and Setup

- [ ] Evaluate SMS service providers:
  - Twilio (recommended, easy to use)
  - AWS SNS (integrated with AWS ecosystem)
  - Other options as needed
- [ ] Set up SMS service provider account:
  - Create account
  - Verify phone number
  - Obtain phone number (short code or long code)
- [ ] Obtain API credentials:
  - Account SID and Auth Token (Twilio)
  - API keys (AWS SNS)
  - Store securely (environment variables)
- [ ] Configure SMS service:
  - Set default from phone number
  - Configure messaging service (if applicable)

#### Step 3: Environment Variable Configuration

- [ ] Update `.env.example` file:
  - Add email service configuration variables
  - Add SMS service configuration variables
  - Document required variables
- [ ] Update production environment variables:
  - Add email service credentials to production environment
  - Add SMS service credentials to production environment
  - Use secure secret management (AWS Secrets Manager, Azure Key Vault, etc.)

#### Step 4: Webhook Configuration for Email Tracking

- [ ] Set up webhook endpoint for email service:
  - Create webhook endpoint: `POST /api/webhooks/email/:provider` (e.g., `/api/webhooks/email/sendgrid`)
  - Handle email delivery events (sent, delivered, opened, clicked, bounced, unsubscribed)
  - Update CustomerPromotion entity with tracking data
  - Handle webhook authentication (verify webhook signature)
- [ ] Configure webhook in email service provider:
  - Register webhook URL in provider dashboard
  - Subscribe to relevant events
  - Test webhook delivery

#### Step 5: Webhook Configuration for SMS Tracking

- [ ] Set up webhook endpoint for SMS service:
  - Create webhook endpoint: `POST /api/webhooks/sms/:provider` (e.g., `/api/webhooks/sms/twilio`)
  - Handle SMS delivery events (sent, delivered, failed)
  - Handle opt-out keywords (STOP, UNSUBSCRIBE)
  - Update CustomerPromotion entity with tracking data
  - Update Customer communication preferences if opted out
  - Handle webhook authentication
- [ ] Configure webhook in SMS service provider:
  - Register webhook URL in provider dashboard
  - Configure status callback URLs
  - Test webhook delivery

#### Step 6: Testing Email Integration

- [ ] Test email sending:
  - Send test email with sample promotion
  - Verify email is delivered
  - Verify email formatting (HTML and plain text)
  - Test variable substitution in templates
- [ ] Test email tracking:
  - Verify webhook receives delivery events
  - Verify open tracking works
  - Verify click tracking works
  - Test bounce handling
- [ ] Test error scenarios:
  - Invalid email address
  - Bounced email
  - Rate limiting

#### Step 7: Testing SMS Integration

- [ ] Test SMS sending:
  - Send test SMS with sample promotion
  - Verify SMS is delivered
  - Verify SMS formatting (character limit, link shortening)
  - Test variable substitution in templates
- [ ] Test SMS tracking:
  - Verify webhook receives delivery events
  - Test opt-out handling (STOP keyword)
  - Test failed delivery handling
- [ ] Test error scenarios:
  - Invalid phone number
  - Failed delivery
  - Rate limiting
  - Opt-out handling

#### Step 8: Error Handling and Retry Logic

- [ ] Implement error handling for email service:
  - Handle API errors
  - Handle rate limiting
  - Implement retry logic for transient failures
  - Log errors appropriately
- [ ] Implement error handling for SMS service:
  - Handle API errors
  - Handle rate limiting
  - Implement retry logic
  - Log errors appropriately

#### Step 9: Rate Limiting and Quota Management

- [ ] Implement rate limiting:
  - Respect email service rate limits
  - Respect SMS service rate limits
  - Queue promotions if rate limit exceeded
  - Implement backoff strategy
- [ ] Monitor usage:
  - Track email sends per day/month
  - Track SMS sends per day/month
  - Set up alerts for quota limits
  - Implement usage dashboards (optional)

#### Step 10: Documentation

- [ ] Create setup documentation:
  - Document email service setup steps
  - Document SMS service setup steps
  - Document environment variables
  - Document webhook configuration
  - Include troubleshooting guide

### Definition of Done (DoD)

- [ ] Email service provider set up and configured
- [ ] SMS service provider set up and configured
- [ ] Environment variables configured
- [ ] Webhooks configured for email tracking
- [ ] Webhooks configured for SMS tracking
- [ ] Email integration tested and working
- [ ] SMS integration tested and working
- [ ] Error handling implemented
- [ ] Rate limiting implemented
- [ ] Documentation created

### Verification Steps

1. **Integration Testing:**
   - Send test email promotion
   - Send test SMS promotion
   - Verify delivery
   - Verify tracking data is updated
   - Test webhook receives events

2. **Error Testing:**
   - Test with invalid email/phone
   - Test rate limiting
   - Test error handling

### Acceptance Criteria

- ✅ Email service integrated and working
- ✅ SMS service integrated and working
- ✅ Promotions can be sent via email
- ✅ Promotions can be sent via SMS
- ✅ Delivery tracking works correctly
- ✅ Webhooks receive and process events
- ✅ Error handling is robust
- ✅ Rate limiting prevents service abuse

### Technical Details

**Files to Create:**
- `server/src/routes/webhooks.routes.ts`
- `server/src/controllers/WebhookController.ts`
- `server/src/services/EmailService.ts` (complete implementation)
- `server/src/services/SmsService.ts` (complete implementation)
- `doc/EMAIL_SMS_SETUP.md`

**Files to Modify:**
- `server/.env.example`
- `server/src/index.ts` (register webhook routes)

**Service Provider SDKs:**
- SendGrid: `@sendgrid/mail`
- Twilio: `twilio`
- AWS SES: `@aws-sdk/client-ses`
- AWS SNS: `@aws-sdk/client-sns`

---

**Completion Date:** 
**Completed By:** 
**Notes:**

---

## TASK-TEST-006: Customer and Promotion System Testing

**Status:** PENDING
**Priority:** MEDIUM
**Assignee:** unassigned
**Created:** 2025-01-22
**Updated:** 2025-01-22
**Estimated Time:** 12 hours
**Dependencies:** TASK-API-004, TASK-FEAT-023, TASK-FEAT-024
**Related Tasks:** none

### Description

Create comprehensive testing suite for customer management and promotion automation system, including unit tests, integration tests, and end-to-end tests. Ensure all functionality is thoroughly tested including customer CRUD, promotion templates, automation rules, and email/SMS sending.

### Requirements / What to Do

#### Step 1: Customer Service Unit Tests

- [ ] Test customer CRUD operations:
  - Create customer
  - Get customer by ID
  - Update customer
  - Delete customer
  - List customers with pagination
  - Search customers
  - Filter customers
- [ ] Test customer statistics calculation:
  - Total spent calculation
  - Visit count calculation
  - Average spend per visit
  - Customer lifetime value
- [ ] Test customer segmentation logic
- [ ] Test input validation
- [ ] Test error handling

#### Step 2: Promotion Template Service Unit Tests

- [ ] Test template CRUD operations
- [ ] Test template variable substitution
- [ ] Test template validation
- [ ] Test template rendering (email/SMS)
- [ ] Test error handling

#### Step 3: Promotion Automation Service Unit Tests

- [ ] Test automation rule CRUD operations
- [ ] Test rule trigger evaluation:
  - Birthday trigger
  - Inactive customer trigger
  - New customer trigger
- [ ] Test customer matching logic (conditions)
- [ ] Test rule validation
- [ ] Test error handling

#### Step 4: Promotion Send Service Unit Tests

- [ ] Test promotion sending logic
- [ ] Test coupon code generation
- [ ] Test email sending integration (mocked)
- [ ] Test SMS sending integration (mocked)
- [ ] Test queue management
- [ ] Test retry logic
- [ ] Test error handling

#### Step 5: Email Service Integration Tests

- [ ] Test email sending with mock provider
- [ ] Test email template rendering
- [ ] Test email delivery tracking
- [ ] Test webhook handling
- [ ] Test error scenarios

#### Step 6: SMS Service Integration Tests

- [ ] Test SMS sending with mock provider
- [ ] Test SMS template rendering
- [ ] Test SMS delivery tracking
- [ ] Test opt-out handling
- [ ] Test webhook handling
- [ ] Test error scenarios

#### Step 7: API Endpoint Integration Tests

- [ ] Test customer API endpoints:
  - GET /api/customers
  - GET /api/customers/:id
  - POST /api/customers
  - PUT /api/customers/:id
  - DELETE /api/customers/:id
- [ ] Test promotion template API endpoints
- [ ] Test automation rule API endpoints
- [ ] Test promotion send API endpoints
- [ ] Test analytics API endpoints
- [ ] Test authentication and authorization
- [ ] Test input validation
- [ ] Test error responses

#### Step 8: Automation Scheduler Integration Tests

- [ ] Test birthday promotion automation:
  - Create test customer with today's birthday
  - Run automation job
  - Verify promotion is queued/sent
- [ ] Test inactive customer automation
- [ ] Test new customer automation
- [ ] Test scheduled job execution
- [ ] Test error handling and logging

#### Step 9: Frontend Component Tests

- [ ] Test CustomerList component
- [ ] Test CustomerDetail component
- [ ] Test CustomerForm component
- [ ] Test PromotionTemplateForm component
- [ ] Test PromotionAutomationRuleForm component
- [ ] Test BirthdayPromotionConfig component
- [ ] Test PromotionAnalytics component

#### Step 10: End-to-End Tests

- [ ] E2E test: Create customer and send promotion
- [ ] E2E test: Configure birthday promotion automation
- [ ] E2E test: Birthday promotion is sent automatically
- [ ] E2E test: Customer redeems promotion
- [ ] E2E test: View promotion analytics

#### Step 11: Performance Tests

- [ ] Test customer list pagination performance
- [ ] Test promotion sending performance (bulk sends)
- [ ] Test automation job performance (large customer base)
- [ ] Test database query performance

#### Step 12: Security Tests

- [ ] Test authentication on protected endpoints
- [ ] Test authorization (role-based access)
- [ ] Test input sanitization
- [ ] Test SQL injection prevention
- [ ] Test XSS prevention

### Definition of Done (DoD)

- [ ] Unit tests written for all services
- [ ] Integration tests written for API endpoints
- [ ] Integration tests written for email/SMS services
- [ ] Automation scheduler tests written
- [ ] Frontend component tests written
- [ ] End-to-end tests written
- [ ] Performance tests completed
- [ ] Security tests completed
- [ ] All tests passing
- [ ] Test coverage >70% for new code

### Verification Steps

1. **Run Test Suite:**
   ```bash
   npm run test
   npm run test:coverage
   npm run test:e2e
   ```

2. **Review Coverage:**
   - Check coverage reports
   - Verify critical paths are covered
   - Identify coverage gaps

### Acceptance Criteria

- ✅ Comprehensive test coverage for customer management
- ✅ Comprehensive test coverage for promotion system
- ✅ All tests pass consistently
- ✅ Test coverage meets standards (>70%)
- ✅ Critical user flows are covered by E2E tests
- ✅ Performance and security are tested

### Technical Details

**Files to Create:**
- `server/src/tests/services/CustomerService.test.ts`
- `server/src/tests/services/PromotionTemplateService.test.ts`
- `server/src/tests/services/PromotionAutomationService.test.ts`
- `server/src/tests/services/PromotionSendService.test.ts`
- `server/src/tests/services/EmailService.test.ts`
- `server/src/tests/services/SmsService.test.ts`
- `server/src/tests/routes/customer.routes.test.ts`
- `server/src/tests/routes/promotionTemplate.routes.test.ts`
- `server/src/tests/routes/promotionAutomation.routes.test.ts`
- `client/src/components/dashboard/tests/CustomerList.test.tsx`
- `client/src/components/dashboard/tests/PromotionTemplateForm.test.tsx`
- `e2e/customer-promotions.e2e.ts`

**Testing Tools:**
- Jest/Vitest for unit and integration tests
- Supertest for API testing
- React Testing Library for component tests
- Cypress/Playwright for E2E tests

---

**Completion Date:** 
**Completed By:** 
**Notes:**

---

## TASK-DOC-005: Customer and Promotion System Documentation

**Status:** PENDING
**Priority:** MEDIUM
**Assignee:** unassigned
**Created:** 2025-01-22
**Updated:** 2025-01-22
**Estimated Time:** 4 hours
**Dependencies:** TASK-API-004, TASK-FEAT-023, TASK-FEAT-024
**Related Tasks:** none

### Description

Create comprehensive documentation for the customer management and promotion automation system, including API documentation, user guides for dashboard features, configuration guides, and troubleshooting documentation.

### Requirements / What to Do

#### Step 1: API Documentation

- [ ] Document all customer management endpoints:
  - Request/response schemas
  - Authentication requirements
  - Error codes and messages
  - Example requests and responses
- [ ] Document all promotion-related endpoints:
  - Template endpoints
  - Automation rule endpoints
  - Promotion send endpoints
  - Analytics endpoints
- [ ] Create OpenAPI/Swagger specification (optional but recommended)

#### Step 2: Database Schema Documentation

- [ ] Document customer entity schema:
  - All fields and data types
  - Relationships
  - Indexes
  - Constraints
- [ ] Document promotion-related entities:
  - PromotionTemplate
  - PromotionAutomationRule
  - CustomerPromotion
  - PromotionSendQueue
- [ ] Update ERD diagram
- [ ] Document data migration steps

#### Step 3: User Guide for Customer Management

- [ ] Create `doc/USER_GUIDE_CUSTOMER_MANAGEMENT.md`:
  - How to view customers
  - How to create new customer
  - How to edit customer information
  - How to search and filter customers
  - How to view customer history
  - How to manage communication preferences
  - Screenshots and examples

#### Step 4: User Guide for Promotion Automation

- [ ] Create `doc/USER_GUIDE_PROMOTION_AUTOMATION.md`:
  - How to create promotion templates
  - How to configure automation rules
  - How to set up birthday promotions
  - How to send manual promotions
  - How to view promotion analytics
  - How to track promotion performance
  - Screenshots and examples

#### Step 5: Configuration Guide

- [ ] Document email service configuration:
  - Provider setup
  - API key configuration
  - Webhook configuration
  - Domain verification
- [ ] Document SMS service configuration:
  - Provider setup
  - API key configuration
  - Webhook configuration
  - Phone number setup
- [ ] Document automation scheduler configuration:
  - Cron job setup
  - Job scheduling
  - Error handling configuration

#### Step 6: Developer Documentation

- [ ] Document architecture:
  - System architecture overview
  - Data flow diagrams
  - Service interactions
- [ ] Document code structure:
  - Service layer organization
  - Controller patterns
  - Entity relationships
- [ ] Document development workflow:
  - How to add new automation rule types
  - How to add new promotion templates
  - How to extend customer data

#### Step 7: Troubleshooting Guide

- [ ] Document common issues:
  - Email delivery issues
  - SMS delivery issues
  - Automation not triggering
  - Promotion tracking not working
- [ ] Document solutions:
  - Step-by-step troubleshooting
  - Debugging tips
  - Log analysis
- [ ] Document error messages and meanings

#### Step 8: Requirements Traceability Matrix

- [ ] Create requirements traceability matrix:
  - Map requirements to implementation tasks
  - Map requirements to test cases
  - Map requirements to documentation
- [ ] Verify all requirements are met:
  - Customer data requirements
  - Promotion automation requirements
  - Communication delivery requirements
  - Analytics requirements

### Definition of Done (DoD)

- [ ] API documentation complete
- [ ] Database schema documentation complete
- [ ] User guides created
- [ ] Configuration guides created
- [ ] Developer documentation created
- [ ] Troubleshooting guide created
- [ ] Requirements traceability matrix created
- [ ] All documentation reviewed and approved

### Verification Steps

1. **Documentation Review:**
   - Review all documentation for completeness
   - Check for accuracy
   - Verify examples are correct
   - Test configuration guides

2. **User Testing:**
   - Have users follow user guides
   - Gather feedback
   - Update documentation based on feedback

### Acceptance Criteria

- ✅ Comprehensive documentation exists
- ✅ API documentation is complete and accurate
- ✅ User guides are clear and helpful
- ✅ Configuration guides enable successful setup
- ✅ Troubleshooting guide helps resolve common issues
- ✅ Requirements are traceable to implementation

### Technical Details

**Files to Create:**
- `doc/USER_GUIDE_CUSTOMER_MANAGEMENT.md`
- `doc/USER_GUIDE_PROMOTION_AUTOMATION.md`
- `doc/CUSTOMER_PROMOTION_API.md`
- `doc/EMAIL_SMS_SETUP.md` (if not already created)
- `doc/CUSTOMER_PROMOTION_ARCHITECTURE.md`
- `doc/TROUBLESHOOTING_CUSTOMER_PROMOTIONS.md`
- `doc/REQUIREMENTS_TRACEABILITY_MATRIX.md`

**Files to Update:**
- `doc/diagrams/` (update ERD diagrams)
- `server/README.md` (add customer/promotion API documentation)

---

**Completion Date:** 
**Completed By:** 
**Notes:**

