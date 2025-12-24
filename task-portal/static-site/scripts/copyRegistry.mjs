import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function main() {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const staticSiteRoot = path.resolve(__dirname, '..');

        // Source registry in workspace .tasks
        const srcPath = path.resolve(staticSiteRoot, '../../.tasks/TASK_REGISTRY.json');
        // Destination in static-site public
        const destDir = path.resolve(staticSiteRoot, 'public');
        const destPath = path.join(destDir, 'TASK_REGISTRY.json');

        // Ensure source exists
        try {
            await fs.access(srcPath);
        } catch {
            console.error(`[copyRegistry] Source not found: ${srcPath}`);
            console.error('[copyRegistry] Skipping copy. Make sure .tasks/TASK_REGISTRY.json exists.');
            process.exitCode = 1;
            return;
        }

        // Ensure public directory exists
        await fs.mkdir(destDir, { recursive: true });

        // Read, validate JSON, then write
        const buf = await fs.readFile(srcPath, 'utf8');
        let parsed;
        try {
            parsed = JSON.parse(buf);
        } catch (e) {
            console.error('[copyRegistry] Invalid JSON in source TASK_REGISTRY.json:', e.message);
            process.exitCode = 1;
            return;
        }

        // Optional: pretty-print to destination for easier diffing
        const pretty = JSON.stringify(parsed, null, 2);
        await fs.writeFile(destPath, pretty, 'utf8');

        const total = parsed?.metadata?.totalTasks ?? (parsed?.tasks?.length ?? 'unknown');
        console.log(`[copyRegistry] Copied TASK_REGISTRY.json → public (totalTasks=${total})`);
    } catch (err) {
        console.error('[copyRegistry] Unexpected error:', err);
        process.exitCode = 1;
    }
}

main();
