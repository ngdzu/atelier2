import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CategoryChartProps {
    data: Record<string, number>;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

const CategoryChart = ({ data }: CategoryChartProps) => {
    const chartData = Object.entries(data)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    return (
        <div className="h-64">
            <h3 className="text-sm font-semibold mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--vscode-foreground)" opacity={0.1} />
                    <XAxis dataKey="name" stroke="var(--vscode-foreground)" />
                    <YAxis stroke="var(--vscode-foreground)" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--vscode-editor-background)',
                            border: '1px solid var(--vscode-foreground)',
                            borderRadius: '4px'
                        }}
                    />
                    <Bar dataKey="value" fill="#8884d8">
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryChart;
