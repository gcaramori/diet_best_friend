import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import AuthenticateUserService from '@modules/user/services/AuthenticateUser';
import AuthenticateUserWithGoogleService from '@modules/user/services/AuthenticateUserWithGoogle';

class SessionController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;
            const authenticateUser = container.resolve(AuthenticateUserService);
            const { user, token } = await authenticateUser.execute({ email, password });

            return response.status(200).json({ user: instanceToInstance(user), token });
        }
        catch(err) {
            return response.status(401).json(err);
        }
    }

    public async createWithGoogle(request: Request, response: Response): Promise<Response> {
        try {
            const { email, verified_email } = request.body;
            const authenticateUserWithGoogle = container.resolve(AuthenticateUserWithGoogleService);
            const { user, token } = await authenticateUserWithGoogle.execute({ email, verified_email });

            return response.status(200).json({ user: instanceToInstance(user), token });
        }
        catch(err) {
            return response.status(401).json(err);
        }
    }
}

export default new SessionController();