import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const ormConfig = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    migrations: ["./src/shared/infrastructure/typeorm/migrations/*.ts"],
    entities: ["./src/modules/**/infrastructure/typeorm/entity/*.ts"]
});

export default ormConfig;