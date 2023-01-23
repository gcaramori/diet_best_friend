import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import AuthenticateUserService from '@modules/user/services/AuthenticateUser';

class SessionController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUser = container.resolve(AuthenticateUserService);
        const { user, token } = await authenticateUser.execute({ email, password });

        return response.status(200).json({ user: instanceToInstance(user), token });
    }
}

export default new SessionController();