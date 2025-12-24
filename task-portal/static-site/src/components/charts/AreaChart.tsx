import { useRef, useEffect } from 'react';

interface AreaChartProps {
    data: Array<{ week: string; count: number }>;
}

export function AreaChart({ data }: AreaChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;

        const width = 400;
        const height = 240;
        const padding = { left: 40, right: 10, top: 30, bottom: 30 };
        const areaW = width - padding.left - padding.right;
        const areaH = height - padding.top - padding.bottom;
        const max = Math.max(1, ...data.map(p => p.count));
        const stepX = areaW / Math.max(1, data.length - 1);

        let svg = '';

        // Grid lines
        for (let i = 0; i <= 4; i++) {
            const gridY = padding.top + (areaH / 4) * i;
            const val = Math.round(max - (max / 4) * i);
            svg += `<line x1="${padding.left}" y1="${gridY}" x2="${width - padding.right}" y2="${gridY}" stroke="#e5e7eb" stroke-width="1" opacity="0.5"/>`;
            svg += `<text x="${padding.left - 8}" y="${gridY + 3}" text-anchor="end" font-size="9" fill="#9ca3af">${val}</text>`;
        }

        // Path
        let path = '';
        data.forEach((p, i) => {
            const x = padding.left + i * stepX;
            const y = height - padding.bottom - (p.count / max) * areaH;
            path += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
        });

        const baseline = `${padding.left} ${height - padding.bottom} L ${padding.left + (data.length - 1) * stepX} ${height - padding.bottom}`;

        svg += `<defs><linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">` +
            `<stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.3" />` +
            `<stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.05" />` +
            `</linearGradient></defs>`;
        svg += `<path d="${path}L ${baseline} Z" fill="url(#areaGrad)"></path>`;
        svg += `<path d="${path}" fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linejoin="round">` +
            `<animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="0.8s" fill="freeze" />` +
            `</path>`;

        // Data points
        data.forEach((p, i) => {
            const x = padding.left + i * stepX;
            const y = height - padding.bottom - (p.count / max) * areaH;
            svg += `<circle cx="${x}" cy="${y}" r="4" fill="#8B5CF6" opacity="0.7" style="cursor:pointer;">` +
                `<title>${p.week}: ${p.count} completed</title>` +
                `</circle>`;
        });

        // Labels
        data.forEach((p, i) => {
            const x = padding.left + i * stepX;
            svg += `<text x="${x}" y="${height - 8}" text-anchor="middle" font-size="10" fill="#6b7280">${p.week.slice(6)}</text>`;
        });

        svgRef.current.innerHTML = svg;
    }, [data]);

    return (
        <svg
            ref={svgRef}
            className="chart"
            viewBox="0 0 400 240"
            style={{ width: '100%', height: '240px' }}
        />
    );
}
