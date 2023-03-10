import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateUserService from '@modules/user/services/CreateUser';
import ListAllUsersService from '@modules/user/services/ListAllUsers';
import UpdateUserService from '@modules/user/services/UpdateUser';

class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password, gender, birth, height, country, city } = request.body;
            const createUser = container.resolve(CreateUserService);
            const user = await createUser.execute({ name, email, password, gender, birth, height, country, city });
            
            return response.status(200).json(instanceToInstance(user));
        }
        catch(err) {
            return response.status(401).json(err);
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { email, payload } = request.body;
        const updateUser = container.resolve(UpdateUserService);
        const user = await updateUser.execute({ email, payload });

        return response.status(200).json(instanceToInstance(user));
    }

    public async listAll(request: Request, response: Response): Promise<Response> {
        const listAllUsers = container.resolve(ListAllUsersService);
        const users = await listAllUsers.execute();

        return response.status(200).json(users);
    }
}

export default new UserController();