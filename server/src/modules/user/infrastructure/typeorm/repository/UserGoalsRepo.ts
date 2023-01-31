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

    public async save(goals: Goals): Promise<Goals> {
        return this.ormRepository.save(goals);
    }

    public async findById(id: string): Promise<Goals | undefined> {
        const user = await this.ormRepository.findOne({
           where: { id: id }
        }) || undefined;
    
        return user;
    }
    
    public async findByUserId(id: string): Promise<Goals | undefined> {
        const userGoals = await this.ormRepository.findOne({
           where: { user: { id: id } }
        }) || undefined;
    
        return userGoals;
    }
    
    public async findAll(): Promise<Goals[] | undefined> {
        const users = await this.ormRepository
            .createQueryBuilder('goals')
            .innerJoinAndSelect('goals.user', 'users')
            .where('goals.user = users.id')
            .getMany();

        return users;
    }
}

export default UserGoalsRepo;