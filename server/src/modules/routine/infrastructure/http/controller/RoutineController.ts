import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateRoutineService from '@modules/routine/services/CreateRoutine';
import ListAllRoutinesService from '@modules/routine/services/ListAllRoutines';

class RoutineController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { day, breakfast, lunch, dinner, snacks, user } = request.body;
            const createRoutine = container.resolve(CreateRoutineService);
            const routine = await createRoutine.execute({ day, breakfast, lunch, dinner, snacks, user });
            
            return response.status(200).json(instanceToInstance(routine));
        }
        catch(err) {
            return response.status(401).json(err);
        }
    }

    public async listAll(request: Request, response: Response): Promise<Response> {
        const listAllRoutines = container.resolve(ListAllRoutinesService);
        const routines = await listAllRoutines.execute();

        return response.status(200).json(routines);
    }
}

export default new RoutineController();