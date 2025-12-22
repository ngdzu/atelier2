import { TaskRegistrySchema } from './schema.js';

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}

export interface ValidationError {
    path: string;
    message: string;
    severity: 'error';
}

export interface ValidationWarning {
    path: string;
    message: string;
    severity: 'warning';
}

/**
 * Validate a TaskRegistry against the schema
 */
export function validateTaskRegistry(registry: unknown): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Schema validation
    const result = TaskRegistrySchema.safeParse(registry);

    if (!result.success) {
        for (const issue of result.error.issues) {
            errors.push({
                path: issue.path.join('.'),
                message: issue.message,
                severity: 'error',
            });
        }
    }

    // Additional business logic validation
    if (result.success) {
        const data = result.data;

        // Check for duplicate task IDs
        const taskIds = new Set<string>();
        for (const task of data.tasks) {
            if (taskIds.has(task.id)) {
                errors.push({
                    path: `tasks[${task.id}]`,
                    message: `Duplicate task ID: ${task.id}`,
                    severity: 'error',
                });
            }
            taskIds.add(task.id);
        }

        // Check for missing dependencies
        for (const task of data.tasks) {
            for (const depId of task.dependencies) {
                if (!taskIds.has(depId)) {
                    warnings.push({
                        path: `tasks[${task.id}].dependencies`,
                        message: `Dependency not found: ${depId}`,
                        severity: 'warning',
                    });
                }
            }

            for (const relatedId of task.relatedTasks) {
                if (!taskIds.has(relatedId)) {
                    warnings.push({
                        path: `tasks[${task.id}].relatedTasks`,
                        message: `Related task not found: ${relatedId}`,
                        severity: 'warning',
                    });
                }
            }
        }

        // Check for circular dependencies
        for (const task of data.tasks) {
            const circular = findCircularDependencies(task.id, data.tasks);
            if (circular.length > 0) {
                errors.push({
                    path: `tasks[${task.id}].dependencies`,
                    message: `Circular dependency detected: ${circular.join(' -> ')}`,
                    severity: 'error',
                });
            }
        }

        // Check category numbers
        for (const [code, category] of Object.entries(data.categories)) {
            const categoryTasks = data.tasks.filter(t => t.category === code);
            const maxNumber = Math.max(0, ...categoryTasks.map(t => t.number));

            if (category.lastNumber !== maxNumber) {
                warnings.push({
                    path: `categories.${code}.lastNumber`,
                    message: `Category last number (${category.lastNumber}) doesn't match max task number (${maxNumber})`,
                    severity: 'warning',
                });
            }
        }

        // Check metadata totals
        if (data.metadata.totalTasks !== data.tasks.length) {
            warnings.push({
                path: 'metadata.totalTasks',
                message: `Metadata total (${data.metadata.totalTasks}) doesn't match actual count (${data.tasks.length})`,
                severity: 'warning',
            });
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Find circular dependencies for a task
 */
function findCircularDependencies(
    taskId: string,
    tasks: Array<{ id: string; dependencies: string[] }>,
    visited: Set<string> = new Set(),
    path: string[] = []
): string[] {
    if (visited.has(taskId)) {
        return [...path, taskId];
    }

    visited.add(taskId);
    path.push(taskId);

    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return [];
    }

    for (const depId of task.dependencies) {
        const circular = findCircularDependencies(depId, tasks, new Set(visited), [...path]);
        if (circular.length > 0) {
            return circular;
        }
    }

    return [];
}

/**
 * Format validation results as human-readable string
 */
export function formatValidationResults(result: ValidationResult): string {
    const lines: string[] = [];

    if (result.valid) {
        lines.push('✅ Validation passed');
    } else {
        lines.push('❌ Validation failed');
    }

    if (result.errors.length > 0) {
        lines.push('');
        lines.push(`Errors (${result.errors.length}):`);
        for (const error of result.errors) {
            lines.push(`  • ${error.path}: ${error.message}`);
        }
    }

    if (result.warnings.length > 0) {
        lines.push('');
        lines.push(`Warnings (${result.warnings.length}):`);
        for (const warning of result.warnings) {
            lines.push(`  ⚠ ${warning.path}: ${warning.message}`);
        }
    }

    return lines.join('\n');
}
