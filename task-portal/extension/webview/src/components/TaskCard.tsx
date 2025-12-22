import React from 'react';
import type { Task } from '../types';
import { ProgressBar } from './ProgressBar';

interface TaskCardProps {
    task: Task;
    showActions?: boolean;
    onCopyId?: (taskId: string) => void;
    onOpenInEditor?: (task: Task) => void;
}

const PRIORITY_COLORS = {
    CRITICAL: '#DC2626',
    HIGH: '#F59E0B',
    MEDIUM: '#FBBF24',
    LOW: '#10B981',
} as const;

const STATUS_COLORS = {
    PENDING: '#3B82F6',
    'IN-PROGRESS': '#F59E0B',
    COMPLETED: '#10B981',
    BLOCKED: '#EF4444',
    CANCELLED: '#6B7280',
} as const;

export const TaskCard: React.FC<TaskCardProps> = ({ task, showActions = false, onCopyId, onOpenInEditor }) => {
    const priorityColor = task.priority ? PRIORITY_COLORS[task.priority as keyof typeof PRIORITY_COLORS] : '#9CA3AF';
    const statusColor = task.status ? STATUS_COLORS[task.status as keyof typeof STATUS_COLORS] : '#6B7280';

    // Truncate title if too long
    const displayTitle = task.title.length > 60 ? task.title.substring(0, 57) + '...' : task.title;

    const handleCopyId = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onCopyId) {
            onCopyId(task.id);
        }
    };

    const handleOpenInEditor = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onOpenInEditor) {
            onOpenInEditor(task);
        }
    };

    return (
        <div
            className="bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] rounded-md p-3 mb-2 cursor-move hover:shadow-md transition-shadow group relative"
            style={{ borderLeftWidth: '3px', borderLeftColor: statusColor }}
        >
            {/* Quick Actions - Show on hover */}
            {showActions && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                        onClick={handleCopyId}
                        className="p-1 text-xs bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] rounded hover:bg-[var(--vscode-button-hoverBackground)]"
                        title="Copy Task ID"
                    >
                        📋
                    </button>
                    {task.file && (
                        <button
                            onClick={handleOpenInEditor}
                            className="p-1 text-xs bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] rounded hover:bg-[var(--vscode-button-hoverBackground)]"
                            title="Open in Editor"
                        >
                            📝
                        </button>
                    )}
                </div>
            )}
            {/* Task ID and Priority */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[var(--vscode-descriptionForeground)]">
                    {task.id}
                </span>
                {task.priority && (
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: priorityColor }}
                        title={task.priority}
                    />
                )}
            </div>

            {/* Task Title */}
            <h3 className="text-sm font-medium text-[var(--vscode-editor-foreground)] mb-2 leading-tight">
                {displayTitle}
            </h3>

            {/* Category Badge */}
            {task.category && (
                <div className="flex items-center gap-2">
                    <span
                        className="inline-block text-xs px-2 py-0.5 rounded-full"
                        style={{
                            backgroundColor: 'var(--vscode-badge-background)',
                            color: 'var(--vscode-badge-foreground)',
                        }}
                    >
                        {task.category}
                    </span>
                </div>
            )}

            {/* Assignee (if exists) */}
            {task.assignee && task.assignee !== 'unassigned' && (
                <div className="mt-2 text-xs text-[var(--vscode-descriptionForeground)]">
                    👤 {task.assignee}
                </div>
            )}

            {/* Progress Bar */}
            {task.progress && (
                <div className="mt-2">
                    <ProgressBar percentage={task.progress.percentage} size="small" showLabel={true} />
                </div>
            )}
        </div>
    );
};

export default TaskCard;
