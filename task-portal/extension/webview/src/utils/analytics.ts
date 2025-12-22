import type { Task } from '../types';

const ACTIVE_STATUSES = new Set(['PENDING', 'IN_PROGRESS', 'BLOCKED']);
const MS_IN_DAY = 86_400_000;

const parseDate = (value?: string): Date | null => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
};

const getWeekKey = (date: Date): string => {
    const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / MS_IN_DAY) + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

const buildWeekSequence = (today: Date, weeksBack = 8): string[] => {
    const weeks: string[] = [];
    const anchor = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

    for (let i = weeksBack - 1; i >= 0; i -= 1) {
        const copy = new Date(anchor);
        copy.setUTCDate(copy.getUTCDate() - i * 7);
        weeks.push(getWeekKey(copy));
    }

    return weeks;
};

export const buildVelocity = (tasks: Task[], weeksBack = 8) => {
    const counts: Record<string, number> = {};

    tasks.forEach(task => {
        if (task.status !== 'COMPLETED') return;
        const date = parseDate(task.updated || task.created);
        if (!date) return;
        const key = getWeekKey(date);
        counts[key] = (counts[key] || 0) + 1;
    });

    const weeks = buildWeekSequence(new Date(), weeksBack);
    return weeks.map(week => ({ week, completed: counts[week] || 0 }));
};

export const buildBurnup = (tasks: Task[], weeksBack = 8) => {
    const total = tasks.length;
    const velocity = buildVelocity(tasks, weeksBack);
    const weeks = velocity.map(v => v.week);
    const velocityMap = velocity.reduce<Record<string, number>>((acc, entry) => {
        acc[entry.week] = entry.completed;
        return acc;
    }, {});

    let cumulative = 0;
    const maxIndex = Math.max(weeks.length - 1, 1);

    return weeks.map((week, index) => {
        cumulative += velocityMap[week] || 0;
        const ideal = Math.min(total, Math.round((total / maxIndex) * index));
        return { week, completed: cumulative, ideal };
    });
};

export const buildWorkload = (tasks: Task[]) => {
    const counts: Record<string, number> = {};

    tasks.forEach(task => {
        if (!ACTIVE_STATUSES.has(task.status)) return;
        const assignee = task.assignee?.trim() || 'Unassigned';
        counts[assignee] = (counts[assignee] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
};

export const findBottlenecks = (tasks: Task[], staleDays = 14) => {
    const now = Date.now();

    return tasks
        .filter(task => {
            const updated = parseDate(task.updated || task.created);
            const ageDays = updated ? (now - updated.getTime()) / MS_IN_DAY : staleDays + 1;
            const noProgress = !task.progress || task.progress.percentage === 0;

            return (
                task.status === 'BLOCKED' ||
                (task.status === 'IN_PROGRESS' && noProgress && ageDays >= staleDays)
            );
        })
        .slice(0, 5);
};

export const countCompleted = (tasks: Task[]) => tasks.filter(task => task.status === 'COMPLETED').length;
