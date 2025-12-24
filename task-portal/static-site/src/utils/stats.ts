import { Task, Stats } from '../types';

export function calculateStats(tasks: Task[]): Stats {
    const total = tasks.length;
    const totalCompleted = tasks.filter(t => t.status === 'COMPLETED').length;
    const completionRate = total > 0 ? Math.round((totalCompleted / total) * 100) : 0;

    const byStatus: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    tasks.forEach(task => {
        byStatus[task.status] = (byStatus[task.status] || 0) + 1;
        byCategory[task.category] = (byCategory[task.category] || 0) + 1;
        if (task.priority) {
            byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
        }
    });

    // Calculate completions by week
    const completionsByWeek = calculateCompletionsByWeek(tasks);

    return {
        total,
        totalCompleted,
        completionRate,
        byStatus,
        byCategory,
        byPriority,
        completionsByWeek
    };
}

function calculateCompletionsByWeek(tasks: Task[]): Array<{ week: string; count: number }> {
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED' && t.updated);

    const weekCounts: Record<string, number> = {};
    completedTasks.forEach(task => {
        const date = new Date(task.updated!);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split('T')[0];
        weekCounts[weekKey] = (weekCounts[weekKey] || 0) + 1;
    });

    // Get last 8 weeks
    const weeks: Array<{ week: string; count: number }> = [];
    const today = new Date();
    for (let i = 7; i >= 0; i--) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() - (i * 7));
        const weekKey = weekStart.toISOString().split('T')[0];
        weeks.push({
            week: weekKey,
            count: weekCounts[weekKey] || 0
        });
    }

    return weeks;
}
