/**
 * Color utilities for consistent theming
 */

const CATEGORY_PALETTE = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#10B981', '#6B7280', '#22C55E'];
const ALL_CATEGORIES = ['FEAT', 'BUG', 'DOCS', 'REFACTOR', 'TEST', 'CHORE', 'PERF', 'STYLE', 'CI', 'BUILD', 'ARCH', 'MIG', 'UI'];

export function getCategoryColor(category: string): string {
    const index = ALL_CATEGORIES.indexOf(category);
    return index >= 0 ? CATEGORY_PALETTE[index % CATEGORY_PALETTE.length] : '#6B7280';
}

export function getCategoryPalette(): string[] {
    return CATEGORY_PALETTE;
}

export function getAllCategories(): string[] {
    return ALL_CATEGORIES;
}
