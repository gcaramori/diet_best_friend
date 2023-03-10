import Redis, { Redis as RedisClient } from 'ioredis';
import RedisConfig from '@config/redis';
import ICacheProvider from '../models/ICacheProvider';
import ICacheProviderDTO from '../dto/ICacheProviderDTO';

class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;
    
    constructor() {
        this.client = new Redis(RedisConfig.connection);
    }

    public async save({ key, value }: ICacheProviderDTO): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recovery<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if(!data) {
            return null;
        }

        const parsedData = JSON.parse(data);

        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`);
        const pipeline = this.client.pipeline();

        keys.forEach(key => {
            pipeline.del(key);
        });

        await pipeline.exec();
    }
}

export default RedisCacheProvider;