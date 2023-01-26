import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repository/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Goals from '../infrastructure/typeorm/entity/Goals';
import ErrorHandler from '@shared/errors/ErrorHandler';
import IUserGoalsRepository from '../repository/IUserGoalsRepository';

interface IRequest {
    initial_weight: number,
    actual_weight: number,
    goal_weight: number,
    calories: number,
    proteins: number,
    carbs: number,
    fats: number,
    user_id: string
};

@injectable()
class CreateUserGoalsService {
    private userRepo: IUserRepository;
    private userGoalsRepo: IUserGoalsRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository,
        @inject('UserGoalsRepository') userGoalsRepo: IUserGoalsRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.userRepo = userRepo;
        this.userGoalsRepo = userGoalsRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute({ initial_weight, actual_weight, goal_weight, calories, proteins, carbs, fats, user_id }: IRequest): Promise<Goals> {
        if(await this.userRepo.findById(user_id) === undefined) {
            throw new ErrorHandler('User not found!', 401);
        }

        const user = await this.userGoalsRepo.create({
            initial_weight,
            actual_weight,
            goal_weight,
            calories,
            proteins,
            carbs, 
            fats,
            user_id
        });

        await this.cacheProvider.invalidate('goals-list');

        return user;
    }
}

export default CreateUserGoalsService;