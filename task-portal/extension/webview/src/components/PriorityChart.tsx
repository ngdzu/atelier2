import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PriorityChartProps {
    data: Record<string, number>;
}

const PRIORITY_COLORS: Record<string, string> = {
    CRITICAL: '#DC2626',
    HIGH: '#F59E0B',
    MEDIUM: '#FBBF24',
    LOW: '#10B981'
};

const PRIORITY_ORDER = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

const PriorityChart = ({ data }: PriorityChartProps) => {
    const chartData = PRIORITY_ORDER
        .filter(priority => data[priority])
        .map(priority => ({
            name: priority,
            value: data[priority] || 0
        }));

    if (chartData.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-vscode-foreground/50">
                No priority data available
            </div>
        );
    }

    return (
        <div className="h-64">
            <h3 className="text-sm font-semibold mb-4">Priority Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--vscode-foreground)" opacity={0.1} />
                    <XAxis type="number" stroke="var(--vscode-foreground)" />
                    <YAxis dataKey="name" type="category" stroke="var(--vscode-foreground)" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--vscode-editor-background)',
                            border: '1px solid var(--vscode-foreground)',
                            borderRadius: '4px'
                        }}
                    />
                    <Bar dataKey="value" fill="#8884d8">
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.name]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriorityChart;
