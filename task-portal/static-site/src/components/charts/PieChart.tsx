import { useRef, useEffect, useState } from 'react';

interface PieChartProps {
    data: Record<string, number>;
}

export function PieChart({ data }: PieChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const legendRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

    const categoryColors: Record<string, string> = {
        FEAT: '#8B5CF6',    // Feature - Purple
        BUG: '#EF4444',     // Bug - Red
        ENH: '#3B82F6',     // Enhancement - Blue
        REF: '#F59E0B',     // Refactoring - Orange
        UI: '#EC4899',      // UI/UX - Pink
        API: '#10B981',     // API - Green
        DB: '#06B6D4',      // Database - Cyan
        TEST: '#6366F1',    // Testing - Indigo
        DOC: '#A855F7',     // Documentation - Fuchsia
        OPS: '#14B8A6',     // DevOps - Teal
        SEC: '#DC2626',     // Security - Dark Red
        PERF: '#F97316',    // Performance - Orange
        A11Y: '#8B5CF6',    // Accessibility - Purple
        CONFIG: '#6B7280',  // Configuration - Gray
        ARCH: '#7C3AED',    // Architecture - Violet
        MIG: '#0891B2'      // Migration - Cyan
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
        const total = entries.reduce((sum, [, val]) => sum + val, 0) || 1;
        const radius = 80;
        const center = 100;
        let startAngle = 0;

        let svg = '';
        entries.forEach(([label, value]) => {
            const angle = (value / total) * Math.PI * 2;
            const endAngle = startAngle + angle;
            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);
            const largeArc = angle > Math.PI ? 1 : 0;
            const color = categoryColors[label] || '#9CA3AF';

            svg += `<path data-label="${label}" data-value="${value}" d="M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" ` +
                `fill="${color}" opacity="0.9" style="cursor:pointer; transition: opacity 0.2s;">` +
                `<animate attributeName="opacity" from="0" to="0.9" dur="0.6s" fill="freeze" />` +
                `</path>`;
            startAngle = endAngle;
        });

        svgRef.current.innerHTML = svg;

        // Add event listeners for tooltip
        const paths = svgRef.current.querySelectorAll('path');

        const handleMouseEnter = (e: Event) => {
            const target = e.currentTarget as SVGPathElement;
            target.style.opacity = '1';
            const label = target.getAttribute('data-label') || '';
            const value = parseInt(target.getAttribute('data-value') || '0');
            const mouseEvent = e as MouseEvent;
            setTooltip({
                x: mouseEvent.clientX,
                y: mouseEvent.clientY,
                label,
                value
            });
        };

        const handleMouseMove = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            setTooltip(prev => prev ? {
                ...prev,
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            } : null);
        };

        const handleMouseLeave = (e: Event) => {
            const target = e.currentTarget as SVGPathElement;
            target.style.opacity = '0.9';
            setTooltip(null);
        };

        paths.forEach(path => {
            path.addEventListener('mouseenter', handleMouseEnter);
            path.addEventListener('mousemove', handleMouseMove);
            path.addEventListener('mouseleave', handleMouseLeave);
        });

        // Update legend
        if (legendRef.current) {
            legendRef.current.innerHTML = entries.map(([label, value]) => {
                const color = categoryColors[label] || '#9CA3AF';
                return `<div class="chart-legend-item">
                  <div class="chart-legend-left">
                    <span class="chart-legend-dot" style="background:${color};"></span>
                    <span>${label}</span>
                  </div>
                  <span style="font-weight:700; color:#111827;">${value}</span>
                </div>`;
            }).join('');
        }

        return () => {
            paths.forEach(path => {
                path.removeEventListener('mouseenter', handleMouseEnter);
                path.removeEventListener('mousemove', handleMouseMove);
                path.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [data]);

    return (
        <>
            <svg
                ref={svgRef}
                className="chart"
                viewBox="0 0 200 200"
                style={{ width: '100%', height: '200px' }}
            />
            <div ref={legendRef} className="chart-legend" />
            {tooltip && (
                <div
                    className="chart-tooltip visible"
                    style={{
                        position: 'fixed',
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y - 40}px`,
                        pointerEvents: 'none'
                    }}
                >
                    {tooltip.label} ({tooltip.value})
                </div>
            )}
        </>
    );
}
