import { useMemo } from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell
} from 'recharts';
import StatCard from './StatCard';
import type { Task } from '../types';
import { buildVelocity, buildBurnup, buildWorkload, findBottlenecks, countCompleted } from '../utils/analytics';

interface AnalyticsDashboardProps {
    tasks: Task[];
    onOpenTask?: (taskId: string) => void;
}

const formatWeek = (week: string) => week.replace(/^\d{4}-W/, 'W');

const downloadFile = (fileName: string, data: string, mime: string) => {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};

const buildCsv = (tasks: Task[]) => {
    const headers = ['id', 'title', 'status', 'priority', 'assignee', 'category', 'created', 'updated'];
    const escape = (value: string | number | undefined) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const rows = tasks.map(task =>
        headers
            .map(key => escape((task as any)[key] as string | number | undefined))
            .join(',')
    );
    return [headers.join(','), ...rows].join('\n');
};

const AnalyticsDashboard = ({ tasks, onOpenTask }: AnalyticsDashboardProps) => {
    const velocity = useMemo(() => buildVelocity(tasks, 8), [tasks]);
    const burnup = useMemo(() => buildBurnup(tasks, 8), [tasks]);
    const workload = useMemo(() => buildWorkload(tasks), [tasks]);
    const bottlenecks = useMemo(() => findBottlenecks(tasks), [tasks]);

    const total = tasks.length;
    const completed = countCompleted(tasks);
    const completionRate = total ? Math.round((completed / total) * 100) : 0;
    const active = tasks.filter(task => task.status === 'IN_PROGRESS' || task.status === 'PENDING').length;
    const blocked = tasks.filter(task => task.status === 'BLOCKED').length;
    const latestVelocity = velocity.length > 0 ? velocity[velocity.length - 1].completed : 0;

    const handleExport = (format: 'csv' | 'json') => {
        if (format === 'csv') {
            downloadFile('analytics-report.csv', buildCsv(tasks), 'text/csv');
        } else {
            downloadFile('analytics-report.json', JSON.stringify({ tasks }, null, 2), 'application/json');
        }
    };

    return (
        <div className="space-y-6 p-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleExport('csv')}
                        className="px-3 py-1 rounded border border-vscode-button-background text-vscode-button-background hover:bg-vscode-button-hoverBackground/20"
                    >
                        Export CSV
                    </button>
                    <button
                        onClick={() => handleExport('json')}
                        className="px-3 py-1 rounded border border-vscode-button-background text-vscode-button-background hover:bg-vscode-button-hoverBackground/20"
                    >
                        Export JSON
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Tasks" value={total} />
                <StatCard title="Completion Rate" value={`${completionRate}%`} color="#10B981" subtitle={`${completed} done`} />
                <StatCard title="Active" value={active} color="#3B82F6" subtitle="Pending + In Progress" />
                <StatCard title="Blocked" value={blocked} color={blocked ? '#EF4444' : undefined} subtitle={blocked ? 'Needs attention' : 'All clear'} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-vscode-foreground/20 rounded p-4 h-80">
                    <h3 className="text-sm font-semibold mb-3">Velocity (last 8 weeks)</h3>
                    {velocity.every(v => v.completed === 0) ? (
                        <div className="h-full flex items-center justify-center text-vscode-foreground/50">No completed tasks yet</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={velocity}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--vscode-foreground)" opacity={0.1} />
                                <XAxis dataKey="week" tickFormatter={formatWeek} stroke="var(--vscode-foreground)" />
                                <YAxis allowDecimals={false} stroke="var(--vscode-foreground)" />
                                <Tooltip
                                    labelFormatter={formatWeek}
                                    contentStyle={{
                                        backgroundColor: 'var(--vscode-editor-background)',
                                        border: '1px solid var(--vscode-foreground)'
                                    }}
                                />
                                <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]}>
                                    {velocity.map(entry => (
                                        <Cell key={entry.week} fill={entry.completed > 0 ? '#10B981' : '#9CA3AF'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                    <div className="text-xs text-vscode-foreground/60 mt-2">Last week: {latestVelocity} completed</div>
                </div>

                <div className="border border-vscode-foreground/20 rounded p-4 h-80">
                    <h3 className="text-sm font-semibold mb-3">Burnup (ideal vs actual)</h3>
                    {burnup.every(point => point.completed === 0) ? (
                        <div className="h-full flex items-center justify-center text-vscode-foreground/50">No completion data yet</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={burnup}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--vscode-foreground)" opacity={0.1} />
                                <XAxis dataKey="week" tickFormatter={formatWeek} stroke="var(--vscode-foreground)" />
                                <YAxis allowDecimals={false} stroke="var(--vscode-foreground)" />
                                <Tooltip
                                    labelFormatter={formatWeek}
                                    contentStyle={{
                                        backgroundColor: 'var(--vscode-editor-background)',
                                        border: '1px solid var(--vscode-foreground)'
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="ideal" stroke="#9CA3AF" strokeDasharray="4 2" dot={false} name="Ideal" />
                                <Line type="monotone" dataKey="completed" stroke="#3B82F6" dot={{ r: 3 }} name="Actual" />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                    <div className="text-xs text-vscode-foreground/60 mt-2">Target: linear completion to total tasks</div>
                </div>
            </div>

            <div className="border border-vscode-foreground/20 rounded p-4">
                <h3 className="text-sm font-semibold mb-3">Workload by Assignee</h3>
                {workload.length === 0 ? (
                    <div className="h-24 flex items-center justify-center text-vscode-foreground/50">No active tasks to show</div>
                ) : (
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={workload} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--vscode-foreground)" opacity={0.1} />
                                <XAxis type="number" allowDecimals={false} stroke="var(--vscode-foreground)" />
                                <YAxis dataKey="name" type="category" width={120} stroke="var(--vscode-foreground)" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--vscode-editor-background)',
                                        border: '1px solid var(--vscode-foreground)'
                                    }}
                                />
                                <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            <div className="border border-vscode-foreground/20 rounded p-4">
                <h3 className="text-sm font-semibold mb-3">Bottlenecks</h3>
                {bottlenecks.length === 0 ? (
                    <div className="text-vscode-foreground/60 text-sm">No blocked or stale tasks detected</div>
                ) : (
                    <ul className="space-y-3">
                        {bottlenecks.map(task => (
                            <li key={task.id} className="p-3 border border-vscode-foreground/15 rounded flex items-start justify-between gap-3">
                                <div>
                                    <div className="font-semibold">{task.id}</div>
                                    <div className="text-sm text-vscode-foreground/80">{task.title}</div>
                                    <div className="text-xs text-vscode-foreground/60">
                                        Status: {task.status} · Updated: {task.updated || 'n/a'}
                                    </div>
                                </div>
                                {onOpenTask && (
                                    <button
                                        onClick={() => onOpenTask(task.id)}
                                        className="px-2 py-1 text-sm rounded border border-vscode-button-background text-vscode-button-background hover:bg-vscode-button-hoverBackground/20"
                                    >
                                        Open
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
