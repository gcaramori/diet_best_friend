import { REDIS_CONNECTION } from "@shared/utils/environment";

interface IRedisOptions {
    driver: string,
    connection: string
};

export default {
    driver: 'redis',
    connection: REDIS_CONNECTION
} as IRedisOptions;