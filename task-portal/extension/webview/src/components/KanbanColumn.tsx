import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskCard } from './SortableTaskCard';
import type { Task } from '../types';

interface KanbanColumnProps {
    status: string;
    tasks: Task[];
    title: string;
    color: string;
    onCopyId?: (taskId: string) => void;
    onOpenInEditor?: (task: Task) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks, title, color, onCopyId, onOpenInEditor }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    return (
        <div className="flex flex-col min-w-[280px] max-w-[320px] flex-shrink-0">
            {/* Column Header */}
            <div
                className="rounded-t-md px-4 py-3 font-semibold text-sm flex items-center justify-between"
                style={{
                    backgroundColor: color,
                    color: '#FFFFFF',
                }}
            >
                <span>{title}</span>
                <span className="bg-white bg-opacity-30 px-2 py-0.5 rounded-full text-xs">
                    {tasks.length}
                </span>
            </div>

            {/* Column Content (Drop Zone) */}
            <div
                ref={setNodeRef}
                className={`flex-1 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-panel-border)] border-t-0 rounded-b-md p-3 min-h-[400px] transition-colors ${isOver ? 'bg-[var(--vscode-list-hoverBackground)]' : ''
                    }`}
            >
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.length === 0 ? (
                        <div className="text-center text-[var(--vscode-descriptionForeground)] text-sm mt-8">
                            No tasks
                        </div>
                    ) : (
                        tasks.map(task => (
                            <SortableTaskCard
                                key={task.id}
                                task={task}
                                onCopyId={onCopyId}
                                onOpenInEditor={onOpenInEditor}
                            />
                        ))
                    )}
                </SortableContext>
            </div>
        </div>
    );
};

export default KanbanColumn;
