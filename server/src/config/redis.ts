import { RedisOptions } from "ioredis";

interface IRedisOptions {
    driver: string,
    config: RedisOptions
};

export default {
    driver: 'redis',
    config: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    }
} as IRedisOptions;