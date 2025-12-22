import React from 'react';

interface ProgressBarProps {
    percentage: number;
    size?: 'small' | 'medium' | 'large';
    showLabel?: boolean;
}

const getColor = (percentage: number): string => {
    if (percentage === 100) return '#10B981'; // Green
    if (percentage >= 67) return '#3B82F6'; // Blue
    if (percentage >= 34) return '#F59E0B'; // Yellow/Orange
    return '#EF4444'; // Red
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
    percentage,
    size = 'medium',
    showLabel = true
}) => {
    const color = getColor(percentage);

    const heights = {
        small: '4px',
        medium: '8px',
        large: '12px',
    };

    const height = heights[size];

    return (
        <div className="flex items-center gap-2 w-full">
            <div
                className="flex-1 bg-[var(--vscode-progressBar-background)] rounded-full overflow-hidden"
                style={{ height }}
            >
                <div
                    className="h-full transition-all duration-300 ease-out rounded-full"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
            {showLabel && (
                <span
                    className="text-xs font-medium min-w-[40px] text-right"
                    style={{ color }}
                >
                    {percentage}%
                </span>
            )}
        </div>
    );
};

export default ProgressBar;
