import { Repository } from 'typeorm';
import User from '../entity/User';
import ICreateUserDTO from '../../../dto/ICreateUserDTO';
import IUserRepository from '../../../repository/IUserRepository';
import ormConfig from '../../../../../../ormconfig';

class UserRepo implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = ormConfig.getRepository(User);
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);
        const returnedUser = await this.ormRepository.save(user);
    
        return returnedUser;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
           where: { id: id }
        }) || undefined;
    
        return user;
    }
    
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
          where: { email: email }
        }) || undefined;
    
        return user;
    }
    
    public async findAll(): Promise<User[] | undefined> {
        const users = await this.ormRepository.find();

        return users;
    }
}

export default UserRepo;