import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repository/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infrastructure/typeorm/entity/User';

@injectable()
class ListAllUsersService {
    private userRepo: IUserRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.userRepo = userRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute(): Promise<User[] | undefined> {
        const users = await this.cacheProvider.recovery<User[]>(
            'users-list'
        );

        if(!users) {
            const users = await this.userRepo.findAll();

            await this.cacheProvider.save({
                key: 'users-list',
                value: users
            });

            return users;
        }

        return users;
    }
}

export default ListAllUsersService;