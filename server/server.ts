import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import ormConfig from './src/config/ormconfig';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

ormConfig.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Express + TypeScript Server');
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});