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
let fakeUserGoalsRepo: FakeUserGoalsRepo;
let fakeUsersRepo: FakeUsersRepo;
let fakeCacheProvider: FakeRedisCacheProvider;
let fakeHashProvider: FakeHashProvider;

describe('list all users', () => {
    beforeEach(() => {
        fakeUserGoalsRepo = new FakeUserGoalsRepo;
        fakeUsersRepo = new FakeUsersRepo;
        fakeHashProvider = new FakeHashProvider;
        fakeCacheProvider = new FakeRedisCacheProvider;

        createUserService = new CreateUserService(
            fakeUsersRepo,
            fakeHashProvider,
            fakeCacheProvider
        );
        createUserGoalsService = new CreateUserGoalsService(
            fakeUsersRepo,
            fakeUserGoalsRepo,
            fakeCacheProvider
        );
        listAllUsersGoalsService = new ListAllUsersGoalsService(
            fakeUserGoalsRepo,
            fakeCacheProvider
        );
    });

    it('should be able to list all users', async () => {
        const user = await createUserService.execute({
            name: 'tester',
            email: 'tester@gmail.com',
            password: 'password',
            gender: 'male',
            birth: new Date(),
            height: 185,
            country: 'Brazil',
            city: '13380-530'
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

        const allUsersGoals = await listAllUsersGoalsService.execute();
        
        expect(allUsersGoals).toEqual([userGoals]);
    });
});