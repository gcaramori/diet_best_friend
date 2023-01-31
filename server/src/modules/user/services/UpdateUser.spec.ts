import UpdateUserService from "./UpdateUser";
import CreateUserService from "./CreateUser";
import FakeUsersRepo from "../repository/fakes/FakeUserRepository";
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import { describe, expect, beforeEach, it } from 'vitest';

let updateUserService: UpdateUserService;
let createUserService: CreateUserService;
let fakeUsersRepo: FakeUsersRepo;
let fakeRedisCacheProvider: FakeRedisCacheProvider;
let fakeHashProvider: FakeHashProvider;

describe('updating a existing user', () => {
    beforeEach(() => {
        fakeUsersRepo = new FakeUsersRepo;
        fakeHashProvider = new FakeHashProvider;
        fakeRedisCacheProvider = new FakeRedisCacheProvider;

        createUserService = new CreateUserService(
            fakeUsersRepo,
            fakeHashProvider,
            fakeRedisCacheProvider
        );
        updateUserService = new UpdateUserService(
            fakeUsersRepo,
            fakeRedisCacheProvider
        );
    });

    it('should be able to update a user', async() => {
        await createUserService.execute({
            name: 'Tester',
            email: 'testermail@gmail.com',
            password: 'password',
            gender: 'male',
            birth: new Date(),
            height: 185,
            country: 'Brazil',
            cep: "13380-530"
        })

        const user = await updateUserService.execute({
            email: "testermail@gmail.com",
            payload: {
                name: "Guilhermino",
                birth: new Date()
            }
        });

        expect(user).toHaveProperty('email');
    });
});