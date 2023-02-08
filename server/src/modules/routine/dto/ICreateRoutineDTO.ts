interface IDietRoutine {
    food: string,
    quantity: number
}

export default interface ICreateRoutineDTO {
    day: Date,
    breakfast: IDietRoutine[],
    lunch: IDietRoutine[],
    dinner: IDietRoutine[],
    snacks: IDietRoutine[],
    user: string
}