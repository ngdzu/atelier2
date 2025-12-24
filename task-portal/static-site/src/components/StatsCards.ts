/**
 * Statistics card component
 */
export interface StatCardProps {
    icon: string;
    label: string;
    value: number;
    isProgressCard?: boolean;
    progressPercentage?: number;
}

export function StatCard({ icon, label, value, isProgressCard = false, progressPercentage = 0 }: StatCardProps): string {
    const progressBar = isProgressCard ? `
    <div class="progress-bar">
      <div class="progress-fill" data-target-width="${progressPercentage}"></div>
    </div>
  ` : '';

    return `
    <div class="stat-card card-surface ${isProgressCard ? 'has-progress' : ''}" data-value="${value}" ${isProgressCard ? `data-progress="${progressPercentage}"` : ''}>
      <div class="stat-label">${icon} ${label}</div>
      <div class="stat-value">${value}${isProgressCard ? '%' : ''}</div>
      ${progressBar}
    </div>
  `;
}

/**
 * Statistics cards container
 */
export interface StatsCardsProps {
    total: number;
    completionRate: number;
    byStatus: Record<string, number>;
    totalCompleted: number;
}

export function StatsCards({ total, completionRate, byStatus, totalCompleted }: StatsCardsProps): string {
    const gradStart = completionRate === 100 ? '#10B981' : completionRate >= 67 ? '#3B82F6' : completionRate >= 34 ? '#F59E0B' : '#EF4444';
    const gradEnd = completionRate === 100 ? '#059669' : completionRate >= 67 ? '#1D4ED8' : completionRate >= 34 ? '#D97706' : '#DC2626';
    return `
    <div class="stats">
      <div class="stat-card card-surface">
        <div class="stat-card-icon">🎯</div>
        <div class="stat-label">Total Tasks</div>
        <div class="stat-value">${total}</div>
        <div class="stat-subtitle">Tasks tracked in project</div>
      </div>
      <div class="stat-card card-surface">
        <div class="stat-card-icon">✓</div>
        <div class="stat-label">Completion Rate</div>
        <div class="stat-value">${completionRate}%</div>
        <div class="progress-bar" style="margin-top: 1.5rem;">
          <div class="progress-fill" style="width: ${completionRate}%; background: linear-gradient(90deg, ${gradStart}, ${gradEnd}); box-shadow: 0 0 20px ${completionRate === 100 ? 'rgba(16, 185, 129, 0.4)' : completionRate >= 67 ? 'rgba(59, 130, 246, 0.4)' : completionRate >= 34 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(239, 68, 68, 0.4)'}"></div>
        </div>
        <div class="stat-subtitle">${totalCompleted} of ${total} completed</div>
      </div>
      <div class="stat-card card-surface">
        <div class="stat-card-icon">📊</div>
        <div class="stat-label">Tasks by Status</div>
        <svg id="barChartStatus" class="chart" viewBox="0 0 400 240"></svg>
      </div>
    </div>
  `;
}
