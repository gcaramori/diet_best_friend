import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Goals from '../infrastructure/typeorm/entity/Goals';
import IUserGoalsRepository from '../repository/IUserGoalsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ErrorHandler from '@shared/errors/ErrorHandler';

interface IRequest {
    id: string,
    payload: object
};

@injectable()
class UpdateUserGoalsService {
    private userGoalsRepo: IUserGoalsRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('UserGoalsRepository') userGoalsRepo: IUserGoalsRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.userGoalsRepo = userGoalsRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute({ id, payload }: IRequest): Promise<Goals> {
        let userGoals = await this.userGoalsRepo.findByUserId(id);
        
        if(!userGoals) {
            throw new ErrorHandler('User goals not found!', 401);
        }

        userGoals = Object.assign(userGoals, payload);

        await this.cacheProvider.invalidate('goals-list');

        return this.userGoalsRepo.save(userGoals);
    }
}

export default UpdateUserGoalsService;