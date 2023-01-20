import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import User from '../infrastructure/typeorm/entity/User';
import IUserRepository from '../repository/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ErrorHandler from '@shared/errors/ErrorHandler';
import authConfig from '@config/auth';

interface IRequest {
    email: string;
    password: string;
};

interface IResponse {
    user: User;
    token: string;
};

@injectable()
class AuthenticateUserService {
    private userRepo: IUserRepository;
    private hashProvider: IHashProvider;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository,
        @inject('HashProvider') hashProvider: IHashProvider
    ) {
        this.userRepo = userRepo;
        this.hashProvider = hashProvider;
    }

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepo.findByEmail(email);

        if(!user) {
            throw new ErrorHandler('User does not exists!', 400);
        }

        if(!(await this.hashProvider.compareHash(password, user.password))) {
            throw new ErrorHandler('Incorrect password!', 400);
        }

        const token = sign({}, authConfig.secret, {
            subject: user.id,
            expiresIn: authConfig.expires_in 
        });

        return { user, token };
    }
}

export default AuthenticateUserService;