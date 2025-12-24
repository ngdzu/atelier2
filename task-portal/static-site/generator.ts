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
    totalCompleted: 0,
    completionsByWeek: [] as { week: string; count: number }[]
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

  // Compute completions per week for last 8 weeks (ISO week label like '2025-W52')
  const now = new Date();
  const weekBuckets = new Map<string, number>();
  function isoWeek(date: Date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    const yr = d.getUTCFullYear();
    return `${yr}-W${String(weekNo).padStart(2, '0')}`;
  }
  const last8WeeksLabels: string[] = [];
  for (let i = 7; i >= 0; i--) {
    const dt = new Date(now);
    dt.setDate(now.getDate() - i * 7);
    last8WeeksLabels.push(isoWeek(dt));
  }
  tasks
    .filter(t => t.status === 'COMPLETED' && t.updated)
    .forEach(t => {
      const w = isoWeek(new Date(t.updated));
      weekBuckets.set(w, (weekBuckets.get(w) || 0) + 1);
    });
  stats.completionsByWeek = last8WeeksLabels.map(w => ({ week: w, count: weekBuckets.get(w) || 0 }));

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

// Get category color - matches pie chart palette
function getCategoryColor(category: string, allCategories: string[]): string {
  const palette = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#10B981', '#6B7280', '#22C55E'];
  const index = allCategories.indexOf(category);
  return index >= 0 ? palette[index % palette.length] : '#6B7280';
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

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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
      padding: 1rem 2rem;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
      border-radius: 16px;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, #EC4899, transparent);
      border-radius: 16px 16px 0 0;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 0;
      background: linear-gradient(135deg, #1f2937 0%, #3B82F6 25%, #8B5CF6 75%, #EC4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      position: relative;
      z-index: 1;
    }

    .subtitle {
      color: #6b7280;
      font-size: 1.125rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      margin: 0;
      position: relative;
      z-index: 1;
    }

    .controls {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      position: relative;
    }

    .filters-section {
      margin-bottom: 2rem;
    }

    .filters-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
      padding-left: 0.5rem;
      border-left: 4px solid #8B5CF6;
    }
      overflow: visible;
      z-index: 1;
    }

    .controls::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
      border-radius: 20px 20px 0 0;
    }

    .control-group {
      flex: 1;
      min-width: 200px;
      display: flex;
      flex-direction: column;
    }

    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.75rem;
    }

    input, select {
      width: 100%;
      padding: 0.875rem;
      border: 1px solid rgba(209, 213, 219, 0.6);
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255, 255, 255, 0.7);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #374151;
    }

    input::placeholder {
      color: #9ca3af;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #3B82F6;
      background: white;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(59, 130, 246, 0.15);
      transform: translateY(-1px);
    }

    /* Checkbox dropdown styles */
    .checkbox-dropdown {
      position: relative;
      width: 100%;
      z-index: 1;
    }

    .dropdown-toggle {
      width: 100%;
      padding: 0.875rem;
      border: 1px solid rgba(209, 213, 219, 0.6);
      border-radius: 12px;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.7);
      color: #374151;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 500;
      gap: 0.75rem;
    }

    .dropdown-toggle::after {
      content: '';
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #9ca3af;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }

    .dropdown-toggle.active::after {
      transform: rotate(180deg);
      border-top-color: #3B82F6;
    }

    .dropdown-toggle:hover {
      border-color: #3B82F6;
      background: white;
    }

    .dropdown-toggle.active {
      border-color: #3B82F6;
      background: white;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(59, 130, 246, 0.15);
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid rgba(209, 213, 219, 0.8);
      border-radius: 12px;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.16);
      z-index: 10000;
      max-height: 300px;
      overflow-y: auto;
      display: none;
      margin-top: 0;
    }

    .dropdown-menu.open {
      display: block;
      animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      padding: 0.875rem 1.25rem;
      border-bottom: 1px solid rgba(229, 231, 235, 0.4);
      cursor: pointer;
      transition: background 0.2s;
    }

    .checkbox-item:hover {
      background: rgba(59, 130, 246, 0.05);
    }

    .checkbox-item:last-child {
      border-bottom: none;
    }

    .checkbox-item input[type="checkbox"] {
      width: auto;
      margin-right: 0.875rem;
      cursor: pointer;
      accent-color: #3B82F6;
      width: 18px;
      height: 18px;
    }

    .checkbox-item label {
      flex: 1;
      margin: 0;
      cursor: pointer;
      font-weight: 500;
      color: #4b5563;
      font-size: 0.95rem;
    }

    .checkbox-item input[type="checkbox"]:checked + label {
      color: #3B82F6;
      font-weight: 600;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-right: 0.5rem;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    /* Charts */
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    /* Shared surface for stat and chart cards */
    .card-surface {
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-surface:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.06);
      border-color: rgba(255, 255, 255, 0.8);
    }

    .card-surface::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
      border-radius: 20px 20px 0 0;
    }

    .chart-card {
      padding: 1.5rem;
    }

    .chart-stats {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .chart-title {
      margin-bottom: 0.75rem;
      position: relative;
      z-index: 1;
    }

    .chart {
      width: 100%;
      height: 240px;
    }

    .chart-legend {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 0.5rem 1rem;
    }

    .chart-legend-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      border: 1px solid rgba(0, 0, 0, 0.04);
      border-radius: 12px;
      background: #fff;
    }

    .chart-legend-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #374151;
      font-weight: 600;
    }

    .chart-legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .chart-tooltip {
      position: fixed;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      background: rgba(17, 24, 39, 0.95);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      pointer-events: none;
      opacity: 0;
      z-index: 9999;
      white-space: nowrap;
      transition: opacity 150ms ease;
    }

    .chart-tooltip.visible {
      opacity: 1;
    }

    .stat-card {
      padding: 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 56px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.08);
    }

    .stat-card:hover .stat-value {
      animation: countUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .stat-card:hover .progress-fill {
      animation: fillProgress 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .stat-card-icon {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      font-size: 2.5rem;
      opacity: 0.1;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      font-weight: 700;
      position: relative;
      z-index: 1;
    }

    .stat-value {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      position: relative;
      z-index: 1;
    }

    .stat-subtitle {
      font-size: 0.875rem;
      color: #9ca3af;
      position: relative;
      z-index: 1;
    }

    .stat-breakdown {
      margin-top: 1.5rem;
      font-size: 0.875rem;
      color: #6b7280;
      position: relative;
      z-index: 1;
    }

    .stat-breakdown-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .stat-breakdown-item:last-child {
      border-bottom: none;
    }

    .stat-breakdown-item span:first-child {
      color: #4b5563;
      font-weight: 500;
    }

    .stat-breakdown-item span:last-child {
      font-weight: 700;
      color: #1f2937;
      background: linear-gradient(135deg, #3B82F6, #8B5CF6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .expand-btn {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #8B5CF6, #EC4899);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    }

    .expand-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
    }

    .expand-btn.expanded {
      background: linear-gradient(135deg, #6366F1, #D946EF);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
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
      height: 16px;
      background: linear-gradient(90deg, rgba(229, 231, 235, 0.5), rgba(209, 213, 219, 0.5));
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    @keyframes fillProgress {
      from {
        width: 0%;
      }
      to {
        width: var(--progress-width, 0%);
      }
    }

    @keyframes countUp {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes cardPulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.02);
      }
      100% {
        transform: scale(1);
      }
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
      position: relative;
      border-radius: 12px;
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.4);
      overflow: hidden;
      transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .progress-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
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

    /* Modal styles */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      overflow-y: auto;
    }

    .modal.active {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      max-width: 800px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: start;
    }

    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
      flex: 1;
      padding-right: 1rem;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .modal-close:hover {
      background: #f3f4f6;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .detail-grid {
      display: grid;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .detail-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .detail-value {
      font-size: 1rem;
      color: #111827;
    }

    .detail-section {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .detail-section-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.75rem;
    }

    .detail-description {
      color: #4b5563;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    .task-id {
      cursor: pointer;
      color: #3b82f6;
      text-decoration: none;
    }

    .task-id:hover {
      text-decoration: underline;
    }

    .progress-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .progress-percentage {
      font-weight: 600;
      color: #111827;
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

      .card-surface, .table-container {
        box-shadow: none;
        border: 1px solid #e5e7eb;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${metadata?.projectName || 'Task Portal'}</h1>
      <nav class="header-nav">
        <!-- Future navigation items -->
      </nav>
    </header>

    <div class="stats">
      <div class="stat-card card-surface">
        <div class="stat-card-icon">🎯</div>
        <div class="stat-label">Total Tasks</div>
        <div class="stat-value">${stats.total}</div>
        <div class="stat-subtitle">Tasks tracked in project</div>
      </div>
      <div class="stat-card card-surface">
        <div class="stat-card-icon">✓</div>
        <div class="stat-label">Completion Rate</div>
        <div class="stat-value">${stats.completionRate}%</div>
        <div class="progress-bar" style="margin-top: 1.5rem;">
          <div class="progress-fill" style="width: ${stats.completionRate}%; background: linear-gradient(90deg, ${stats.completionRate === 100 ? '#10B981' : stats.completionRate >= 67 ? '#3B82F6' : stats.completionRate >= 34 ? '#F59E0B' : '#EF4444'}, ${stats.completionRate === 100 ? '#059669' : stats.completionRate >= 67 ? '#1D4ED8' : stats.completionRate >= 34 ? '#D97706' : '#DC2626'}); box-shadow: 0 0 20px ${stats.completionRate === 100 ? 'rgba(16, 185, 129, 0.4)' : stats.completionRate >= 67 ? 'rgba(59, 130, 246, 0.4)' : stats.completionRate >= 34 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(239, 68, 68, 0.4)'}"></div>
        </div>
        <div class="stat-subtitle">${stats.totalCompleted} of ${stats.total} completed</div>
      </div>
      <div class="stat-card card-surface">
        <div class="stat-card-icon">📊</div>
        <div class="stat-label chart-title">Tasks by Status</div>
        <svg id="barChartStatus" class="chart" viewBox="0 0 400 240"></svg>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-grid">
      <div class="chart-card card-surface">
        <div class="stat-label chart-title">Completions by Week</div>
        <svg id="areaChart" class="chart" viewBox="0 0 400 240"></svg>
      </div>
      <div class="chart-card card-surface">
        <div class="stat-label chart-title">Task categories</div>
        <svg id="pieChart" class="chart" viewBox="0 0 200 200"></svg>
        <div id="pieLegend" class="chart-legend"></div>
      </div>
    </div>

    <div class="filters-section">
      <h2 class="filters-title">Filters</h2>
      <div class="controls">
        <div class="control-group">
          <label for="search">Search</label>
          <input type="text" id="search" placeholder="Search tasks...">
        </div>
        <div class="control-group">
          <label>Category</label>
          <div class="checkbox-dropdown">
            <button class="dropdown-toggle" id="category-toggle">Select Category</button>
            <div class="dropdown-menu" id="category-dropdown">
              ${Object.keys(stats.byCategory).map(cat => `<div class="checkbox-item">
                  <input type="checkbox" id="category-${cat}" value="${cat}" class="category-checkbox">
                  <label for="category-${cat}">${cat}</label>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="control-group">
          <label>Status</label>
          <div class="checkbox-dropdown">
            <button class="dropdown-toggle" id="status-toggle">Select Status</button>
            <div class="dropdown-menu" id="status-dropdown">
              ${Object.keys(stats.byStatus).map(status => {
    const colors = { 'PENDING': '#3B82F6', 'IN_PROGRESS': '#F59E0B', 'BLOCKED': '#EF4444', 'COMPLETED': '#10B981', 'CANCELLED': '#6B7280' };
    return `<div class="checkbox-item">
                  <input type="checkbox" id="status-${status}" value="${status}" class="status-checkbox">
                  <label for="status-${status}" style="color: ${colors[status as keyof typeof colors] || '#6B7280'}; display: flex; align-items: center;">
                    <span class="status-badge" style="background: ${colors[status as keyof typeof colors] || '#6B7280'}20; color: ${colors[status as keyof typeof colors] || '#6B7280'};">${status}</span>
                  </label>
                </div>`;
  }).join('')}
            </div>
          </div>
        </div>
        <div class="control-group">
          <label>Priority</label>
          <div class="checkbox-dropdown">
            <button class="dropdown-toggle" id="priority-toggle">Select Priority</button>
            <div class="dropdown-menu" id="priority-dropdown">
              ${Object.keys(stats.byPriority).map(priority => `<div class="checkbox-item">
                  <input type="checkbox" id="priority-${priority}" value="${priority}" class="priority-checkbox">
                  <label for="priority-${priority}">${priority}</label>
                </div>`).join('')}
            </div>
          </div>
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
              <td><span class="badge" style="background: ${getCategoryColor(task.category, Object.keys(stats.byCategory).sort((a, b) => stats.byCategory[b] - stats.byCategory[a]))}20; color: ${getCategoryColor(task.category, Object.keys(stats.byCategory).sort((a, b) => stats.byCategory[b] - stats.byCategory[a]))}; border: 1px solid ${getCategoryColor(task.category, Object.keys(stats.byCategory).sort((a, b) => stats.byCategory[b] - stats.byCategory[a]))}40;">${task.category}</span></td>
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

  <!-- Task Detail Modal -->
  <div id="task-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title"></h2>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body" id="modal-body"></div>
    </div>
  </div>

  <script>
    // Task data for modal
    const tasksData = ${JSON.stringify(tasks, null, 2)};
    const statsData = ${JSON.stringify(stats, null, 2)};

    // Modal functions
    function openTaskModal(taskId) {
      const task = tasksData.find(t => t.id === taskId);
      if (!task) return;

      const modal = document.getElementById('task-modal');
      const modalTitle = document.getElementById('modal-title');
      const modalBody = document.getElementById('modal-body');

      modalTitle.textContent = task.title;

      // Build modal content
      let progressHTML = '';
      if (task.progress) {
        const percentage = task.progress.percentage || 0;
        const completed = task.progress.completed || 0;
        const total = task.progress.total || 0;
        progressHTML = \`
          <div class="detail-item">
            <div class="detail-label">Progress</div>
            <div class="progress-info">
              <div class="progress-bar" style="flex: 1; height: 8px;">
                <div class="progress-fill" style="width: \${percentage}%; background: \${percentage === 100 ? '#10B981' : percentage >= 50 ? '#3B82F6' : '#F59E0B'}"></div>
              </div>
              <span class="progress-percentage">\${percentage}%</span>
            </div>
            <div class="progress-text">\${completed} of \${total} steps completed</div>
          </div>
        \`;
      }

      modalBody.innerHTML = \`
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">Task ID</div>
            <div class="detail-value">\${task.id}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Status</div>
            <div class="detail-value">
              <span class="badge" style="background: \${getStatusColorJS(task.status)}20; color: \${getStatusColorJS(task.status)};">\${task.status}</span>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Priority</div>
            <div class="detail-value">
              \${task.priority ? \`<span class="badge" style="background: \${getPriorityColorJS(task.priority)}20; color: \${getPriorityColorJS(task.priority)};">\${task.priority}</span>\` : '-'}
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Category</div>
            <div class="detail-value">
              <span class="badge" style="background: #e5e7eb; color: #374151;">\${task.category}</span>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Assignee</div>
            <div class="detail-value">\${task.assignee || 'unassigned'}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Created</div>
            <div class="detail-value">\${formatDateJS(task.created)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Updated</div>
            <div class="detail-value">\${formatDateJS(task.updated)}</div>
          </div>
          \${task.estimatedTime ? \`
            <div class="detail-item">
              <div class="detail-label">Estimated Time</div>
              <div class="detail-value">\${task.estimatedTime}</div>
            </div>
          \` : ''}
          \${task.actualTime ? \`
            <div class="detail-item">
              <div class="detail-label">Actual Time</div>
              <div class="detail-value">\${task.actualTime}</div>
            </div>
          \` : ''}
          \${progressHTML}
        </div>

        \${task.description ? \`
          <div class="detail-section">
            <div class="detail-section-title">Description</div>
            <div class="detail-description">\${task.description}</div>
          </div>
        \` : ''}

        \${task.dependencies && task.dependencies.length > 0 ? \`
          <div class="detail-section">
            <div class="detail-section-title">Dependencies</div>
            <div class="detail-value">\${task.dependencies.join(', ')}</div>
          </div>
        \` : ''}

        \${task.relatedTasks && task.relatedTasks.length > 0 ? \`
          <div class="detail-section">
            <div class="detail-section-title">Related Tasks</div>
            <div class="detail-value">\${task.relatedTasks.join(', ')}</div>
          </div>
        \` : ''}
      \`;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      const modal = document.getElementById('task-modal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close modal on outside click
    document.getElementById('task-modal').addEventListener('click', (e) => {
      if (e.target.id === 'task-modal') {
        closeModal();
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Add click handlers to task IDs
    document.querySelectorAll('.task-id').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const taskId = el.textContent.trim();
        openTaskModal(taskId);
      });
      el.style.cursor = 'pointer';
    });

    // Toggle categories expansion
    function toggleCategories() {
      const visible = document.getElementById('category-breakdown');
      const hidden = document.getElementById('category-breakdown-hidden');
      const btn = document.querySelector('.expand-btn');

      if (hidden.style.display === 'none') {
        hidden.style.display = 'block';
        btn.textContent = '- Show less';
        btn.classList.add('expanded');
      } else {
        hidden.style.display = 'none';
        const hiddenCount = document.querySelectorAll('#category-breakdown-hidden .stat-breakdown-item').length;
        btn.textContent = '+ ' + hiddenCount + ' more categories';
        btn.classList.remove('expanded');
      }
    }

    // Helper functions for modal
    function getStatusColorJS(status) {
      const colors = {
        'PENDING': '#3B82F6',
        'IN_PROGRESS': '#F59E0B',
        'BLOCKED': '#EF4444',
        'COMPLETED': '#10B981',
        'CANCELLED': '#6B7280'
      };
      return colors[status] || '#6B7280';
    }

    function getPriorityColorJS(priority) {
      const colors = {
        'CRITICAL': '#DC2626',
        'HIGH': '#F59E0B',
        'MEDIUM': '#3B82F6',
        'LOW': '#6B7280'
      };
      return colors[priority] || '#6B7280';
    }

    function formatDateJS(dateStr) {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // Filter functionality
    const searchInput = document.getElementById('search');
    const taskRows = document.querySelectorAll('.task-row');
    const noResults = document.getElementById('no-results');
    const tbody = document.getElementById('task-tbody');

    // Checkbox dropdown elements
    const dropdowns = [
      { toggle: 'status-toggle', dropdown: 'status-dropdown', checkboxes: 'status-checkbox', label: 'Status', plural: 'statuses' },
      { toggle: 'category-toggle', dropdown: 'category-dropdown', checkboxes: 'category-checkbox', label: 'Category', plural: 'categories' },
      { toggle: 'priority-toggle', dropdown: 'priority-dropdown', checkboxes: 'priority-checkbox', label: 'Priority', plural: 'priorities' }
    ];

    const dropdownState = {};
    dropdowns.forEach(d => {
      dropdownState[d.dropdown] = {
        toggle: document.getElementById(d.toggle),
        menu: document.getElementById(d.dropdown),
        checkboxes: document.querySelectorAll('.' + d.checkboxes),
        label: d.label,
        plural: d.plural
      };
    });

    // Generic dropdown toggle handler
    function setupDropdownToggle(state) {
      state.toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        state.menu.classList.toggle('open');
        state.toggle.classList.toggle('active');
      });
    }

    Object.values(dropdownState).forEach(setupDropdownToggle);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.checkbox-dropdown')) {
        Object.values(dropdownState).forEach(state => {
          state.menu.classList.remove('open');
          state.toggle.classList.remove('active');
        });
      }
    });

    // Generic toggle text updater
    function updateDropdownToggle(state) {
      const checked = Array.from(state.checkboxes).filter(cb => cb.checked);
      if (checked.length === 0) {
        state.toggle.textContent = \`Select \${state.label}\`;
      } else if (checked.length === 1) {
        state.toggle.textContent = checked[0].value;
      } else {
        state.toggle.textContent = checked.length + ' ' + state.plural + ' selected';
      }
      filterTasks();
    }

    Object.values(dropdownState).forEach(state => {
      state.checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => updateDropdownToggle(state));
      });
    });

    function filterTasks() {
      const search = searchInput.value.toLowerCase();
      const selectedCategories = Array.from(dropdownState['category-dropdown'].checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      const selectedStatuses = Array.from(dropdownState['status-dropdown'].checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      const selectedPriorities = Array.from(dropdownState['priority-dropdown'].checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      let visibleCount = 0;

      taskRows.forEach(row => {
        const matchSearch = !search || 
          row.dataset.id.toLowerCase().includes(search) ||
          row.dataset.title.toLowerCase().includes(search);
        const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(row.dataset.category);
        const matchStatus = selectedStatuses.length === 0 || selectedStatuses.includes(row.dataset.status);
        const matchPriority = selectedPriorities.length === 0 || selectedPriorities.includes(row.dataset.priority);

        const isVisible = matchSearch && matchCategory && matchStatus && matchPriority;
        row.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount++;
      });

      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      tbody.style.display = visibleCount === 0 ? 'none' : '';
    }

    searchInput.addEventListener('input', filterTasks);

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

    // ===== Lightweight SVG Charts =====

    // Animate progress bars on load
    window.addEventListener('load', () => {
      const progressFills = document.querySelectorAll('.progress-fill');
      progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.dataset.targetWidth = width;
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = width;
        }, 100);
      });

      // Add hover animation to stat cards with state management
      const statCards = document.querySelectorAll('.stat-card');
      statCards.forEach(card => {
        let isAnimating = false;
        let animationTimeout = null;

        card.addEventListener('mouseenter', () => {
          if (isAnimating) return; // Don't interrupt ongoing animation
          
          const progressFill = card.querySelector('.progress-fill');
          if (progressFill) {
            isAnimating = true;
            const targetWidth = progressFill.dataset.targetWidth;
            
            // Reset to 0 without transition
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';
            
            // Use requestAnimationFrame to ensure the reset is applied
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                // Animate to target
                progressFill.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                progressFill.style.width = targetWidth;
                
                // Clear any existing timeout
                if (animationTimeout) clearTimeout(animationTimeout);
                
                // Mark animation as complete after 1.2s
                animationTimeout = setTimeout(() => {
                  isAnimating = false;
                }, 1200);
              });
            });
          }
        });
      });
    });

    function renderBarChart(elId, series, colorMap) {
      const el = document.getElementById(elId);
      const width = 400, height = 240, padding = { left: 40, right: 10, top: 10, bottom: 30 };
      const barAreaW = width - padding.left - padding.right;
      const barAreaH = height - padding.top - padding.bottom;
      const keys = Object.keys(series);
      const vals = Object.values(series);
      const max = Math.max(1, ...vals);
      const barW = Math.max(10, (barAreaW / keys.length) * 0.6);
      const gap = (barAreaW - barW * keys.length) / Math.max(1, keys.length - 1);
      let x = padding.left;
      let svg = '<rect x="0" y="0" width="' + width + '" height="' + height + '" fill="transparent"/>';
      keys.forEach((k) => {
        const h = (series[k] / max) * barAreaH;
        const y = height - padding.bottom - h;
        const color = (colorMap && colorMap[k]) || '#8B5CF6';
        svg += '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + h + '" rx="6" fill="' + color + '" opacity="0.85">' +
               '<animate attributeName="height" from="0" to="' + h + '" dur="0.7s" fill="freeze" />' +
               '<animate attributeName="y" from="' + (height - padding.bottom) + '" to="' + y + '" dur="0.7s" fill="freeze" />' +
               '</rect>';
        svg += '<text x="' + (x + barW / 2) + '" y="' + (height - 8) + '" text-anchor="middle" font-size="10" fill="#6b7280">' + k + '</text>';
        svg += '<text x="' + (x + barW / 2) + '" y="' + (y - 6) + '" text-anchor="middle" font-size="12" fill="#374151" font-weight="700">' + series[k] + '</text>';
        x += barW + gap;
      });
      el.innerHTML = svg;
    }

function renderAreaChart(elId, points) {
  const el = document.getElementById(elId);
  const width = 400, height = 240, padding = { left: 40, right: 10, top: 30, bottom: 30 };
  const areaW = width - padding.left - padding.right;
  const areaH = height - padding.top - padding.bottom;
  const max = Math.max(1, ...points.map(p => p.count));
  const stepX = areaW / Math.max(1, points.length - 1);
  const total = points.reduce((s, p) => s + p.count, 0);
  const avg = Math.round(total / points.length);
  
  // Grid lines
  let svg = '';
  for (let i = 0; i <= 4; i++) {
    const gridY = padding.top + (areaH / 4) * i;
    const val = Math.round(max - (max / 4) * i);
    svg += '<line x1="' + padding.left + '" y1="' + gridY + '" x2="' + (width - padding.right) + '" y2="' + gridY + '" stroke="#e5e7eb" stroke-width="1" opacity="0.5"/>';
    svg += '<text x="' + (padding.left - 8) + '" y="' + (gridY + 3) + '" text-anchor="end" font-size="9" fill="#9ca3af">' + val + '</text>';
  }
  
  let path = '';
  points.forEach((p, i) => {
    const x = padding.left + i * stepX;
    const y = height - padding.bottom - (p.count / max) * areaH;
    path += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
  });
  const baseline = padding.left + ' ' + (height - padding.bottom) + ' L ' + (padding.left + (points.length - 1) * stepX) + ' ' + (height - padding.bottom);
  
  // Area fill with gradient
  svg += '<defs><linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.3" /><stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.05" /></linearGradient></defs>';
  svg += '<path d="' + path + 'L ' + baseline + ' Z" fill="url(#areaGrad)"></path>';
  
  // Animated line
  svg += '<path d="' + path + '" fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linejoin="round">' +
         '<animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="0.8s" fill="freeze" />' +
         '</path>';
  
  // Data points with tooltips
  points.forEach((p, i) => {
    const x = padding.left + i * stepX;
    const y = height - padding.bottom - (p.count / max) * areaH;
    svg += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#8B5CF6" opacity="0.7" style="cursor:pointer;">' +
           '<title>' + p.week + ': ' + p.count + ' completed</title>' +
           '</circle>';
  });
  
  // Week labels
  const labels = points.map((p, i) => {
    const x = padding.left + i * stepX;
    return '<text x="' + x + '" y="' + (height - 8) + '" text-anchor="middle" font-size="10" fill="#6b7280">' + p.week.slice(6) + '</text>';
  }).join('');
  
  svg += labels;
  el.innerHTML = svg;
  
  // Add summary stats below chart
  const card = el.closest('.chart-card');
  if (card) {
    let statsDiv = card.querySelector('.chart-stats');
    if (!statsDiv) {
      statsDiv = document.createElement('div');
      statsDiv.className = 'chart-stats';
      card.appendChild(statsDiv);
    }
    statsDiv.innerHTML = '<div style="display:flex; gap:1.5rem; margin-top:1rem; padding-top:1rem; border-top:1px solid #e5e7eb; font-size:0.875rem;">' +
                         '<div><span style="color:#6b7280;">Total:</span> <span style="font-weight:700; color:#8B5CF6;">' + total + '</span></div>' +
                         '<div><span style="color:#6b7280;">Weekly Avg:</span> <span style="font-weight:700; color:#8B5CF6;">' + avg + '</span></div>' +
                         '<div><span style="color:#6b7280;">Peak:</span> <span style="font-weight:700; color:#8B5CF6;">' + max + '</span></div>' +
                         '</div>';
  }
}

function renderPieChart(elId, entries, legendElId) {
  const el = document.getElementById(elId);
  const radius = 80;
  const center = 100;
  const total = entries.reduce((s, e) => s + e[1], 0) || 1;
  let startAngle = 0;
  const palette = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#10B981', '#6B7280', '#22C55E'];
  let svg = '';
  entries.forEach(([label, value], idx) => {
    const angle = (value / total) * Math.PI * 2;
    const endAngle = startAngle + angle;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const color = palette[idx % palette.length];
        svg += '<path d="M ' + center + ' ' + center + ' L ' + x1 + ' ' + y1 + ' A ' + radius + ' ' + radius + ' 0 ' + largeArc + ' 1 ' + x2 + ' ' + y2 + ' Z" fill="' + color + '" opacity="0.9">' +
          '<title>' + label + ' (' + value + ')</title>' +
          '<animate attributeName="opacity" from="0" to="0.9" dur="0.6s" fill="freeze" />' +
          '</path>';
    startAngle = endAngle;
  });
  el.innerHTML = svg;

  // Add tooltip on hover
  let tooltip = document.getElementById('chartTooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'chartTooltip';
    tooltip.className = 'chart-tooltip';
    document.body.appendChild(tooltip);
  }

  const paths = el.querySelectorAll('path');
  paths.forEach((path, idx) => {
    const [label, value] = entries[idx];
    if (!label) return;
    path.style.cursor = 'pointer';
    path.addEventListener('mouseenter', (evt) => {
      tooltip.textContent = label + ' (' + value + ')';
      tooltip.classList.add('visible');
    });
    path.addEventListener('mousemove', (evt) => {
      tooltip.style.left = (evt.clientX + 10) + 'px';
      tooltip.style.top = (evt.clientY - 30) + 'px';
    });
    path.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });


  if (legendElId) {
    const legend = document.getElementById(legendElId);
    if (legend) {
      const legendHtml = entries.map(([label, value], idx) => {
        const color = palette[idx % palette.length];
        return '<div class="chart-legend-item">' +
                 '<div class="chart-legend-left">' +
                   '<span class="chart-legend-dot" style="background:' + color + ';"></span>' +
                   '<span>' + label + '</span>' +
                 '</div>' +
                 '<span style="font-weight:700; color:#111827;">' + value + '</span>' +
               '</div>';
      }).join('');
      legend.innerHTML = legendHtml;
    }
  }
}

// Render charts with current stats
renderAreaChart('areaChart', statsData.completionsByWeek);
renderBarChart('barChartStatus', statsData.byStatus, {
  PENDING: '#3B82F6', IN_PROGRESS: '#F59E0B', BLOCKED: '#EF4444', COMPLETED: '#10B981', CANCELLED: '#6B7280'
});
// All categories
const allCategories = Object.entries(statsData.byCategory).sort((a, b) => b[1] - a[1]);
renderPieChart('pieChart', allCategories, 'pieLegend');
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
