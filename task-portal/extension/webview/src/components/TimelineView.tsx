import { useMemo, useState } from 'react';

interface Task {
    id: string;
    title: string;
    status: string;
    priority?: string;
    category: string;
    created?: string;
    updated?: string;
    estimate?: string;
    dependencies?: string[];
}

interface Props {
    tasks: Task[];
    onTaskClick: (taskId: string) => void;
}

// Calculate task timeline data
function calculateTaskTimeline(task: Task) {
    const created = task.created ? new Date(task.created) : new Date();

    // Parse estimate (e.g., "6-8 hours", "2 hours", "1 hour")
    let durationDays = 1; // Default 1 day
    if (task.estimate) {
        const match = task.estimate.match(/(\d+)(?:-(\d+))?\s*(hour|day)/i);
        if (match) {
            const value = parseInt(match[2] || match[1]);
            const unit = match[3].toLowerCase();
            durationDays = unit === 'hour' ? Math.max(1, Math.ceil(value / 8)) : value;
        }
    }

    const start = created;
    const end = new Date(start);
    end.setDate(end.getDate() + durationDays);

    return { start, end, durationDays };
}

export function TimelineView({ tasks, onTaskClick }: Props) {
    const [zoom, setZoom] = useState<'day' | 'week' | 'month'>('week');
    const [filterStatus, setFilterStatus] = useState<string>('');

    // Calculate timeline bounds and task positions
    const timelineData = useMemo(() => {
        if (tasks.length === 0) return null;

        const taskTimelines = tasks.map(task => ({
            task,
            ...calculateTaskTimeline(task)
        }));

        // Find overall date range
        const allDates = taskTimelines.flatMap(t => [t.start, t.end]);
        const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
        const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

        // Add padding
        minDate.setDate(minDate.getDate() - 7);
        maxDate.setDate(maxDate.getDate() + 7);

        const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));

        return {
            taskTimelines,
            minDate,
            maxDate,
            totalDays
        };
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        if (!timelineData) return [];
        return timelineData.taskTimelines.filter(t =>
            !filterStatus || t.task.status === filterStatus
        );
    }, [timelineData, filterStatus]);

    if (!timelineData || filteredTasks.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-vscode-foreground/60">
                No tasks to display in timeline view
            </div>
        );
    }

    const { minDate, totalDays } = timelineData;
    const dayWidth = zoom === 'day' ? 40 : zoom === 'week' ? 20 : 10;
    const timelineWidth = totalDays * dayWidth;
    const rowHeight = 40;

    // Calculate position for a date
    const getPosition = (date: Date) => {
        const dayOffset = Math.floor((date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
        return dayOffset * dayWidth;
    };

    // Get status color
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'PENDING': '#3B82F6',
            'IN_PROGRESS': '#F59E0B',
            'BLOCKED': '#EF4444',
            'COMPLETED': '#10B981',
            'CANCELLED': '#6B7280'
        };
        return colors[status] || '#6B7280';
    };

    // Format date for display
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Generate time markers
    const timeMarkers = useMemo(() => {
        const markers = [];
        const markerInterval = zoom === 'day' ? 1 : zoom === 'week' ? 7 : 30;

        for (let i = 0; i < totalDays; i += markerInterval) {
            const date = new Date(minDate);
            date.setDate(date.getDate() + i);
            markers.push({
                position: i * dayWidth,
                label: formatDate(date)
            });
        }

        return markers;
    }, [minDate, totalDays, dayWidth, zoom]);

    // Find task dependencies
    const getDependencyLines = useMemo(() => {
        const lines: Array<{ from: number; to: number; fromX: number; toX: number }> = [];

        filteredTasks.forEach((taskTimeline, index) => {
            const deps = taskTimeline.task.dependencies || [];
            deps.forEach(depId => {
                const depIndex = filteredTasks.findIndex(t => t.task.id === depId);
                if (depIndex !== -1) {
                    const fromX = getPosition(filteredTasks[depIndex].end);
                    const toX = getPosition(taskTimeline.start);
                    lines.push({
                        from: depIndex,
                        to: index,
                        fromX,
                        toX
                    });
                }
            });
        });

        return lines;
    }, [filteredTasks, minDate, dayWidth]);

    return (
        <div className="h-full flex flex-col bg-vscode-editor-background">
            {/* Header Controls */}
            <div className="flex items-center justify-between p-4 border-b border-vscode-foreground/20">
                <h2 className="text-lg font-semibold text-vscode-foreground">Timeline View</h2>

                <div className="flex items-center gap-4">
                    {/* Zoom Control */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-vscode-foreground">Zoom:</label>
                        <select
                            value={zoom}
                            onChange={(e) => setZoom(e.target.value as any)}
                            className="px-2 py-1 bg-vscode-input-background border border-vscode-input-border text-vscode-input-foreground rounded"
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-vscode-foreground">Status:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-2 py-1 bg-vscode-input-background border border-vscode-input-border text-vscode-input-foreground rounded"
                        >
                            <option value="">All</option>
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="BLOCKED">Blocked</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Timeline Container */}
            <div className="flex-1 overflow-auto">
                <div className="relative" style={{ width: `${timelineWidth + 200}px`, minHeight: `${filteredTasks.length * rowHeight + 100}px` }}>
                    {/* Time Markers */}
                    <div className="sticky top-0 z-10 h-12 bg-vscode-editor-background border-b border-vscode-foreground/20">
                        {timeMarkers.map((marker, i) => (
                            <div
                                key={i}
                                className="absolute text-xs text-vscode-foreground/60"
                                style={{ left: `${200 + marker.position}px`, top: '12px' }}
                            >
                                {marker.label}
                            </div>
                        ))}
                    </div>

                    {/* SVG for dependency lines */}
                    <svg
                        className="absolute pointer-events-none"
                        style={{ left: '200px', top: '48px', width: `${timelineWidth}px`, height: `${filteredTasks.length * rowHeight}px` }}
                    >
                        {getDependencyLines.map((line, i) => {
                            const y1 = line.from * rowHeight + rowHeight / 2;
                            const y2 = line.to * rowHeight + rowHeight / 2;
                            const midY = (y1 + y2) / 2;

                            return (
                                <g key={i}>
                                    <path
                                        d={`M ${line.fromX} ${y1} L ${line.fromX + 10} ${y1} L ${line.fromX + 10} ${midY} L ${line.toX - 10} ${midY} L ${line.toX - 10} ${y2} L ${line.toX} ${y2}`}
                                        stroke="#6B7280"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeDasharray="4,2"
                                    />
                                    {/* Arrow head */}
                                    <polygon
                                        points={`${line.toX},${y2} ${line.toX - 6},${y2 - 4} ${line.toX - 6},${y2 + 4}`}
                                        fill="#6B7280"
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Task Rows */}
                    {filteredTasks.map((taskTimeline, index) => {
                        const task = taskTimeline.task;
                        const startX = getPosition(taskTimeline.start);
                        const endX = getPosition(taskTimeline.end);
                        const barWidth = Math.max(endX - startX, 20);
                        const color = getStatusColor(task.status);

                        return (
                            <div
                                key={task.id}
                                className="absolute flex items-center"
                                style={{ top: `${48 + index * rowHeight}px`, height: `${rowHeight}px`, left: 0, right: 0 }}
                            >
                                {/* Task Label */}
                                <div
                                    className="w-48 px-2 truncate text-sm text-vscode-foreground cursor-pointer hover:underline"
                                    onClick={() => onTaskClick(task.id)}
                                    title={task.title}
                                >
                                    <span className="font-mono text-xs text-vscode-foreground/60">{task.id}</span>
                                    {' '}
                                    <span>{task.title}</span>
                                </div>

                                {/* Task Bar */}
                                <div
                                    className="absolute h-6 rounded cursor-pointer transition-all hover:opacity-80 hover:h-7"
                                    style={{
                                        left: `${200 + startX}px`,
                                        width: `${barWidth}px`,
                                        backgroundColor: color + '40',
                                        border: `2px solid ${color}`
                                    }}
                                    onClick={() => onTaskClick(task.id)}
                                    title={`${task.id}: ${task.title}\n${formatDate(taskTimeline.start)} - ${formatDate(taskTimeline.end)}\nDuration: ${taskTimeline.durationDays} days`}
                                >
                                    <div
                                        className="h-full flex items-center px-2 text-xs font-medium truncate"
                                        style={{ color }}
                                    >
                                        {task.id}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Today Marker */}
                    {(() => {
                        const todayX = getPosition(new Date());
                        if (todayX >= 0 && todayX <= timelineWidth) {
                            return (
                                <div
                                    className="absolute top-12 bottom-0 w-0.5 bg-red-500 pointer-events-none"
                                    style={{ left: `${200 + todayX}px` }}
                                >
                                    <div className="absolute -top-12 -left-6 px-2 py-1 bg-red-500 text-white text-xs rounded">
                                        Today
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })()}
                </div>
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-vscode-foreground/20 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3B82F640', border: '2px solid #3B82F6' }}></div>
                    <span className="text-vscode-foreground/80">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B40', border: '2px solid #F59E0B' }}></div>
                    <span className="text-vscode-foreground/80">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF444440', border: '2px solid #EF4444' }}></div>
                    <span className="text-vscode-foreground/80">Blocked</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B98140', border: '2px solid #10B981' }}></div>
                    <span className="text-vscode-foreground/80">Completed</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <svg width="40" height="16">
                        <path d="M 0 8 L 40 8" stroke="#6B7280" strokeWidth="2" strokeDasharray="4,2" fill="none" />
                        <polygon points="40,8 34,4 34,12" fill="#6B7280" />
                    </svg>
                    <span className="text-vscode-foreground/80">Dependency</span>
                </div>
            </div>
        </div>
    );
}
