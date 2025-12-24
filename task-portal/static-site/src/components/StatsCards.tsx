import { Stats } from '../types';
import { BarChart } from './charts/BarChart';

export interface StatsCardsProps {
  stats: Stats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const completionColor = 
    stats.completionRate === 100 ? '#10B981' :
    stats.completionRate >= 67 ? '#3B82F6' :
    stats.completionRate >= 34 ? '#F59E0B' : '#EF4444';

  return (
    <div className="stats">
      {/* Total Tasks Card */}
      <div className="stat-card card-surface">
        <div className="stat-card-icon">🎯</div>
        <div className="stat-label">Total Tasks</div>
        <div className="stat-value">{stats.total}</div>
        <div className="stat-subtitle">Tasks tracked in project</div>
      </div>

      {/* Completion Rate Card */}
      <div className="stat-card card-surface">
        <div className="stat-card-icon">✓</div>
        <div className="stat-label">Completion Rate</div>
        <div className="stat-value">{stats.completionRate}%</div>
        <div className="progress-bar" style={{ marginTop: '1.5rem' }}>
          <div 
            className="progress-fill" 
            style={{ 
              width: `${stats.completionRate}%`,
              background: `linear-gradient(90deg, ${completionColor}, ${completionColor})`,
              boxShadow: `0 0 20px ${completionColor}40`
            }}
          />
        </div>
        <div className="stat-subtitle">{stats.totalCompleted} of {stats.total} completed</div>
      </div>

      {/* Status Chart Card */}
      <div className="stat-card card-surface">
        <div className="stat-card-icon">📊</div>
        <div className="stat-label">Tasks by Status</div>
        <BarChart 
          data={stats.byStatus}
          colorMap={{
            PENDING: '#3B82F6',
            IN_PROGRESS: '#F59E0B',
            BLOCKED: '#EF4444',
            COMPLETED: '#10B981',
            CANCELLED: '#6B7280'
          }}
        />
      </div>
    </div>
  );
}
