import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateFoodService from '@modules/food/services/CreateFood';
import ListAllFoodsService from '@modules/food/services/ListAllFoods';

class FoodController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { name, brand, portion_size, portion, calories, extra_information } = request.body;
            const createFood = container.resolve(CreateFoodService);
            const food = await createFood.execute({ name, brand, portion_size, portion, calories, extra_information });
            
            return response.status(200).json(instanceToInstance(food));
        }
        catch(err) {
            return response.status(401).json(err);
        }
    }

    public async listAll(request: Request, response: Response): Promise<Response> {
        const listAllFoods = container.resolve(ListAllFoodsService);
        const foods = await listAllFoods.execute();

        return response.status(200).json(foods);
    }
}

export default new FoodController();