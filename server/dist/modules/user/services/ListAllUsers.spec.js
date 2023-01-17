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
const FakeUserRepository_1 = __importDefault(require("../repository/fakes/FakeUserRepository"));
const CreateUser_1 = __importDefault(require("./CreateUser"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
const ListAllUsers_1 = __importDefault(require("./ListAllUsers"));
const globals_1 = require("@jest/globals");
let listAllUsersService;
let createUserService;
let usersRepository;
let fakeHashProvider;
(0, globals_1.describe)('list all users', () => {
    (0, globals_1.beforeEach)(() => {
        usersRepository = new FakeUserRepository_1.default;
        fakeHashProvider = new FakeHashProvider_1.default;
        createUserService = new CreateUser_1.default(usersRepository, fakeHashProvider);
        listAllUsersService = new ListAllUsers_1.default(usersRepository);
    });
    (0, globals_1.it)('should be able to list all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const iterable = Array.from({ length: 5 }, (_, index) => index);
        const users = yield Promise.all(iterable.map((index) => __awaiter(void 0, void 0, void 0, function* () {
            return createUserService.execute({
                name: `user-${index}`,
                email: `emailteste_${index}`,
                password: `user-password-${index}`,
                birth: new Date()
            });
        })));
        const allUsers = yield listAllUsersService.execute();
        (0, globals_1.expect)(allUsers).toEqual([...users]);
    }));
});
