import { useMemo } from 'react';
import type { Task } from '../types';

export interface KanbanColumns {
    PENDING: Task[];
    'IN-PROGRESS': Task[];
    BLOCKED: Task[];
    COMPLETED: Task[];
    CANCELLED: Task[];
}

export const useKanban = (tasks: Task[]): KanbanColumns => {
    const columns = useMemo(() => {
        const result: KanbanColumns = {
            PENDING: [],
            'IN-PROGRESS': [],
            BLOCKED: [],
            COMPLETED: [],
            CANCELLED: [],
        };

        tasks.forEach(task => {
            const status = task.status || 'PENDING';
            if (status in result) {
                result[status as keyof KanbanColumns].push(task);
            } else {
                // Default to PENDING for unknown statuses
                result.PENDING.push(task);
            }
        });

        return result;
    }, [tasks]);

    return columns;
};

export default useKanban;
