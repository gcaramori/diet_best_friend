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

    public async create(foodData: ICreateFoodDTO): Promise<Food> {
        const food = this.ormRepository.create(foodData);
        const returnedFood = await this.ormRepository.save(food);
    
        return returnedFood;
    }

    public async save(food: Food): Promise<Food> {
        return this.ormRepository.save(food);
    }

    public async findById(id: string): Promise<Food | undefined> {
        const food = await this.ormRepository.findOne({
           where: { id: id }
        }) || undefined;
    
        return food;
    }
    
    public async findByName(name: string): Promise<Food[] | undefined> {
        const foods = await this.ormRepository.find({
          where: { name: name }
        }) || undefined;
    
        return foods;
    }

    public async findByBrand(brand: string): Promise<Food[] | undefined> {
        const foods = await this.ormRepository.find({
          where: { brand: brand }
        }) || undefined;
    
        return foods;
    }
    
    public async findAll(): Promise<Food[] | undefined> {
        const foods = await this.ormRepository.find();

        return foods;
    }
}

export default FoodRepo;