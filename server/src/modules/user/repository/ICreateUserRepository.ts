import User from "../infrastructure/typeorm/entity/User";
import ICreateUserDTO from "../dto/ICreateUserDTO";

export default interface ICreateUserRepository {
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[] | null>;
}