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
const uuidv4_1 = require("uuidv4");
const User_1 = __importDefault(require("../../infrastructure/typeorm/entity/User"));
class FakeUsersRepo {
    constructor() {
        this.users = [];
    }
    create({ name, email, password, birth }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default();
            Object.assign(user, {
                id: (0, uuidv4_1.uuid)(),
                name,
                email,
                password,
                birth
            });
            this.users.push(user);
            return user;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findIndex = this.users.findIndex(user => user.id === user.id);
            this.users[findIndex] = user;
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(user => user.id === id);
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(user => user.email === email);
            return user;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.users;
            return users;
        });
    }
}
exports.default = FakeUsersRepo;
