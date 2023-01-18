import express, { Express, NextFunction } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import '@shared/container';
import { isCelebrateError } from 'celebrate';
import ConnectDB from '@shared/infrastructure/typeorm/index';
import routes from '@shared/infrastructure/http/routes';
import ErrorHandler from '@shared/errors/ErrorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

ConnectDB();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});