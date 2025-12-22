import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StatusChartProps {
    data: Record<string, number>;
}

const STATUS_COLORS: Record<string, string> = {
    PENDING: '#3B82F6',
    'IN-PROGRESS': '#F59E0B',
    IN_PROGRESS: '#F59E0B',
    BLOCKED: '#EF4444',
    COMPLETED: '#10B981',
    CANCELLED: '#6B7280'
};

const StatusChart = ({ data }: StatusChartProps) => {
    const chartData = Object.entries(data).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <div className="h-64">
            <h3 className="text-sm font-semibold mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#8884d8'} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatusChart;
