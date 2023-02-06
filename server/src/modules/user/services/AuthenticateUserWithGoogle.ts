import { injectable, inject } from 'tsyringe';
import jwt from 'jsonwebtoken';
import User from '../infrastructure/typeorm/entity/User';
import IUserRepository from '../repository/IUserRepository';
import ErrorHandler from '@shared/errors/ErrorHandler';
import authConfig from '@config/auth';

interface IRequest {
    email: string;
    verified_email: boolean;
};

interface IResponse {
    user: User;
    token: string;
};

@injectable()
class AuthenticateUserWithGoogleService {
    private userRepo: IUserRepository;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository
    ) {
        this.userRepo = userRepo;
    }

    public async execute({ email, verified_email }: IRequest): Promise<IResponse> {
        const user = await this.userRepo.findByEmail(email);

        if(!user) {
            throw new ErrorHandler('User does not exists!', 400);
        }

        if(!verified_email) {
            throw new ErrorHandler('Login with google has not been authenticated!', 400);
        }

        const token = jwt.sign({}, authConfig.secret, {
            subject: user.id,
            expiresIn: authConfig.expires_in
        });

        return { user, token };
    }
}

export default AuthenticateUserWithGoogleService;