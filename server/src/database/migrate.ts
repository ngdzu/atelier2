import { AppDataSource, ensureDatabaseConnection } from './data-source';

async function runMigrations(): Promise<void> {
    await ensureDatabaseConnection();
    await AppDataSource.runMigrations();
    await AppDataSource.destroy();
}

runMigrations().catch((error) => {
    console.error('Migration failed:', (error as Error).message);
    process.exit(1);
});
