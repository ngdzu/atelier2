import React, { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { useKanban } from '../hooks/useKanban';
import type { Task } from '../types';

interface KanbanBoardProps {
    tasks: Task[];
    onCopyId?: (taskId: string) => void;
    onOpenInEditor?: (task: Task) => void;
}

const STATUS_CONFIG = [
    { key: 'PENDING', title: 'Pending', color: '#3B82F6' },
    { key: 'IN-PROGRESS', title: 'In Progress', color: '#F59E0B' },
    { key: 'BLOCKED', title: 'Blocked', color: '#EF4444' },
    { key: 'COMPLETED', title: 'Completed', color: '#10B981' },
    { key: 'CANCELLED', title: 'Cancelled', color: '#6B7280' },
] as const;

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onCopyId, onOpenInEditor }) => {
    const columns = useKanban(tasks);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const task = tasks.find(t => t.id === active.id);
        if (task) {
            setActiveTask(task);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as string;

        // Find the task
        const task = tasks.find(t => t.id === taskId);
        if (!task || task.status === newStatus) return;

        // Send message to extension to update task status
        if (window.vscode) {
            window.vscode.postMessage({
                type: 'updateTaskStatus',
                taskId,
                newStatus,
            });
        }
    };

    return (
        <div className="h-full overflow-auto">
            <div className="p-4">
                <h2 className="text-xl font-bold text-[var(--vscode-editor-foreground)] mb-4">
                    Kanban Board
                </h2>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-4 pb-4 overflow-x-auto">
                        {STATUS_CONFIG.map(({ key, title, color }) => (
                            <KanbanColumn
                                key={key}
                                status={key}
                                title={title}
                                color={color}
                                tasks={columns[key as keyof typeof columns]}
                                onCopyId={onCopyId}
                                onOpenInEditor={onOpenInEditor}
                            />
                        ))}
                    </div>

                    <DragOverlay>
                        {activeTask ? (
                            <div className="cursor-grabbing">
                                <TaskCard task={activeTask} />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default KanbanBoard;
