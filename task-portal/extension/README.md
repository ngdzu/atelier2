# Task Portal Extension

## Quick Start

1. Build the webview UI

   From the `webview/` folder:

   ```bash
   cd webview
   npm ci
   npm run build
   ```

   This generates assets under `dist/webview/` which the extension loads. Without these, the portal shows a build-not-found message.

2. Launch the Extension Development Host

   Use the `Run Extension` launch config. In the new window (Extension Development Host), open a folder you want to manage (File → Open Folder).

3. Provide a minimal task registry

   In the opened folder, create `.tasks/TASK_REGISTRY.json` with valid structure, for example:

   ```json
   {
     "metadata": {
       "version": "1.0.0",
       "lastUpdated": "2025-12-22T00:00:00.000Z",
       "totalTasks": 1,
       "lastSync": "2025-12-22T00:00:00.000Z"
     },
     "categories": {},
     "tasks": [
       {
         "id": "DEV-1",
         "category": "DEV",
         "number": 1,
         "title": "Sample task",
         "status": "Open",
         "priority": "Medium",
         "created": "2025-12-22",
         "updated": "2025-12-22",
         "file": "sample.task",
         "filePath": ".tasks/sample.task",
         "description": "Demo task for the portal."
       }
     ]
   }
   ```

4. Open the Task Portal view

   Run the command: `Task Portal: Open Portal`. This focuses the Task Portal view in the Explorer sidebar and loads tasks.

## Commands

- **Task Portal: Open Portal**: Reveals the Task Portal view and refreshes data.
- **Task Portal: Sync Tasks**: Runs the external parser (if present) to update `TASK_REGISTRY.json`.
- **Task Portal: Refresh**: Reloads tasks from `TASK_REGISTRY.json`.
- **Task Portal: Open Task File**: Opens the `.task` file for a given task id.

## Troubleshooting

- If the view is empty, ensure `webview/dist` assets exist by running the webview build.
- If you don’t see the view, try `View: Reset View Locations`, then run `Task Portal: Open Portal` again.
- The extension activates on startup; if your workspace lacks `.tasks/` content, create the folder and `TASK_REGISTRY.json` as above.
# Task Portal Extension

A VS Code extension that brings task management directly into your development environment. Track, filter, and manage tasks from your .task files without leaving the editor.

## Features

- **Task Sync**: Automatically sync .task files with a machine-readable JSON registry
- **Manual Sync**: Run `Task Portal: Sync Tasks` command to update the task registry
- **File Watching**: Auto-detect changes to .task files and prompt for sync
- **Task Quick Access**: Open task files directly from the portal
- **Status Tracking**: Monitor task status (PENDING, IN_PROGRESS, BLOCKED, COMPLETED, CANCELLED)
- **Category Management**: Organize tasks by category (FEAT, BUG, OPS, etc.)

## Available Commands

Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux) and type:

| Command                       | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| `Task Portal: Sync Tasks`     | Manually sync .task files and generate TASK_REGISTRY.json |
| `Task Portal: Refresh`        | Refresh the task provider cache                           |
| `Task Portal: Open Portal`    | Open the task portal (UI coming soon)                     |
| `Task Portal: Open Task File` | Open a specific task file in the editor                   |

## How It Works

1. The extension watches for changes to `.tasks/**/*.task` files
2. When changes are detected, you're prompted to sync
3. The sync process runs the task parser to extract structured data
4. Data is saved to `.tasks/TASK_REGISTRY.json`
5. The task provider loads and caches this data for quick access

## Getting Started

1. Ensure your workspace has a `.tasks` directory with `.task` files
2. The extension activates automatically when it detects .task files
3. Run `Task Portal: Sync Tasks` to generate the initial TASK_REGISTRY.json
4. Use the commands above to work with your tasks

## Configuration

Configure task sync behavior in VS Code settings:

```json
{
  "taskPortal.autoSync": false,
  "taskPortal.cacheTTL": 5000,
  "taskPortal.debounceDelay": 2000
}
```

## Troubleshooting

### TASK_REGISTRY.json not found
- Make sure you've run `Task Portal: Sync Tasks` at least once
- The file should be created at `.tasks/TASK_REGISTRY.json`

### Tasks not showing
- Check that your .task files follow the correct format
- Run `Task Portal: Sync Tasks` to regenerate the registry
- Check the "Task Portal" output channel for error messages

### Sync fails
- Ensure the task parser is built: `npm run build` in `task-portal/parser/`
- Check that `.tasks` directory exists
- Review error messages in the "Task Portal" output channel

## Development

### Building
```bash
npm run build       # One-time build with esbuild
npm run watch       # Watch mode for development
npm run compile     # TypeScript compilation only
```

### Debugging
Press `F5` to launch the Extension Development Host with the extension loaded.

### Packaging
```bash
npm run package     # Create .vsix file for distribution
npm run publish     # Publish to VS Code Marketplace
```

## Architecture

```
extension.ts         - Entry point, command handlers
├── taskProvider.ts  - Loads and caches TASK_REGISTRY.json
├── fileWatcher.ts   - Watches .task files, triggers sync
└── (UI coming)      - Webview component (planned)
```

## Keyboard Shortcuts

No default shortcuts are configured, but you can add them in VS Code:

```json
// keybindings.json
{
  "key": "cmd+shift+t",
  "command": "taskPortal.sync",
  "when": "workspaceFolderCount != 0"
}
```

## Next Steps

- **TASK-FEAT-005**: Build webview UI for task list, filtering, and details
- **TASK-FEAT-006**: Add statistics dashboard with charts and analytics
- **TASK-FEAT-007+**: Kanban board, timeline views, and advanced features

## Support

For issues, please refer to the main project README or check the output channel for detailed logs.

---

**Status**: Foundation (MVP ready for webview UI)  
**Last Updated**: 2025-12-21  
**Version**: 0.1.0
