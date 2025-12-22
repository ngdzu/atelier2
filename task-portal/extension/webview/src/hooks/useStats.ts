interface Task {
    id: string;
    title: string;
    category: string;
    status: string;
    priority?: string;
}

export interface TaskStats {
    total: number;
    active: number;
    completed: number;
    blocked: number;
    pending: number;
    cancelled: number;
    completionRate: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
}

export const useStats = (tasks: Task[]): TaskStats => {
    const byStatus: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    let completed = 0;
    let blocked = 0;
    let pending = 0;
    let cancelled = 0;

    tasks.forEach(task => {
        // Count by status
        byStatus[task.status] = (byStatus[task.status] || 0) + 1;

        if (task.status === 'COMPLETED') completed++;
        if (task.status === 'BLOCKED') blocked++;
        if (task.status === 'PENDING') pending++;
        if (task.status === 'CANCELLED') cancelled++;

        // Count by category
        byCategory[task.category] = (byCategory[task.category] || 0) + 1;

        // Count by priority
        if (task.priority) {
            byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
        }
    });

    const total = tasks.length;
    const active = total - completed - cancelled;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
        total,
        active,
        completed,
        blocked,
        pending,
        cancelled,
        completionRate,
        byStatus,
        byCategory,
        byPriority
    };
};
