import * as vscode from 'vscode';
import { TaskProvider } from './taskProvider';
import { FileWatcher } from './fileWatcher';
import { TaskPortalViewProvider } from './webviewProvider';
import * as path from 'path';
import { execSync } from 'child_process';

let taskProvider: TaskProvider;
let fileWatcher: FileWatcher;
let portalViewProvider: TaskPortalViewProvider;
let outputChannel: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel('Task Portal');
    outputChannel.appendLine('Task Portal extension activating...');

    // Initialize task provider
    taskProvider = new TaskProvider(outputChannel);

    // Initialize file watcher
    fileWatcher = new FileWatcher(taskProvider, outputChannel);

    // Register webview provider
    portalViewProvider = new TaskPortalViewProvider(context.extensionUri, taskProvider);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            TaskPortalViewProvider.viewType,
            portalViewProvider
        )
    );

    // Register commands
    const disposables = [
        vscode.commands.registerCommand('taskPortal.open', () => handleOpenPortal(context)),
        vscode.commands.registerCommand('taskPortal.sync', () => handleSync()),
        vscode.commands.registerCommand('taskPortal.refresh', () => handleRefresh()),
        vscode.commands.registerCommand('taskPortal.openTask', (taskId?: string) => handleOpenTask(taskId)),
    ];

    context.subscriptions.push(...disposables);

    // Watch for .task file changes
    fileWatcher.start();

    outputChannel.appendLine('Task Portal extension activated successfully');
    outputChannel.show(false);
}

async function handleOpenPortal(_context: vscode.ExtensionContext) {
    outputChannel.appendLine('Opening Task Portal...');
    try {
        // Reveal the Task Portal view and refresh its data
        portalViewProvider.show();
        portalViewProvider.refresh();
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        outputChannel.appendLine(`Open portal error: ${message}`);
        vscode.window.showErrorMessage(`Failed to open Task Portal: ${message}`);
    }
}

async function handleSync() {
    const progressOptions = {
        location: vscode.ProgressLocation.Notification,
        title: 'Syncing tasks...',
        cancellable: false,
    };

    try {
        await vscode.window.withProgress(progressOptions, async (_progress) => {
            outputChannel.appendLine('Starting task sync...');

            // Get workspace folder
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                throw new Error('No workspace folder open');
            }

            const parserPath = path.join(workspaceFolder.uri.fsPath, 'task-portal', 'parser');
            const tasksPath = path.join(workspaceFolder.uri.fsPath, '.tasks');
            const registryPath = path.join(tasksPath, 'TASK_REGISTRY.json');

            // Build parser
            outputChannel.appendLine('Building parser...');
            try {
                execSync('npm run build', {
                    cwd: parserPath,
                    stdio: 'pipe'
                });
            } catch (e) {
                outputChannel.appendLine(`Parser build failed: ${e}`);
                throw new Error('Failed to build parser');
            }

            // Run sync command
            outputChannel.appendLine('Running parser sync...');
            try {
                const result = execSync(`node dist/cli.js sync ../../.tasks ${registryPath}`, {
                    cwd: parserPath,
                    encoding: 'utf-8',
                    stdio: 'pipe'
                });
                outputChannel.appendLine(result);
            } catch (e: any) {
                outputChannel.appendLine(`Parser sync failed: ${e.message}`);
                throw new Error(`Parser sync failed: ${e.message}`);
            }

            // Refresh task provider
            outputChannel.appendLine('Refreshing task provider...');
            await taskProvider.refresh();

            outputChannel.appendLine('Sync completed successfully');
        });

        vscode.window.showInformationMessage('✓ Tasks synced successfully');
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        outputChannel.appendLine(`Sync error: ${message}`);
        vscode.window.showErrorMessage(`Failed to sync tasks: ${message}`);
    }
}

async function handleRefresh() {
    try {
        outputChannel.appendLine('Refreshing task provider...');
        await taskProvider.refresh();
        vscode.window.showInformationMessage('✓ Tasks refreshed');
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        outputChannel.appendLine(`Refresh error: ${message}`);
        vscode.window.showErrorMessage(`Failed to refresh tasks: ${message}`);
    }
}

async function handleOpenTask(taskId?: string) {
    if (!taskId) {
        vscode.window.showWarningMessage('Please specify a task ID');
        return;
    }

    try {
        const task = await taskProvider.getTask(taskId);
        if (!task) {
            vscode.window.showErrorMessage(`Task ${taskId} not found`);
            return;
        }

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

        const taskFilePath = path.join(workspaceFolder.uri.fsPath, '.tasks', task.file);
        const document = await vscode.workspace.openTextDocument(taskFilePath);
        await vscode.window.showTextDocument(document);

        // Try to find and select the task section
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const text = document.getText();
            const taskPattern = new RegExp(`## ${taskId.replace(/[-]/g, '\\-')}:`, 'i');
            const match = text.match(taskPattern);
            if (match && match.index !== undefined) {
                const position = document.positionAt(match.index);
                editor.selection = new vscode.Selection(position, position);
                editor.revealRange(new vscode.Range(position, position));
            }
        }

        outputChannel.appendLine(`Opened task file: ${task.file}`);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        outputChannel.appendLine(`Error opening task: ${message}`);
        vscode.window.showErrorMessage(`Failed to open task: ${message}`);
    }
}

export function deactivate() {
    outputChannel?.appendLine('Task Portal extension deactivating...');
    fileWatcher?.stop();
    outputChannel?.dispose();
}
