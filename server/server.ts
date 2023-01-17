import express, { Express, NextFunction } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { isCelebrateError } from 'celebrate';
import ormConfig from './src/config/ormconfig';
import routes from '@shared/infrastructure/http/routes';
import ErrorHandler from '@shared/errors/ErrorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

ormConfig.initialize()
.then(() => {
    console.log("DB has been initialized!");
})
.catch((err) => {
    console.error("Error during DB initialization", err);
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});