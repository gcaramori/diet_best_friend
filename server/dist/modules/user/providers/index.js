"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const IBCryptHashProvider_1 = __importDefault(require("./HashProvider/implementations/IBCryptHashProvider"));
tsyringe_1.container.registerSingleton('HashProvider', IBCryptHashProvider_1.default);
