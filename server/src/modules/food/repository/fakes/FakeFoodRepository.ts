import { uuid } from 'uuidv4';
import Food from '../../infrastructure/typeorm/entity/Food'
import IFoodRepository from '../IFoodRepository';
import ICreateFoodDTO from '@modules/food/dto/ICreateFoodDTO';

class FakeFoodsRepo implements IFoodRepository {
    private foods: Food[] = [];

    public async create({
        name,
        brand,
        portion_size,
        portion,
        extra_information
    }: ICreateFoodDTO): Promise<Food> {
        const food = new Food();

        Object.assign(food, {   
            id: uuid(),
            name,
            brand,
            portion_size,
            portion,
            extra_information
        });

        this.foods.push(food);

        return food;
    }
    
    public async save(food: Food): Promise<Food> {
        const findIndex = this.foods.findIndex(food => food.id === food.id);

        this.foods[findIndex] = food;

        return food;
    }

    public async findById(id: string): Promise<Food | undefined> {
        const food = this.foods.find(food => food.id === id);

        return food;
    }

    public async findByName(name: string): Promise<Food | undefined> {
        const food = this.foods.find(food => food.name === name);

        return food;
    }

    public async findByBrand(brand: string): Promise<Food | undefined> {
        const food = this.foods.find(food => food.brand === brand);

        return food;
    }

    public async findAll(): Promise<Food[] | undefined> {
        const foods = this.foods;

        return foods;
    }
}

export default FakeFoodsRepo;