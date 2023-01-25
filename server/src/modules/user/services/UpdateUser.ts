import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import User from '../infrastructure/typeorm/entity/User';
import IUserRepository from "../repository/IUserRepository";
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ErrorHandler from '@shared/errors/ErrorHandler';

interface IRequest {
    email: string,
    payload: object,
};

@injectable()
class UpdateUserService {
    private userRepo: IUserRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.userRepo = userRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute({ email, payload }: IRequest): Promise<User> {
        let user = await this.userRepo.findByEmail(email);
        
        if(!user) {
            throw new ErrorHandler('User not found!', 401);
        }

        user = Object.assign(user, payload);

        await this.cacheProvider.invalidate('users-list');

        return this.userRepo.save(user);
    }
}

export default UpdateUserService;