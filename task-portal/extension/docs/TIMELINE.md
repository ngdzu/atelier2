# Timeline View Documentation

## Overview

The Timeline View provides a Gantt chart-style visualization of tasks, showing them along a time axis with their durations and dependencies. This view is ideal for understanding project scheduling and task relationships at a glance.

## Features

### Timeline Visualization
- **Task Bars**: Each task is displayed as a colored horizontal bar
- **Time Scale**: Adjustable zoom levels (day/week/month view)
- **Date Positioning**: Tasks positioned based on their creation date
- **Duration**: Bar length represents task duration (calculated from estimate)

### Dependency Tracking
- **Visual Arrows**: SVG arrows connect dependent tasks
- **Clear Flow**: Curved paths with arrowheads show task relationships
- **Logical Connections**: Arrows point from dependency to dependent task

### Interactive Features
- **Click Tasks**: Click any task bar to open it in the editor
- **Hover Tooltips**: Hover over tasks to see details
- **Zoom Controls**: Switch between day, week, and month views
- **Status Filter**: Filter tasks by status (PENDING, IN PROGRESS, COMPLETED, etc.)

### Visual Design
- **Color Coding**: Tasks colored by status
  - COMPLETED: Green (#10B981)
  - IN PROGRESS: Blue (#3B82F6)
  - PENDING: Gray (#6B7280)
  - BLOCKED: Red (#EF4444)
- **Today Marker**: Red vertical line shows current date
- **Time Markers**: Sticky header shows dates at regular intervals
- **Legend**: Visual guide explaining colors and symbols

## How It Works

### Timeline Calculation

The timeline automatically calculates task schedules using existing task data:

1. **Start Date**: Uses task creation date (`created` field)
2. **Duration**: Parses the `estimate` field
   - "6-8 hours" → 1 day (takes max value, converts hours to days)
   - "2 days" → 2 days
   - Default: 1 day if no estimate
3. **End Date**: Calculated as start date + duration

### Example
```
Task: "Implement login feature"
Created: 2025-12-21
Estimate: "6-8 hours"

Timeline Calculation:
- Start: 2025-12-21
- Duration: 8 hours / 8 = 1 day
- End: 2025-12-22
```

### Zoom Levels

The timeline supports three zoom levels:

- **Day View**: 40 pixels per day - detailed view for short-term planning
- **Week View**: 20 pixels per day - balanced view (default)
- **Month View**: 10 pixels per day - high-level overview for long projects

### Dependency Visualization

Dependencies (specified in the `dependencies` field) are visualized as SVG arrows:

```
Task A (TASK-001) ──────> Task B (TASK-002)
         dependency          dependent
```

- **Dashed Line**: Indicates dependency relationship
- **Arrowhead**: Points to the dependent task
- **Curved Path**: Makes multiple dependencies easier to follow

## Usage

### Accessing Timeline View

1. Open the Task Portal webview
2. Click the **Timeline** button in the navigation bar
3. The timeline will display all tasks from your task files

### Navigating the Timeline

**Zoom In/Out**:
- Use the zoom selector dropdown in the header
- Choose "Day", "Week", or "Month" view

**Filter Tasks**:
- Use the status filter dropdown
- Select a specific status to show only those tasks
- Choose "All Tasks" to show everything

**View Task Details**:
- Click on any task bar
- The task file will open in the editor
- The editor will scroll to the task definition

**Scroll Timeline**:
- Use horizontal scrollbar to navigate through time
- Timeline automatically sizes based on task date range

## Technical Implementation

### Component Structure

```
TimelineView.tsx
├── Header (zoom + filter controls)
├── Timeline Container
│   ├── Time Markers (sticky header with dates)
│   ├── SVG Layer (dependency arrows)
│   ├── Task Rows
│   │   ├── Task Label (ID + title)
│   │   └── Task Bar (positioned, sized, colored)
│   ├── Today Marker (red vertical line)
│   └── Legend (color + symbol guide)
```

### Key Functions

**calculateTaskTimeline(task)**
- Parses task estimate field
- Calculates start, end, and duration
- Returns timeline data for positioning

**getPosition(date)**
- Converts date to pixel position
- Accounts for current zoom level
- Used for positioning bars and markers

**getDependencyLines()**
- Finds all task dependencies
- Calculates arrow coordinates
- Returns SVG path data for rendering

### Performance Optimizations

- **Memoization**: Timeline data calculated once with `useMemo`
- **Efficient Filtering**: Filtered tasks cached to avoid recalculation
- **Minimal Re-renders**: Component only updates when tasks or filters change

## Limitations

### Current Scope
The Timeline View is a **read-only visualization** focused on project overview and navigation. It does not support:

- Dragging tasks to change dates
- Resizing bars to change duration
- Creating dependencies via drag-and-drop
- Editing task properties directly
- Milestone visualization
- Critical path calculation

These features were intentionally omitted to keep development time under 3 hours while delivering core value.

### Future Enhancements
Potential improvements for future versions:

1. **Interactive Editing**:
   - Drag tasks to update dates
   - Resize bars to change estimates
   - Create dependencies visually

2. **Advanced Features**:
   - Milestone markers
   - Critical path highlighting
   - Baseline comparisons
   - Resource allocation view

3. **Additional Filters**:
   - Category filter
   - Assignee filter
   - Priority filter
   - Date range selector

4. **Export Options**:
   - Export as PNG/SVG
   - Print timeline
   - Share as link

## Troubleshooting

### Tasks Not Appearing
- **Check task status**: Use filter dropdown to show all statuses
- **Verify date range**: Timeline shows tasks within calculated date range
- **Check task data**: Ensure tasks have valid `created` dates

### Dependencies Not Showing
- **Verify dependencies field**: Check task file has `dependencies: [TASK-ID]`
- **Check visibility**: Both dependency and dependent task must be visible
- **Dependency format**: Must match exact task ID (e.g., "TASK-001")

### Timeline Too Wide/Narrow
- **Adjust zoom**: Use zoom selector to change scale
- **Check estimate values**: Very long estimates create wide timelines
- **Date range**: Timeline sized to fit all tasks with 7-day padding

### Colors Look Wrong
- **VS Code theme**: Timeline uses VS Code theme variables
- **Status values**: Verify task status is a recognized value
- **Custom statuses**: May appear with default gray color

## Examples

### Viewing Project Timeline
```
1. Open Task Portal
2. Click "Timeline" button
3. Select "Week" zoom for balanced view
4. Scroll to see full project timeline
5. Click task bars to view details
```

### Tracking Dependencies
```
1. Open Timeline View
2. Look for dashed arrows between tasks
3. Follow arrows to see task relationships
4. Identify blocked tasks (waiting on dependencies)
5. Plan work based on dependency chain
```

### Filtering by Status
```
1. In Timeline View header
2. Click "Status Filter" dropdown
3. Select "IN PROGRESS"
4. Timeline shows only in-progress tasks
5. View what's actively being worked on
```

## Summary

The Timeline View provides a powerful visual overview of your project schedule, making it easy to understand task durations, dependencies, and overall project structure. While it's currently read-only, it significantly enhances project planning and tracking capabilities within the Task Portal.

For questions or feature requests, please refer to the main Task Portal documentation or create an issue in the repository.
