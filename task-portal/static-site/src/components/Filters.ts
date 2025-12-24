/**
 * Filters component - Search, category, status, and priority filters
 */
export interface FiltersProps {
    categories: string[];
    statuses: string[];
    priorities: string[];
}

export function Filters({ categories, statuses, priorities }: FiltersProps): string {
    const categoryOptions = categories.map(cat =>
        `<option value="${cat}">${cat}</option>`
    ).join('');

    const statusOptions = statuses.map(status =>
        `<option value="${status}">${status}</option>`
    ).join('');

    const priorityOptions = priorities.map(priority =>
        `<option value="${priority}">${priority}</option>`
    ).join('');

    return `
    <div class="filters-section card-surface">
      <h3 class="filters-title">Filters</h3>
      <div class="filters">
        <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search tasks...">
        <select id="categoryFilter" class="filter-select">
          <option value="">All Categories</option>
          ${categoryOptions}
        </select>
        <select id="statusFilter" class="filter-select">
          <option value="">All Statuses</option>
          ${statusOptions}
        </select>
        <select id="priorityFilter" class="filter-select">
          <option value="">All Priorities</option>
          ${priorityOptions}
        </select>
      </div>
    </div>
  `;
}
