import { Stats, Task } from '../types';
import { AreaChart } from './charts/AreaChart';
import { PieChart } from './charts/PieChart';
import { useMemo, useState } from 'react';

export interface ChartsProps {
  stats: Stats;
  tasks: Task[];
}

function formatLabel(date: Date, granularity: 'day' | 'week' | 'month') {
  if (granularity === 'day') {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
  if (granularity === 'week') {
    const d = new Date(date);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    return `${weekStart.getMonth() + 1}/${weekStart.getDate()}`;
  }
  // month
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function computeCompletionSeries(tasks: Task[], period: '7d' | '14d' | '1m' | '3m' | '6m' | '1y') {
  const now = new Date();
  const periodDays = period === '7d' ? 7 : period === '14d' ? 14 : period === '1m' ? 30 : period === '3m' ? 90 : period === '6m' ? 180 : 365;
  const start = new Date(now);
  start.setDate(now.getDate() - periodDays);

  let granularity: 'day' | 'week' | 'month';
  if (periodDays <= 14) granularity = 'day';
  else if (periodDays <= 90) granularity = 'week';
  else granularity = 'month';

  // Build buckets
  const buckets: Array<{ label: string; start: Date; end: Date }> = [];
  if (granularity === 'day') {
    const cursor = new Date(start);
    while (cursor <= now) {
      const dayStart = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayStart.getDate() + 1);
      buckets.push({ label: formatLabel(dayStart, 'day'), start: dayStart, end: dayEnd });
      cursor.setDate(cursor.getDate() + 1);
    }
  } else if (granularity === 'week') {
    // Align start to week start
    const cursor = new Date(start);
    cursor.setDate(cursor.getDate() - cursor.getDay());
    while (cursor <= now) {
      const weekStart = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);
      buckets.push({ label: formatLabel(weekStart, 'week'), start: weekStart, end: weekEnd });
      cursor.setDate(cursor.getDate() + 7);
    }
  } else {
    // month buckets
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    while (cursor <= now) {
      const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
      const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
      buckets.push({ label: formatLabel(monthStart, 'month'), start: monthStart, end: monthEnd });
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }

  const completedTasks = tasks.filter(t => t.status === 'COMPLETED' && t.updated);
  const series = buckets.map(b => {
    const count = completedTasks.filter(t => {
      const d = new Date(t.updated!);
      return d >= b.start && d < b.end;
    }).length;
    return { label: b.label, count };
  });
  return series;
}

export function Charts({ stats, tasks }: ChartsProps) {
  const [period, setPeriod] = useState<'7d' | '14d' | '1m' | '3m' | '6m' | '1y'>('3m');
  const series = useMemo(() => computeCompletionSeries(tasks, period), [tasks, period]);

  return (
    <div className="charts-grid">
      <div className="chart-card card-surface">
        <div className="stat-label chart-title">Completions</div>
        <AreaChart data={series} />
        <div className="chart-toggle" role="group" aria-label="Select completion period">
          {(['7d', '14d', '1m', '3m', '6m', '1y'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`chart-toggle-btn ${period === p ? 'active' : ''}`}
              aria-pressed={period === p}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-card card-surface">
        <div className="stat-label chart-title">Task Categories</div>
        <PieChart data={stats.byCategory} />
      </div>
    </div>
  );
}
