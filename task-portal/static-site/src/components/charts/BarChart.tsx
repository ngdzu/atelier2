import { useRef, useEffect } from 'react';

interface BarChartProps {
    data: Record<string, number>;
    colorMap?: Record<string, string>;
}

export function BarChart({ data, colorMap }: BarChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 400;
        const height = 240;
        const padding = { left: 40, right: 10, top: 30, bottom: 30 };
        const barAreaW = width - padding.left - padding.right;
        const barAreaH = height - padding.top - padding.bottom;

        const keys = Object.keys(data);
        const vals = Object.values(data);
        const max = Math.max(1, ...vals);
        const barW = Math.max(10, (barAreaW / keys.length) * 0.6);
        const gap = (barAreaW - barW * keys.length) / Math.max(1, keys.length - 1);

        let x = padding.left;
        let svg = '<rect x="0" y="0" width="' + width + '" height="' + height + '" fill="transparent"/>';

        keys.forEach(key => {
            const value = data[key];
            const h = (value / max) * barAreaH;
            const y = height - padding.bottom - h;
            const color = (colorMap && colorMap[key]) || '#8B5CF6';

            svg += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="6" fill="${color}" opacity="0.85">` +
                `<animate attributeName="height" from="0" to="${h}" dur="0.7s" fill="freeze" />` +
                `<animate attributeName="y" from="${height - padding.bottom}" to="${y}" dur="0.7s" fill="freeze" />` +
                `</rect>`;
            svg += `<text x="${x + barW / 2}" y="${height - 8}" text-anchor="middle" font-size="10" fill="#6b7280">${key}</text>`;
            svg += `<text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" font-size="12" fill="#374151" font-weight="700">${value}</text>`;
            x += barW + gap;
        });

        svgRef.current.innerHTML = svg;
    }, [data, colorMap]);

    return (
        <svg
            ref={svgRef}
            className="chart"
            viewBox="0 0 400 240"
            style={{ width: '100%', height: '240px' }}
        />
    );
}
