import { beforeEach, describe, it, expect } from "vitest";
import CreateUserGoalsService from "./CreateUserGoals";
import CreateUserService from "./CreateUser";
import FakeUserRepo from "@modules/user/repository/fakes/FakeUserRepository";
import FakeUserGoalsRepo from "@modules/user/repository/fakes/FakeUserGoalsRepository";
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

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
            name: 'tester',
            email: 'tester@gmail.com',
            password: 'password',
            birth: new Date()
        });

        const userGoals = await createUserGoalsService.execute({
            initial_weight: 90,
            actual_weight: 105,
            goal_weight: 80,
            calories: 2000,
            proteins: 200,
            carbs: 300,
            fats: 105,
            user_id: user.id
        });

        expect(user).toHaveProperty('id');
        expect(userGoals).toHaveProperty('user_id');
    });
});