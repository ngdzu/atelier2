# Calendar and Appointment Viewing - Detailed Requirements

**Document Version:** 1.2  
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
8. [User Workflows](#user-workflows)
9. [Technical Constraints](#technical-constraints)
10. [Glossary](#glossary)

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
- **REQ-CAL-001** through **REQ-CAL-015**: Calendar Interface, Appointment Management, Filtering, Integration, Export

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
- **Conflict Detection:**
  - Real-time conflict checking as user edits
  - Display conflict warnings:
    - "Employee has another appointment at this time"
    - "Time slot overlaps with existing appointment"
  - Show conflicting appointment details
  - Allow user to proceed with override (role-based)
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
    - Multi-select dropdown
    - Show main services and add-ons
    - Display service duration and price
    - Calculate total duration automatically
    - Required field (at least one service)
  - **Date and Time:**
    - Date picker (pre-filled if clicked from time slot)
    - Time picker (pre-filled if clicked from time slot)
    - Show available time slots for selected employee and date
    - Required fields
  - **Notes:**
    - Text area for appointment notes
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

### Integration with Booking System (REQ-CAL-012)

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

### Integration with Employee Management (REQ-CAL-013)

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

### Integration with Metrics (REQ-CAL-014)

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

### Filter Appointments (REQ-CAL-010)

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

### Search Appointments (REQ-CAL-011)

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
  - Placeholder text: "Search by customer, service, or ID..."
  - Active search indicator

---

## Export and Printing Requirements

### Export Calendar to PDF (REQ-CAL-015)

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

### Export Appointments to CSV (REQ-CAL-015)

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

### Print Calendar View (REQ-CAL-015)

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

---

**End of Document**

