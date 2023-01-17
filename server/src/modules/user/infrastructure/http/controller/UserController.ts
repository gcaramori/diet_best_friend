import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateUserService from '@modules/user/services/CreateUser';
import ListAllUsersService from '@modules/user/services/ListAllUsers';

class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password, birth } = request.body;
        
        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ name, email, password, birth });
        
        return response.status(200).json(instanceToInstance(user));
    }

    public async listAll(request:Request, response: Response): Promise<Response> {
        const listAllUsers = container.resolve(ListAllUsersService);

        const users = await listAllUsers.execute();

        return response.status(200).json(users);
    }
}

export default new UserController();