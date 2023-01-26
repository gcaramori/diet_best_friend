import Goals from "@modules/user/infrastructure/typeorm/entity/Goals";
import IUserGoalsRepository from "../IUserGoalsRepository";
import ICreateUserGoalsDTO from "../../dto/ICreateUserGoalsDTO";

class FakeUserGoalsRepo implements IUserGoalsRepository {
    private userGoals: Goals[] = [];

    public async create({
        initial_weight,
        actual_weight,
        goal_weight,
        calories,
        carbs,
        proteins,
        fats,
        user_id
    }: ICreateUserGoalsDTO): Promise<Goals> {
        const userGoals = new Goals();

        Object.assign(userGoals, {   
            initial_weight,
            actual_weight,
            goal_weight,
            calories,
            carbs,
            proteins,
            fats,
            user_id
        });

        this.userGoals.push(userGoals);

        return userGoals;
    }
    
    public async save(userGoals: Goals): Promise<Goals> {
        const findIndex = this.userGoals.findIndex(goal => goal.user.id === userGoals.user.id);

        this.userGoals[findIndex] = userGoals;

        return userGoals;
    }

    public async findById(id: string): Promise<Goals | undefined> {
        const user = this.userGoals.find(goal => goal.id === id);

        return user;
    }

    public async findByUserId(id: string): Promise<Goals | undefined> {
        const user = this.userGoals.find(goal => goal.user.id === id);

        return user;
    }

    public async findAll(): Promise<Goals[] | undefined> {
        const userGoals = this.userGoals;

        return userGoals;
    }
}

export default FakeUserGoalsRepo;