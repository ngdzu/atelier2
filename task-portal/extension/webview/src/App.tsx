import { useState, useEffect, useRef } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import KanbanBoard from './components/KanbanBoard';
import QuickActionToolbar from './components/QuickActionToolbar';
import { TimelineView } from './components/TimelineView';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import type { Filters, Task } from './types';

declare const acquireVsCodeApi: () => any;
const vscode = acquireVsCodeApi();

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'dashboard' | 'analytics' | 'kanban' | 'timeline'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    category: [],
    status: [],
    priority: [],
    progress: []
  });
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleRefresh = () => {
    vscode.postMessage({ type: 'refresh' });
  };

  const handleCopyTaskId = (taskId: string) => {
    navigator.clipboard.writeText(taskId).then(() => {
      console.log('Copied task ID:', taskId);
    });
  };

  const handleOpenInEditor = (task: Task) => {
    if (task.file) {
      vscode.postMessage({ type: 'openInEditor', filePath: task.file, taskId: task.id });
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onRefresh: handleRefresh,
    onFocusSearch: () => searchInputRef.current?.focus(),
  });

  useEffect(() => {
    // Request initial task data
    vscode.postMessage({ type: 'getTasks' });

    // Listen for messages from the extension
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = tasks;

    // Apply category filter
    if (filters.category.length > 0) {
      result = result.filter(task => filters.category.includes(task.category));
    }

    // Apply status filter
    if (filters.status.length > 0) {
      result = result.filter(task => filters.status.includes(task.status));
    }

    // Apply priority filter
    if (filters.priority.length > 0) {
      result = result.filter(task => task.priority && filters.priority.includes(task.priority));
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.id.toLowerCase().includes(query) ||
        (task.assignee && task.assignee.toLowerCase().includes(query))
      );
    }

    // Apply progress filter
    if (filters.progress.length > 0) {
      result = result.filter(task => {
        const percentage = task.progress?.percentage ?? 0;
        const bucket = percentage === 0
          ? 'NOT_STARTED'
          : percentage === 100
            ? 'COMPLETE'
            : 'IN_PROGRESS';
        return filters.progress.includes(bucket);
      });
    }

    setFilteredTasks(result);
  }, [tasks, filters, searchQuery]);

  const handleMessage = (event: MessageEvent) => {
    const message = event.data;
    switch (message.type) {
      case 'tasksData':
        setTasks(message.tasks || []);
        setError(null); // Clear any previous errors
        break;
      case 'error':
        setError(message.message);
        setTasks([]); // Clear tasks on error
        break;
    }
  };

  const handleTaskClick = (taskId: string) => {
    vscode.postMessage({ type: 'openTask', taskId });
  };

  const handleTimelineTaskClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      handleOpenInEditor(task);
    }
  };

  return (
    <div className="app-container p-4">
      {error ? (
        <div className="error-container p-6 text-center">
          <div className="mb-4">
            <svg className="inline-block w-16 h-16 text-vscode-errorForeground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-vscode-errorForeground">Error Loading Tasks</h2>
          <p className="text-vscode-descriptionForeground mb-4">{error}</p>
          {error.includes('No workspace folder') && (
            <div className="text-left bg-vscode-textBlockQuote-background p-4 rounded">
              <p className="font-semibold mb-2">To use Task Portal:</p>
              <ol className="list-decimal list-inside space-y-1 text-vscode-descriptionForeground">
                <li>Open a folder in VS Code (File → Open Folder)</li>
                <li>Ensure your project has a <code className="bg-vscode-textCodeBlock-background px-1">.tasks/TASK_REGISTRY.json</code> file</li>
                <li>Click the Refresh button above or reload the window</li>
              </ol>
            </div>
          )}
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-vscode-button-background text-vscode-button-foreground rounded hover:bg-vscode-button-hoverBackground"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('list')}
                className={`px-3 py-1 rounded ${currentView === 'list'
                  ? 'bg-vscode-button-background text-vscode-button-foreground'
                  : 'border border-vscode-button-background text-vscode-button-background'
                  }`}
              >
                Task List
              </button>
              <button
                onClick={() => setCurrentView('kanban')}
                className={`px-3 py-1 rounded ${currentView === 'kanban'
                  ? 'bg-vscode-button-background text-vscode-button-foreground'
                  : 'border border-vscode-button-background text-vscode-button-background'
                  }`}
              >
                Kanban Board
              </button>
              <button
                onClick={() => setCurrentView('timeline')}
                className={`px-3 py-1 rounded ${currentView === 'timeline'
                  ? 'bg-vscode-button-background text-vscode-button-foreground'
                  : 'border border-vscode-button-background text-vscode-button-background'
                  }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-1 rounded ${currentView === 'dashboard'
                  ? 'bg-vscode-button-background text-vscode-button-foreground'
                  : 'border border-vscode-button-background text-vscode-button-background'
                  }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className={`px-3 py-1 rounded ${currentView === 'analytics'
                  ? 'bg-vscode-button-background text-vscode-button-foreground'
                  : 'border border-vscode-button-background text-vscode-button-background'
                  }`}
              >
                Analytics
              </button>
              <button
                onClick={handleRefresh}
                className="px-3 py-1 bg-vscode-button-background text-vscode-button-foreground rounded hover:bg-vscode-button-hoverBackground"
              >
                Refresh
              </button>
            </div>
          </div>

          {currentView === 'dashboard' ? (
            <Dashboard tasks={tasks} />
          ) : currentView === 'analytics' ? (
            <AnalyticsDashboard tasks={tasks} onOpenTask={handleTaskClick} />
          ) : currentView === 'kanban' ? (
            <KanbanBoard
              tasks={filteredTasks}
              onCopyId={handleCopyTaskId}
              onOpenInEditor={handleOpenInEditor}
            />
          ) : currentView === 'timeline' ? (
            <TimelineView tasks={tasks} onTaskClick={handleTimelineTaskClick} />
          ) : (
            <>
              <QuickActionToolbar onRefresh={handleRefresh} />
              <SearchBar value={searchQuery} onChange={setSearchQuery} inputRef={searchInputRef} />

              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="col-span-1">
                  <FilterPanel filters={filters} onFiltersChange={setFilters} tasks={tasks} />
                </div>
                <div className="col-span-3">
                  <TaskList
                    tasks={filteredTasks}
                    onTaskClick={handleTaskClick}
                    onCopyId={handleCopyTaskId}
                    onOpenInEditor={handleOpenInEditor}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
