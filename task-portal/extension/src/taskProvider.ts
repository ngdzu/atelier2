import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface Task {
    id: string;
    category: string;
    number: number;
    title: string;
    status: string;
    priority: string;
    assignee?: string;
    created: string;
    updated: string;
    estimatedTime?: string;
    actualTime?: string;
    dependencies?: string[];
    relatedTasks?: string[];
    file: string;
    filePath: string;
    tags?: string[];
    description: string;
    progress?: {
        completed: number;
        total: number;
        percentage: number;
    };
}

export interface TaskRegistry {
    metadata: {
        version: string;
        lastUpdated: string;
        totalTasks: number;
        lastSync: string;
    };
    categories: Record<string, any>;
    tasks: Task[];
}

export class TaskProvider {
    private registry: TaskRegistry | null = null;
    private registryPath: string | null = null;
    private lastLoadTime: number = 0;
    private cacheTime: number = 5000; // 5 seconds
    private outputChannel: vscode.OutputChannel;

    constructor(outputChannel: vscode.OutputChannel) {
        this.outputChannel = outputChannel;
    }

    async refresh(): Promise<void> {
        this.registry = null;
        this.lastLoadTime = 0;
        await this.loadRegistry();
    }

    private async loadRegistry(): Promise<TaskRegistry> {
        // Return cached version if still valid
        if (this.registry && Date.now() - this.lastLoadTime < this.cacheTime) {
            return this.registry;
        }

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            throw new Error('No workspace folder open');
        }

        const registryPath = path.join(
            workspaceFolder.uri.fsPath,
            '.tasks',
            'TASK_REGISTRY.json'
        );

        try {
            const content = await fs.readFile(registryPath, 'utf-8');
            this.registry = JSON.parse(content);
            this.registryPath = registryPath;
            this.lastLoadTime = Date.now();
            return this.registry || { metadata: { version: '1.0.0', lastUpdated: new Date().toISOString(), totalTasks: 0, lastSync: new Date().toISOString() }, categories: {}, tasks: [] };
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new Error(`Invalid TASK_REGISTRY.json: ${error.message}`);
            }
            throw new Error(`Failed to load TASK_REGISTRY.json: ${(error as any).message}`);
        }
    }

    async getTask(taskId: string): Promise<Task | null> {
        const registry = await this.loadRegistry();
        return registry.tasks.find(t => t.id === taskId) || null;
    }

    async getAllTasks(): Promise<Task[]> {
        const registry = await this.loadRegistry();
        return registry.tasks;
    }

    async getTasksByStatus(status: string): Promise<Task[]> {
        const registry = await this.loadRegistry();
        return registry.tasks.filter(t => t.status === status);
    }

    async getTasksByCategory(category: string): Promise<Task[]> {
        const registry = await this.loadRegistry();
        return registry.tasks.filter(t => t.category === category);
    }

    async searchTasks(query: string): Promise<Task[]> {
        const registry = await this.loadRegistry();
        const lowerQuery = query.toLowerCase();
        return registry.tasks.filter(t =>
            t.id.toLowerCase().includes(lowerQuery) ||
            t.title.toLowerCase().includes(lowerQuery) ||
            t.description.toLowerCase().includes(lowerQuery)
        );
    }

    async getRegistry(): Promise<TaskRegistry> {
        return this.loadRegistry();
    }
}
