export default interface IHashProvider {
    generateHash(payload: string): Promise<String>,
    compareHash(payload: string, hashed: string): Promise<boolean>
}