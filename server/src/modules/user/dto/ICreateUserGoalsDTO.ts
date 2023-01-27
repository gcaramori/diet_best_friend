export default interface ICreateUserGoalsDTO {
    initial_weight: number,
    actual_weight: number,
    goal_weight: number,
    calories: number,
    proteins: number,
    carbs: number,
    fats: number,
    user: string
}