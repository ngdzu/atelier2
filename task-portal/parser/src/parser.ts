import fs from 'fs/promises';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { Task, TaskRegistry, Category, Progress } from './schema.js';
import { CATEGORY_INFO, CategoryCodes, type CategoryCode } from './schema.js';

/**
 * Parse all .task files in a directory and generate a TaskRegistry
 */
export async function parseTaskFiles(tasksDir: string): Promise<TaskRegistry> {
    const taskFiles = await findTaskFiles(tasksDir);
    const allTasks: Task[] = [];

    for (const file of taskFiles) {
        const filePath = path.join(tasksDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const tasks = await parseTaskFile(content, file, filePath);
        allTasks.push(...tasks);
    }

    // Build categories
    const categories = buildCategories(allTasks);

    // Build metadata
    const metadata = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        totalTasks: allTasks.length,
        lastSync: new Date().toISOString(),
    };

    return {
        metadata,
        categories,
        tasks: allTasks,
    };
}

/**
 * Find all .task files in directory
 */
async function findTaskFiles(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
        .filter(entry => entry.isFile() && entry.name.endsWith('.task'))
        .map(entry => entry.name);
}

/**
 * Parse a single .task file and extract all tasks
 */
export async function parseTaskFile(
    content: string,
    fileName: string,
    filePath: string
): Promise<Task[]> {
    const tree = unified().use(remarkParse).parse(content);
    const tasks: Task[] = [];

    let currentTask: Partial<Task> | null = null;
    let currentSection: string | null = null;
    let sectionContent: string[] = [];

    function saveSection() {
        if (currentTask && currentSection && sectionContent.length > 0) {
            const content = sectionContent.join('\n').trim();
            if (!currentTask.sections) {
                currentTask.sections = {};
            }

            switch (currentSection.toLowerCase()) {
                case 'requirements':
                case 'requirements / what to do':
                case 'what to do':
                    currentTask.sections.requirements = content;
                    break;
                case 'definition of done':
                case 'definition of done (dod)':
                    currentTask.sections.definitionOfDone = content;
                    break;
                case 'verification steps':
                    currentTask.sections.verificationSteps = content;
                    break;
                case 'acceptance criteria':
                    currentTask.sections.acceptanceCriteria = content;
                    break;
                case 'technical details':
                    currentTask.sections.technicalDetails = content;
                    break;
                case 'testing checklist':
                    currentTask.sections.testingChecklist = content;
                    break;
                case 'additional context':
                    currentTask.sections.additionalContext = content;
                    break;
            }
        }
        sectionContent = [];
    }

    function saveTask() {
        if (currentTask && currentTask.id) {
            saveSection();
            tasks.push(currentTask as Task);
            currentTask = null;
            currentSection = null;
        }
    }

    for (const node of tree.children) {
        if (node.type === 'heading' && node.depth === 2) {
            // Check if this is a task header
            const text = extractText(node);
            const match = text.match(/^TASK-([A-Z0-9]+)-(\d{3}):\s*(.+)$/);

            if (match) {
                // Save previous task
                saveTask();

                const [, category, number, title] = match;
                currentTask = {
                    id: `TASK-${category}-${number}`,
                    category: category as CategoryCode,
                    number: parseInt(number, 10),
                    title: title.trim(),
                    status: 'PENDING',
                    priority: 'MEDIUM',
                    assignee: 'unassigned',
                    created: '',
                    updated: '',
                    estimatedTime: '',
                    dependencies: [],
                    relatedTasks: [],
                    file: fileName,
                    filePath: filePath,
                    description: '',
                    sections: {},
                };
            }
        } else if (node.type === 'heading' && node.depth === 3 && currentTask) {
            // Section header
            saveSection();
            currentSection = extractText(node);
        } else if (currentTask) {
            // Content within task
            if (!currentSection) {
                // Metadata or description
                if (node.type === 'paragraph') {
                    const text = extractNodeText(node);
                    parseMetadata(text, currentTask);
                    // Set description if this paragraph doesn't contain metadata markers
                    if (!currentTask.description && !text.includes('**Status:**') && !text.includes('**Priority:**')) {
                        currentTask.description = text;
                    }
                }
            } else {
                // Section content
                const text = extractNodeText(node);
                if (text.trim()) {
                    sectionContent.push(text);
                }
            }
        }
    }

    // Save last task
    saveTask();

    // Calculate progress for all tasks
    for (const task of tasks) {
        task.progress = calculateProgress(task);
    }

    return tasks;
}

/**
 * Extract text from a node
 */
function extractText(node: any): string {
    if (node.type === 'text') {
        return node.value;
    }
    if (node.children) {
        return node.children.map(extractText).join('');
    }
    return '';
}

/**
 * Extract text from node preserving structure
 */
function extractNodeText(node: any): string {
    if (node.type === 'text') {
        return node.value;
    }
    if (node.type === 'paragraph') {
        return node.children.map(extractNodeText).join('');
    }
    if (node.type === 'list') {
        return node.children.map((item: any) =>
            '- ' + item.children.map(extractNodeText).join('')
        ).join('\n');
    }
    if (node.type === 'listItem') {
        return node.children.map(extractNodeText).join('');
    }
    if (node.type === 'code') {
        return '```' + (node.lang || '') + '\n' + node.value + '\n```';
    }
    if (node.type === 'inlineCode') {
        return '`' + node.value + '`';
    }
    if (node.type === 'strong') {
        return '**' + node.children.map(extractNodeText).join('') + '**';
    }
    if (node.type === 'emphasis') {
        return '*' + node.children.map(extractNodeText).join('') + '*';
    }
    if (node.children) {
        return node.children.map(extractNodeText).join('');
    }
    return '';
}

/**
 * Parse metadata from text
 */
function parseMetadata(text: string, task: Partial<Task>) {
    const statusMatch = text.match(/\*\*Status:\*\*\s*(\w+)/i);
    if (statusMatch) {
        task.status = statusMatch[1] as any;
    }

    const priorityMatch = text.match(/\*\*Priority:\*\*\s*(\w+)/i);
    if (priorityMatch) {
        task.priority = priorityMatch[1] as any;
    }

    const assigneeMatch = text.match(/\*\*Assignee:\*\*\s*([^\n*]+)/);
    if (assigneeMatch) {
        task.assignee = assigneeMatch[1].trim();
    }

    const createdMatch = text.match(/\*\*Created:\*\*\s*([\d-]+)/);
    if (createdMatch) {
        task.created = createdMatch[1];
    }

    const updatedMatch = text.match(/\*\*Updated:\*\*\s*([\d-]+)/);
    if (updatedMatch) {
        task.updated = updatedMatch[1];
    }

    const estimatedMatch = text.match(/\*\*Estimated Time:\*\*\s*([^\n*]+)/);
    if (estimatedMatch) {
        task.estimatedTime = estimatedMatch[1].trim();
    }

    const depsMatch = text.match(/\*\*Dependencies:\*\*\s*([^\n*]+)/);
    if (depsMatch) {
        const deps = depsMatch[1].trim();
        if (deps.toLowerCase() !== 'none') {
            task.dependencies = deps.split(',').map(d => d.trim()).filter(Boolean);
        }
    }

    const relatedMatch = text.match(/\*\*Related Tasks:\*\*\s*([^\n*]+)/);
    if (relatedMatch) {
        const related = relatedMatch[1].trim();
        if (related.toLowerCase() !== 'none') {
            task.relatedTasks = related.split(',').map(r => r.trim()).filter(Boolean);
        }
    }
}

/**
 * Calculate task progress from checklist items
 */
function calculateProgress(task: Task): Progress | undefined {
    const content = JSON.stringify(task.sections || {});

    // Find all checklist items
    const completedMatches = content.match(/- \[x\]/gi) || [];
    const pendingMatches = content.match(/- \[ \]/g) || [];

    const completed = completedMatches.length;
    const total = completed + pendingMatches.length;

    if (total === 0) {
        return undefined;
    }

    const percentage = Math.round((completed / total) * 100);

    return {
        completed,
        total,
        percentage,
    };
}

/**
 * Build categories from tasks
 */
function buildCategories(tasks: Task[]): Record<CategoryCode, Category> {
    const categories: Record<string, Category> = {};

    // Initialize all categories
    for (const code of CategoryCodes) {
        const info = CATEGORY_INFO[code];
        categories[code] = {
            name: info.name,
            code: code,
            description: info.description,
            lastNumber: 0,
            nextAvailable: 1,
        };
    }

    // Update based on actual tasks
    for (const task of tasks) {
        const category = categories[task.category];
        if (category) {
            category.lastNumber = Math.max(category.lastNumber, task.number);
            category.nextAvailable = category.lastNumber + 1;
        }
    }

    return categories as Record<CategoryCode, Category>;
}
