import User from "../infrastructure/typeorm/entity/User";
import ICreateUserDTO from "../dto/ICreateUserDTO";

export default interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findAll(): Promise<User[] | undefined>;
}