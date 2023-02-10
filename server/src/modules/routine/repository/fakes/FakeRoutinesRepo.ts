import { uuid } from 'uuidv4';
import Routine from '@modules/routine/infrastructure/typeorm/entity/Routine';
import IRoutineRepository from '../IRoutineRepository';
import ICreateRoutineDTO from '@modules/routine/dto/ICreateRoutineDTO';

class FakeRoutinesRepo implements IRoutineRepository {
    private routines: Routine[] = [];

    public async create({
        day,
        breakfast,
        lunch,
        dinner,
        snacks,
        user
    }: ICreateRoutineDTO): Promise<Routine> {
        const routine = new Routine();

        Object.assign(routine, {   
            id: uuid(),
            day,
            breakfast,
            lunch,
            dinner,
            snacks,
            user
        });

        this.routines.push(routine);

        return routine;
    }
    
    public async save(routine: Routine): Promise<Routine> {
        const findIndex = this.routines.findIndex(routine => routine.id === routine.id);

        this.routines[findIndex] = routine;

        return routine;
    }

    public async findById(id: string): Promise<Routine | undefined> {
        const routine = this.routines.find(routine => routine.id === id);

        return routine;
    }

    public async findByUser(user: string): Promise<Routine | undefined> {
        const routine = this.routines.find(routine => routine.user.id === user);

        return routine;
    }

    public async findAll(): Promise<Routine[] | undefined> {
        const routines = this.routines;

        return routines;
    }
}

export default FakeRoutinesRepo;