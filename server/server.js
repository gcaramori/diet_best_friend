"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const ormconfig_1 = __importDefault(require("./src/config/ormconfig"));
const routes_1 = __importDefault(require("@shared/infrastructure/http/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(routes_1.default);
ormconfig_1.default.initialize()
    .then(() => {
    console.log("DB has been initialized!");
})
    .catch((err) => {
    console.error("Error during DB initialization", err);
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
