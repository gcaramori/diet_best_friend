import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateUserGoalsService from '@modules/user/services/CreateUserGoals';
import ListAllUsersGoalsService from '@modules/user/services/ListAllUsersGoals';

class UserGoalsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { initial_weight, actual_weight, goal_weight, calories, proteins, carbs, fats, email } = request.body;
        const createUserGoals = container.resolve(CreateUserGoalsService);
        const user = await createUserGoals.execute({ initial_weight, actual_weight, goal_weight, calories, proteins, carbs, fats, email });
        
        return response.status(200).json(instanceToInstance(user));
    }

    public async listAll(request: Request, response: Response): Promise<Response> {
        const listAllUsersGoals = container.resolve(ListAllUsersGoalsService);
        const users = await listAllUsersGoals.execute();

        return response.status(200).json(users);
    }
}

export default new UserGoalsController();