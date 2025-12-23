interface Task {
    id: string;
    category: string;
    status: string;
    priority?: string;
    progress?: { percentage: number };
}

interface Filters {
    category: string[];
    status: string[];
    priority: string[];
    progress: Array<'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE'>;
}

interface Props {
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
    tasks: Task[];
}

const FilterPanel = ({ filters, onFiltersChange, tasks }: Props) => {
    const categories = Array.from(new Set(tasks.map(t => t.category))).sort();
    const statuses = Array.from(new Set(tasks.map(t => t.status))).sort();
    const priorities = Array.from(new Set(tasks.map(t => t.priority).filter(Boolean) as string[])).sort();
    const progressBuckets = [
        { key: 'NOT_STARTED', label: 'Not started (0%)' },
        { key: 'IN_PROGRESS', label: 'In progress (1-99%)' },
        { key: 'COMPLETE', label: 'Complete (100%)' },
    ] as const;

    const toggleFilter = <K extends keyof Filters>(type: K, value: Filters[K][number]) => {
        const current = filters[type] as Array<Filters[K][number]>;
        const nextValues = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];

        const newValues = nextValues as Filters[K];

        onFiltersChange({
            ...filters,
            [type]: newValues
        });
    };

    const clearFilters = () => {
        onFiltersChange({
            category: [],
            status: [],
            priority: [],
            progress: []
        });
    };

    const hasActiveFilters =
        filters.category.length > 0 ||
        filters.status.length > 0 ||
        filters.priority.length > 0 ||
        filters.progress.length > 0;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-xs text-vscode-button-background hover:underline"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div>
                <h4 className="font-medium text-sm mb-2">Category</h4>
                <div className="space-y-1">
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.category.includes(cat)}
                                onChange={() => toggleFilter('category', cat)}
                                className="cursor-pointer"
                            />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-medium text-sm mb-2">Status</h4>
                <div className="space-y-1">
                    {statuses.map(status => (
                        <label key={status} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.status.includes(status)}
                                onChange={() => toggleFilter('status', status)}
                                className="cursor-pointer"
                            />
                            <span>{status}</span>
                        </label>
                    ))}
                </div>
            </div>

            {priorities.length > 0 && (
                <div>
                    <h4 className="font-medium text-sm mb-2">Priority</h4>
                    <div className="space-y-1">
                        {priorities.map(priority => (
                            <label key={priority} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.priority.includes(priority)}
                                    onChange={() => toggleFilter('priority', priority)}
                                    className="cursor-pointer"
                                />
                                <span>{priority}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h4 className="font-medium text-sm mb-2">Progress</h4>
                <div className="space-y-1">
                    {progressBuckets.map(bucket => (
                        <label key={bucket.key} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.progress.includes(bucket.key)}
                                onChange={() => toggleFilter('progress', bucket.key)}
                                className="cursor-pointer"
                            />
                            <span>{bucket.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
