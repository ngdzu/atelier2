import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';
import type { Task } from '../types';

interface SortableTaskCardProps {
    task: Task;
    onCopyId?: (taskId: string) => void;
    onOpenInEditor?: (task: Task) => void;
}

export const SortableTaskCard: React.FC<SortableTaskCardProps> = ({ task, onCopyId, onOpenInEditor }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard
                task={task}
                showActions={true}
                onCopyId={onCopyId}
                onOpenInEditor={onOpenInEditor}
            />
        </div>
    );
};

export default SortableTaskCard;
