import { container } from 'tsyringe';
import '@modules/user/providers';
import '@shared/container/providers';
import IUserRepository from '@modules/user/repository/IUserRepository';
import UserRepository from '@modules/user/infrastructure/typeorm/repository/UserRepo';

container.registerSingleton<IUserRepository>(
    'UserRepository', UserRepository
);
