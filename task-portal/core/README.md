# Task Portal Core - Data Abstraction Layer

A provider-agnostic data abstraction layer for the task portal system. Enables seamless switching between different data backends (JSON files, PostgreSQL, MongoDB, etc.) without changing application code.

## Features

- **Provider Interface**: Clean abstraction for task data operations
- **Multiple Implementations**: JSON file, mock, and extensible for custom backends
- **Registry Pattern**: Easy provider management and switching
- **Repository Pattern**: Convenient high-level API for common queries
- **Type-Safe**: Full TypeScript support with comprehensive types
- **Testable**: Mock provider for development and testing
- **Flexible**: Extensible architecture for custom providers

## Installation

```bash
npm install @task-portal/core
```

## Quick Start

### Using the Mock Provider (Development)

```typescript
import { MockProvider, TaskRepository } from '@task-portal/core';

const provider = new MockProvider();
const repo = new TaskRepository(provider);

// Create a task
const task = await repo.save({
  title: 'Implement feature X',
  description: 'Add new functionality',
  status: 'PENDING',
  priority: 'HIGH',
  categoryCode: 'FEAT',
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
});

// Query tasks
const inProgress = await repo.findByStatus('IN_PROGRESS');
const blocked = await repo.findBlocked();

// Update status
await repo.complete(task.id);

// Get stats
const stats = await repo.getStats();
console.log(`Completion rate: ${stats.completionRate}%`);
```

### Using the JSON File Provider

```typescript
import { JsonFileProvider, TaskRepository } from '@task-portal/core';

const provider = new JsonFileProvider({
  registryPath: './TASK_REGISTRY.json',
  cacheTTL: 5000, // 5 second cache
});

const repo = new TaskRepository(provider);

// Same API as above
const tasks = await repo.findAll();
```

### Using the Provider Registry

```typescript
import { ProviderRegistry, jsonFileProviderFactory, mockProviderFactory } from '@task-portal/core';

const registry = new ProviderRegistry();

// Register providers
registry.register('json', jsonFileProviderFactory);
registry.register('mock', mockProviderFactory);

// Set default
registry.setDefault('json');

// Get provider
const provider = await registry.get('json', {
  registryPath: './TASK_REGISTRY.json'
});

// Or get default
const defaultProvider = await registry.getDefault();
```

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Application (Extension, UI, etc.)              │
├─────────────────────────────────────────────────┤
│  TaskRepository (High-level API)                │
├─────────────────────────────────────────────────┤
│  IDataProvider (Provider Interface)             │
├────────────┬──────────────┬────────────┬────────┤
│  JSON File │  PostgreSQL  │  MongoDB   │ Custom │
│  Provider  │  (Example)   │ (Example)  │        │
└────────────┴──────────────┴────────────┴────────┘
```

## API Reference

### IDataProvider Interface

All providers must implement this interface:

```typescript
interface IDataProvider {
  // Read operations
  readRegistry(): Promise<TaskRegistry>;
  readTask(taskId: string): Promise<Task | null>;
  readTasksByFilter(filter: TaskFilter): Promise<Task[]>;
  listCategories(): Promise<Category[]>;

  // Write operations
  createTask(task: Omit<Task, 'id'>): Promise<Task>;
  updateTask(taskId: string, updates: Partial<Task>): Promise<Task>;
  deleteTask(taskId: string): Promise<boolean>;
  updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task>;

  // Batch operations
  bulkCreateTasks(tasks: Array<Omit<Task, 'id'>>): Promise<Task[]>;
  bulkUpdateTasks(updates: Array<{id: string; data: Partial<Task>}>): Promise<Task[]>;

  // Search and query
  search(query: string): Promise<Task[]>;

  // Sync and validation
  sync(): Promise<SyncResult>;
  validate(): Promise<ValidationResult>;

  // Metadata
  getMetadata(): Promise<RegistryMetadata>;
  getStats(): Promise<TaskStats>;
  healthCheck(): Promise<boolean>;
}
```

### TaskRepository API

Convenient high-level methods:

```typescript
// CRUD
repo.findById(id)
repo.findAll(filter?)
repo.save(task)
repo.update(id, updates)
repo.delete(id)

// Queries
repo.findByCategory(code)
repo.findByStatus(status)
repo.findByPriority(priority)
repo.findByAssignee(assignee)
repo.findBlocked()
repo.findWithDependencies()
repo.findDependents(taskId)
repo.getDependencies(taskId)

// Search
repo.search(query)

// Status updates
repo.updateStatus(id, status)
repo.complete(id)
repo.start(id)
repo.block(id)

// Analytics
repo.countByStatus(status)
repo.getCompletionRate()
repo.getStats()
```

## Creating a Custom Provider

### Step 1: Implement the Interface

```typescript
import { IDataProvider, Task, TaskRegistry, SyncResult, ValidationResult, TaskStats } from '@task-portal/core';

export class MyCustomProvider implements IDataProvider {
  async readRegistry(): Promise<TaskRegistry> {
    // Your implementation
  }

  async readTask(taskId: string): Promise<Task | null> {
    // Your implementation
  }

  // Implement all required methods...
}
```

### Step 2: Create a Factory

```typescript
import { ProviderFactory } from '@task-portal/core';

export const myCustomFactory: ProviderFactory = {
  name: 'my-custom',
  create: async (config: Record<string, any>) => {
    return new MyCustomProvider(config);
  }
};
```

### Step 3: Register and Use

```typescript
const registry = new ProviderRegistry();
registry.register('my-custom', myCustomFactory);

const provider = await registry.get('my-custom', {
  // Your config options
});

const repo = new TaskRepository(provider);
```

## Examples

### PostgreSQL Provider Example

```typescript
import pg from 'pg';
import { IDataProvider } from '@task-portal/core';

export class PostgresProvider implements IDataProvider {
  private pool: pg.Pool;

  constructor(config: { connectionString: string }) {
    this.pool = new pg.Pool({ connectionString: config.connectionString });
  }

  async readRegistry(): Promise<TaskRegistry> {
    const result = await this.pool.query('SELECT * FROM tasks');
    // Transform and return...
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const result = await this.pool.query(
      'INSERT INTO tasks (...) VALUES (...) RETURNING *',
      [task.title, task.description, ...]
    );
    return result.rows[0];
  }

  // Implement all other methods...
}
```

### MongoDB Provider Example

```typescript
import { MongoClient } from 'mongodb';
import { IDataProvider } from '@task-portal/core';

export class MongoProvider implements IDataProvider {
  private client: MongoClient;
  private db: any;

  constructor(config: { connectionString: string }) {
    this.client = new MongoClient(config.connectionString);
    this.db = this.client.db('task-portal');
  }

  async readRegistry(): Promise<TaskRegistry> {
    const tasks = await this.db.collection('tasks').find({}).toArray();
    // Transform and return...
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const result = await this.db.collection('tasks').insertOne(task);
    return { ...task, id: result.insertedId.toString() };
  }

  // Implement all other methods...
}
```

## Best Practices

1. **Implement Caching**: For read-heavy providers, implement caching to improve performance
2. **Handle Errors Gracefully**: All methods should throw descriptive errors
3. **Validate Data**: Validate data integrity in the `validate()` method
4. **Document Configuration**: Clearly document all configuration options
5. **Write Tests**: Test all provider operations with comprehensive test suites
6. **Support Transactions**: For database providers, use transactions for consistency

## Configuration

### JSON File Provider

```typescript
interface JsonFileProviderConfig {
  registryPath: string;        // Path to TASK_REGISTRY.json (required)
  taskFilesPath?: string;      // Optional: Path to .task.md files directory
  cacheTTL?: number;           // Cache TTL in ms (default: 5000)
}
```

### Mock Provider

```typescript
interface MockProviderConfig {
  simulatedDelay?: number;     // Simulated API delay in ms
  shouldFailValidation?: boolean;
  shouldFailSync?: boolean;
}
```

## Migration Between Providers

```typescript
import { TaskRepository } from '@task-portal/core';

async function migrateData(sourceProvider, targetProvider) {
  const sourceRepo = new TaskRepository(sourceProvider);
  const targetRepo = new TaskRepository(targetProvider);

  // Read all tasks from source
  const tasks = await sourceRepo.findAll();

  // Write to target
  for (const task of tasks) {
    const { id, ...taskData } = task;
    await targetRepo.save(taskData);
  }

  console.log(`Migrated ${tasks.length} tasks`);
}
```

## Testing

Run tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

Coverage:

```bash
npm run test:coverage
```

## Types

### Task

```typescript
interface Task {
  id: string;                    // "TASK-FEAT-001"
  title: string;
  description: string;
  status: TaskStatus;            // PENDING, IN_PROGRESS, BLOCKED, COMPLETED, CANCELLED
  priority: TaskPriority;        // LOW, MEDIUM, HIGH, CRITICAL
  categoryCode: CategoryCode;    // FEAT, BUG, ENH, REF, etc.
  assignee?: string;
  createdDate: string;           // ISO 8601
  updatedDate: string;           // ISO 8601
  estimatedHours?: number;
  dependencies?: string[];       // Array of task IDs
  progress?: number;             // 0-100
  tags?: string[];
  sections?: Record<string, TaskSection>;
  filePath?: string;
}
```

### TaskFilter

```typescript
interface TaskFilter {
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
```

## License

MIT

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
