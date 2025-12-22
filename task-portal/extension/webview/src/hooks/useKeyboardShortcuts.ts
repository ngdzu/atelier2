import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
    onRefresh?: () => void;
    onFocusSearch?: () => void;
}

export const useKeyboardShortcuts = (handlers: KeyboardShortcutHandlers) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+R or Cmd+R - Refresh
            if ((e.ctrlKey || e.metaKey) && e.key === 'r' && handlers.onRefresh) {
                e.preventDefault();
                handlers.onRefresh();
            }

            // Ctrl+F or Cmd+F - Focus Search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f' && handlers.onFocusSearch) {
                e.preventDefault();
                handlers.onFocusSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlers]);
};

export default useKeyboardShortcuts;
