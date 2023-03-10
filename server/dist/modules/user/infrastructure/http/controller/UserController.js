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
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const CreateUser_1 = __importDefault(require("@modules/user/services/CreateUser"));
const ListAllUsers_1 = __importDefault(require("@modules/user/services/ListAllUsers"));
class UserController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, birth } = request.body;
            const createUser = tsyringe_1.container.resolve(CreateUser_1.default);
            const user = yield createUser.execute({ name, email, password, birth });
            return response.status(200).json((0, class_transformer_1.instanceToInstance)(user));
        });
    }
    listAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listAllUsers = tsyringe_1.container.resolve(ListAllUsers_1.default);
            const users = yield listAllUsers.execute();
            return response.status(200).json(users);
        });
    }
}
exports.default = new UserController();
