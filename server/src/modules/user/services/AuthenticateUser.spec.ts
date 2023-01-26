import { beforeEach, describe, it, expect } from "vitest";
import FakeUserRepository from "../repository/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";
import AuthenticateUserService from "./AuthenticateUser";
import CreateUserService from "./CreateUser";
import ErrorHandler from "@shared/errors/ErrorHandler";

let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;
let userRepo: FakeUserRepository;
let hashProvider: FakeHashProvider;
let cacheProvider: FakeRedisCacheProvider;

describe('authenticate user', () => {
    beforeEach(() => {
        userRepo = new FakeUserRepository;
        hashProvider = new FakeHashProvider;
        cacheProvider = new FakeRedisCacheProvider;

        createUserService = new CreateUserService(
            userRepo,
            hashProvider,
            cacheProvider
        );

        authenticateUserService = new AuthenticateUserService(
            userRepo,
            hashProvider
        );
    });

    it('should be able to authenticate a user', async () => {
        const user = await createUserService.execute({
            name: 'Tester',
            email: 'tester@example.com',
            password: 'test',
            birth: new Date()
        });

        const authenticateResponse = await authenticateUserService.execute({
            email: 'tester@example.com',
            password: 'test'
        });

        expect(authenticateResponse).toHaveProperty('token');
        expect(authenticateResponse.user).toEqual(user);
    });

    it('should not authenticate a user with an email that does not exist', async () => {
        await expect(
            authenticateUserService.execute({
                email: 'johndoe@notexists.com',
                password: 'password'
            })
        ).rejects.toBeInstanceOf(ErrorHandler);
    });

    it('should not authenticate a user with an invalid password', async () => {
        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@notexists.com',
            password: 'password',
            birth: new Date()
        });

        await expect(
            authenticateUserService.execute({
                email: 'johndoe@notexists.com',
                password: 'notmypassword'
            })
        ).rejects.toBeInstanceOf(ErrorHandler);
    });
});