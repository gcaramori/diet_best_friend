import { Repository } from 'typeorm';
import Routine from '../entity/Routine';
import ICreateRoutineDTO from '@modules/routine/dto/ICreateRoutineDTO';
import IRoutineRepository from '@modules/routine/repository/IRoutineRepository';
import ormConfig from '../../../../../../ormconfig';

class RoutineRepo implements IRoutineRepository {
    private ormRepository: Repository<Routine>;

    constructor() {
        this.ormRepository = ormConfig.getRepository(Routine);
    }

    public async create(routineData: ICreateRoutineDTO): Promise<Routine> {
        const routine = this.ormRepository.create(routineData);
        const returnedRoutine = await this.ormRepository.save(routine);
    
        return returnedRoutine;
    }

    public async save(routine: Routine): Promise<Routine> {
        return this.ormRepository.save(routine);
    }

    public async findById(id: string): Promise<Routine | undefined> {
        const routine = await this.ormRepository.findOne({
           where: { id: id }
        }) || undefined;
    
        return routine;
    }

    public async findByUser(user: string): Promise<Routine | undefined> {
        const routine = await this.ormRepository.findOne({
          where: { user: user }
        }) || undefined;
    
        return routine;
    }
    
    public async findAll(): Promise<Routine[] | undefined> {
        const routines = await this.ormRepository.find();

        return routines;
    }
}

export default RoutineRepo;