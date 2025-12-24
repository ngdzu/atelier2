import { Task } from '../types';
import { getStatusColor, getPriorityColor, getCategoryColor } from '../utils/colors';

export interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function TaskTable({ tasks, onTaskClick }: TaskTableProps) {
  return (
    <div className="table-container card-surface">
      <table className="task-table">
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
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={8} className="no-results">
                No tasks match your filters.
              </td>
            </tr>
          ) : (
            tasks.map(task => {
              const statusColor = getStatusColor(task.status);
              const priorityColor = task.priority ? getPriorityColor(task.priority) : '#6B7280';
              const categoryColor = getCategoryColor(task.category);

              return (
                <tr key={task.id} className="task-row">
                  <td>
                    <span 
                      className="task-id" 
                      onClick={() => onTaskClick(task)}
                      style={{ cursor: 'pointer' }}
                    >
                      {task.id}
                    </span>
                  </td>
                  <td className="task-title">{task.title}</td>
                  <td>
                    <span 
                      className="badge" 
                      style={{ 
                        background: `${categoryColor}20`, 
                        color: categoryColor,
                        border: `1px solid ${categoryColor}40`
                      }}
                    >
                      {task.category}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="badge" 
                      style={{ 
                        background: `${statusColor}20`, 
                        color: statusColor 
                      }}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="badge" 
                      style={{ 
                        background: `${priorityColor}20`, 
                        color: priorityColor 
                      }}
                    >
                      {task.priority || 'N/A'}
                    </span>
                  </td>
                  <td>{task.assignee || 'unassigned'}</td>
                  <td>{formatDate(task.created)}</td>
                  <td>{formatDate(task.updated)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
