import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../config/env';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: env.databaseUrl,
    synchronize: false,
    logging: false,
    entities: [],
    migrations: ['dist/migrations/*.js'],
    subscribers: [],
});

export async function ensureDatabaseConnection(): Promise<DataSource> {
    if (AppDataSource.isInitialized) {
        return AppDataSource;
    }

    try {
        return await AppDataSource.initialize();
    } catch (error) {
        AppDataSource.destroy().catch(() => undefined);
        throw error;
    }
}
