import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Food from '../infrastructure/typeorm/entity/Food';
import IFoodRepository from '../repository/IFoodRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ErrorHandler from '@shared/errors/ErrorHandler';

interface IRequest {
    id: string,
    payload: object,
};

@injectable()
class UpdateFoodService {
    private foodsRepo: IFoodRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('FoodRepository') foodsRepo: IFoodRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.foodsRepo = foodsRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute({ id, payload }: IRequest): Promise<Food> {
        let food = await this.foodsRepo.findById(id);
        
        if(!food) {
            throw new ErrorHandler('Food not found!', 401);
        }

        food = Object.assign(food, payload);

        await this.cacheProvider.invalidate('foods-list');

        return this.foodsRepo.save(food);
    }
}

export default UpdateFoodService;