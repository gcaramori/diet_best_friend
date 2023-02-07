import { injectable, inject } from 'tsyringe';
import IFoodRepository from '../repository/IFoodRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Food from '../infrastructure/typeorm/entity/Food';

@injectable()
class ListAllFoodsService {
    private foodRepo: IFoodRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('FoodRepository') foodRepo: IFoodRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.foodRepo = foodRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute(): Promise<Food[] | undefined> {
        const foods = await this.cacheProvider.recovery<Food[]>(
            'foods-list'
        );

        if(!foods) {
            const foods = await this.foodRepo.findAll();

            await this.cacheProvider.save({
                key: 'foods-list',
                value: foods
            });

            return foods;
        }

        return foods;
    }
}

export default ListAllFoodsService;