import { describe, expect, beforeEach, it } from 'vitest';
import CreateRoutineService from './CreateRoutine';
import CreateUserService from "@modules/user/services/CreateUser";
import FakeRoutinesRepo from '../repository/fakes/FakeRoutinesRepo';
import FakeUsersRepo from "@modules/user/repository/fakes/FakeUserRepository";
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";

let createRoutineService: CreateRoutineService;
let createUserService: CreateUserService;
let fakeRoutinesRepo: FakeRoutinesRepo
let fakeUsersRepo: FakeUsersRepo;
let fakeHashProvider: FakeHashProvider;
let fakeRedisCacheProvider: FakeRedisCacheProvider;

describe('creating a new routine', () => {
    beforeEach(() => {
        fakeRoutinesRepo = new FakeRoutinesRepo;
        fakeUsersRepo = new FakeUsersRepo;
        fakeHashProvider = new FakeHashProvider;
        fakeRedisCacheProvider = new FakeRedisCacheProvider;

        createRoutineService = new CreateRoutineService(
          fakeRoutinesRepo,
          fakeRedisCacheProvider
        );
        createUserService = new CreateUserService(
            fakeUsersRepo,
            fakeHashProvider,
            fakeRedisCacheProvider
        );
    });

    it('should be able to create a new routine', async() => {
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

        const routine = await createRoutineService.execute({
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
        });
        
        expect(user).toHaveProperty('id');
        expect(routine).toHaveProperty('id');
    });
});