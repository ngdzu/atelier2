/**
 * Styles module - All CSS styles for the dashboard
 */
export function getStyles(): string {
    return `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      background: #f9fafb;
      color: #111827;
      line-height: 1.6;
      padding: 2rem 1rem;
      min-height: 100vh;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0;
    }

    /* Header Styles */
    .header-navbar {
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      border-radius: 8px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .header-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #6366f1;
      margin: 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .project-name {
      font-size: 0.875rem;
      color: #6B7280;
      font-weight: 500;
    }

    /* Card Styles */
    .card-surface {
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.6);
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

    .card-surface:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.06);
      border-color: rgba(255, 255, 255, 0.8);
    }

    /* Stats Section */
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      cursor: pointer;
      padding: 2rem;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }

    /* Shared card title style for stat and chart cards */
    .stat-label, .chart-title {
      font-size: 0.75rem;
      color: #6B7280;
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

    .stat-card-icon {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      font-size: 2.5rem;
      opacity: 0.1;
      z-index: 0;
      pointer-events: none;
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
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    /* Charts Section */
    .charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin: 0 0 2rem 0;
    }

    .chart-card {
      min-height: 320px;
      display: flex;
      flex-direction: column;
      padding-top: 1.25rem;
    }

    /* Chart title is unified with stat-label above */

    .chart-container {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chart {
      position: relative;
      z-index: 1;
    }

    .chart-summary {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #E5E7EB;
      font-size: 0.875rem;
      color: #6B7280;
      justify-content: flex-start;
      align-items: center;
    }

    .chart-summary-label {
      color: #6b7280;
      font-weight: 500;
      margin-right: 0.35rem;
    }

    .chart-summary-value {
      color: #8B5CF6;
      font-weight: 700;
    }

    .chart-point {
      transition: r 0.2s;
    }

    .chart-point:hover {
      r: 6;
    }

    .chart-legend {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 0.5rem 1rem;
      margin-top: 1rem;
    }

    .chart-legend-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      border: 1px solid rgba(0, 0, 0, 0.04);
      border-radius: 12px;
      background: #fff;
      font-size: 0.875rem;
    }

    .chart-legend-item:hover {
      background: #F9FAFB;
    }

    .chart-legend-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .chart-legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .chart-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 240px;
      color: #9CA3AF;
      font-size: 0.875rem;
    }

    /* Filters Section */
    .filters-section {
      margin: 0 0 2rem 0;
      padding-top: 1.75rem;
    }

    .filters-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: #6B7280;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .filters {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 1rem;
    }

    .search-input, .filter-select {
      padding: 0.75rem;
      border: 1px solid #D1D5DB;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: all 0.2s;
      background: white;
    }

    .search-input:focus, .filter-select:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    /* Table Section */
    .table-container {
      margin: 0;
      overflow-x: auto;
      padding-top: 1.75rem;
    }

    .task-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    .task-table thead {
      background: #F9FAFB;
      border-bottom: 2px solid #E5E7EB;
    }

    .task-table th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .task-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #E5E7EB;
      font-size: 0.875rem;
    }

    .task-row {
      transition: background 0.2s;
    }

    .task-row:hover {
      background: #F9FAFB;
    }

    .task-title {
      font-weight: 500;
      color: #111827;
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

    .task-id {
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.875rem;
      font-weight: 600;
      color: #3B82F6;
      cursor: pointer;
    }

    /* Tooltip */
    .chart-tooltip {
      position: fixed;
      background: rgba(0,0,0,0.85);
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 1000;
      white-space: nowrap;
    }

    .chart-tooltip.visible {
      opacity: 1;
    }

    /* Modal */
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
      padding: 2rem;
    }

    .modal.active {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 800px;
      width: 100%;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.16);
      overflow: hidden;
    }

    .modal-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #E5E7EB;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      flex: 1;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6B7280;
      cursor: pointer;
      line-height: 1;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      transition: background 0.2s;
    }

    .modal-close:hover {
      background: #F3F4F6;
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
      gap: 0.35rem;
    }

    .detail-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: #6B7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .detail-value {
      font-size: 1rem;
      color: #111827;
    }

    .detail-section {
      margin-top: 1.25rem;
      padding-top: 1.25rem;
      border-top: 1px solid #E5E7EB;
    }

    .detail-section-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .detail-description {
      color: #4B5563;
      line-height: 1.6;
      white-space: pre-wrap;
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

    /* Animations */
    @keyframes fillProgress {
      from { width: 0%; }
    }

    @keyframes countUp {
      from { transform: scale(1); }
      50% { transform: scale(1.05); }
      to { transform: scale(1); }
    }

    @keyframes cardPulse {
      0%, 100% { transform: translateY(-4px) scale(1); }
      50% { transform: translateY(-4px) scale(1.02); }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .stats {
        grid-template-columns: 1fr;
      }

      .charts {
        grid-template-columns: 1fr;
      }

      .filters {
        grid-template-columns: 1fr;
      }

      .header-navbar {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `;
}
