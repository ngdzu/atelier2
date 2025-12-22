import StatCard from './StatCard';
import StatusChart from './StatusChart';
import CategoryChart from './CategoryChart';
import PriorityChart from './PriorityChart';
import { ProgressBar } from './ProgressBar';
import { useStats } from '../hooks/useStats';
import type { Progress } from '../types';

interface Task {
    id: string;
    title: string;
    category: string;
    status: string;
    priority?: string;
    assignee?: string;
    estimate?: string;
    dependencies?: string[];
    file?: string;
    progress?: Progress;
}

interface DashboardProps {
    tasks: Task[];
}

const Dashboard = ({ tasks }: DashboardProps) => {
    const stats = useStats(tasks);

    // Calculate overall progress
    const tasksWithProgress = tasks.filter(t => t.progress);
    const totalChecklistItems = tasksWithProgress.reduce((sum, t) => sum + (t.progress?.total || 0), 0);
    const completedChecklistItems = tasksWithProgress.reduce((sum, t) => sum + (t.progress?.completed || 0), 0);
    const overallProgress = totalChecklistItems > 0 ? Math.round((completedChecklistItems / totalChecklistItems) * 100) : 0;

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>

            {/* Overall Progress */}
            {totalChecklistItems > 0 && (
                <div className="border border-vscode-foreground/20 rounded p-4">
                    <h3 className="text-sm font-semibold mb-3">Overall Project Progress</h3>
                    <ProgressBar percentage={overallProgress} size="large" showLabel={true} />
                    <div className="mt-2 text-xs text-vscode-foreground/60">
                        {completedChecklistItems} of {totalChecklistItems} checklist items completed across {tasksWithProgress.length} tasks
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Tasks" value={stats.total} />
                <StatCard
                    title="Active Tasks"
                    value={stats.active}
                    color="#3B82F6"
                    subtitle="Pending + In Progress"
                />
                <StatCard
                    title="Completed"
                    value={stats.completed}
                    color="#10B981"
                    subtitle={`${stats.completionRate}% complete`}
                />
                <StatCard
                    title="Blocked"
                    value={stats.blocked}
                    color={stats.blocked > 0 ? '#EF4444' : undefined}
                    subtitle={stats.blocked > 0 ? 'Needs attention' : 'All clear'}
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-vscode-foreground/20 rounded p-4">
                    <StatusChart data={stats.byStatus} />
                </div>
                <div className="border border-vscode-foreground/20 rounded p-4">
                    <CategoryChart data={stats.byCategory} />
                </div>
            </div>

            {/* Priority Chart - Full Width */}
            {Object.keys(stats.byPriority).length > 0 && (
                <div className="border border-vscode-foreground/20 rounded p-4">
                    <PriorityChart data={stats.byPriority} />
                </div>
            )}

            {/* Additional Stats */}
            <div className="border border-vscode-foreground/20 rounded p-4">
                <h3 className="text-sm font-semibold mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <div className="text-vscode-foreground/60">Pending</div>
                        <div className="text-xl font-bold">{stats.pending}</div>
                    </div>
                    <div>
                        <div className="text-vscode-foreground/60">Cancelled</div>
                        <div className="text-xl font-bold">{stats.cancelled}</div>
                    </div>
                    <div>
                        <div className="text-vscode-foreground/60">Categories</div>
                        <div className="text-xl font-bold">{Object.keys(stats.byCategory).length}</div>
                    </div>
                    <div>
                        <div className="text-vscode-foreground/60">Avg per Category</div>
                        <div className="text-xl font-bold">
                            {Object.keys(stats.byCategory).length > 0
                                ? Math.round(stats.total / Object.keys(stats.byCategory).length)
                                : 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
