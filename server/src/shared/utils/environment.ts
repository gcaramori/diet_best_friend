import { config } from "dotenv";

config();

export const {
    JWT_SECRET,
    JWT_EXPIRES
} = process.env;

export const {
    TYPEORM_TYPE,
    TYPEORM_HOST,
    TYPEORM_PORT,
    TYPEORM_USER,
    TYPEORM_PASSWORD,
    TYPEORM_DATABASE
} = process.env;

export const {
    REDIS_CONNECTION,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
} = process.env