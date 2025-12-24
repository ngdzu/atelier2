import { useEffect } from 'react';
import { Task } from '../types';
import { getStatusColor, getPriorityColor } from '../utils/colors';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function TaskModal({ task, onClose }: TaskModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const statusColor = getStatusColor(task.status);
  const priorityColor = task.priority ? getPriorityColor(task.priority) : '#6B7280';

  return (
    <div className="modal active" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{task.title}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">Task ID</div>
              <div className="detail-value">{task.id}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Status</div>
              <div className="detail-value">
                <span 
                  className="badge" 
                  style={{ background: `${statusColor}20`, color: statusColor }}
                >
                  {task.status}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Priority</div>
              <div className="detail-value">
                {task.priority ? (
                  <span 
                    className="badge" 
                    style={{ background: `${priorityColor}20`, color: priorityColor }}
                  >
                    {task.priority}
                  </span>
                ) : '-'}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Category</div>
              <div className="detail-value">
                <span className="badge" style={{ background: '#e5e7eb', color: '#374151' }}>
                  {task.category}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Assignee</div>
              <div className="detail-value">{task.assignee || 'unassigned'}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Created</div>
              <div className="detail-value">{formatDate(task.created)}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Updated</div>
              <div className="detail-value">{formatDate(task.updated)}</div>
            </div>

            {task.estimatedTime && (
              <div className="detail-item">
                <div className="detail-label">Estimated Time</div>
                <div className="detail-value">{task.estimatedTime}</div>
              </div>
            )}

            {task.actualTime && (
              <div className="detail-item">
                <div className="detail-label">Actual Time</div>
                <div className="detail-value">{task.actualTime}</div>
              </div>
            )}

            {task.progress && (
              <div className="detail-item">
                <div className="detail-label">Progress</div>
                <div className="progress-info">
                  <div className="progress-bar" style={{ flex: 1, height: '8px' }}>
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${task.progress.percentage || 0}%`,
                        background: task.progress.percentage === 100 ? '#10B981' : 
                                  task.progress.percentage! >= 50 ? '#3B82F6' : '#F59E0B'
                      }}
                    />
                  </div>
                  <span className="progress-percentage">{task.progress.percentage || 0}%</span>
                </div>
                <div className="progress-text">
                  {task.progress.completed || 0} of {task.progress.total || 0} steps completed
                </div>
              </div>
            )}
          </div>

          {task.description && (
            <div className="detail-section">
              <div className="detail-section-title">Description</div>
              <div className="detail-description">{task.description}</div>
            </div>
          )}

          {task.dependencies && task.dependencies.length > 0 && (
            <div className="detail-section">
              <div className="detail-section-title">Dependencies</div>
              <div className="detail-value">{task.dependencies.join(', ')}</div>
            </div>
          )}

          {task.relatedTasks && task.relatedTasks.length > 0 && (
            <div className="detail-section">
              <div className="detail-section-title">Related Tasks</div>
              <div className="detail-value">{task.relatedTasks.join(', ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
