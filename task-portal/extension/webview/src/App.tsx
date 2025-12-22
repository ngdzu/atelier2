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
  const [filters, setFilters] = useState<Filters>({
    category: [],
    status: [],
    priority: []
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

    setFilteredTasks(result);
  }, [tasks, filters, searchQuery]);

  const handleMessage = (event: MessageEvent) => {
    const message = event.data;
    switch (message.type) {
      case 'tasksData':
        setTasks(message.tasks || []);
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
    </div>
  );
}

export default App;
