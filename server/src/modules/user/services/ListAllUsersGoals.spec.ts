import { describe, expect, beforeEach, it } from 'vitest';
import FakeUserGoalsRepo from '../repository/fakes/FakeUserGoalsRepository';
import FakeUsersRepo from "../repository/fakes/FakeUserRepository";
import CreateUserService from "./CreateUser";
import CreateUserGoalsService from "./CreateUserGoals";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";
import ListAllUsersGoalsService from "./ListAllUsersGoals";

let listAllUsersGoalsService: ListAllUsersGoalsService;
let createUserService: CreateUserService;
let createUserGoalsService: CreateUserGoalsService;
let userGoalsRepo: FakeUserGoalsRepo;
let usersRepo: FakeUsersRepo;
let fakeCacheProvider: FakeRedisCacheProvider;
let fakeHashProvider: FakeHashProvider;

describe('list all users', () => {
    beforeEach(() => {
        userGoalsRepo = new FakeUserGoalsRepo;
        usersRepo = new FakeUsersRepo;
        fakeHashProvider = new FakeHashProvider;
        fakeCacheProvider = new FakeRedisCacheProvider;

        createUserService = new CreateUserService(
            usersRepo,
            fakeHashProvider,
            fakeCacheProvider
        );
        createUserGoalsService = new CreateUserGoalsService(
            usersRepo,
            userGoalsRepo,
            fakeCacheProvider
        );
        listAllUsersGoalsService = new ListAllUsersGoalsService(
            userGoalsRepo,
            fakeCacheProvider
        );
    });

    it('should be able to list all users', async () => {
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

        const allUsersGoals = await listAllUsersGoalsService.execute();
        
        expect(allUsersGoals).toEqual([userGoals]);
    });
});