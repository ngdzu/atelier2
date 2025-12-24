/**
 * Color utilities for consistent theming
 */

const CATEGORY_COLORS: Record<string, string> = {
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

export function getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category] || '#6B7280';
}

export function getCategoryPalette(): string[] {
    return Object.values(CATEGORY_COLORS);
}

export function getAllCategories(): string[] {
    return Object.keys(CATEGORY_COLORS);
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        PENDING: '#3B82F6',
        IN_PROGRESS: '#F59E0B',
        BLOCKED: '#EF4444',
        COMPLETED: '#10B981',
        CANCELLED: '#6B7280'
    };
    return colors[status] || '#6B7280';
}

export function getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
        CRITICAL: '#DC2626',
        HIGH: '#EF4444',
        MEDIUM: '#F59E0B',
        LOW: '#10B981'
    };
    return colors[priority] || '#6B7280';
}
