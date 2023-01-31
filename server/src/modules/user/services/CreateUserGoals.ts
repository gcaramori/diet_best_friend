import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repository/IUserRepository';
import IUserGoalsRepository from '../repository/IUserGoalsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Goals from '../infrastructure/typeorm/entity/Goals';
import ErrorHandler from '@shared/errors/ErrorHandler';

interface IRequest {
    initial_weight: number,
    actual_weight: number,
    goal_weight: number,
    calories: number,
    proteins: number,
    carbs: number,
    fats: number,
    user: string
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

    public async execute({ initial_weight, actual_weight, goal_weight, calories, proteins, carbs, fats, user }: IRequest): Promise<Goals> {
        if(await this.userRepo.findById(user) === undefined) {
            throw new ErrorHandler('User not found!', 401);
        }
        if(await this.userGoalsRepo.findByUserId(user)) {
            throw new ErrorHandler('User already created his goals!', 401);
        }

        const userGoals = await this.userGoalsRepo.create({
            initial_weight,
            actual_weight,
            goal_weight,
            calories,
            proteins,
            carbs,
            fats,
            user
        });

        await this.cacheProvider.invalidate('goals-list');

        return userGoals;
    }
}

export default CreateUserGoalsService;