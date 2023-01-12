import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import ormConfig from './src/config/ormconfig';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

ormConfig.initialize()
.then(() => {
    console.log("DB has been initialized!");
})
.catch((err) => {
    console.error("Error during DB initialization", err);
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Express + TypeScript Server');
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});