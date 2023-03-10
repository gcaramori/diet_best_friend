import { container } from 'tsyringe';
import ICacheProvider from './CacheProvider/models/ICacheProvider';
import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider';

container.registerSingleton<ICacheProvider>(
    'CacheProvider', RedisCacheProvider
);