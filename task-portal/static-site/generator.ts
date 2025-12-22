import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read TASK_REGISTRY.json
const registryPath = path.join(__dirname, '../../.tasks/TASK_REGISTRY.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

// Helper function to format date
function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Calculate statistics
function calculateStats(tasks: any[]) {
    const stats = {
        total: tasks.length,
        byStatus: {} as Record<string, number>,
        byCategory: {} as Record<string, number>,
        byPriority: {} as Record<string, number>,
        completionRate: 0,
        totalCompleted: 0
    };

    tasks.forEach(task => {
        // Count by status
        stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;

        // Count by category
        stats.byCategory[task.category] = (stats.byCategory[task.category] || 0) + 1;

        // Count by priority
        if (task.priority) {
            stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;
        }

        // Count completed
        if (task.status === 'COMPLETED') {
            stats.totalCompleted++;
        }
    });

    stats.completionRate = stats.total > 0 ? Math.round((stats.totalCompleted / stats.total) * 100) : 0;

    return stats;
}

// Get status color
function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        'PENDING': '#3B82F6',
        'IN_PROGRESS': '#F59E0B',
        'BLOCKED': '#EF4444',
        'COMPLETED': '#10B981',
        'CANCELLED': '#6B7280'
    };
    return colors[status] || '#6B7280';
}

// Get priority color
function getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
        'CRITICAL': '#DC2626',
        'HIGH': '#F59E0B',
        'MEDIUM': '#3B82F6',
        'LOW': '#6B7280'
    };
    return colors[priority] || '#6B7280';
}

// Generate HTML
function generateHTML(tasks: any[], stats: any, metadata: any): string {
    const lastUpdated = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata?.projectName || 'Task Portal'} - Dashboard</title>
  <meta name="description" content="Task management dashboard for ${metadata?.projectName || 'this project'}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📋</text></svg>">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f9fafb;
      color: #111827;
      line-height: 1.6;
      padding: 2rem 1rem;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      margin-bottom: 2rem;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #6b7280;
      font-size: 1rem;
    }

    .controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .control-group {
      flex: 1;
      min-width: 200px;
    }

    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #3B82F6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
    }

    .stat-breakdown {
      margin-top: 1rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .stat-breakdown-item {
      display: flex;
      justify-content: space-between;
      padding: 0.25rem 0;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #f9fafb;
      border-bottom: 2px solid #e5e7eb;
    }

    th {
      padding: 1rem;
      text-align: left;
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      user-select: none;
    }

    th:hover {
      background: #f3f4f6;
    }

    th.sortable::after {
      content: ' ↕';
      opacity: 0.3;
    }

    th.sorted-asc::after {
      content: ' ↑';
      opacity: 1;
    }

    th.sorted-desc::after {
      content: ' ↓';
      opacity: 1;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid #f3f4f6;
    }

    tr:hover {
      background: #f9fafb;
    }

    .task-id {
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.875rem;
      font-weight: 600;
      color: #3B82F6;
    }

    .task-title {
      font-weight: 500;
      color: #1f2937;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #3B82F6;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    footer {
      margin-top: 3rem;
      text-align: center;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .no-results {
      padding: 3rem;
      text-align: center;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .table-container {
        overflow-x: auto;
      }

      h1 {
        font-size: 2rem;
      }

      .controls {
        flex-direction: column;
      }
    }

    @media print {
      body {
        background: white;
      }

      .controls {
        display: none;
      }

      .stat-card, .table-container {
        box-shadow: none;
        border: 1px solid #e5e7eb;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📋 ${metadata?.projectName || 'Task Portal'}</h1>
      <p class="subtitle">Project Task Dashboard</p>
    </header>

    <div class="controls">
      <div class="control-group">
        <label for="search">Search</label>
        <input type="text" id="search" placeholder="Search tasks...">
      </div>
      <div class="control-group">
        <label for="category-filter">Category</label>
        <select id="category-filter">
          <option value="">All Categories</option>
          ${Object.keys(stats.byCategory).map(cat => `<option value="${cat}">${cat}</option>`).join('')}
        </select>
      </div>
      <div class="control-group">
        <label for="status-filter">Status</label>
        <select id="status-filter">
          <option value="">All Statuses</option>
          ${Object.keys(stats.byStatus).map(status => `<option value="${status}">${status}</option>`).join('')}
        </select>
      </div>
      <div class="control-group">
        <label for="priority-filter">Priority</label>
        <select id="priority-filter">
          <option value="">All Priorities</option>
          ${Object.keys(stats.byPriority).map(priority => `<option value="${priority}">${priority}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-label">Total Tasks</div>
        <div class="stat-value">${stats.total}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Completion Rate</div>
        <div class="stat-value">${stats.completionRate}%</div>
        <div class="progress-bar" style="margin-top: 1rem;">
          <div class="progress-fill" style="width: ${stats.completionRate}%; background: ${stats.completionRate === 100 ? '#10B981' : stats.completionRate >= 67 ? '#3B82F6' : stats.completionRate >= 34 ? '#F59E0B' : '#EF4444'}"></div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">By Status</div>
        <div class="stat-breakdown">
          ${Object.entries(stats.byStatus).map(([status, count]) =>
        `<div class="stat-breakdown-item">
              <span>${status}</span>
              <span style="font-weight: 600;">${count}</span>
            </div>`
    ).join('')}
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">By Category</div>
        <div class="stat-breakdown">
          ${Object.entries(stats.byCategory).slice(0, 5).map(([category, count]) =>
        `<div class="stat-breakdown-item">
              <span>${category}</span>
              <span style="font-weight: 600;">${count}</span>
            </div>`
    ).join('')}
          ${Object.keys(stats.byCategory).length > 5 ? `<div class="stat-breakdown-item"><span>...</span></div>` : ''}
        </div>
      </div>
    </div>

    <div class="table-container">
      <table id="task-table">
        <thead>
          <tr>
            <th class="sortable" data-sort="id">Task ID</th>
            <th class="sortable" data-sort="title">Title</th>
            <th class="sortable" data-sort="category">Category</th>
            <th class="sortable" data-sort="status">Status</th>
            <th class="sortable" data-sort="priority">Priority</th>
            <th class="sortable" data-sort="assignee">Assignee</th>
            <th class="sortable" data-sort="created">Created</th>
            <th class="sortable" data-sort="updated">Updated</th>
          </tr>
        </thead>
        <tbody id="task-tbody">
          ${tasks.map(task => `
            <tr class="task-row" 
                data-category="${task.category}" 
                data-status="${task.status}" 
                data-priority="${task.priority || ''}"
                data-id="${task.id}"
                data-title="${task.title}"
                data-assignee="${task.assignee || ''}"
                data-created="${task.created || ''}"
                data-updated="${task.updated || ''}">
              <td><span class="task-id">${task.id}</span></td>
              <td><span class="task-title">${task.title}</span></td>
              <td><span class="badge" style="background: #e5e7eb; color: #374151;">${task.category}</span></td>
              <td><span class="badge" style="background: ${getStatusColor(task.status)}20; color: ${getStatusColor(task.status)};">${task.status}</span></td>
              <td>${task.priority ? `<span class="badge" style="background: ${getPriorityColor(task.priority)}20; color: ${getPriorityColor(task.priority)};">${task.priority}</span>` : '-'}</td>
              <td>${task.assignee || 'unassigned'}</td>
              <td>${formatDate(task.created)}</td>
              <td>${formatDate(task.updated)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div id="no-results" class="no-results" style="display: none;">
        No tasks match your filters.
      </div>
    </div>

    <footer>
      <p>Last updated: ${lastUpdated}</p>
      <p style="margin-top: 0.5rem;">Generated from TASK_REGISTRY.json</p>
    </footer>
  </div>

  <script>
    // Filter functionality
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');
    const taskRows = document.querySelectorAll('.task-row');
    const noResults = document.getElementById('no-results');
    const tbody = document.getElementById('task-tbody');

    function filterTasks() {
      const search = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      const status = statusFilter.value;
      const priority = priorityFilter.value;

      let visibleCount = 0;

      taskRows.forEach(row => {
        const matchSearch = !search || 
          row.dataset.id.toLowerCase().includes(search) ||
          row.dataset.title.toLowerCase().includes(search);
        const matchCategory = !category || row.dataset.category === category;
        const matchStatus = !status || row.dataset.status === status;
        const matchPriority = !priority || row.dataset.priority === priority;

        const isVisible = matchSearch && matchCategory && matchStatus && matchPriority;
        row.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount++;
      });

      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      tbody.style.display = visibleCount === 0 ? 'none' : '';
    }

    searchInput.addEventListener('input', filterTasks);
    categoryFilter.addEventListener('change', filterTasks);
    statusFilter.addEventListener('change', filterTasks);
    priorityFilter.addEventListener('change', filterTasks);

    // Sorting functionality
    let currentSort = { column: null, direction: 'asc' };

    document.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const column = th.dataset.sort;
        
        // Toggle direction if same column, otherwise default to asc
        if (currentSort.column === column) {
          currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
          currentSort.column = column;
          currentSort.direction = 'asc';
        }

        // Update UI
        document.querySelectorAll('th.sortable').forEach(header => {
          header.classList.remove('sorted-asc', 'sorted-desc');
        });
        th.classList.add(currentSort.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');

        // Sort rows
        const sortedRows = Array.from(taskRows).sort((a, b) => {
          let aVal = a.dataset[column] || '';
          let bVal = b.dataset[column] || '';

          // Handle numeric sorting for dates
          if (column === 'created' || column === 'updated') {
            aVal = new Date(aVal).getTime() || 0;
            bVal = new Date(bVal).getTime() || 0;
          }

          if (aVal < bVal) return currentSort.direction === 'asc' ? -1 : 1;
          if (aVal > bVal) return currentSort.direction === 'asc' ? 1 : -1;
          return 0;
        });

        // Re-append rows in sorted order
        sortedRows.forEach(row => tbody.appendChild(row));
      });
    });
  </script>
</body>
</html>`;
}

// Main execution
try {
    const tasks = registry.tasks || [];
    const metadata = registry.metadata || {};
    const stats = calculateStats(tasks);

    const html = generateHTML(tasks, stats, metadata);

    // Create public directory if it doesn't exist
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write HTML file
    const outputPath = path.join(publicDir, 'index.html');
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log('✅ Static site generated successfully!');
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📊 Generated dashboard with ${tasks.length} tasks`);
    console.log(`\n🚀 To preview locally, run: npm run serve`);
} catch (error) {
    console.error('❌ Error generating static site:', error);
    process.exit(1);
}
