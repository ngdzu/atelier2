/**
 * Task Portal Core
 *
 * Data abstraction layer for the task portal system.
 * Provides a provider-agnostic interface for working with task data.
 */

// Export types
export type {
    IDataProvider,
    Task,
    TaskFilter,
    TaskSection,
    Category,
    RegistryMetadata,
    TaskRegistry,
    SyncResult,
    ValidationResult,
    ValidationError,
    ValidationWarning,
    TaskStats,
    ProviderConfig,
    ProviderFactory,
    TaskStatus,
    TaskPriority,
    CategoryCode,
} from './types';

// Export registry
export { ProviderRegistry, globalRegistry } from './registry';

// Export providers
export { MockProvider, mockProviderFactory } from './providers/mock';
export { JsonFileProvider, jsonFileProviderFactory, type JsonFileProviderConfig } from './providers/jsonFile';

// Export repository
export { TaskRepository } from './repository';
