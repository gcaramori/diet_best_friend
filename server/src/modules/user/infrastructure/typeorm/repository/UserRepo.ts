import { Repository } from 'typeorm';

import User from '../entity/User';
import ICreateUserDTO from '../../../dto/ICreateUserDTO';
import ICreateUserRepository from '../../../repository/ICreateUserRepository';
import ormConfig from '../../../../../config/ormconfig';

class UserRepo implements ICreateUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = ormConfig.getRepository(User);
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);
        await this.ormRepository.save(user);
    
        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
           where: {
            id: id
           }
        });
    
        return user;
    }
    
    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
          where: {
            email: email
          }
        });
    
        return user;
    }
    
    public async findAll(): Promise<User[] | null> {
        const users = await this.ormRepository.find({
            select: ['id', 'name', 'email']
        });

        return users;
    }
}

export default UserRepo;