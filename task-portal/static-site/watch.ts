#!/usr/bin/env tsx
import { watch } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const TASKS_DIR = path.join(process.cwd(), '../../.tasks');
const REGISTRY_PATH = path.join(TASKS_DIR, 'TASK_REGISTRY.json');

let rebuildTimeout: NodeJS.Timeout | null = null;

function rebuild() {
    console.log('\n🔄 Changes detected, rebuilding...');

    try {
        // Run parser sync
        console.log('📝 Syncing tasks...');
        execSync(
            `node ../parser/dist/cli.js sync ${TASKS_DIR} ${REGISTRY_PATH}`,
            { stdio: 'inherit', cwd: process.cwd() }
        );

        // Rebuild static site
        console.log('🏗️  Building static site...');
        execSync('npm run build', { stdio: 'inherit', cwd: process.cwd() });

        console.log('✅ Rebuild complete!');
        console.log('💡 Refresh your browser to see changes\n');
    } catch (error) {
        console.error('❌ Rebuild failed:', error);
    }
}

function debouncedRebuild() {
    if (rebuildTimeout) {
        clearTimeout(rebuildTimeout);
    }
    rebuildTimeout = setTimeout(rebuild, 1000);
}

console.log('👀 Watching for changes in .tasks/...');
console.log('📂 Tasks directory:', TASKS_DIR);
console.log('📄 Registry:', REGISTRY_PATH);
console.log('🔄 Auto-rebuild enabled\n');

// Initial build
rebuild();

// Watch .tasks directory
const watcher = watch(TASKS_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.task')) {
        console.log(`📝 Changed: ${filename}`);
        debouncedRebuild();
    }
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n👋 Stopping watcher...');
    watcher.close();
    process.exit(0);
});
