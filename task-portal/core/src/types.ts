/**
 * Data Provider Interface
 *
 * Defines the contract that all data providers must implement.
 * This abstraction allows swapping between JSON files, databases, APIs, etc.
 */

/**
 * Task status enumeration
 */
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED';

/**
 * Task priority enumeration
 */
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * Category code enumeration
 */
export type CategoryCode =
    | 'FEAT' | 'BUG' | 'ENH' | 'REF' | 'UI' | 'API' | 'DB'
    | 'TEST' | 'DOC' | 'OPS' | 'SEC' | 'PERF' | 'A11Y' | 'CONFIG';

/**
 * Task filter interface for querying tasks
 */
export interface TaskFilter {
    categoryCode?: CategoryCode | CategoryCode[];
    status?: TaskStatus | TaskStatus[];
    priority?: TaskPriority | TaskPriority[];
    assignee?: string | string[];
    createdAfter?: Date;
    createdBefore?: Date;
    updatedAfter?: Date;
    updatedBefore?: Date;
    hasDependencies?: boolean;
    isBlocked?: boolean;
    searchText?: string;
}

/**
 * Task section (e.g., Requirements, Definition of Done, etc.)
 */
export interface TaskSection {
    title: string;
    content: string;
    items?: Array<{
        text: string;
        completed: boolean;
    }>;
}

/**
 * Task interface
 */
export interface Task {
    id: string;                          // e.g., "TASK-FEAT-001"
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    categoryCode: CategoryCode;
    assignee?: string;
    createdDate: string;                 // ISO 8601 format
    updatedDate: string;                 // ISO 8601 format
    estimatedHours?: number;
    dependencies?: string[];             // Array of task IDs
    progress?: number;                   // 0-100
    tags?: string[];
    sections?: Record<string, TaskSection>;
    filePath?: string;                   // Path to source .task file
}

/**
 * Category definition
 */
export interface Category {
    code: CategoryCode;
    name: string;
    description: string;
    color?: string;
    nextNumber: number;
    taskCount: number;
}

/**
 * Registry metadata
 */
export interface RegistryMetadata {
    version: string;
    lastUpdated: string;                 // ISO 8601 format
    totalTasks: number;
    tasksByStatus: Record<TaskStatus, number>;
    tasksByCategory: Record<CategoryCode, number>;
    lastSync?: string;
}

/**
 * Task registry - complete task data
 */
export interface TaskRegistry {
    metadata: RegistryMetadata;
    categories: Category[];
    tasks: Task[];
}

/**
 * Sync result from provider
 */
export interface SyncResult {
    success: boolean;
    message: string;
    tasksAdded?: number;
    tasksModified?: number;
    tasksRemoved?: number;
    errors?: Array<{
        taskId?: string;
        error: string;
    }>;
}

/**
 * Validation result from provider
 */
export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}

/**
 * Validation error
 */
export interface ValidationError {
    type: 'MISSING_FIELD' | 'INVALID_FORMAT' | 'INVALID_ENUM' | 'DUPLICATE_ID' | 'CIRCULAR_DEPENDENCY' | 'MISSING_DEPENDENCY' | 'OTHER';
    message: string;
    taskId?: string;
    field?: string;
}

/**
 * Validation warning
 */
export interface ValidationWarning {
    type: 'MISSING_OPTIONAL' | 'UNUSUAL_VALUE' | 'DEPRECATED' | 'OTHER';
    message: string;
    taskId?: string;
    field?: string;
}

/**
 * Task statistics
 */
export interface TaskStats {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    blockedTasks: number;
    pendingTasks: number;
    cancelledTasks: number;
    completionRate: number;  // percentage
    averagePriority: string;
    tasksByCategory: Record<CategoryCode, number>;
    tasksByAssignee: Record<string, number>;
}

/**
 * Main data provider interface
 *
 * All providers must implement this interface to be compatible with the task portal.
 */
export interface IDataProvider {
    /**
     * Read the complete task registry
     */
    readRegistry(): Promise<TaskRegistry>;

    /**
     * Read a single task by ID
     */
    readTask(taskId: string): Promise<Task | null>;

    /**
     * Read multiple tasks with optional filtering
     */
    readTasksByFilter(filter: TaskFilter): Promise<Task[]>;

    /**
     * List all categories
     */
    listCategories(): Promise<Category[]>;

    /**
     * Create a new task
     */
    createTask(task: Omit<Task, 'id'>): Promise<Task>;

    /**
     * Update an existing task
     */
    updateTask(taskId: string, updates: Partial<Task>): Promise<Task>;

    /**
     * Delete a task
     */
    deleteTask(taskId: string): Promise<boolean>;

    /**
     * Update only the status of a task
     */
    updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task>;

    /**
     * Create multiple tasks at once
     */
    bulkCreateTasks(tasks: Array<Omit<Task, 'id'>>): Promise<Task[]>;

    /**
     * Update multiple tasks at once
     */
    bulkUpdateTasks(updates: Array<{ id: string; data: Partial<Task> }>): Promise<Task[]>;

    /**
     * Search for tasks by text query
     */
    search(query: string): Promise<Task[]>;

    /**
     * Sync data from source (e.g., re-read from disk, database, API)
     */
    sync(): Promise<SyncResult>;

    /**
     * Validate data consistency
     */
    validate(): Promise<ValidationResult>;

    /**
     * Get registry metadata
     */
    getMetadata(): Promise<RegistryMetadata>;

    /**
     * Get task statistics
     */
    getStats(): Promise<TaskStats>;

    /**
     * Check if provider is healthy/connected
     */
    healthCheck(): Promise<boolean>;
}

/**
 * Provider configuration interface
 */
export interface ProviderConfig {
    type: string;                        // 'json', 'postgres', 'mongodb', etc.
    enabled: boolean;
    config: Record<string, any>;
}

/**
 * Provider factory interface
 */
export interface ProviderFactory {
    name: string;
    create(config: Record<string, any>): Promise<IDataProvider>;
}
