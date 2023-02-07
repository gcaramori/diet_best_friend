import { Repository } from 'typeorm';
import Food from '../entity/Food';
import ICreateFoodDTO from '@modules/food/dto/ICreateFoodDTO';
import IFoodRepository from '@modules/food/repository/IFoodRepository';
import ormConfig from '../../../../../../ormconfig';

class FoodRepo implements IFoodRepository {
    private ormRepository: Repository<Food>;

    constructor() {
        this.ormRepository = ormConfig.getRepository(Food);
    }

    public async create(FoodData: ICreateFoodDTO): Promise<Food> {
        const food = this.ormRepository.create(FoodData);
        const returnedFood = await this.ormRepository.save(food);
    
        return returnedFood;
    }

    public async save(Food: Food): Promise<Food> {
        return this.ormRepository.save(Food);
    }

    public async findById(id: string): Promise<Food | undefined> {
        const Food = await this.ormRepository.findOne({
           where: { id: id }
        }) || undefined;
    
        return Food;
    }
    
    public async findByName(name: string): Promise<Food | undefined> {
        const Food = await this.ormRepository.findOne({
          where: { name: name }
        }) || undefined;
    
        return Food;
    }

    public async findByBrand(brand: string): Promise<Food | undefined> {
        const Food = await this.ormRepository.findOne({
          where: { brand: brand }
        }) || undefined;
    
        return Food;
    }
    
    public async findAll(): Promise<Food[] | undefined> {
        const Foods = await this.ormRepository.find();

        return Foods;
    }
}

export default FoodRepo;