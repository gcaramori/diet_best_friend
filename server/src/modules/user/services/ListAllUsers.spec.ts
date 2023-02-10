import FakeUsersRepo from "../repository/fakes/FakeUserRepository";
import CreateUserService from "./CreateUser";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";
import ListAllUsersService from "./ListAllUsers";
import { describe, expect, beforeEach, it } from 'vitest';

let listAllUsersService: ListAllUsersService;
let createUserService: CreateUserService;
let fakeUsersRepository: FakeUsersRepo;
let fakeCacheProvider: FakeRedisCacheProvider;
let fakeHashProvider: FakeHashProvider;

describe('list all users', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepo;
        fakeHashProvider = new FakeHashProvider;
        fakeCacheProvider = new FakeRedisCacheProvider;

        createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider
        );
        listAllUsersService = new ListAllUsersService(
            fakeUsersRepository,
            fakeCacheProvider
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
                    gender: 'male',
                    birth: new Date(),
                    height: 185,
                    country: 'Brazil',
                    city: '13380-530'
                })
            )
        );

        const allUsers = await listAllUsersService.execute();
        
        expect(allUsers).toEqual([...users]);
    });
});