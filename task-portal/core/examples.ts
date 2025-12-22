/**
 * Task Portal Core - Practical Examples
 *
 * This file demonstrates how to use the task portal core data abstraction layer
 * in different scenarios.
 */

import {
    MockProvider,
    JsonFileProvider,
    TaskRepository,
    ProviderRegistry,
    jsonFileProviderFactory,
    mockProviderFactory,
    type TaskFilter,
} from './src/index';

/**
 * Example 1: Using the MockProvider for development/testing
 */
async function example1_mockProvider() {
    console.log('=== Example 1: Mock Provider ===');

    const provider = new MockProvider();
    const repo = new TaskRepository(provider);

    // Create some sample tasks
    const feature = await repo.save({
        title: 'Implement user authentication',
        description: 'Add JWT-based auth system',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        categoryCode: 'FEAT',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        estimatedHours: 8,
    });

    const bugTask = await repo.save({
        title: 'Fix memory leak',
        description: 'WebSocket connections not closing properly',
        status: 'BLOCKED',
        priority: 'CRITICAL',
        categoryCode: 'BUG',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        estimatedHours: 4,
    });

    console.log('Created tasks:', [feature.id, bugTask.id]);

    // Query tasks
    const blocked = await repo.findBlocked();
    console.log('Blocked tasks:', blocked.length);

    // Update status
    const updated = await repo.complete(feature.id);
    console.log('Updated status:', updated.status);

    // Get statistics
    const stats = await repo.getStats();
    console.log('Stats:', {
        total: stats.totalTasks,
        completed: stats.completedTasks,
        completionRate: `${stats.completionRate.toFixed(1)}%`,
    });
}

/**
 * Example 2: Using the Provider Registry
 */
async function example2_providerRegistry() {
    console.log('\n=== Example 2: Provider Registry ===');

    const registry = new ProviderRegistry();

    // Register providers
    registry.register('mock', mockProviderFactory);
    registry.register('json-file', jsonFileProviderFactory);

    // Set default
    registry.setDefault('mock');

    // Get default provider
    const defaultProvider = await registry.getDefault();
    const repo = new TaskRepository(defaultProvider);

    // Create a task
    const task = await repo.save({
        title: 'Setup CI/CD pipeline',
        description: 'Configure GitHub Actions',
        status: 'PENDING',
        priority: 'HIGH',
        categoryCode: 'OPS',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
    });

    console.log('Created task:', task.id);
    console.log('Available providers:', registry.list());
}

/**
 * Example 3: Filtering and searching
 */
async function example3_filtering() {
    console.log('\n=== Example 3: Filtering and Searching ===');

    const provider = new MockProvider();
    const repo = new TaskRepository(provider);

    // Seed some data
    const tasks = [
        {
            title: 'Add TypeScript support',
            description: 'Migrate to TypeScript',
            status: 'IN_PROGRESS' as const,
            priority: 'HIGH' as const,
            categoryCode: 'REF' as const,
        },
        {
            title: 'Implement dark mode',
            description: 'Add theme switching',
            status: 'PENDING' as const,
            priority: 'MEDIUM' as const,
            categoryCode: 'UI' as const,
        },
        {
            title: 'Fix responsive design',
            description: 'Mobile layout issues',
            status: 'BLOCKED' as const,
            priority: 'HIGH' as const,
            categoryCode: 'BUG' as const,
        },
    ];

    for (const task of tasks) {
        await repo.save({
            ...task,
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });
    }

    // Filter by category
    const refTasks = await repo.findByCategory('REF');
    console.log('Refactor tasks:', refTasks.length);

    // Filter by priority
    const highPriority = await repo.findByPriority('HIGH');
    console.log('High priority tasks:', highPriority.length);

    // Search
    const searchResults = await repo.search('TypeScript');
    console.log('Search results for "TypeScript":', searchResults.length);

    // Multiple filters
    const filtered = await repo.findAll({
        status: 'BLOCKED',
        priority: 'HIGH',
    });
    console.log('Blocked and high priority:', filtered.length);
}

/**
 * Example 4: Working with task dependencies
 */
async function example4_dependencies() {
    console.log('\n=== Example 4: Task Dependencies ===');

    const provider = new MockProvider();
    const repo = new TaskRepository(provider);

    // Create dependent tasks
    const auth = await repo.save({
        title: 'Implement authentication',
        description: 'JWT auth system',
        status: 'COMPLETED',
        priority: 'CRITICAL',
        categoryCode: 'FEAT',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
    });

    const userProfile = await repo.save({
        title: 'Create user profile page',
        description: 'Profile editing',
        status: 'PENDING',
        priority: 'HIGH',
        categoryCode: 'FEAT',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        dependencies: [auth.id],
    });

    console.log('Auth task:', auth.id);
    console.log('User profile task:', userProfile.id);
    console.log('Dependencies:', userProfile.dependencies);

    // Find dependent tasks
    const dependents = await repo.findDependents(auth.id);
    console.log('Tasks that depend on auth:', dependents.length);

    // Get task dependencies
    const deps = await repo.getDependencies(userProfile.id);
    console.log('Dependencies of user profile:', deps.map(d => d.title));
}

/**
 * Example 5: Task lifecycle management
 */
async function example5_taskLifecycle() {
    console.log('\n=== Example 5: Task Lifecycle ===');

    const provider = new MockProvider();
    const repo = new TaskRepository(provider);

    // Create task
    const task = await repo.save({
        title: 'Implement feature X',
        description: 'New feature',
        status: 'PENDING',
        priority: 'MEDIUM',
        categoryCode: 'FEAT',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
    });

    console.log('1. Created:', task.status);

    // Start work
    let updated = await repo.start(task.id);
    console.log('2. Started:', updated.status);

    // Hit a blocker
    updated = await repo.block(task.id);
    console.log('3. Blocked:', updated.status);

    // Unblock and resume
    updated = await repo.start(task.id);
    console.log('4. Resumed:', updated.status);

    // Complete
    updated = await repo.complete(task.id);
    console.log('5. Completed:', updated.status);
}

/**
 * Example 6: Team workload analysis
 */
async function example6_teamAnalytics() {
    console.log('\n=== Example 6: Team Analytics ===');

    const provider = new MockProvider();
    const repo = new TaskRepository(provider);

    // Create tasks assigned to different people
    const alice = await repo.save({
        title: 'Frontend redesign',
        description: 'Update UI',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        categoryCode: 'UI',
        assignee: 'alice@example.com',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        estimatedHours: 16,
    });

    const bob = await repo.save({
        title: 'Database optimization',
        description: 'Query performance',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        categoryCode: 'DB',
        assignee: 'bob@example.com',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        estimatedHours: 12,
    });

    const aliceTask2 = await repo.save({
        title: 'Accessibility audit',
        description: 'WCAG compliance',
        status: 'PENDING',
        priority: 'MEDIUM',
        categoryCode: 'A11Y',
        assignee: 'alice@example.com',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        estimatedHours: 8,
    });

    // Get stats
    const stats = await repo.getStats();
    console.log('Team workload:');
    Object.entries(stats.tasksByAssignee).forEach(([assignee, count]) => {
        console.log(`  ${assignee}: ${count} tasks`);
    });

    // Find Alice's tasks
    const aliceTasks = await repo.findByAssignee('alice@example.com');
    console.log(`Alice's tasks: ${aliceTasks.length}`);
}

/**
 * Run all examples
 */
async function runAllExamples() {
    try {
        await example1_mockProvider();
        await example2_providerRegistry();
        await example3_filtering();
        await example4_dependencies();
        await example5_taskLifecycle();
        await example6_teamAnalytics();

        console.log('\n=== All examples completed successfully ===');
    } catch (error) {
        console.error('Error running examples:', error);
    }
}

// Run if this is the main module
if (require.main === module) {
    runAllExamples().catch(console.error);
}

export {
    example1_mockProvider,
    example2_providerRegistry,
    example3_filtering,
    example4_dependencies,
    example5_taskLifecycle,
    example6_teamAnalytics,
};
