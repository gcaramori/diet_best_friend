import FakeUsersRepo from "../repository/fakes/FakeUserRepository";
import CreateUserService from "./CreateUser";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ListAllUsersService from "./ListAllUsers";
import { describe, expect, beforeEach, it } from 'vitest';

let listAllUsersService: ListAllUsersService;
let createUserService: CreateUserService;
let usersRepository: FakeUsersRepo;
let fakeHashProvider: FakeHashProvider;

describe('list all users', () => {
    beforeEach(() => {
        usersRepository = new FakeUsersRepo;
        fakeHashProvider = new FakeHashProvider;

        createUserService = new CreateUserService(
            usersRepository,
            fakeHashProvider
        );
        listAllUsersService = new ListAllUsersService(
            usersRepository
        );
    });

    it('should be able to list all users', async () => {
        const iterable = Array.from({ length: 5 }, (_, index) => index);

        const users = await Promise.all(
            iterable.map(async index =>
                createUserService.execute({
                    name: `user-${index}`,
                    email: `emailteste_${index}@gmail.com`,
                    password: `user-password-${index}`,
                    birth: new Date()
                })
            )
        );

        const allUsers = await listAllUsersService.execute();
        
        expect(allUsers).toEqual([...users]);
    });
});