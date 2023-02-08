import { injectable, inject } from 'tsyringe';
import IRoutineRepository from '../repository/IRoutineRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Routine from '../infrastructure/typeorm/entity/Routine';

@injectable()
class ListAllRoutinesService {
    private routineRepo: IRoutineRepository;
    private cacheProvider: ICacheProvider;

    constructor(
        @inject('RoutineRepository') routineRepo: IRoutineRepository,
        @inject('CacheProvider') cacheProvider: ICacheProvider
    ) {
        this.routineRepo = routineRepo;
        this.cacheProvider = cacheProvider;
    }

    public async execute(): Promise<Routine[] | undefined> {
        const routines = await this.cacheProvider.recovery<Routine[]>(
            'routines-list'
        );

        if(!routines) {
            const routines = await this.routineRepo.findAll();

            await this.cacheProvider.save({
                key: 'routines-list',
                value: routines
            });

            return routines;
        }

        return routines;
    }
}

export default ListAllRoutinesService;