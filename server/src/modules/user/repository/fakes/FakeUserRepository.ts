import { uuid } from 'uuidv4';
import User from "../../infrastructure/typeorm/entity/User";
import IUserRepository from "../IUserRepository";
import ICreateUserDTO from "../../dto/ICreateUserDTO";

class FakeUsersRepo implements IUserRepository {
    private users: User[] = [];

    public async create({
        name,
        email,
        password,
        gender,
        birth,
        height,
        country,
        city
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {   
            id: uuid(),
            name,
            email,
            password,
            gender,
            birth,
            height,
            country,
            city
        });

        this.users.push(user);

        return user;
    }
    
    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(user => user.id === user.id);

        this.users[findIndex] = user;

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    public async findAll(): Promise<User[] | undefined> {
        const users = this.users;

        return users;
    }
}

export default FakeUsersRepo;