import Goals from "../infrastructure/typeorm/entity/Goals";
import ICreateUserGoalsDTO from "../dto/ICreateUserGoalsDTO";

export default interface IUserGoalsRepository {
    create(data: ICreateUserGoalsDTO): Promise<Goals>;
    save(user: Goals): Promise<Goals>;
    findById(id: string): Promise<Goals | undefined>;
    findByUserId(id: string): Promise<Goals | undefined>;
    findAll(): Promise<Goals[] | undefined>;
}