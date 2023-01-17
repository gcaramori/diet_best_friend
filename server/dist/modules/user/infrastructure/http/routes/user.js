"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const UserController_1 = __importDefault(require("../controller/UserController"));
const usersRouter = (0, express_1.Router)();
usersRouter.post('/users', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
        birth: celebrate_1.Joi.string().required()
    }
}, { abortEarly: false }), UserController_1.default.create);
usersRouter.get('/users', UserController_1.default.listAll);
exports.default = usersRouter;
