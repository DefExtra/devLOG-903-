"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRespond = exports.respond = void 0;
const chalk_1 = __importDefault(require("chalk"));
const __1 = __importDefault(require("../../../"));
/**
 * @returns {Message}
 */
async function respond(base, base2, options, isSlash) {
    let dataS = new Promise((resolve, reject) => {
        if (isSlash)
            base
                .followUp(options)
                .catch((d) => {
                reject(d);
                __1.default.bot.emit("SystemLog", {
                    type: "error",
                    text: chalk_1.default.red.bold("[ + ]") +
                        " Error has been done in respond system...\n\n" +
                        d,
                });
            })
                .then((m) => {
                resolve(m);
            });
        else
            base2
                .reply(options)
                .catch((d) => reject(d))
                .then((m) => {
                resolve(m);
            });
    });
    let data = dataS;
    return data;
}
exports.respond = respond;
async function editRespond(base, base2, options, isSlash, messageId) {
    let dataS = new Promise(async (resolve, reject) => {
        if (isSlash)
            base
                .editReply(options)
                .catch((d) => {
                reject(d);
                __1.default.bot.emit("SystemLog", {
                    type: "error",
                    text: chalk_1.default.red.bold("[ + ]") +
                        " Error has been done in respond system...\n\n" +
                        d,
                });
            })
                .then((m) => resolve(m));
        else
            (await base2.channel.messages.fetch(messageId))
                .edit(options)
                .then((m) => resolve(m));
    });
    let data = dataS;
    return data;
}
exports.editRespond = editRespond;
