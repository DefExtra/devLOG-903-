"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const register_1 = require("./modules/register");
const chalk_1 = __importDefault(require("chalk"));
const discord_modals_1 = __importDefault(require("discord-modals"));
class Bot extends register_1.Register {
    constructor(client = new discord_js_1.Client({
        intents: [
            "DIRECT_MESSAGES",
            "DIRECT_MESSAGE_TYPING",
            "GUILDS",
            "GUILD_BANS",
            "GUILD_EMOJIS_AND_STICKERS",
            "GUILD_INTEGRATIONS",
            "GUILD_INVITES",
            "GUILD_MEMBERS",
            "GUILD_MESSAGES",
            "GUILD_MESSAGE_REACTIONS",
            "GUILD_MESSAGE_TYPING",
            "GUILD_PRESENCES",
            "GUILD_SCHEDULED_EVENTS",
            "GUILD_VOICE_STATES",
            "GUILD_WEBHOOKS",
            "MESSAGE_CONTENT",
        ],
        allowedMentions: { repliedUser: false },
    }), dirname = process.cwd(), commands = new Map()) {
        super(client, dirname, commands);
        this.client = client;
        this.dirname = dirname;
        this.commands = commands;
        (0, discord_modals_1.default)(this.client);
        this.client.on("error", (error) => console.log(error));
        this.client.on("shardError", (error) => console.log(error));
        process.on("unhandledRejection", (reason, p) => console.log(p, reason));
        process.on("uncaughtException", (reason, p) => console.log(p, reason.message));
        process.on("uncaughtExceptionMonitor", (reason, p) => console.log(p, reason.message));
    }
    getCommands() {
        return this.commands;
    }
    login(token) {
        return new Promise((resolve, reject) => {
            this.client
                .login(token)
                .then(() => {
                resolve(this.client);
                this.emit("SystemLog", {
                    type: "connection",
                    text: chalk_1.default.blue.bold("[ + ]") + " Discord Bot Is Connected...",
                });
            })
                .catch((err) => {
                reject(err);
                this.emit("SystemLog", {
                    type: "error",
                    text: chalk_1.default.red.bold("[ + ]") +
                        " Error has been done in Discord Bot Login...\n\n" +
                        err,
                });
            });
        });
    }
    getManager() {
        return this.manager;
    }
}
exports.Bot = Bot;
