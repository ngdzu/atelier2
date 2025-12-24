export interface Task {
    id: string;
    title: string;
    status: string;
    priority?: string;
    category: string;
    assignee?: string;
    created?: string;
    updated?: string;
    filePath?: string;
    description?: string;
    estimatedTime?: string;
    actualTime?: string;
    dependencies?: string[];
    relatedTasks?: string[];
    progress?: {
        percentage?: number;
        completed?: number;
        total?: number;
    };
}

export interface Stats {
    total: number;
    totalCompleted: number;
    completionRate: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    completionsByWeek: Array<{ week: string; count: number }>;
}

export interface FilterState {
    search: string;
    categories: string[];
    statuses: string[];
    priorities: string[];
}
