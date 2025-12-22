import { ProgressBar } from './ProgressBar';
import type { Progress } from '../types';

interface Task {
    id: string;
    title: string;
    category: string;
    status: string;
    priority?: string;
    assignee?: string;
    estimate?: string;
    file?: string;
    progress?: Progress;
}

interface Props {
    tasks: Task[];
    onTaskClick: (taskId: string) => void;
    onCopyId?: (taskId: string) => void;
    onOpenInEditor?: (task: Task) => void;
}

const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-500',
    'IN-PROGRESS': 'bg-blue-500',
    COMPLETED: 'bg-green-500',
    BLOCKED: 'bg-red-500',
    CANCELLED: 'bg-gray-500',
};

const TaskList = ({ tasks, onTaskClick, onCopyId, onOpenInEditor }: Props) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No tasks found
            </div>
        );
    }

    return (
        <div className="overflow-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-vscode-foreground/20">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Title</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Priority</th>
                        <th className="text-left p-2">Progress</th>
                        <th className="text-left p-2">Assignee</th>
                        <th className="text-left p-2">Estimate</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr
                            key={task.id}
                            className="border-b border-vscode-foreground/10 hover:bg-vscode-foreground/5 group"
                        >
                            <td className="p-2 font-mono text-sm">{task.id}</td>
                            <td
                                className="p-2 cursor-pointer hover:underline"
                                onClick={() => onTaskClick(task.id)}
                            >
                                {task.title}
                            </td>
                            <td className="p-2">
                                <span className="px-2 py-1 rounded text-xs bg-vscode-foreground/10">
                                    {task.category}
                                </span>
                            </td>
                            <td className="p-2">
                                <span className={`px-2 py-1 rounded text-xs text-white ${statusColors[task.status] || 'bg-gray-500'}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className="p-2">{task.priority || '-'}</td>
                            <td className="p-2" style={{ minWidth: '120px' }}>
                                {task.progress ? (
                                    <ProgressBar
                                        percentage={task.progress.percentage}
                                        size="small"
                                        showLabel={true}
                                    />
                                ) : '-'}
                            </td>
                            <td className="p-2">{task.assignee || '-'}</td>
                            <td className="p-2">{task.estimate || '-'}</td>
                            <td className="p-2">
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {onCopyId && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCopyId(task.id);
                                            }}
                                            className="p-1 text-xs bg-vscode-button-background text-vscode-button-foreground rounded hover:bg-vscode-button-hoverBackground"
                                            title="Copy Task ID"
                                        >
                                            📋
                                        </button>
                                    )}
                                    {onOpenInEditor && task.file && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onOpenInEditor(task);
                                            }}
                                            className="p-1 text-xs bg-vscode-button-background text-vscode-button-foreground rounded hover:bg-vscode-button-hoverBackground"
                                            title="Open in Editor"
                                        >
                                            📝
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
