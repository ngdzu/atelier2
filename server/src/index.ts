import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env, validateEnv } from './config/env';
import { ensureDatabaseConnection } from './database/data-source';

async function bootstrap(): Promise<void> {
    validateEnv();

    const app = express();

    app.use(helmet());
    app.use(
        cors({
            origin: env.clientUrl,
            credentials: true,
        }),
    );
    app.use(express.json());

    app.get('/health', async (_req: Request, res: Response) => {
        try {
            await ensureDatabaseConnection();
            res.status(200).json({
                status: 'ok',
                environment: env.nodeEnv,
                database: 'connected',
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: (error as Error).message,
            });
        }
    });

    const server = app.listen(env.port, async () => {
        try {
            await ensureDatabaseConnection();
            console.log(`Server listening on port ${env.port}`);
        } catch (error) {
            console.error('Database connection failed:', (error as Error).message);
            server.close(() => process.exit(1));
        }
    });
}

void bootstrap();
