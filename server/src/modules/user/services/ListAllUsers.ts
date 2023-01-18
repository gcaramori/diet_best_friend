import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repository/IUserRepository';
import User from '../infrastructure/typeorm/entity/User';

@injectable()
class ListAllUsersService {
    private userRepo: IUserRepository;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository,
    ) {
        this.userRepo = userRepo;
    }

    public async execute(): Promise<User[] | undefined> {
        const users = await this.userRepo.findAll();

        return users;
    }
}

export default ListAllUsersService;