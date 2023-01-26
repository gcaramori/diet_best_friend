import { injectable, inject } from 'tsyringe';
import IUserGoalsRepository from '../repository/IUserGoalsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Goals from '../infrastructure/typeorm/entity/Goals';

@injectable()
class ListAllUsersGoalsService {
    private userGoalsRepo: IUserGoalsRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('UserGoalsRepository') userGoalsRepo: IUserGoalsRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.userGoalsRepo = userGoalsRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute(): Promise<Goals[] | undefined> {
        const usersGoals = await this.cacheProvider.recovery<Goals[]>(
            'goals-list'
        );

        if(!usersGoals) {
            const usersGoals = await this.userGoalsRepo.findAll();

            await this.cacheProvider.save({
                key: 'goals-list',
                value: usersGoals
            });

            return usersGoals;
        }

        return usersGoals;
    }
}

export default ListAllUsersGoalsService;