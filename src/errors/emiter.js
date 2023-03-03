"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.default = {
    errorEmt: (thiser, err) => {
        thiser.emit("SystemLog", {
            type: "error",
            text: chalk_1.default.red.bold("[ + ]") + " Error has been done...",
            error: err,
        });
    },
    logEmt: (thiser, text, type) => {
        if (!type)
            type = "log";
        thiser.emit("SystemLog", {
            type: type,
            text: chalk_1.default.blue.bold("[ + ] ") + text,
            error: null
        });
    },
};
