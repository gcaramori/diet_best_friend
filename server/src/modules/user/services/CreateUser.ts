import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repository/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infrastructure/typeorm/entity/User';
import ErrorHandler from '@shared/errors/ErrorHandler';

interface IRequest {
    name: string,
    email: string,
    password: string,
    gender: string,
    birth: Date,
    height: number,
    country: string,
    cep: string
};

@injectable()
class CreateUserService {
    private userRepo: IUserRepository;
    private hashProvider: IHashProvider;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository,
        @inject('HashProvider') hashProvider: IHashProvider,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.userRepo = userRepo;
        this.hashProvider = hashProvider;
        this.cacheProvider = cacheProvider;
    }

    public async execute({ name, email, password, gender, birth, height, country, cep }: IRequest): Promise<User> {
        if(await this.userRepo.findByEmail(email)) {
            throw new ErrorHandler('Email already in use', 401);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);
        const user = await this.userRepo.create({
            name,
            email,
            password: hashedPassword,
            gender,
            birth,
            height,
            country,
            cep
        });

        await this.cacheProvider.invalidate('users-list');

        return user;
    }
}

export default CreateUserService;