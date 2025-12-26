#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import chokidar from 'chokidar';
import { parseTaskFiles } from './parser.js';
import { validateTaskRegistry, formatValidationResults } from './validator.js';

const program = new Command();

program
    .name('task-parser')
    .description('Parse .task files and generate JSON registry')
    .version('1.0.0');

program
    .command('sync')
    .description('Parse .task files and generate TASK_REGISTRY.json')
    .argument('[tasks-dir]', 'Directory containing .task files', '.tasks')
    .argument('[output-file]', 'Output JSON file', 'TASK_REGISTRY.json')
    .option('-v, --validate', 'Validate output before writing', true)
    .option('--no-validate', 'Skip validation')
    .action(async (tasksDir: string, outputFile: string, options: { validate: boolean }) => {
        try {
            console.log(chalk.blue(`Parsing task files in ${tasksDir}...`));

            const registry = await parseTaskFiles(tasksDir);

            console.log(chalk.green(`✓ Parsed ${registry.tasks.length} tasks`));

            if (options.validate) {
                console.log(chalk.blue('Validating registry...'));
                const validation = validateTaskRegistry(registry);

                console.log(formatValidationResults(validation));

                if (!validation.valid) {
                    console.error(chalk.red('Validation failed. Registry not written.'));
                    process.exit(1);
                }
            }

            await fs.writeFile(
                outputFile,
                JSON.stringify(registry, null, 2),
                'utf-8'
            );

            console.log(chalk.green(`✓ Registry written to ${outputFile}`));
        } catch (error) {
            console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
            process.exit(1);
        }
    });

program
    .command('validate')
    .description('Validate TASK_REGISTRY.json')
    .argument('[file]', 'JSON file to validate', 'TASK_REGISTRY.json')
    .action(async (file: string) => {
        try {
            console.log(chalk.blue(`Validating ${file}...`));

            const content = await fs.readFile(file, 'utf-8');
            const registry = JSON.parse(content);

            const validation = validateTaskRegistry(registry);

            console.log(formatValidationResults(validation));

            if (!validation.valid) {
                process.exit(1);
            }
        } catch (error) {
            console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
            process.exit(1);
        }
    });

program
    .command('watch')
    .description('Watch .task files and auto-sync')
    .argument('[tasks-dir]', 'Directory containing .task files', '.tasks')
    .argument('[output-file]', 'Output JSON file', 'TASK_REGISTRY.json')
    .option('-d, --debounce <ms>', 'Debounce delay in milliseconds', '1000')
    .action(async (tasksDir: string, outputFile: string, options: { debounce: string }) => {
        const debounceMs = parseInt(options.debounce, 10);
        let timeout: NodeJS.Timeout | null = null;

        const sync = async () => {
            try {
                console.log(chalk.blue('Change detected, syncing...'));

                const registry = await parseTaskFiles(tasksDir);
                const validation = validateTaskRegistry(registry);

                if (!validation.valid) {
                    console.error(chalk.red('Validation failed:'));
                    console.log(formatValidationResults(validation));
                    return;
                }

                await fs.writeFile(
                    outputFile,
                    JSON.stringify(registry, null, 2),
                    'utf-8'
                );

                console.log(chalk.green(`✓ Synced ${registry.tasks.length} tasks at ${new Date().toLocaleTimeString()}`));
            } catch (error) {
                console.error(chalk.red('Sync error:'), error instanceof Error ? error.message : error);
            }
        };

        console.log(chalk.blue(`Watching ${tasksDir} for changes...`));
        console.log(chalk.gray('Press Ctrl+C to stop'));

        // Initial sync
        await sync();

        const watcher = chokidar.watch([path.join(tasksDir, '*.task.md'), path.join(tasksDir, '*.task')], {
            persistent: true,
            ignoreInitial: true,
        });

        watcher.on('all', (event, path) => {
            console.log(chalk.gray(`${event}: ${path}`));

            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(sync, debounceMs);
        });

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log(chalk.blue('\nStopping watcher...'));
            watcher.close();
            process.exit(0);
        });
    });

program
    .command('stats')
    .description('Show statistics from TASK_REGISTRY.json')
    .argument('[file]', 'JSON file to analyze', 'TASK_REGISTRY.json')
    .action(async (file: string) => {
        try {
            const content = await fs.readFile(file, 'utf-8');
            const registry = JSON.parse(content);

            console.log(chalk.bold('\nTask Registry Statistics'));
            console.log(chalk.gray('─'.repeat(50)));

            console.log(chalk.blue('Version:'), registry.metadata.version);
            console.log(chalk.blue('Last Updated:'), new Date(registry.metadata.lastUpdated).toLocaleString());
            console.log(chalk.blue('Total Tasks:'), registry.metadata.totalTasks);

            console.log(chalk.bold('\nBy Category:'));
            for (const [code, category] of Object.entries(registry.categories as Record<string, any>)) {
                const count = registry.tasks.filter((t: any) => t.category === code).length;
                if (count > 0) {
                    console.log(`  ${chalk.cyan(code)}: ${count} (next: ${category.nextAvailable})`);
                }
            }

            console.log(chalk.bold('\nBy Status:'));
            const byStatus: Record<string, number> = {};
            for (const task of registry.tasks) {
                byStatus[task.status] = (byStatus[task.status] || 0) + 1;
            }
            for (const [status, count] of Object.entries(byStatus)) {
                const color = status === 'COMPLETED' ? chalk.green :
                    status === 'IN_PROGRESS' ? chalk.yellow :
                        status === 'BLOCKED' ? chalk.red : chalk.white;
                console.log(`  ${color(status)}: ${count}`);
            }

            console.log(chalk.bold('\nBy Priority:'));
            const byPriority: Record<string, number> = {};
            for (const task of registry.tasks) {
                byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
            }
            for (const [priority, count] of Object.entries(byPriority)) {
                const color = priority === 'CRITICAL' ? chalk.red :
                    priority === 'HIGH' ? chalk.yellow :
                        priority === 'MEDIUM' ? chalk.blue : chalk.gray;
                console.log(`  ${color(priority)}: ${count}`);
            }

            console.log();
        } catch (error) {
            console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
            process.exit(1);
        }
    });

program.parse();
