import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IRoutineRepository from '../repository/IRoutineRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Routine from '../infrastructure/typeorm/entity/Routine';

interface IDietRoutine {
    food: string,
    quantity: number
}

interface IRequest {
    day: Date,
    breakfast: IDietRoutine[],
    lunch: IDietRoutine[],
    dinner: IDietRoutine[],
    snacks: IDietRoutine[],
    user: string
}

@injectable()
class CreateRoutineService {
    private routineRepo: IRoutineRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('RoutineRepository') routineRepo: IRoutineRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.routineRepo = routineRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute({ day, breakfast, lunch, dinner, snacks, user }: IRequest): Promise<Routine> {
        const routine = await this.routineRepo.create({
            day,
            breakfast,
            lunch,
            dinner,
            snacks,
            user
        });

        await this.cacheProvider.invalidate('routines-list');

        return routine;
    }
}

export default CreateRoutineService;