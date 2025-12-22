import * as vscode from 'vscode';
import { TaskProvider } from './taskProvider';

export class FileWatcher {
    private watcher: vscode.FileSystemWatcher | null = null;
    private debounceTimer: NodeJS.Timeout | null = null;
    private debounceDelay: number = 2000; // 2 seconds
    private taskProvider: TaskProvider;
    private outputChannel: vscode.OutputChannel;

    constructor(taskProvider: TaskProvider, outputChannel: vscode.OutputChannel) {
        this.taskProvider = taskProvider;
        this.outputChannel = outputChannel;
    }

    start(): void {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            return;
        }

        // Watch .task files
        const taskFilesPattern = new vscode.RelativePattern(
            workspaceFolder,
            '.tasks/**/*.task'
        );

        // Watch TASK_REGISTRY.json
        const registryPattern = new vscode.RelativePattern(
            workspaceFolder,
            '.tasks/TASK_REGISTRY.json'
        );

        this.watcher = vscode.workspace.createFileSystemWatcher(taskFilesPattern);

        this.watcher.onDidChange(() => {
            this.debounce(() => this.onTaskFileChanged());
        });

        this.watcher.onDidCreate(() => {
            this.debounce(() => this.onTaskFileChanged());
        });

        this.watcher.onDidDelete(() => {
            this.debounce(() => this.onTaskFileChanged());
        });

        // Also watch registry file
        const registryWatcher = vscode.workspace.createFileSystemWatcher(registryPattern);
        registryWatcher.onDidChange(async () => {
            await this.taskProvider.refresh();
            this.outputChannel.appendLine('TASK_REGISTRY.json updated externally, refreshed cache');
        });

        this.outputChannel.appendLine('File watcher started for .task files');
    }

    stop(): void {
        if (this.watcher) {
            this.watcher.dispose();
            this.watcher = null;
        }

        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
    }

    private debounce(callback: () => void): void {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = setTimeout(() => {
            callback();
            this.debounceTimer = null;
        }, this.debounceDelay);
    }

    private async onTaskFileChanged(): Promise<void> {
        this.outputChannel.appendLine('.task file changed, triggering auto-sync...');

        try {
            // Notify user
            const notification = await vscode.window.showInformationMessage(
                'Task files changed. Sync now?',
                { title: 'Sync', isCloseAffordance: false },
                { title: 'Later', isCloseAffordance: true }
            );

            if (notification?.title === 'Sync') {
                // Trigger sync command
                await vscode.commands.executeCommand('taskPortal.sync');
            } else {
                this.outputChannel.appendLine('User deferred sync');
            }
        } catch (error) {
            this.outputChannel.appendLine(`File watcher error: ${error}`);
        }
    }
}
