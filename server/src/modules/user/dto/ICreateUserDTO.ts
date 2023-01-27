export default interface ICreateUserDTO {
    name: string,
    email: string,
    password: string,
    gender: string,
    birth: Date,
    height: number,
    country: string,
    cep: string
}