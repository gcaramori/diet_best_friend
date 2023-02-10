import { describe, expect, beforeEach, it } from 'vitest';
import FakeRoutinesRepo from '../repository/fakes/FakeRoutinesRepo';
import FakeUsersRepo from '@modules/user/repository/fakes/FakeUserRepository';
import FakeFoodsRepo from '@modules/food/repository/fakes/FakeFoodRepository';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import CreateRoutineService from './CreateRoutine';
import ListAllRoutinesService from './ListAllRoutines';
import CreateUserService from '@modules/user/services/CreateUser';
import CreateFoodService from '@modules/food/services/CreateFood';
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";

let fakeRoutinesRepo: FakeRoutinesRepo;
let fakeUsersRepo: FakeUsersRepo;
let fakeFoodsRepo: FakeFoodsRepo;
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeRedisCacheProvider;
let createRoutineService: CreateRoutineService;
let listAllRoutinesService: ListAllRoutinesService;
let createUserService: CreateUserService;
let createFoodService: CreateFoodService;

describe('list all routines', () => {
    beforeEach(() => {
        fakeRoutinesRepo = new FakeRoutinesRepo;
        fakeUsersRepo = new FakeUsersRepo;
        fakeHashProvider = new FakeHashProvider;
        fakeCacheProvider = new FakeRedisCacheProvider;

        createRoutineService = new CreateRoutineService(
            fakeRoutinesRepo,
            fakeCacheProvider
        );
        listAllRoutinesService = new ListAllRoutinesService(
            fakeRoutinesRepo,
            fakeCacheProvider
        );
        createUserService = new CreateUserService(
            fakeUsersRepo,
            fakeHashProvider,
            fakeCacheProvider
        );
        createFoodService = new CreateFoodService(
            fakeFoodsRepo,
            fakeCacheProvider
        );
    });

    it('should be able to list all routines', async () => {
        const iterable = Array.from({ length: 5 }, (_, index) => index);

        const user = await createUserService.execute({
            name: 'Tester',
            email: 'testemail@gmail.com',
            password: 'password',
            gender: 'male',
            birth: new Date(),
            height: 185,
            country: 'Brazil',
            city: "Nova Odessa"
        });

        const routines = await Promise.all(
            iterable.map(async index =>
                createRoutineService.execute({
                    day: new Date(),
                    breakfast: [
                        {
                            food: 'hpe2s-asdfd-asd12',
                            quantity: 1
                        }
                    ],
                    lunch: [
                        {
                            food: 'hpe2s-asdfd-asd12',
                            quantity: 1
                        }
                    ],
                    dinner: [
                        {
                            food: 'hpe2s-asdfd-asd12',
                            quantity: 1
                        }
                    ],
                    snacks: [
                        {
                            food: 'hpe2s-asdfd-asd12',
                            quantity: 1
                        }
                    ],
                    user: user.id
                })
            )
        );

        const allRoutines = await listAllRoutinesService.execute();
        
        expect(allRoutines).toEqual(routines);
    });
});