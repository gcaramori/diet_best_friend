import { describe, expect, beforeEach, it } from 'vitest';
import UpdateUserGoalsService from "./UpdateUserGoals";
import CreateUserService from "./CreateUser";
import CreateUserGoalsService from "./CreateUserGoals";
import FakeUserRepository from "../repository/fakes/FakeUserRepository";
import FakeUserGoalsRepo from "../repository/fakes/FakeUserGoalsRepository";
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepo from "../repository/fakes/FakeUserRepository";

let updateUserGoalsService: UpdateUserGoalsService;
let createUserService: CreateUserService;
let createUserGoalsService: CreateUserGoalsService;
let fakeUsersGoalsRepo: FakeUserGoalsRepo;
let fakeUserRepo: FakeUsersRepo;
let fakeRedisCacheProvider: FakeRedisCacheProvider;
let fakeHashProvider: FakeHashProvider;

describe('updating a existing user', () => {
    beforeEach(() => {
        fakeUsersGoalsRepo = new FakeUserGoalsRepo;
        fakeUserRepo = new FakeUserRepository;
        fakeHashProvider = new FakeHashProvider;
        fakeRedisCacheProvider = new FakeRedisCacheProvider;

        createUserGoalsService = new CreateUserGoalsService(
            fakeUserRepo,
            fakeUsersGoalsRepo,
            fakeRedisCacheProvider
        );
        createUserService = new CreateUserService(
            fakeUserRepo,
            fakeHashProvider,
            fakeRedisCacheProvider
        );
        updateUserGoalsService = new UpdateUserGoalsService(
            fakeUsersGoalsRepo,
            fakeRedisCacheProvider
        );
    });

    it('should be able to update a user', async() => {
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

        const updatedUserGoals = await updateUserGoalsService.execute({
            id: user.id,
            payload: {
                actual_weight: 105
            }
        });

        expect(updatedUserGoals).toHaveProperty('actual_weight');
    });
});