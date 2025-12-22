interface StatCardProps {
    title: string;
    value: number | string;
    color?: string;
    subtitle?: string;
}

const StatCard = ({ title, value, color, subtitle }: StatCardProps) => {
    return (
        <div className="p-4 rounded border border-vscode-foreground/20 bg-vscode-background">
            <div className="text-sm text-vscode-foreground/60 mb-1">{title}</div>
            <div
                className="text-3xl font-bold mb-1"
                style={color ? { color } : undefined}
            >
                {value}
            </div>
            {subtitle && (
                <div className="text-xs text-vscode-foreground/50">{subtitle}</div>
            )}
        </div>
    );
};

export default StatCard;
