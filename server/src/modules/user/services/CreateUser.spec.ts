import CreateUserService from "./CreateUser";
import FakeUsersRepo from "../repository/fakes/FakeUserRepository";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ErrorHandler from "../../../shared/errors/ErrorHandler";
import { describe, expect, beforeEach, it } from 'vitest';

let createUserService: CreateUserService;
let fakeUsersRepo: FakeUsersRepo;
let fakeHashProvider: FakeHashProvider;

describe('creating a new user', () => {
    beforeEach(() => {
        fakeUsersRepo = new FakeUsersRepo;
        fakeHashProvider = new FakeHashProvider;    

        createUserService = new CreateUserService(
            fakeUsersRepo,
            fakeHashProvider
        );
    });

    it('should be able to create a new user', async() => {
        const user = await createUserService.execute({
            name: 'Tester',
            email: 'testemail@gmail.com',
            password: 'password',
            birth: new Date()
        });

        expect(user).toHaveProperty('id');
    });

    it('should not create a user with e-mail already taken', async () => {
        await createUserService.execute({
          name: 'Tester',
          email: 'testemail@gmail.com',
          password: 'password',
          birth: new Date()
        });
    
        await expect(
          createUserService.execute({
            name: 'Tester',
            email: 'testemail@gmail.com',
            password: 'password',
            birth: new Date()
          })
        ).rejects.toBeInstanceOf(ErrorHandler);
      });
});