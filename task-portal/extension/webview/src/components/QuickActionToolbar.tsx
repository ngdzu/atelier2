import React from 'react';

interface QuickActionToolbarProps {
    onRefresh: () => void;
    searchRef?: React.RefObject<HTMLInputElement>;
}

export const QuickActionToolbar: React.FC<QuickActionToolbarProps> = ({ onRefresh }) => {
    return (
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--vscode-panel-border)]">
            <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-[var(--vscode-editor-foreground)]">
                    Quick Actions
                </h2>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={onRefresh}
                    className="px-2 py-1 text-xs bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] rounded hover:bg-[var(--vscode-button-hoverBackground)]"
                    title="Refresh Tasks (Ctrl+R)"
                >
                    🔄 Refresh
                </button>
            </div>
        </div>
    );
};

export default QuickActionToolbar;
