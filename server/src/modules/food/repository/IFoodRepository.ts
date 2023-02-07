import Food from '../infrastructure/typeorm/entity/Food';
import ICreateFoodDTO from "../dto/ICreateFoodDTO";

export default interface IFoodRepository {
    create(data: ICreateFoodDTO): Promise<Food>;
    save(Food: Food): Promise<Food>;
    findById(id: string): Promise<Food | undefined>;
    findByName(name: string): Promise<Food | undefined>;
    findByBrand(brand: string): Promise<Food | undefined>;
    findAll(): Promise<Food[] | undefined>;
}