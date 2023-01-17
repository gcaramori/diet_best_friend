"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("@modules/user/infrastructure/http/routes/user"));
const routes = (0, express_1.Router)();
routes.get('/', (response, request) => {
    response.status(200).send('Welcome!');
});
routes.post('/users', user_1.default);
routes.get('/users', user_1.default);
exports.default = routes;
