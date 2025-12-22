import dotenv from 'dotenv';

dotenv.config();

const numericPort = Number(process.env.PORT ?? 3000);

export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number.isNaN(numericPort) ? 3000 : numericPort,
    databaseUrl:
        process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/atelier2',
    if(!env.databaseUrl) {
        throw new Error('DATABASE_URL is required to start the server');
    }
}
