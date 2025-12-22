import * as vscode from 'vscode';
import * as fs from 'fs';
import { TaskProvider } from './taskProvider';

export class TaskPortalViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'taskPortal.portalView';

    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        private readonly _taskProvider: TaskProvider
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview')
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.type) {
                case 'getTasks':
                    const tasks = await this._taskProvider.getAllTasks();
                    webviewView.webview.postMessage({ type: 'tasksData', tasks });
                    break;

                case 'filterTasks':
                    const filtered = await this._taskProvider.getTasksByStatus(message.status);
                    webviewView.webview.postMessage({ type: 'tasksData', tasks: filtered });
                    break;

                case 'searchTasks':
                    const results = await this._taskProvider.searchTasks(message.query);
                    webviewView.webview.postMessage({ type: 'tasksData', tasks: results });
                    break;

                case 'openTask':
                    const task = await this._taskProvider.getTask(message.taskId);
                    if (task?.file) {
                        const doc = await vscode.workspace.openTextDocument(task.file);
                        await vscode.window.showTextDocument(doc);
                    }
                    break;

                case 'openInEditor':
                    if (message.filePath) {
                        const doc = await vscode.workspace.openTextDocument(message.filePath);
                        await vscode.window.showTextDocument(doc);
                    }
                    break;

                case 'refresh':
                    await this._taskProvider.refresh();
                    const refreshedTasks = await this._taskProvider.getAllTasks();
                    webviewView.webview.postMessage({ type: 'tasksData', tasks: refreshedTasks });
                    break;

                case 'updateTaskStatus':
                    // Note: For now, we just acknowledge the request
                    // Full implementation would require file editing capabilities
                    vscode.window.showInformationMessage(
                        `Update task ${message.taskId} to status: ${message.newStatus}`
                    );
                    break;
            }
        });

        // Send initial data
        this._taskProvider.getAllTasks().then(tasks => {
            webviewView.webview.postMessage({ type: 'tasksData', tasks });
        });
    }

    public refresh() {
        if (this._view) {
            this._taskProvider.getAllTasks().then(tasks => {
                this._view!.webview.postMessage({ type: 'tasksData', tasks });
            });
        }
    }

    // Reveal the view in the Explorer and focus it
    public show() {
        try {
            this._view?.show?.(true);
        } catch {
            // If not yet resolved, ask VS Code to open the view by id
            vscode.commands.executeCommand('workbench.views.openView', TaskPortalViewProvider.viewType);
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const distPath = vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview');
        const indexPath = vscode.Uri.joinPath(distPath, 'index.html');

        let html = '';
        try {
            html = fs.readFileSync(indexPath.fsPath, 'utf8');
        } catch (error) {
            return `
        <!DOCTYPE html>
        <html>
          <body>
            <h2>Webview Build Not Found</h2>
            <p>Please build the webview first:</p>
            <pre>cd task-portal/extension/webview && npm run build</pre>
          </body>
        </html>
      `;
        }

        // Update resource paths to use VS Code webview URIs
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(distPath, 'assets', 'index.js'));
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(distPath, 'assets', 'index.css'));

        // Replace asset paths with webview URIs
        html = html.replace(
            /<script type="module" crossorigin src="([^"]+)"><\/script>/g,
            `<script type="module" src="${scriptUri}"></script>`
        );
        html = html.replace(
            /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
            `<link rel="stylesheet" href="${styleUri}">`
        );

        // Add CSP meta tag
        const cspSource = webview.cspSource;
        html = html.replace(
            '<head>',
            `<head>\n    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline'; script-src ${cspSource}; font-src ${cspSource};">`
        );

        return html;
    }
}
