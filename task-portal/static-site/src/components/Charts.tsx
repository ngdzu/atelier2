import { Stats } from '../types';
import { AreaChart } from './charts/AreaChart';
import { PieChart } from './charts/PieChart';

export interface ChartsProps {
  stats: Stats;
}

export function Charts({ stats }: ChartsProps) {
  return (
    <div className="charts-grid">
      <div className="chart-card card-surface">
        <div className="stat-label chart-title">Completions by Week</div>
        <AreaChart data={stats.completionsByWeek} />
      </div>

      <div className="chart-card card-surface">
        <div className="stat-label chart-title">Task Categories</div>
        <PieChart data={stats.byCategory} />
      </div>
    </div>
  );
}
