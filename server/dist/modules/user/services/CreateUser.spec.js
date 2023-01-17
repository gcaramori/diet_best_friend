"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUser_1 = __importDefault(require("./CreateUser"));
const FakeUserRepository_1 = __importDefault(require("../repository/fakes/FakeUserRepository"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
const ErrorHandler_1 = __importDefault(require("../../../shared/errors/ErrorHandler"));
const globals_1 = require("@jest/globals");
let createUserService;
let fakeUsersRepo;
let fakeHashProvider;
(0, globals_1.describe)('creating a new user', () => {
    (0, globals_1.beforeEach)(() => {
        fakeUsersRepo = new FakeUserRepository_1.default;
        fakeHashProvider = new FakeHashProvider_1.default;
        createUserService = new CreateUser_1.default(fakeUsersRepo, fakeHashProvider);
    });
    (0, globals_1.it)('should be able to create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createUserService.execute({
            name: 'Tester',
            email: 'testemail@gmail.com',
            password: 'password',
            birth: new Date()
        });
        (0, globals_1.expect)(user).toHaveProperty('id');
    }));
    (0, globals_1.it)('should not create a user with e-mail already taken', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createUserService.execute({
            name: 'Tester',
            email: 'testemail@gmail.com',
            password: 'password',
            birth: new Date()
        });
        yield (0, globals_1.expect)(createUserService.execute({
            name: 'Tester',
            email: 'testemail@gmail.com',
            password: 'password',
            birth: new Date()
        })).rejects.toBeInstanceOf(ErrorHandler_1.default);
    }));
});
