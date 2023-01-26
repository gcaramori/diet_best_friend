import { Repository } from 'typeorm';
import Goals from '../entity/Goals';
import ICreateUserGoalsDTO from '../../../dto/ICreateUserGoalsDTO';
import IUserGoalsRepository from '../../../repository/IUserGoalsRepository';
import ormConfig from '../../../../../../ormconfig';

class UserGoalsRepo implements IUserGoalsRepository {
    private ormRepository: Repository<Goals>;

    constructor() {
        this.ormRepository = ormConfig.getRepository(Goals);
    }

    public async create(goalsData: ICreateUserGoalsDTO): Promise<Goals> {
        const createdUserGoals = this.ormRepository.create(goalsData);
        const userGoals = this.ormRepository.save(createdUserGoals);
    
        return userGoals;
    }

    public async save(user: Goals): Promise<Goals> {
        return this.ormRepository.save(user);
    }

    public async findById(id: string): Promise<Goals | undefined> {
        const user = await this.ormRepository.findOne({
           where: { id: id }
        }) || undefined;
    
        return user;
    }
    
    public async findByUserId(id: string): Promise<Goals | undefined> {
        const user = await this.ormRepository.findOne({
           where: { id: id }
        }) || undefined;
    
        return user;
    }
    
    public async findAll(): Promise<Goals[] | undefined> {
        const users = await this.ormRepository.find();

        return users;
    }
}

export default UserGoalsRepo;