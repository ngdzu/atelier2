# Calendar and Appointment Viewing - Detailed Requirements

**Document Version:** 1.6  
**Date:** 2025-01-24  
**Status:** Draft  
**Last Updated:** 2025-01-24  
**Related Tasks:** TASK-DOC-011  
**Related Documents:** [Dashboard Requirements - Calendar and Appointment Viewing](../../DASHBOARD_REQUIREMENTS.md#calendar-and-appointment-viewing)

## Table of Contents

1. [Overview and Scope](#overview-and-scope)
2. [User Roles and Permissions](#user-roles-and-permissions)
3. [Calendar Interface Requirements](#calendar-interface-requirements)
4. [Appointment Management Requirements](#appointment-management-requirements)
5. [Integration Requirements](#integration-requirements)
6. [Filtering and Search Requirements](#filtering-and-search-requirements)
7. [Export and Printing Requirements](#export-and-printing-requirements)
8. [Suggested Additional Features](#suggested-additional-features)
9. [User Workflows](#user-workflows)
10. [Technical Constraints](#technical-constraints)
11. [Glossary](#glossary)

---

## Overview and Scope

### Purpose

This document provides detailed requirements for the Calendar and Appointment Viewing functionality within the Dashboard Management System. This feature enables business owners, managers, and administrators to view, manage, and track appointments through an intuitive calendar interface.

### Scope

The Calendar and Appointment Viewing system includes:

- **Calendar Views**: Day, week, and month views with appointment visualization
- **Appointment Management**: Create, view, edit, cancel, and delete appointments
- **Status Management**: Track and update appointment statuses (Scheduled, Completed, Cancelled, No-Show)
- **Filtering and Search**: Filter appointments by employee, service, status, date range, and customer
- **Export Functionality**: Export calendar data to PDF and CSV formats
- **Integration**: Real-time sync with booking system, employee management, and metrics

### Out of Scope

The following are explicitly out of scope for this phase:

- Customer-facing booking interface (already implemented separately)
- Payment processing for appointments
- Automated appointment reminders (handled by booking system)
- Complex employee availability management (basic availability checking only)
- Recurring appointment series management
- Appointment waitlist management
- Multi-location calendar support

### Booking System Requirements

**Note:** The customer-facing booking system is already implemented (see `client/components/BookingFlow/`). However, there is currently no separate requirements or design document for the booking system. The booking system:

- Allows customers to book appointments online
- Stores appointments in the same database as the dashboard calendar
- Integrates with the calendar viewing system (shared database)
- Is considered out of scope for this calendar requirements document

**Recommendation:** A separate requirements and design document should be created for the booking system if detailed documentation is needed. For now, the calendar system assumes the booking system exists and shares the same database.

### Related Requirements

This document expands on the high-level requirements defined in `DASHBOARD_REQUIREMENTS.md`:
- **REQ-CAL-001** through **REQ-CAL-011**: Calendar Interface, Appointment Management, Filtering, Integration
- **REQ-CAL-012**: Service ID Quick Filter (MUST HAVE)
- **REQ-CAL-013**: Appointment Audit Trail Viewing
- **REQ-CAL-014**: Appointment Duplicate/Copy
- **REQ-CAL-015**: Appointment Templates
- **REQ-CAL-016**: Appointment Time Rounding
- **REQ-CAL-017**: Appointment Statistics Dashboard
- **REQ-CAL-018**: Holiday/Closed Day Management
- **REQ-CAL-019**: Appointment Search by Phone Number
- **REQ-CAL-020**: Export and Printing (PDF, CSV, Print)

---

## User Roles and Permissions

### Owner

**Calendar Access:** Full access to all calendar features

**Permissions:**
- View all appointments across all employees
- Create, edit, cancel, and delete any appointment
- Change appointment status for any appointment
- Export calendar data (PDF, CSV)
- View appointment history and audit logs
- Access all filters and search capabilities

### Manager

**Calendar Access:** Full operational access

**Permissions:**
- View all appointments across all employees
- Create, edit, cancel, and delete appointments
- Change appointment status for any appointment
- Export calendar data (PDF, CSV)
- View appointment history
- Access all filters and search capabilities
- Cannot modify system-level calendar settings

### Admin

**Calendar Access:** Full operational access

**Permissions:**
- View all appointments across all employees
- Create, edit, cancel, and delete appointments
- Change appointment status for any appointment
- Export calendar data (PDF, CSV)
- View appointment history
- Access all filters and search capabilities
- Can configure calendar display settings

### Receptionist/Cashier

**Calendar Access:** Full operational access for appointment management

**Permissions:**
- View all appointments across all employees
- Create appointments manually (over phone or in person)
- Edit appointments (reschedule, change details)
- Cancel/delete appointments (with confirmation)
- Change appointment status for any appointment
- Filter appointments by:
  - Employee name
  - Day of week (Monday, Tuesday, etc.)
  - Specific hour of day (e.g., 2:00 PM - 3:00 PM)
  - Multiple criteria combinations
- Search appointments by customer name, service, or appointment ID
- Export calendar data (PDF, CSV) for operational use
- View customer information
- Process payments (if payment processing integrated)
- Cannot manage employees, promotions, website content, or gallery images
- Cannot access user management or system settings

### Employee

**Calendar Access:** Limited view-only access

**Permissions:**
- View own appointments only (filtered by default)
- View appointment details for own appointments
- Cannot create, edit, cancel, or delete appointments
- Cannot change appointment status
- Cannot export calendar data
- Limited filtering (own appointments only)

---

## Calendar Interface Requirements

### Calendar Views

#### Day View (REQ-CAL-001)

**Purpose:** Display appointments for a single day with hourly time slots

**Specifications:**
- **Time Range:** Configurable business hours (default: 9:00 AM - 7:00 PM)
- **Time Increments:** 15-minute or 30-minute intervals (configurable)
- **Time Slot Display:**
  - Show all time slots within business hours
  - Visual distinction between available and booked slots
  - Current time indicator (highlighted line)
- **Appointment Display:**
  - Show appointments positioned by start time
  - Display appointment duration visually (height proportional to duration)
  - Show appointment details on hover (customer name, service, time)
  - Color coding by status or service type
- **Navigation:**
  - Previous/Next day buttons
  - Jump to today button
  - Date picker for quick navigation
  - Keyboard shortcuts: Arrow keys (left/right for previous/next day)
- **Interactions:**
  - Click time slot to create new appointment
  - Click appointment to view/edit details
  - **Drag appointment to reschedule (MUST HAVE):**
    - Drag appointment to different time slot to reschedule
    - Real-time conflict checking during drag
    - Visual feedback during drag operation
    - Drop to confirm reschedule
    - Confirmation dialog before saving

**Visual Requirements:**
- Time slots clearly labeled (9:00 AM, 9:15 AM, etc.)
- Appointments clearly visible with sufficient contrast
- Responsive design for mobile devices
- Scrollable view for long days

#### Week View (REQ-CAL-001)

**Purpose:** Display appointments for a week with daily columns

**Specifications:**
- **Week Structure:**
  - Configurable week start day (Sunday or Monday, default: Sunday)
  - Display 7 days in columns
  - Day headers with date and day name
- **Time Range:** Same as day view (9:00 AM - 7:00 PM)
- **Time Increments:** 15-minute or 30-minute intervals
- **Appointment Display:**
  - Show appointments positioned by day and time
  - Display appointment duration visually
  - Show appointment details on hover
  - Color coding by status or service type
- **Navigation:**
  - Previous/Next week buttons
  - Jump to current week button
  - Date picker for quick navigation
  - Keyboard shortcuts: Arrow keys (left/right for previous/next week)
- **Interactions:**
  - Click time slot to create new appointment
  - Click appointment to view/edit details
  - **Drag appointment to reschedule (MUST HAVE):**
    - Drag appointment to different day/time slot to reschedule
    - Real-time conflict checking during drag
    - Visual feedback during drag operation
    - Drop to confirm reschedule
    - Confirmation dialog before saving

**Visual Requirements:**
- Daily columns clearly separated
- Current day highlighted
- Responsive design (horizontal scroll on mobile)
- Compact view for small screens

#### Month View (REQ-CAL-001)

**Purpose:** Display appointments for a month in calendar grid format

**Specifications:**
- **Calendar Grid:**
  - Standard calendar grid (weeks × days)
  - Month header with month name and year
  - Day numbers in each cell
  - Current date highlighted
- **Appointment Display:**
  - Show appointment indicators as **dots** on days with appointments
  - Color coding by status or service type
  - Show appointment count per day (e.g., "3 appointments")
  - **Visual indicators for booking density:**
    - Days with no bookings: No dots (clearly visible)
    - Days with low bookings: Few dots (1-2 appointments)
    - Days with high bookings: Many dots (3+ appointments)
  - Hover to see appointment list for that day
- **Navigation:**
  - Previous/Next month buttons
  - Jump to current month button
  - Month/year picker for quick navigation
  - Keyboard shortcuts: Arrow keys (left/right for previous/next month)
- **Interactions:**
  - **Click day to switch to day view for that date (MUST HAVE):**
    - Primary use case: User sees day with low/no booking
    - Click day to see day view and pick available time slots
    - Quick navigation from month overview to detailed day view
  - Click appointment indicator (dot) to view appointment list
  - Click empty day to create new appointment

**Visual Requirements:**
- Calendar grid clearly structured
- Appointment indicators clearly visible
- Responsive design (stack days vertically on mobile)
- Month navigation intuitive

### Employee-Based Calendar (REQ-CAL-002)

**Purpose:** Filter and display appointments by employee with drag-and-drop support

**Specifications:**
- **Employee Selector:**
  - Dropdown or multi-select component
  - Display employee name and color
  - "All Employees" option (default)
  - "My Appointments" option (for employee role)
- **Employee Color Coding:**
  - Each employee assigned a unique color
  - Color displayed in calendar for employee's appointments
  - Color legend/key available
- **Filter Behavior:**
  - When single employee selected: Show only that employee's appointments
  - When multiple employees selected: Show appointments for selected employees
  - When "All Employees" selected: Show all appointments with color coding
- **Multi-Employee View:**
  - **Each employee's schedule represented by a column (MUST HAVE):**
    - In day/week view: Each employee has dedicated column
    - Appointments displayed as boxes spanning the duration of the appointment
    - Box height proportional to appointment duration
    - Box width fills employee column
  - In month view: Show appointment indicators with color coding
- **Drag and Drop Support (MUST HAVE):**
  - **Drag appointment from one day to another day:**
    - Drag appointment box to different day in same employee column
    - Drag appointment box to different employee column (reassigns employee)
    - Real-time conflict checking during drag
    - Visual feedback (highlight valid drop zones, show conflicts)
    - Drop to confirm reschedule/reassignment
    - Confirmation dialog before saving changes
  - **Drag within same day:**
    - Drag appointment to different time slot
    - Maintains employee assignment
    - Updates appointment time

### Time Slot Display (REQ-CAL-003)

**Purpose:** Display time slots and availability

**Specifications:**
- **Business Hours Configuration:**
  - Configurable start time (default: 9:00 AM)
  - Configurable end time (default: 7:00 PM)
  - Stored in system settings
  - Can be overridden per employee (future enhancement)
- **Time Slot Granularity:**
  - Configurable: 15 minutes or 30 minutes
  - Default: 15 minutes (MUST HAVE)
  - Applied consistently across all views
- **Available vs. Booked Slots:**
  - Available slots: Light background, clickable
  - Booked slots: Appointment displayed, not clickable for new appointments
  - Partially booked slots: Show available portion (future enhancement)
- **Time Slot Click Behavior:**
  - Click available slot: Open appointment creation form with time pre-filled
  - Click booked slot: Open appointment details modal
  - Right-click (optional): Context menu with quick actions

### Appointment Display (REQ-CAL-004)

**Purpose:** Display appointment information in calendar

**Specifications:**
- **Appointment Information Displayed:**
  - Customer name (primary identifier)
  - Service name (or first service if multiple)
  - Time (start time, or start-end if space allows)
  - **Appointment Service Duration Display:**
    - Show duration in appointment card (e.g., "60 min", "1.5h")
    - Display in tooltip/hover
    - Visual height proportional to duration
    - Show in appointment details modal
    - Duration calculation: Sum of main service + all add-on services
    - Visual indicators: Appointment height in calendar reflects duration
  - Status indicator (color or icon)
  - Employee name (if multi-employee view)
- **Color Coding:**
  - By Status:
    - SCHEDULED: Blue
    - COMPLETED: Green
    - CANCELLED: Red
    - NO_SHOW: Orange
  - By Service Type (alternative): Color by service category
  - Configurable preference
- **Appointment Color Customization:**
  - User-configurable color schemes
  - Color by status (customizable)
  - Color by service type (customizable)
  - Color by employee (customizable)
  - Per-user preferences (stored in user settings)
  - Default color scheme
  - Color picker for customization
  - Ensure sufficient color contrast for accessibility
  - Support colorblind-friendly palettes
  - Alternative indicators (icons, patterns)
- **Hover Tooltips:**
  - Show full appointment details on hover:
    - Customer name and contact
    - Service(s) booked
    - Start and end time
    - Duration
    - Status
    - Employee assigned
    - Notes (if any)
- **Click Behavior:**
  - Click appointment: Open appointment details modal
  - Double-click (optional): Open edit form directly
- **Appointment Quick Actions Menu:**
  - Right-click context menu on appointments
  - Quick action buttons in appointment card
  - Keyboard shortcuts for actions
  - Action options: Mark as Completed, Mark as No-Show, Reschedule, Cancel, Duplicate, View Customer History, Send Reminder (if integrated)
  - Role-based actions: Show only actions user has permission for, disable actions for past appointments (where applicable)

### Appointment Statistics Dashboard (REQ-CAL-017)

**Purpose:** Quick statistics view within calendar interface

**Specifications:**
- **Statistics Display:**
  - Today's appointments count
  - Upcoming appointments (next 7 days)
  - Pending status changes
  - No-shows today/week
  - Revenue summary (if pricing available)
- **Statistics Location:**
  - Sidebar or header widget
  - Collapsible panel
  - Click to view detailed metrics
- **Real-Time Updates:**
  - Statistics update as appointments change
  - Refresh automatically

### Holiday/Closed Day Management (REQ-CAL-018)

**Purpose:** Block out days when salon is closed (holidays, special events)

**Specifications:**
- **Closed Day Configuration:**
  - Mark specific dates as closed
  - Recurring holidays (e.g., Christmas, New Year)
  - One-time closures
  - Partial day closures (morning/afternoon)
- **Visual Display:**
  - Grayed out or marked days in calendar
  - Clear indication of closed days
  - Prevent appointment creation on closed days
- **Management:**
  - Admin/Manager can configure closed days
  - Calendar view shows closed days
  - Export/import closed day calendar

### Navigation Requirements

**Purpose:** Enable easy navigation through calendar dates

**Specifications:**
- **Previous/Next Controls:**
  - Day view: Previous/Next day buttons
  - Week view: Previous/Next week buttons
  - Month view: Previous/Next month buttons
  - Keyboard shortcuts: Arrow keys
- **Jump to Today:**
  - "Today" button always visible
  - Clicking "Today" navigates to current date in current view
  - Highlights current date/time in calendar
- **Date Picker:**
  - Calendar date picker component
  - Quick navigation to any date
  - Preserves current view type (day/week/month)
- **Keyboard Shortcuts (Optional):**
  - Left/Right arrows: Previous/Next period
  - T: Jump to today
  - D: Switch to day view
  - W: Switch to week view
  - M: Switch to month view
  - Esc: Close modals

---

## Appointment Management Requirements

### View Appointment Details (REQ-CAL-005)

**Purpose:** Display complete appointment information

**Specifications:**
- **Appointment Details Modal:**
  - Customer Information:
    - Full name
    - Phone number (clickable to call)
    - Email address (clickable to email)
    - Customer ID (internal)
  - Appointment Information:
    - Date and time (start and end)
    - Duration
    - Status (with status history)
    - Employee assigned
    - Service(s) booked (list all services including add-ons)
    - Total price (if applicable)
    - Booking date/time
    - Last modified date/time
  - Notes:
    - Appointment notes (if any)
    - Internal notes (if any, role-based visibility)
  - Actions:
    - Edit button (if user has permission)
    - Cancel/Delete button (if user has permission)
    - Change Status button (if user has permission)
    - Close button
- **Status History:**
  - Show status change history (if available)
  - Who changed status and when
  - Reason for status change (if provided)
- **Customer History Quick View:**
  - Click customer name in appointment to view history
  - Show customer's past appointments in sidebar or modal
  - Display appointment count, last visit date, total spending
  - Link to full customer profile
  - List of past appointments (date, service, employee, status)
  - Visit frequency, preferred services, preferred employee
  - Quick actions: Create new appointment for same customer, view customer details

### Appointment Audit Trail Viewing (REQ-CAL-013)

**Purpose:** View detailed history of appointment changes

**Specifications:**
- **Audit Trail Display:**
  - Timeline view of all changes
  - Who made changes and when
  - What was changed (before/after values)
  - Reason for changes (if provided)
- **Audit Trail Access:**
  - "View History" button in appointment details
  - Expandable history section
  - Filter by change type
  - Export audit trail (optional)
- **Change Types:**
  - Status changes
  - Time/date changes
  - Employee reassignment
  - Service changes
  - Notes updates
  - Cancellation/deletion

### Edit Appointment (REQ-CAL-006)

**Purpose:** Update appointment details

**Specifications:**
- **Editable Fields:**
  - Employee assignment (dropdown)
  - Service(s) (multi-select)
  - Date and time (date picker and time picker)
  - Status (dropdown)
  - Notes (text area)
- **Field Restrictions:**
  - Customer: Cannot change (create new appointment if needed)
  - Some fields may be restricted based on role
- **Validation Rules:**
  - **Employee Availability:**
    - Check if employee is available for selected time slot
    - Show conflict warnings if employee has overlapping appointment
    - Allow override with confirmation (role-based)
  - **Time Slot Availability:**
    - Check if time slot is available
    - Validate against business hours
    - Validate service duration fits in time slot
  - **Service Duration:**
    - Calculate total duration (main service + add-ons)
    - Ensure duration fits in selected time slot
    - Warn if duration exceeds available time
  - **Date/Time Validation:**
    - Date cannot be in the past (for new appointments)
    - Time must be within business hours
    - End time must be after start time
  - **Past Appointment Restrictions:**
    - Cannot create appointments with start time in the past
    - Cannot edit past appointments (except status changes)
    - Cannot drag appointments to past time slots
    - Clear error messages when attempting past operations
    - Exceptions: Allow status changes for past appointments, allow viewing past appointments, allow adding notes to past appointments
    - Configurable cutoff time (e.g., cannot create appointments less than 1 hour before start time)
    - Role-based overrides (OWNER/MANAGER may have more flexibility)
- **Conflict Detection:**
  - Real-time conflict checking as user edits
  - Display conflict warnings:
    - "Employee has another appointment at this time"
    - "Time slot overlaps with existing appointment"
  - Show conflicting appointment details
  - Allow user to proceed with override (role-based)
- **Appointment Conflict Resolution UI:**
  - Highlight conflicting appointments in calendar
  - Show conflict details in modal/dialog
  - Display overlapping appointments side-by-side
  - Visual indicators (red border, warning icon)
  - Conflict resolution options: reschedule one appointment, override conflict (with confirmation), cancel one appointment
  - Real-time conflict checking during drag-and-drop
  - Disable drop zones that would create conflicts
  - Show available alternative time slots
- **Change Notification:**
  - Option to notify customer of changes (checkbox)
  - Email notification sent if checked
  - SMS notification (if configured, future enhancement)
- **Confirmation:**
  - Confirmation dialog before saving changes
  - Summary of changes displayed
  - "Save" and "Cancel" buttons

### Create Appointment (Manual) (REQ-CAL-007)

**Purpose:** Create new appointment from calendar interface

**Specifications:**
- **Creation Methods:**
  - Click available time slot in calendar
  - Click "New Appointment" button
  - Keyboard shortcut (optional): Ctrl+N or Cmd+N
- **Appointment Creation Form:**
  - **Customer Selection:**
    - Search/autocomplete field
    - Search by name, phone, or email
    - Display customer list with recent customers first
    - Option to create new customer (if permission)
    - Required field
  - **Employee Selection:**
    - Dropdown with employee list
    - Show employee availability indicator
    - Required field
  - **Service Selection:**
    - **Polished, Fashionable Dropdown Design:**
      - Well-designed, modern service selection interface
      - Professional, polished UI with clean styling
      - Organized service list with clear visual hierarchy
      - Visually appealing service items/cards
      - Smooth animations and transitions
      - Professional typography and spacing
    - Show main services and add-ons
    - Display service information:
      - Service name clearly displayed
      - Service ID in format: "M1 - Classic Manicure" or "M1: Classic Manicure"
      - Service duration and price
      - Service category/type indicator
      - Visual indicators for selected services
    - **Service Selection Methods:**
      - **Type Number:** Type the number (e.g., "1" for M1, "5" for P5) to select service
      - **Click Service:** Click on service name/item in dropdown to add to appointment
      - Visual feedback on selection (highlight, checkmark, animation)
    - **Service ID Quick Filter Support:**
      - Type service ID (e.g., "M1", "P5") to filter dropdown to specific service
      - Type single letter (e.g., "M") to filter dropdown to show all services in category
      - Real-time filtering as user types
      - Polished dropdown shows filtered services with smooth animations
      - See [Service ID Quick Filter](#service-id-quick-filter-req-cal-012---must-have) for detailed specifications
    - Calculate total duration automatically
    - Required field (at least one service)
  - **Date and Time:**
    - Date picker (pre-filled if clicked from time slot)
    - Time picker (pre-filled if clicked from time slot)
    - Show available time slots for selected employee and date
    - Required fields
  - **Notes:**
    - Text area for appointment notes
    - **Appointment Notes Visibility Control:**
      - Internal notes (staff-only, not visible to customers)
      - Customer notes (visible in booking confirmation, reminders)
      - Appointment notes (general)
      - Clear labeling of note types
      - Role-based visibility (internal notes for staff only)
      - Separate fields in appointment form
    - Optional field
  - **Form Actions:**
    - "Save" button (creates appointment)
    - "Save and Notify Customer" button (creates and sends notification)
    - "Cancel" button (closes form without saving)
- **Validation:**
  - Same validation rules as edit appointment
  - Real-time validation feedback
  - Disable "Save" button if validation fails
- **Conflict Checking:**
  - Check conflicts before saving
  - Show conflict warnings
  - Prevent saving if critical conflict (unless override allowed)

### Appointment Duplicate/Copy (REQ-CAL-014)

**Purpose:** Quickly create similar appointments for repeat customers

**Specifications:**
- **Duplicate Action:**
  - "Duplicate" or "Copy" button in appointment details
  - Creates new appointment with same customer, employee, and services
  - Pre-fills form with original appointment data
  - Allows user to modify date/time before saving
- **Use Cases:**
  - Rebooking same customer for next visit
  - Creating follow-up appointments
  - Rescheduling with same details
- **Smart Defaults:**
  - Suggest next available time slot
  - Suggest same day/time next week (if applicable)
  - Maintain service selections

### Appointment Templates (REQ-CAL-015)

**Purpose:** Save common service combinations as templates for quick booking

**Specifications:**
- **Template Creation:**
  - Save appointment as template (customer, services, duration)
  - Name templates (e.g., "Regular Manicure + Pedicure")
  - Store service combinations and default duration
- **Template Usage:**
  - Quick select from template dropdown
  - Pre-fill appointment form with template data
  - Allow modification before saving
- **Template Management:**
  - Create, edit, delete templates
  - Share templates across users (optional)
  - Most used templates shown first

### Appointment Time Rounding (REQ-CAL-016)

**Purpose:** Automatically round appointment times to nearest time slot

**Specifications:**
- **Rounding Rules:**
  - Round to nearest 15-minute increment (default)
  - Configurable rounding interval
  - Round start time and end time
  - Apply when creating/editing appointments
- **User Control:**
  - Option to disable rounding
  - Manual override for exact times
  - Show rounded time in preview before saving
- **Use Cases:**
  - Quick appointment creation
  - Consistent time slot alignment
  - Prevents odd appointment times (e.g., 2:07 PM)

### Cancel/Delete Appointment (REQ-CAL-008)

**Purpose:** Cancel or delete appointments

**Specifications:**
- **Cancel Appointment (Soft Delete):**
  - Changes status to CANCELLED
  - Appointment remains in system
  - Visible in calendar with cancelled status
  - Can be restored (future enhancement)
  - **Cancellation Form:**
    - Reason for cancellation (dropdown or text):
      - Customer requested
      - No show
      - Employee unavailable
      - Service unavailable
      - Other (with text field)
    - Notify customer checkbox (default: checked)
    - Confirmation required
  - **Customer Notification:**
    - Email notification sent if checked
    - SMS notification (if configured, future enhancement)
    - Notification includes cancellation reason
- **Delete Appointment (Hard Delete):**
  - Permanently removes appointment from system
  - Cannot be restored
  - **Deletion Confirmation:**
    - Strong confirmation dialog
    - Warning message: "This action cannot be undone"
    - Require typing "DELETE" to confirm (optional)
    - Role-based permission required
  - **Audit Log:**
    - Log deletion in audit trail
    - Record who deleted and when
- **Permissions:**
  - Cancel: MANAGER+ roles
  - Delete: MANAGER+ roles (with strong confirmation)
  - Employees cannot cancel or delete appointments

### Appointment Status Management (REQ-CAL-009)

**Purpose:** Track and update appointment statuses

**Specifications:**
- **Appointment Statuses:**
  - **SCHEDULED:** Appointment is booked and confirmed
    - Default status for new appointments
    - Visible in calendar
  - **COMPLETED:** Service was completed
    - Can be changed from SCHEDULED
    - Used for metrics and reporting
    - Visible in calendar (different color)
  - **CANCELLED:** Appointment was cancelled
    - Can be changed from SCHEDULED
    - Visible in calendar (different color)
    - May trigger customer notification
  - **NO_SHOW:** Customer did not show up
    - Can be changed from SCHEDULED
    - Used for metrics and reporting
    - Visible in calendar (different color)
- **Status Transition Rules:**
  - SCHEDULED → COMPLETED: Allowed
  - SCHEDULED → CANCELLED: Allowed
  - SCHEDULED → NO_SHOW: Allowed
  - COMPLETED → SCHEDULED: Not allowed (appointment already completed)
  - CANCELLED → SCHEDULED: Not allowed (create new appointment)
  - NO_SHOW → SCHEDULED: Not allowed (create new appointment)
  - Status changes are logged in audit trail
- **Status Change Workflow:**
  - **Change Status Action:**
    - Dropdown or button in appointment details modal
    - Show available status transitions
    - Confirmation dialog for status change
  - **Status Change Form:**
    - Select new status (dropdown)
    - Reason for change (optional text field)
    - Notify customer checkbox (for certain transitions)
    - "Save" and "Cancel" buttons
  - **Audit Logging:**
    - Record status change in AppointmentStatusHistory
    - Log: previous status, new status, changed by, timestamp, reason
- **Bulk Status Updates:**
  - Select multiple appointments
  - Change status for all selected
  - Confirmation dialog with count
  - Individual audit log entries for each change
- **Permissions:**
  - Change status: MANAGER+ roles
  - Employees cannot change appointment status

---

## Integration Requirements

### Integration with Booking System (REQ-CAL-010)

**Purpose:** Display and sync appointments from customer booking system

**Specifications:**
- **Data Source:**
  - Appointments created through customer-facing booking system
  - Appointments created manually in dashboard
  - Both sources stored in same database
- **Real-Time Updates:**
  - When new appointment booked: Calendar updates automatically
  - Polling mechanism: Check for new appointments every 30 seconds (configurable)
  - WebSocket support (future enhancement): Real-time push updates
  - Manual refresh button available
- **Conflict Resolution:**
  - **Conflict Detection:**
    - Check for overlapping appointments (same employee, overlapping time)
    - Check for double-booking (same customer, overlapping time)
  - **Conflict Resolution Strategy:**
    - Display conflict warnings in calendar
    - Highlight conflicting appointments
    - Allow manual resolution (edit one of the appointments)
    - Automatic resolution (future enhancement): First-come-first-served
  - **Data Consistency:**
    - Single source of truth: Database
    - Calendar reads from same database as booking system
    - No data synchronization needed (shared database)
- **Appointment Source Indication:**
  - Visual indicator showing appointment source:
    - "Booked online" icon
    - "Manual" icon
  - Display in appointment details

### Integration with Employee Management

**Purpose:** Display employee information and availability in calendar

**Specifications:**
- **Employee Information Display:**
  - Employee name in calendar
  - Employee color coding
  - Link to employee details page (click employee name)
  - Employee availability indicator (basic)
- **Employee Availability:**
  - **Basic Availability:**
    - Show if employee has appointment at time slot
    - Show available time slots (no appointments)
    - Based on existing appointments only
  - **Advanced Availability (Future Enhancement):**
    - Employee work schedule
    - Time off/vacation days
    - Break times
  - **Availability Checking:**
    - When creating/editing appointment: Check employee availability
    - Show available time slots for selected employee
    - Highlight unavailable time slots
- **Employee Color Coding:**
  - Each employee assigned unique color
  - Color used in calendar for employee's appointments
  - Color legend/key available
  - Colors configurable in employee management
- **Employee Filter:**
  - Filter calendar by employee
  - Multi-select support
  - "All Employees" option
  - Filter persists across view changes

### Integration with Metrics

**Purpose:** Provide appointment data for metrics calculations

**Specifications:**
- **Appointment Data for Metrics:**
  - Appointment counts (total, by status, by service, by employee)
  - Revenue data (if pricing available)
  - Customer visit frequency
  - Service popularity
  - Employee performance (appointments per employee)
- **Real-Time Updates:**
  - When appointment created: Update metrics immediately
  - When appointment status changed: Update metrics immediately
  - When appointment cancelled: Update metrics immediately
  - Metrics dashboard refreshes automatically
- **Historical Data:**
  - Calendar maintains historical appointment data
  - Metrics can query historical data for trends
  - Date range filtering for historical metrics
- **Data Flow:**
  - Calendar → Database → Metrics Service
  - No direct API calls needed (shared database)
  - Metrics service queries appointment data

---

## Filtering and Search Requirements

### Filter Appointments

**Purpose:** Filter calendar view by various criteria

**Specifications:**
- **Filter Types:**
  - **Employee Filter:**
    - Dropdown or multi-select
    - Show all employees
    - "All Employees" option (default)
    - "My Appointments" option (for employee role)
    - Employee color coding visible in filter
  - **Service Type/Category Filter:**
    - Multi-select dropdown
    - Show all service categories
    - Filter by main service or add-on
    - "All Services" option (default)
    - **Service ID Quick Filter (MUST HAVE):**
      - Type service ID format (e.g., "M1", "P5", "E3")
      - Single letter (e.g., "M") filters all services in that category
      - Letter + number (e.g., "M1") filters specific service
      - Real-time filtering as user types
      - Service IDs displayed in dropdown (e.g., "M1 - Classic Manicure")
      - See [Service ID Quick Filter](#service-id-quick-filter-req-cal-012---must-have) for detailed specifications
  - **Status Filter:**
    - Checkboxes for each status:
      - Scheduled
      - Completed
      - Cancelled
      - No-Show
    - "All Statuses" option (default)
    - Multiple statuses can be selected
  - **Date Range Filter:**
    - Start date picker
    - End date picker
    - Quick options:
      - Today
      - This Week
      - This Month
      - Last 7 Days
      - Last 30 Days
      - Custom Range
  - **Customer Filter:**
    - Search/autocomplete field
    - Search by customer name
    - Filter appointments for selected customer
  - **Day of Week Filter (Receptionist Perspective - MUST HAVE):**
    - Multi-select checkboxes for days of week:
      - Monday
      - Tuesday
      - Wednesday
      - Thursday
      - Friday
      - Saturday
      - Sunday
    - Filter appointments by specific day(s) of week
    - Useful for identifying patterns (e.g., "Show all Monday appointments")
    - Can be combined with other filters
  - **Hour of Day Filter (Receptionist Perspective - MUST HAVE):**
    - Time range selector or hour dropdown
    - Filter appointments by specific hour(s) of day
    - Examples:
      - "9:00 AM - 10:00 AM"
      - "2:00 PM - 3:00 PM"
      - "All morning appointments (9 AM - 12 PM)"
    - Useful for identifying peak hours or availability patterns
    - Can be combined with other filters
- **Filter Combinations (Receptionist Perspective - MUST HAVE):**
  - **Multiple filters can be applied simultaneously:**
    - Employee + Day of Week + Hour of Day
    - Employee + Day of Week + Status
    - Day of Week + Hour of Day + Service Type
    - Any combination of available filters
  - Filters are combined with AND logic
  - Example combinations:
    - "Show all Monday appointments for Employee X between 2 PM - 4 PM"
    - "Show all Friday morning appointments (9 AM - 12 PM) for all employees"
    - "Show all Tuesday appointments for Service Y with Scheduled status"
- **Filter UI:**
  - Filter panel/sidebar (collapsible)
  - Active filter indicators (badges)
  - "Clear All Filters" button
  - Filter count display ("3 filters active")
  - **Receptionist-optimized filter layout:**
    - Group related filters together
    - Quick filter presets (e.g., "Monday Mornings", "Friday Afternoons")
    - Save filter combinations (future enhancement)
- **Filter Persistence:**
  - Filters persist across view changes (day/week/month)
  - Filters persist across page refresh (stored in URL or localStorage)
  - Reset filters button

### Search Appointments

**Purpose:** Search for specific appointments

**Specifications:**
- **Search Methods:**
  - **Search by Customer Name:**
    - Text input field
    - Real-time search as user types
    - Fuzzy matching (partial name matches)
    - Case-insensitive
    - Search across all appointments
  - **Search by Service Name:**
    - Text input field
    - Real-time search
    - Fuzzy matching
    - Case-insensitive
  - **Search by Service ID (MUST HAVE):**
    - Type service ID format (e.g., "M1", "P5", "E3")
    - Single letter shows all services in category
    - Letter + number shows specific service
    - Real-time filtering
    - See [Service ID Quick Filter](#service-id-quick-filter-req-cal-012---must-have) for detailed specifications
  - **Search by Phone Number (REQ-CAL-019):**
    - Search field accepts phone numbers
    - Partial phone number matching
    - Format-agnostic (accepts with/without dashes, spaces, parentheses)
    - Real-time search results
    - Show matching appointments
    - Highlight matching customer
    - Display customer name and phone number
    - Link to customer profile
  - **Search by Appointment ID:**
    - Text input field
    - Exact match or partial match
    - Format: "APT-12345" or just "12345"
- **Search Behavior:**
  - Real-time search results (as user types)
  - Debounce: Wait 300ms after user stops typing
  - Search across all visible appointments (respects current filters)
  - Search highlights matching text
- **Search Results:**
  - Highlight search matches in appointment cards
  - Show matching appointments in calendar
  - Display search result count
  - "Clear Search" button
- **Search UI:**
  - Search bar in calendar header
  - Search icon
  - Placeholder text: "Search by customer, service, service ID (M1, P5), or appointment ID..."
  - Active search indicator

### Service ID Quick Filter (REQ-CAL-012) - MUST HAVE

**Purpose:** Quickly filter services by typing service ID codes (e.g., M1, P5, E3)

**Specifications:**
- **Service ID Format:**
  - Letter prefix: Category code (M = Manicure, P = Pedicure, E = Eyelash, etc.)
  - Number suffix: Ordering number within category (1, 2, 3, etc.)
  - Examples:
    - "M1" = First service in Manicure category
    - "P5" = Fifth service in Pedicure category
    - "E3" = Third service in Eyelash category
- **Filtering Behavior:**
  - **Single Letter Input (e.g., "M"):**
    - Filters to show all services in that category
    - Displays services with their ordering numbers
    - Shows service list: "M1: Classic Manicure", "M2: French Manicure", etc.
  - **Letter + Number Input (e.g., "M1"):**
    - Filters to show exactly that service
    - Highlights the specific service
    - Shows appointments with that service only
- **Service ID Assignment:**
  - Each service category has a unique letter code
  - Services within category are numbered sequentially (1, 2, 3, ...)
  - Ordering numbers based on service creation order or manual ordering
  - Service IDs displayed in service list and filter dropdown
- **Service Filter Dropdown:**
  - **Polished, Fashionable Design:**
    - Well-designed, modern dropdown interface
    - Polished UI with professional styling
    - Clean, organized service list presentation
    - Visually appealing service cards or list items
    - Smooth animations and transitions
    - Professional typography and spacing
    - Clear visual hierarchy
  - **Service Selection Methods:**
    - **Type Number:** User types the number (e.g., type "1" to select M1, type "5" to select P5)
    - **Click Service:** User clicks on service name/item in dropdown to add to appointment
    - Both methods add the service to the appointment
    - Visual feedback on selection (highlight, checkmark, etc.)
  - **Filter Input Behavior:**
    - Service filter field accepts service ID format
    - Real-time filtering as user types
    - Case-insensitive (accepts "m1" or "M1")
    - Supports partial matching (typing "M" shows all Manicure services in dropdown)
    - Typing letter filters dropdown to show services in that category
    - Typing letter + number filters to specific service
    - Smooth filtering animations
- **Visual Display:**
  - **Service Dropdown Format:**
    - Service ID prominently displayed next to service name
    - Format: "M1 - Classic Manicure" or "M1: Classic Manicure"
    - Polished list showing filtered services with:
      - Service name clearly displayed
      - Service ID (e.g., M1, P5) as visual identifier
      - Service duration and price (if applicable)
      - Service category/type indicator
      - Hover states and active selection states
      - Professional styling and spacing
  - **Other Display Locations:**
    - Service ID displayed in appointment cards (optional)
    - Service ID shown in appointment details
- **Category Code Management:**
  - Category codes configurable in service management
  - Default codes: M (Manicure), P (Pedicure), E (Eyelash), W (Waxing), etc.
  - Admin can assign custom category codes
  - Prevent duplicate category codes
- **Use Cases:**
  - Receptionist quickly filters to "M1" appointments
  - Manager searches for all "P" (Pedicure) services
  - Quick appointment creation by typing service ID
  - Fast filtering during busy periods
- **Integration:**
  - Works with existing service filter
  - Can be combined with other filters (employee, date, status)
  - Service ID search works in appointment creation form
  - Service ID search works in calendar filter panel

**Rationale:** Critical for fast service filtering in busy environments. Receptionists and staff need quick access to specific services without scrolling through long lists. Significantly improves workflow efficiency and reduces time spent on filtering.

---

## Export and Printing Requirements

### Export Calendar to PDF (REQ-CAL-020)

**Purpose:** Export calendar view to PDF format

**Specifications:**
- **Export Options:**
  - **Date Range:**
    - Start date (required)
    - End date (required)
    - Default: Current view date range
  - **View Type:**
    - Day view
    - Week view
    - Month view
    - Default: Current view type
  - **Employee Filter:**
    - Include employee filter from current view
    - Option to export all employees or selected employees
  - **Include Details:**
    - Appointment details (customer, service, time)
    - Notes (optional)
    - Status indicators
- **PDF Format:**
  - Calendar grid/layout matching screen view
  - Appointment information clearly displayed
  - Color coding preserved (if color printer)
  - Page breaks at appropriate intervals
  - Header: Business name, date range, export date
  - Footer: Page numbers
- **Export Action:**
  - "Export PDF" button in calendar header
  - Opens export options dialog
  - "Export" button generates PDF
  - PDF downloads automatically
  - File name format: "Calendar_YYYY-MM-DD_to_YYYY-MM-DD.pdf"

### Export Appointments to CSV (REQ-CAL-020)

**Purpose:** Export appointment data to CSV format

**Specifications:**
- **Export Options:**
  - **Date Range:**
    - Start date (required)
    - End date (required)
    - Default: Current view date range
  - **Employee Filter:**
    - Include employee filter from current view
    - Option to export all employees or selected employees
  - **Status Filter:**
    - Include status filter from current view
    - Option to export all statuses or selected statuses
  - **Fields to Include:**
    - Checkboxes for each field:
      - Appointment ID
      - Date
      - Start Time
      - End Time
      - Customer Name
      - Customer Phone
      - Customer Email
      - Employee Name
      - Service(s)
      - Status
      - Notes
      - Booking Date
      - Last Modified
    - "Select All" / "Deselect All" buttons
- **CSV Format:**
  - Standard CSV format (comma-separated)
  - Header row with column names
  - Date format: YYYY-MM-DD
  - Time format: HH:MM (24-hour)
  - UTF-8 encoding
  - Proper escaping of special characters
- **Export Action:**
  - "Export CSV" button in calendar header
  - Opens export options dialog
  - "Export" button generates CSV
  - CSV downloads automatically
  - File name format: "Appointments_YYYY-MM-DD_to_YYYY-MM-DD.csv"

### Print Calendar View (REQ-CAL-020)

**Purpose:** Print calendar view directly from browser

**Specifications:**
- **Print View:**
  - Print-friendly layout (optimized for printing)
  - Remove interactive elements (buttons, filters)
  - Show calendar grid with appointments
  - Include business name and date range in header
  - Page breaks at appropriate intervals
  - Black and white friendly (if color not available)
- **Print Options:**
  - "Print" button in calendar header
  - Opens browser print dialog
  - User can configure print settings (margins, orientation, etc.)
- **Print CSS:**
  - Media query: `@media print`
  - Hide non-essential elements
  - Optimize layout for paper size
  - Ensure appointments are visible

---

## Suggested Additional Features

This section identifies potential features that may enhance the calendar system. These are recommendations based on industry best practices and common requirements for appointment management systems.

### MUST HAVE Features (Recommended)

#### ~~1. Appointment Check-In (REQ-CAL-016)~~ (REMOVED)

**Purpose:** Track when customers arrive for their appointments

**Specifications:**
- **Check-In Button:**
  - Visible in appointment details modal
  - Available when appointment status is SCHEDULED
  - Records check-in timestamp
  - Updates appointment status or adds check-in flag
- **Check-In Display:**
  - Show check-in time in appointment details
  - Visual indicator in calendar (e.g., checkmark icon)
  - Calculate wait time (check-in time vs appointment time)
- **Use Cases:**
  - Track customer punctuality
  - Monitor wait times
  - Identify no-shows more accurately
  - Improve customer service

**Rationale:** Essential for service businesses to track actual customer arrival times and manage wait times effectively.

*(Moved to main requirements: Customer History Quick View integrated into View Appointment Details, Appointment Duplicate/Copy as REQ-CAL-014, Past Appointment Restrictions integrated into Edit Appointment)*

#### ~~5. Appointment Duration Buffer/Setup Time (REQ-CAL-020)~~ (REMOVED)

**Purpose:** Account for time needed between appointments (cleanup, setup)

**Specifications:**
- **Buffer Configuration:**
  - Configurable buffer time between appointments (default: 5-15 minutes)
  - Can be set per service type or globally
  - Applied automatically when checking availability
- **Visual Display:**
  - Show buffer time in calendar (grayed out or different color)
  - Indicate unavailable time slots due to buffers
  - Display in appointment details (actual duration + buffer)
- **Availability Calculation:**
  - Consider buffer time when checking conflicts
  - Show available slots accounting for buffers
  - Prevent booking appointments too close together

**Rationale:** Critical for service businesses where setup/cleanup time is required between appointments. Prevents overbooking and ensures quality service.

*(Moved to main requirements: Appointment Service Duration Display integrated into Appointment Display, Appointment Conflict Resolution UI integrated into Edit Appointment, Appointment Search by Phone Number as REQ-CAL-019)*

### NICE TO HAVE Features (Recommended)

*(Moved to main requirements: Appointment Templates as REQ-CAL-015)*

#### ~~10. Appointment Tags/Labels (REQ-CAL-025)~~ (REMOVED)

**Purpose:** Categorize appointments with custom tags for better organization

**Specifications:**
- **Tag System:**
  - Create custom tags (e.g., "VIP", "First Time", "Special Request", "Rush")
  - Assign multiple tags to appointments
  - Color-coded tags
  - Filter by tags
- **Tag Display:**
  - Show tags in appointment card
  - Visual indicators (badges, icons)
  - Filter appointments by tags
- **Tag Management:**
  - Create, edit, delete tags
  - Tag colors configurable
  - Tag usage statistics

**Rationale:** Helps staff identify special appointments and organize calendar view. Useful for managing VIP customers or special requests.

*(Moved to main requirements: Appointment Notes Visibility Control integrated into Create Appointment form)*

#### ~~12. Walk-In Appointment Support (REQ-CAL-027)~~ (REMOVED)

**Purpose:** Mark appointments as walk-ins for reporting and analysis

**Specifications:**
- **Walk-In Flag:**
  - Checkbox or toggle in appointment form
  - Visual indicator in calendar (different icon/color)
  - Filter appointments by walk-in status
- **Walk-In Workflow:**
  - Create appointment with walk-in flag
  - May have different validation rules (can be in past)
  - Track walk-in statistics
- **Reporting:**
  - Count walk-ins vs scheduled appointments
  - Walk-in patterns (time of day, day of week)
  - Employee walk-in handling

**Rationale:** Many service businesses have walk-in customers. Tracking helps with capacity planning and employee scheduling.

#### ~~13. Appointment Restore (REQ-CAL-028)~~ (REMOVED)

**Purpose:** Restore cancelled appointments if customer rebooks

**Specifications:**
- **Restore Action:**
  - "Restore" button for cancelled appointments
  - Restores appointment to SCHEDULED status
  - Maintains original appointment data
  - Logs restore action in audit trail
- **Restore Workflow:**
  - Available for cancelled appointments only
  - Check for conflicts before restoring
  - Option to modify date/time during restore
  - Notify customer (optional)
- **Use Cases:**
  - Customer cancels then rebooks same appointment
  - Accidental cancellation
  - Change of mind

**Rationale:** Common scenario in service businesses. Saves time compared to creating new appointment.

*(Moved to main requirements: Appointment Statistics Dashboard as REQ-CAL-017, Holiday/Closed Day Management as REQ-CAL-018, Appointment Color Customization integrated into Appointment Display, Appointment Audit Trail Viewing as REQ-CAL-013, Appointment Quick Actions Menu integrated into Appointment Display, Appointment Time Rounding as REQ-CAL-016)*

#### ~~20. Appointment Customer Photo Display (REQ-CAL-035)~~ (REMOVED)

**Purpose:** Show customer photos in calendar for quick identification

**Specifications:**
- **Photo Display:**
  - Small thumbnail in appointment card
  - Full photo in appointment details
  - Fallback to initials/avatar if no photo
- **Photo Management:**
  - Upload photo when creating customer
  - Update photo in customer profile
  - Privacy controls (optional)
- **Use Cases:**
  - Quick customer identification
  - Personal touch
  - Helps staff remember customers

**Rationale:** Improves customer recognition and service quality. Common in modern appointment systems.

---

## User Workflows

### Workflow 1: View Calendar and Navigate

**Actor:** Manager

**Steps:**
1. User logs into dashboard
2. Navigates to Calendar section
3. Calendar displays in default view (Week view, current week)
4. User switches to Day view using view switcher
5. User clicks "Next Day" to view tomorrow's appointments
6. User clicks "Today" to return to current date
7. User uses date picker to jump to specific date
8. User switches to Month view to see monthly overview
9. User clicks on a day in month view to switch to day view for that date

**Success Criteria:**
- Calendar displays correctly in all views
- Navigation works smoothly
- Current date/time is clearly indicated

### Workflow 2: Create New Appointment

**Actor:** Manager

**Steps:**
1. User views calendar in Day view
2. User clicks on available time slot (e.g., 2:00 PM)
3. Appointment creation form opens with time pre-filled
4. User searches for customer in customer field
5. User selects customer from dropdown
6. User selects employee from employee dropdown
7. User selects service(s) from service multi-select
8. System calculates total duration and shows available time
9. User adds optional notes
10. User clicks "Save" button
11. System validates appointment (checks conflicts)
12. If no conflicts: Appointment is created and appears in calendar
13. If conflicts: Warning displayed, user can override or cancel

**Success Criteria:**
- Appointment created successfully
- Appointment appears in calendar immediately
- Conflicts are detected and warned
- Customer can be notified (optional)

### Workflow 3: Edit Existing Appointment

**Actor:** Manager

**Steps:**
1. User views calendar
2. User clicks on appointment in calendar
3. Appointment details modal opens
4. User clicks "Edit" button
5. Edit form opens with current appointment data
6. User changes employee assignment
7. System checks new employee's availability
8. If available: Change is allowed
9. If conflict: Warning displayed
10. User changes appointment time
11. System validates new time slot
12. User updates notes
13. User clicks "Save" button
14. Confirmation dialog appears
15. User confirms changes
16. Appointment is updated in calendar
17. Customer is notified (if notification option checked)

**Success Criteria:**
- Appointment updated successfully
- Changes reflected in calendar immediately
- Conflicts are detected
- Customer notification sent (if requested)

### Workflow 4: Filter and Search Appointments

**Actor:** Manager

**Steps:**
1. User views calendar
2. User opens filter panel
3. User selects employee from employee filter
4. Calendar updates to show only that employee's appointments
5. User selects date range (last 7 days)
6. Calendar updates to show appointments in date range
7. User selects status filter (Scheduled and Completed)
8. Calendar updates to show only appointments with selected statuses
9. User types customer name in search field
10. Calendar highlights matching appointments
11. User clicks "Clear All Filters" button
12. Calendar resets to show all appointments

**Success Criteria:**
- Filters work correctly
- Multiple filters can be combined
- Search works in real-time
- Filters can be cleared easily

### Workflow 5: Change Appointment Status

**Actor:** Manager

**Steps:**
1. User views calendar
2. User clicks on appointment
3. Appointment details modal opens
4. User clicks "Change Status" button
5. Status change form opens
6. User selects new status (e.g., COMPLETED)
7. User enters optional reason
8. User checks "Notify customer" checkbox
9. User clicks "Save" button
10. Confirmation dialog appears
11. User confirms status change
12. Appointment status is updated
13. Status change is logged in audit trail
14. Customer is notified (if requested)
15. Calendar updates to show new status color

**Success Criteria:**
- Status changed successfully
- Status change logged
- Calendar reflects new status
- Customer notified (if requested)

### Workflow 6: Export Calendar

**Actor:** Owner

**Steps:**
1. User views calendar in Week view
2. User applies employee filter (selects specific employee)
3. User clicks "Export PDF" button
4. Export options dialog opens
5. User confirms date range (pre-filled from current view)
6. User confirms view type (Week view)
7. User confirms employee filter (selected employee)
8. User clicks "Export" button
9. PDF is generated
10. PDF downloads automatically
11. User opens PDF to verify content

**Success Criteria:**
- PDF generated successfully
- PDF contains correct calendar view
- PDF includes appointment details
- PDF is properly formatted

---

## Technical Constraints

### Performance Requirements

- **Calendar Load Time:**
  - Initial calendar load: < 2 seconds
  - View switch (day/week/month): < 1 second
  - Filter application: < 500ms
  - Search results: < 300ms (debounced)

- **Data Limits:**
  - Support up to 1000 appointments per month
  - Support up to 20 employees
  - Support date ranges up to 1 year
  - Pagination for large result sets (future enhancement)

- **Real-Time Updates:**
  - Polling interval: 30 seconds (configurable)
  - WebSocket support (future enhancement)

### Browser Compatibility

- **Supported Browsers:**
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)

- **Mobile Support:**
  - Responsive design required
  - Touch-friendly interactions
  - Mobile-optimized calendar views

### Data Requirements

- **Appointment Data:**
  - Stored in PostgreSQL database
  - Shared with booking system (same database)
  - Real-time consistency (no sync needed)

- **Employee Data:**
  - Retrieved from employee management system
  - Cached for performance
  - Updated when employee data changes

### Security Requirements

- **Authentication:**
  - All calendar endpoints require authentication
  - JWT token validation
  - Session management

- **Authorization:**
  - Role-based access control (RBAC)
  - Permission checks for all actions
  - Employee role: View-only access

- **Data Privacy:**
  - Customer data protected
  - Appointment data access logged
  - Audit trail for all changes

### Integration Constraints

- **Booking System:**
  - Shared database (no API calls needed)
  - Real-time consistency
  - Conflict detection required

- **Employee Management:**
  - API integration for employee data
  - Employee availability (basic, from appointments only)

- **Metrics:**
  - Shared database queries
  - Real-time updates
  - Historical data support

---

## Glossary

### Terms and Definitions

**Appointment**
- A scheduled service booking for a customer with a specific employee at a specific date and time.

**Time Slot**
- A specific time period (e.g., 2:00 PM - 2:30 PM) within business hours that can be booked for an appointment.

**Business Hours**
- The operating hours of the salon (e.g., 9:00 AM - 7:00 PM) during which appointments can be scheduled.

**Status**
- The current state of an appointment (Scheduled, Completed, Cancelled, No-Show).

**Conflict**
- A situation where two appointments overlap in time for the same employee, or other scheduling conflicts occur.

**Employee Color Coding**
- Visual system where each employee is assigned a unique color used to identify their appointments in the calendar.

**Soft Delete**
- Marking an appointment as cancelled or deleted while keeping it in the database for historical records.

**Hard Delete**
- Permanently removing an appointment from the database.

**Audit Trail**
- A log of all changes made to appointments, including who made the change, when, and what was changed.

**Filter**
- A criterion used to narrow down the appointments displayed in the calendar (e.g., by employee, status, date range).

**Export**
- Generating a file (PDF or CSV) containing calendar or appointment data for external use.

**Real-Time Updates**
- Automatic refresh of calendar data when new appointments are created or existing appointments are modified.

**Polling**
- A mechanism where the system periodically checks for updates (e.g., every 30 seconds).

**WebSocket**
- A communication protocol that enables real-time, bidirectional data transfer between client and server (future enhancement).

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-24 | System | Initial requirements document created |
| 1.1 | 2025-01-24 | System | Updated with MUST HAVE features: drag-and-drop rescheduling, month view improvements, receptionist filtering (day of week, hour of day), employee-based calendar with columns and drag-drop, time slot default changed to 15 minutes. Added booking system note. |
| 1.2 | 2025-01-24 | System | Added Receptionist/Cashier role definition with full appointment management permissions and filtering capabilities. |
| 1.3 | 2025-01-24 | System | Added "Suggested Additional Features" section with 20 recommended features (8 MUST HAVE, 12 NICE TO HAVE) including appointment check-in, customer history, duplicate/copy, past appointment restrictions, duration buffers, conflict resolution UI, and more. |
| 1.4 | 2025-01-24 | System | Added Service ID Quick Filter (REQ-CAL-036) as MUST HAVE feature. Allows quick filtering by typing service ID codes (e.g., M1, P5, E3). Single letter shows all services in category, letter+number shows specific service. Updated filtering and search sections to reference this feature. |
| 1.5 | 2025-01-24 | System | Moved Service ID Quick Filter from Suggested Additional Features to main Filtering and Search Requirements section as REQ-CAL-012. Updated all references to point to new location. |
| 1.6 | 2025-01-24 | System | Removed 6 features from Suggested Additional Features (crossed out): Appointment Check-In, Appointment Duration Buffer, Appointment Tags, Walk-In Appointment Support, Appointment Restore, Appointment Customer Photo Display. Moved all remaining suggested features to main requirements sections: Customer History Quick View, Appointment Duplicate/Copy (REQ-CAL-014), Past Appointment Restrictions, Appointment Service Duration Display, Appointment Conflict Resolution UI, Appointment Search by Phone Number (REQ-CAL-019), Appointment Templates (REQ-CAL-015), Appointment Notes Visibility Control, Appointment Statistics Dashboard (REQ-CAL-017), Holiday/Closed Day Management (REQ-CAL-018), Appointment Color Customization, Appointment Audit Trail Viewing (REQ-CAL-013), Appointment Quick Actions Menu, Appointment Time Rounding (REQ-CAL-016). Updated requirement numbering. |

---

**End of Document**

