import { beforeEach, describe, it, expect } from "vitest";
import CreateUserGoalsService from "./CreateUserGoals";
import CreateUserService from "./CreateUser";
import FakeUserRepo from "@modules/user/repository/fakes/FakeUserRepository";
import FakeUserGoalsRepo from "@modules/user/repository/fakes/FakeUserGoalsRepository";
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import ErrorHandler from "@shared/errors/ErrorHandler";

let createUserGoalsService: CreateUserGoalsService;
let createUserService: CreateUserService;
let fakeUsersRepo: FakeUserRepo;
let fakeUsersGoalsRepo: FakeUserGoalsRepo;
let fakeRedisCacheProvider: FakeRedisCacheProvider;
let fakeHashProvider: FakeHashProvider;

describe('creating user goals', () => {
    beforeEach(() => {
        fakeUsersRepo = new FakeUserRepo;
        fakeUsersGoalsRepo = new FakeUserGoalsRepo;
        fakeRedisCacheProvider = new FakeRedisCacheProvider;
        fakeHashProvider = new FakeHashProvider;

        createUserGoalsService = new CreateUserGoalsService(
            fakeUsersRepo,
            fakeUsersGoalsRepo,
            fakeRedisCacheProvider
        );
        createUserService = new CreateUserService(
            fakeUsersRepo,
            fakeHashProvider,
            fakeRedisCacheProvider
        );
    });

    it('should be able to create new user goals', async() => {
        const user = await createUserService.execute({
            name: 'Tester',
            email: 'testemail@gmail.com',
            password: 'password',
            gender: 'male',
            birth: new Date(),
            height: 185,
            country: 'Brazil',
            cep: "13380-530"
        });

        const userGoals = await createUserGoalsService.execute({
            initial_weight: 90,
            actual_weight: 105,
            goal_weight: 80,
            calories: 2000,
            proteins: 200,
            carbs: 300,
            fats: 105,
            user: user.id
        });

        expect(user).toHaveProperty('id');
        expect(userGoals).toHaveProperty('user');
    });

    it('should not be able to create new user goals when its already created', async() => {
        const user = await createUserService.execute({
            name: 'Tester',
            email: 'testemail@gmail.com',
            password: 'password',
            gender: 'male',
            birth: new Date(),
            height: 185,
            country: 'Brazil',
            cep: "13380-530"
        });

        await createUserGoalsService.execute({
            initial_weight: 90,
            actual_weight: 105,
            goal_weight: 80,
            calories: 2000,
            proteins: 200,
            carbs: 300,
            fats: 105,
            user: user.id
        });

        await expect(
            createUserGoalsService.execute({
                initial_weight: 90,
                actual_weight: 105,
                goal_weight: 80,
                calories: 2000,
                proteins: 200,
                carbs: 300,
                fats: 105,
                user: user.id
            })
        ).rejects.toBeInstanceOf(ErrorHandler);
    });
});