"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_1 = __importDefault(require("./auth/discord"));
const views_1 = __importDefault(require("./auth/views"));
exports.default = (app, db) => {
    (0, discord_1.default)(app);
    (0, views_1.default)(app, db);
};
