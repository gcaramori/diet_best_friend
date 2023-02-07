import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IFoodRepository from '../repository/IFoodRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Food from '../infrastructure/typeorm/entity/Food';

interface IRequest {
    name: string,
    brand: string,
    portion_size: string,
    portion: number,
    calories: number,
    extra_information: object
};

@injectable()
class CreateFoodService {
    private foodRepo: IFoodRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('FoodRepository') foodRepo: IFoodRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.foodRepo = foodRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute({ name, brand, portion_size, portion, calories, extra_information }: IRequest): Promise<Food> {
        const food = await this.foodRepo.create({
            name,
            brand,
            portion_size,
            portion,
            calories,
            extra_information
        });

        await this.cacheProvider.invalidate('foods-list');

        return food;
    }
}

export default CreateFoodService;