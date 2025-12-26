import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { Charts } from './components/Charts';
import { Filters } from './components/Filters';
import { TaskTable } from './components/TaskTable';
import { TaskModal } from './components/TaskModal';
import { Task } from './types';
import { calculateStats } from './utils/stats';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [filters, setFilters] = useState({
        search: '',
        categories: [] as string[],
        statuses: [] as string[],
        priorities: [] as string[]
    });

    useEffect(() => {
        // Load tasks from JSON
        fetch('/TASK_REGISTRY.json')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                const loadedTasks: Task[] = data.tasks || [];
                console.log('Loaded tasks:', loadedTasks.length);
                setTasks(loadedTasks);
            })
            .catch(err => {
                console.error('Failed to load tasks from TASK_REGISTRY.json:', err);
            });
    }, []);

    const stats = useMemo(() => calculateStats(tasks), [tasks]);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchSearch = !filters.search ||
                task.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                task.title.toLowerCase().includes(filters.search.toLowerCase());

            const matchCategory = filters.categories.length === 0 ||
                filters.categories.includes(task.category);

            const matchStatus = filters.statuses.length === 0 ||
                filters.statuses.includes(task.status);

            const matchPriority = filters.priorities.length === 0 ||
                (task.priority && filters.priorities.includes(task.priority));

            return matchSearch && matchCategory && matchStatus && matchPriority;
        });
    }, [tasks, filters]);

    return (
        <div className="container">
            <Header projectName="Task Portal" />

            <StatsCards stats={stats} />

            <Charts stats={stats} tasks={tasks} />

            <Filters
                stats={stats}
                filters={filters}
                onFilterChange={setFilters}
            />

            <TaskTable
                tasks={filteredTasks}
                onTaskClick={setSelectedTask}
            />

            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}

            <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                <p>Last updated: {new Date().toLocaleString()}</p>
                <p style={{ marginTop: '0.5rem' }}>Generated from TASK_REGISTRY.json</p>
            </footer>
        </div>
    );
}

export default App;
