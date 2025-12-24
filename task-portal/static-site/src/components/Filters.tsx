import { useState, useEffect, useRef } from 'react';
import { Stats, FilterState } from '../types';

export interface FiltersProps {
  stats: Stats;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function Filters({ stats, filters, onFilterChange }: FiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openDropdown]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      categories: [],
      statuses: [],
      priorities: []
    });
    setOpenDropdown(null);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const toggleStatus = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onFilterChange({ ...filters, statuses: newStatuses });
  };

  const togglePriority = (priority: string) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority];
    onFilterChange({ ...filters, priorities: newPriorities });
  };

  const statusColors: Record<string, string> = {
    PENDING: '#3B82F6',
    IN_PROGRESS: '#F59E0B',
    BLOCKED: '#EF4444',
    COMPLETED: '#10B981',
    CANCELLED: '#6B7280'
  };

  const priorityColors: Record<string, string> = {
    CRITICAL: '#DC2626',
    HIGH: '#F97316',
    MEDIUM: '#EAB308',
    LOW: '#22C55E'
  };

  const categoryColors: Record<string, string> = {
    FEAT: '#8B5CF6',    // Feature - Purple
    BUG: '#EF4444',     // Bug - Red
    ENH: '#3B82F6',     // Enhancement - Blue
    REF: '#F59E0B',     // Refactoring - Orange
    UI: '#EC4899',      // UI/UX - Pink
    API: '#10B981',     // API - Green
    DB: '#06B6D4',      // Database - Cyan
    TEST: '#6366F1',    // Testing - Indigo
    DOC: '#A855F7',     // Documentation - Fuchsia
    OPS: '#14B8A6',     // DevOps - Teal
    SEC: '#DC2626',     // Security - Dark Red
    PERF: '#F97316',    // Performance - Orange
    A11Y: '#8B5CF6',    // Accessibility - Purple
    CONFIG: '#6B7280',  // Configuration - Gray
    ARCH: '#7C3AED',    // Architecture - Violet
    MIG: '#0891B2'      // Migration - Cyan
  };

  const hasActiveFilters = filters.search || filters.categories.length > 0 || filters.statuses.length > 0 || filters.priorities.length > 0;

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h2 className="filters-title">🔍 Filters</h2>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filters-grid">
        {/* Search Input */}
        <div className="filter-input-group">
          <input
            type="text"
            id="search"
            className="filter-search"
            placeholder="Search tasks by title, id..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Category Filter */}
        <div className="filter-dropdown-group" ref={openDropdown === 'category' ? dropdownRef : null}>
          <button
            className={`filter-button ${filters.categories.length > 0 ? 'active' : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
          >
            <span className="filter-label">Category</span>
            {filters.categories.length > 0 && (
              <span className="filter-badge">{filters.categories.length}</span>
            )}
            <span className="filter-arrow">▼</span>
          </button>
          {openDropdown === 'category' && (
            <div className="filter-menu">
              {Object.entries(stats.byCategory).map(([cat, count]) => (
                <label key={cat} className="filter-checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span
                    className="category-dot"
                    style={{ backgroundColor: categoryColors[cat] || '#6B7280' }}
                  />
                  <span className="checkbox-label">{cat}</span>
                  <span className="filter-count">({count})</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="filter-dropdown-group" ref={openDropdown === 'status' ? dropdownRef : null}>
          <button
            className={`filter-button ${filters.statuses.length > 0 ? 'active' : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
          >
            <span className="filter-label">Status</span>
            {filters.statuses.length > 0 && (
              <span className="filter-badge">{filters.statuses.length}</span>
            )}
            <span className="filter-arrow">▼</span>
          </button>
          {openDropdown === 'status' && (
            <div className="filter-menu">
              {Object.entries(stats.byStatus).map(([status, count]) => (
                <label key={status} className="filter-checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes(status)}
                    onChange={() => toggleStatus(status)}
                  />
                  <span
                    className="status-dot"
                    style={{ backgroundColor: statusColors[status] || '#6B7280' }}
                  />
                  <span className="checkbox-label">{status}</span>
                  <span className="filter-count">({count})</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Priority Filter */}
        <div className="filter-dropdown-group" ref={openDropdown === 'priority' ? dropdownRef : null}>
          <button
            className={`filter-button ${filters.priorities.length > 0 ? 'active' : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'priority' ? null : 'priority')}
          >
            <span className="filter-label">Priority</span>
            {filters.priorities.length > 0 && (
              <span className="filter-badge">{filters.priorities.length}</span>
            )}
            <span className="filter-arrow">▼</span>
          </button>
          {openDropdown === 'priority' && (
            <div className="filter-menu">
              {Object.entries(stats.byPriority).map(([priority, count]) => (
                <label key={priority} className="filter-checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.priorities.includes(priority)}
                    onChange={() => togglePriority(priority)}
                  />
                  <span
                    className="priority-dot"
                    style={{ backgroundColor: priorityColors[priority] || '#6B7280' }}
                  />
                  <span className="checkbox-label">{priority}</span>
                  <span className="filter-count">({count})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
