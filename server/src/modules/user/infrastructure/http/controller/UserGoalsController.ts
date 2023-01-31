import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateUserGoalsService from '@modules/user/services/CreateUserGoals';
import UpdateUserGoalsService from '@modules/user/services/UpdateUserGoals';
import ListAllUsersGoalsService from '@modules/user/services/ListAllUsersGoals';

class UserGoalsController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { initial_weight, actual_weight, goal_weight, calories, proteins, carbs, fats, user } = request.body;
            const createUserGoals = container.resolve(CreateUserGoalsService);
            const userGoals = await createUserGoals.execute({ initial_weight, actual_weight, goal_weight, calories, proteins, carbs, fats, user });
            
            return response.status(200).json(instanceToInstance(userGoals));
        }
        catch(err) {
            return response.status(401).json(err);
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id, payload } = request.body;
        const updateUserGoals = container.resolve(UpdateUserGoalsService);
        const userGoals = await updateUserGoals.execute({ id, payload });

        return response.status(200).json(instanceToInstance(userGoals));
    }

    public async listAll(request: Request, response: Response): Promise<Response> {
        const listAllUsersGoals = container.resolve(ListAllUsersGoalsService);
        const users = await listAllUsersGoals.execute();

        return response.status(200).json(users);
    }
}

export default new UserGoalsController();