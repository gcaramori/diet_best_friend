import Routine from "../infrastructure/typeorm/entity/Routine";
import ICreateRoutineDTO from "@modules/routine/dto/ICreateRoutineDTO";

export default interface IRoutineRepository {
    create(data: ICreateRoutineDTO): Promise<Routine>;
    save(routine: Routine): Promise<Routine>;
    findById(id: string): Promise<Routine | undefined>;
    findByUser(user: string): Promise<Routine | undefined>;
    findAll(): Promise<Routine[] | undefined>;
}