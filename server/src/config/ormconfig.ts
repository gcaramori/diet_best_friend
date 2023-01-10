import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const ormConfig = new DataSource({
    type: 'mysql',
    url: process.env.DATABASE_URI,
    logging: false,
    synchronize: true,
    entities: ["./modules/**/*/infrastructure/typeorm/entity/*.ts"],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

export default ormConfig;