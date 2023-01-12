import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { parse } from "path";

dotenv.config();

const ormConfig = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: false,
    entities: ["../modules/**/*/infrastructure/typeorm/entity/*.ts"],
    migrations: ["../shared/infrastructure/typeorm/migrations"],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

export default ormConfig;