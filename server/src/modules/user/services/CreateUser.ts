import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repository/ICreateUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infrastructure/typeorm/entity/User';
import ErrorHandler from '../../../shared/errors/ErrorHandler';

interface IRequest {
    name: string,
    email: string,
    password: string,
    birth: Date
};

@injectable()
class CreateUserService {
    private userRepo: IUserRepository;
    private hashProvider: IHashProvider;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository,
        @inject('HashProvider') hashProvider: IHashProvider
    ) {
        this.userRepo = userRepo;
        this.hashProvider = hashProvider;
    }

    public async execute({ name, email, password, birth }: IRequest): Promise<User> {
        if(await this.userRepo.findByEmail(email)) {
            throw new ErrorHandler('Email already in use', 401);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);
        const user = await this.userRepo.create({
            name,
            email,
            password: hashedPassword,
            birth
        });

        return user;
    }
}

export default CreateUserService;