/**
 * Task table component
 */
import { getCategoryColor } from '../utils/colors.js';

export interface Task {
    id: string;
    title: string;
    status: string;
    priority?: string;
    category: string;
    assignee?: string;
    created?: string;
    updated?: string;
    filePath?: string;
    description?: string;
    estimatedTime?: string;
    actualTime?: string;
    dependencies?: string[];
    relatedTasks?: string[];
    progress?: {
        percentage?: number;
        completed?: number;
        total?: number;
    };
}

export interface TaskTableProps {
    tasks: Task[];
}

function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        PENDING: '#3B82F6',
        IN_PROGRESS: '#F59E0B',
        BLOCKED: '#EF4444',
        COMPLETED: '#10B981',
        CANCELLED: '#6B7280'
    };
    return colors[status] || '#6B7280';
}

function getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
        HIGH: '#EF4444',
        MEDIUM: '#F59E0B',
        LOW: '#10B981'
    };
    return colors[priority] || '#6B7280';
}

export function TaskRow(task: Task): string {
    const statusColor = getStatusColor(task.status);
    const priorityColor = task.priority ? getPriorityColor(task.priority) : '#6B7280';
    const categoryColor = getCategoryColor(task.category);
    const assignee = task.assignee || 'unassigned';

    return `
    <tr class="task-row"
        data-id="${task.id}"
        data-title="${task.title}"
        data-status="${task.status}"
        data-priority="${task.priority || ''}"
        data-category="${task.category}"
        data-assignee="${assignee}"
        data-created="${task.created || ''}"
        data-updated="${task.updated || ''}">
      <td><span class="task-id">${task.id}</span></td>
      <td class="task-title">${task.title}</td>
      <td><span class="badge" style="background: ${categoryColor}20; color: ${categoryColor}; border: 1px solid ${categoryColor}40;">${task.category}</span></td>
      <td><span class="badge" style="background: ${statusColor}20; color: ${statusColor};">${task.status}</span></td>
      <td><span class="badge" style="background: ${priorityColor}20; color: ${priorityColor};">${task.priority || 'N/A'}</span></td>
      <td>${assignee}</td>
      <td>${formatDate(task.created)}</td>
      <td>${formatDate(task.updated)}</td>
    </tr>
  `;
}

export function TaskTable({ tasks }: TaskTableProps): string {
    const rows = tasks.map(task => TaskRow(task)).join('');

    return `
    <div class="table-container card-surface">
      <table class="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody id="taskTableBody">
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}
