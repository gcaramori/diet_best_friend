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
const User_1 = __importDefault(require("../entity/User"));
const ormconfig_1 = __importDefault(require("../../../../../config/ormconfig"));
class UserRepo {
    constructor() {
        this.ormRepository = ormconfig_1.default.getRepository(User_1.default);
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.ormRepository.create(userData);
            yield this.ormRepository.save(user);
            return user;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.save(user);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.ormRepository.findOne({
                where: {
                    id: id
                }
            })) || undefined;
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.ormRepository.findOne({
                where: {
                    email: email
                }
            })) || undefined;
            return user;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.ormRepository.find({
                select: ['id', 'name', 'email']
            });
            return users;
        });
    }
}
exports.default = UserRepo;
