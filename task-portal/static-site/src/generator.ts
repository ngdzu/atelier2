/**
 * Main Generator - Refactored with modular components
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Header } from './components/Header.js';
import { StatsCards } from './components/StatsCards.js';
import { AreaChart, BarChart, PieChart, PieLegend } from './components/Charts.js';
import { Filters } from './components/Filters.js';
import { TaskTable, Task } from './components/TaskTable.js';
import { getCategoryPalette, getAllCategories } from './utils/colors.js';
import { getStyles } from './styles/styles.js';
import { getScripts } from './scripts/scripts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
export interface Stats {
    total: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    completionRate: number;
    totalCompleted: number;
    completionsByWeek: { week: string; count: number }[];
}

export interface Metadata {
    projectName?: string;
    description?: string;
}

// Read TASK_REGISTRY.json
export function readTaskRegistry(registryPath: string): any {
    return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

// Calculate statistics
export function calculateStats(tasks: Task[]): Stats {
    const stats: Stats = {
        total: tasks.length,
        byStatus: {},
        byCategory: {},
        byPriority: {},
        completionRate: 0,
        totalCompleted: 0,
        completionsByWeek: []
    };

    tasks.forEach(task => {
        stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;
        stats.byCategory[task.category] = (stats.byCategory[task.category] || 0) + 1;
        if (task.priority) {
            stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;
        }
        if (task.status === 'COMPLETED') {
            stats.totalCompleted++;
        }
    });

    stats.completionRate = stats.total > 0 ? Math.round((stats.totalCompleted / stats.total) * 100) : 0;

    // Calculate completions by week - last 8 weeks including current week
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
            const w = isoWeek(new Date(t.updated!));
            weekBuckets.set(w, (weekBuckets.get(w) || 0) + 1);
        });

    stats.completionsByWeek = last8WeeksLabels.map(w => ({ week: w, count: weekBuckets.get(w) || 0 }));

    return stats;
}

// Generate complete HTML document
export function generateHTML(tasks: Task[], stats: Stats, metadata: Metadata): string {
    const projectName = metadata?.projectName || 'Task Portal';
    const categories = Object.keys(stats.byCategory).sort();
    const statuses = Object.keys(stats.byStatus).sort();
    const priorities = Object.keys(stats.byPriority).sort();
    const categoryData = Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]) as [string, number][];

    const statusColors = {
        PENDING: '#3B82F6',
        IN_PROGRESS: '#F59E0B',
        BLOCKED: '#EF4444',
        COMPLETED: '#10B981',
        CANCELLED: '#6B7280'
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName} - Dashboard</title>
  <meta name="description" content="Task management dashboard for ${projectName}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📋</text></svg>">
  <style>${getStyles()}</style>
</head>
<body>
  ${Header({ projectName })}
  
  <div class="container">
    ${StatsCards({
        total: stats.total,
        completionRate: stats.completionRate,
        byStatus: stats.byStatus,
        totalCompleted: stats.totalCompleted
    })}

    <div class="charts">
            <div class="chart-card card-surface">
                <h3 class="chart-title">Completions by Week</h3>
                ${AreaChart({ data: stats.completionsByWeek })}
            </div>

      <div class="chart-card card-surface">
        <h3 class="chart-title">Task Categories</h3>
        <div style="display: flex; justify-content: center;">
          ${PieChart({ data: categoryData, colors: getCategoryPalette() })}
        </div>
        <div class="chart-legend" id="pieLegend">
          ${PieLegend(categoryData, getCategoryPalette())}
        </div>
      </div>
    </div>

    ${Filters({ categories, statuses, priorities })}

    ${TaskTable({ tasks })}
  </div>

    <div id="task-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modal-title"></h2>
                <button class="modal-close" aria-label="Close">&times;</button>
            </div>
            <div class="modal-body" id="modal-body"></div>
        </div>
    </div>

    <script>${getScripts(stats, tasks)}</script>
</body>
</html>`;
}

// Main execution
export function main() {
    try {
        const registryPath = path.join(__dirname, '../../../.tasks/TASK_REGISTRY.json');
        const registry = readTaskRegistry(registryPath);
        const tasks = registry.tasks || [];
        const metadata = registry.metadata || {};
        const stats = calculateStats(tasks);

        const html = generateHTML(tasks, stats, metadata);

        const publicDir = path.join(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

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
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
