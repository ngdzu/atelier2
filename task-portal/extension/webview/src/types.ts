export interface Progress {
    completed: number;
    total: number;
    percentage: number;
}

export interface Task {
    id: string;
    title: string;
    category: string;
    status: string;
    priority?: string;
    assignee?: string;
    estimate?: string;
    dependencies?: string[];
    file?: string;
    progress?: Progress;
    created?: string;
    updated?: string;
}

export interface Filters {
    category: string[];
    status: string[];
    priority: string[];
    progress: ProgressFilter[];
}

export type ProgressFilter = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE';

declare global {
    interface Window {
        vscode: {
            postMessage: (message: any) => void;
        };
    }
}

export { };
