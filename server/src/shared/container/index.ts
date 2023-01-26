import { container } from 'tsyringe';
import '@modules/user/providers';
import '@shared/container/providers';
import IUserRepository from '@modules/user/repository/IUserRepository';
import UserRepo from '@modules/user/infrastructure/typeorm/repository/UserRepo';
import IUserGoalsRepository from '@modules/user/repository/IUserGoalsRepository';
import UserGoalsRepo from '@modules/user/infrastructure/typeorm/repository/UserGoalsRepo';

container.registerSingleton<IUserRepository>(
    'UserRepository', UserRepo
);

container.registerSingleton<IUserGoalsRepository>(
    'UserGoalsRepository', UserGoalsRepo
);