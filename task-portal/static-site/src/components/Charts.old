/**
 * Chart components - Reusable SVG chart renderers
 */

export interface AreaChartProps {
    data: { week: string; count: number }[];
    width?: number;
    height?: number;
}

export function AreaChart({ data, width = 400, height = 240 }: AreaChartProps): string {
    if (data.length === 0) {
        return '<div class="chart-empty">No data available</div>';
    }

    const padding = { left: 40, right: 10, top: 30, bottom: 30 };
    const areaW = width - padding.left - padding.right;
    const areaH = height - padding.top - padding.bottom;
    const max = Math.max(1, ...data.map(d => d.count));
    const stepX = areaW / Math.max(1, data.length - 1);

    const points = data.map((d, i) => {
        const x = padding.left + i * stepX;
        const y = height - padding.bottom - (d.count / max) * areaH;
        return { x, y, count: d.count, week: d.week };
    });

    // Build grid + y-axis labels
    const gridLines = Array.from({ length: 5 }).map((_, i) => {
        const y = padding.top + (areaH / 4) * i;
        const val = Math.round(max - (max / 4) * i);
        return [
            `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1" opacity="0.5"/>`,
            `<text x="${padding.left - 8}" y="${y + 3}" text-anchor="end" font-size="9" fill="#9ca3af">${val}</text>`
        ].join('');
    }).join('');

    // Path + area fill
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${padding.left + (points.length - 1) * stepX} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

    // Points + labels
    const circles = points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#8B5CF6" opacity="0.7" />`).join('');
    const weekLabels = points.map((p) => {
        const label = p.week.includes('-W') ? p.week.split('-W')[1] : p.week;
        return `<text x="${p.x}" y="${height - 8}" text-anchor="middle" font-size="10" fill="#6b7280">${label}</text>`;
    }).join('');

    const total = data.reduce((s, d) => s + d.count, 0);
    const avg = Math.round(total / data.length);

    return `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="max-width: 100%;">
      <defs>
        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.05" />
        </linearGradient>
      </defs>
      ${gridLines}
      <path d="${areaPath}" fill="url(#areaGrad)"></path>
      <path d="${linePath}" fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linejoin="round"></path>
      ${circles}
      ${weekLabels}
    </svg>
    <div class="chart-summary">
      <div><span class="chart-summary-label">Total:</span> <span class="chart-summary-value">${total}</span></div>
      <div><span class="chart-summary-label">Weekly Avg:</span> <span class="chart-summary-value">${avg}</span></div>
      <div><span class="chart-summary-label">Peak:</span> <span class="chart-summary-value">${max}</span></div>
    </div>
  `;
}

export interface BarChartProps {
    data: Record<string, number>;
    colors: Record<string, string>;
    width?: number;
    height?: number;
}

export function BarChart({ data, colors, width = 400, height = 240 }: BarChartProps): string {
    const entries = Object.entries(data);
    if (entries.length === 0) {
        return '<div class="chart-empty">No data available</div>';
    }

    const padding = { left: 40, right: 10, top: 10, bottom: 30 };
    const barAreaW = width - padding.left - padding.right;
    const barAreaH = height - padding.top - padding.bottom;
    const max = Math.max(1, ...entries.map(([, v]) => v));
    const barW = Math.max(10, (barAreaW / entries.length) * 0.6);
    const gap = (barAreaW - barW * entries.length) / Math.max(1, entries.length - 1);

    let x = padding.left;
    const bars = entries.map(([key, value]) => {
        const h = (value / max) * barAreaH;
        const y = height - padding.bottom - h;
        const color = colors[key] || '#8B5CF6';
        const svg = `
      <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="6" fill="${color}" opacity="0.85">
        <animate attributeName="height" from="0" to="${h}" dur="0.7s" fill="freeze" />
        <animate attributeName="y" from="${height - padding.bottom}" to="${y}" dur="0.7s" fill="freeze" />
      </rect>
      <text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" font-size="12" fill="#374151" font-weight="700">${value}</text>
      <text x="${x + barW / 2}" y="${height - 8}" text-anchor="middle" font-size="10" fill="#6b7280">${key}</text>
    `;
        x += barW + gap;
        return svg;
    }).join('');

    return `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="max-width: 100%;">${bars}</svg>`;
}

export interface PieChartProps {
    data: [string, number][];
    colors: string[];
    size?: number;
}

export function PieChart({ data, colors, size = 200 }: PieChartProps): string {
    if (data.length === 0) {
        return '<div class="chart-empty">No data available</div>';
    }

    const total = data.reduce((sum, [, value]) => sum + value, 0);
    let currentAngle = -90;
    const center = size / 2;
    const radius = size / 2 - 10;

    const slices = data.map(([label, value], i) => {
        const sliceAngle = (value / total) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = center + radius * Math.cos(startRad);
        const y1 = center + radius * Math.sin(startRad);
        const x2 = center + radius * Math.cos(endRad);
        const y2 = center + radius * Math.sin(endRad);

        const largeArc = sliceAngle > 180 ? 1 : 0;
        const pathData = `M ${center},${center} L ${x1},${y1} A ${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;

        currentAngle = endAngle;
        const color = colors[i % colors.length];

        return `<path d="${pathData}" fill="${color}" stroke="white" stroke-width="2" data-label="${label}" data-value="${value}"/>`;
    }).join('');

    return `<svg id="pieChart" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${slices}</svg>`;
}

export function PieLegend(data: [string, number][], colors: string[]): string {
    return data.map(([label, value], i) => {
        const color = colors[i % colors.length];
        return `
      <div class="chart-legend-item">
        <div class="chart-legend-left">
          <span class="chart-legend-dot" style="background:${color};"></span>
          <span>${label}</span>
        </div>
        <span style="font-weight:700; color:#111827;">${value}</span>
      </div>
    `;
    }).join('');
}
