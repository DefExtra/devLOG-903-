"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const fs_1 = __importDefault(require("fs"));
const events_1 = require("events");
const js_yaml_1 = __importDefault(require("js-yaml"));
const erela_js_1 = require("erela.js");
const quick_db_1 = require("quick.db");
const chalk_1 = __importDefault(require("chalk"));
const events_2 = __importDefault(require("./events"));
const db = new quick_db_1.QuickDB({
    filePath: process.cwd() + "/def.database.niro.sqlite",
});
const config = js_yaml_1.default.load(fs_1.default.readFileSync(process.cwd() + "/config.yml", "utf8"));
exports.default = db;
class Register extends events_1.EventEmitter {
    constructor(client, dirname = process.cwd(), commands = new Map(), manager) {
        super();
        this.client = client;
        this.dirname = dirname;
        this.commands = commands;
        this.manager = manager;
        this.manager = new erela_js_1.Manager({
            nodes: [config.BOT.lavalink],
            send: (id, payload) => {
                const guild = this.client?.guilds.cache.get(id);
                if (guild)
                    guild.shard.send(payload);
            },
        });
        this.manager;
        this.manager
            .on("nodeConnect", (node) => {
            this.emit("SystemLog", {
                type: "connection",
                text: chalk_1.default.blue.bold("[ + ]") +
                    chalk_1.default.green.bold(` "${node.options.identifier}"`) +
                    " is connected...",
            });
            this.emit("SystemLog", {
                type: "connection",
                text: chalk_1.default.blue.bold("[ + ]") + " Music System is Connected...",
            });
        })
            .on("nodeError", (node, error) => {
            this.emit("SystemLog", {
                type: "connection",
                text: chalk_1.default.blue.bold("[ + ]") +
                    chalk_1.default.red.bold(` "${node.options.identifier}"`) +
                    ` is not connected (${error.message})...`,
            });
            this.emit("SystemLog", {
                type: "connection",
                text: chalk_1.default.red.bold("[ + ]") + " Music System is not Connected...",
            });
        });
        (0, events_2.default)(this.client, this.manager, this, config, db);
    }
    registerCommands(commandDir = "/") {
        fs_1.default.readdirSync(this.dirname + commandDir).map((category) => {
            fs_1.default.readdirSync(this.dirname + commandDir + "/" + category)
                .filter((commandFile) => commandFile.endsWith(".js"))
                .map(async (commandFile) => {
                var _a;
                let command = await await (_a = this.dirname + commandDir + "/" + category + "/" + commandFile, Promise.resolve().then(() => __importStar(require(_a))));
                if (command.default) {
                    this.commands.set(command.default.name, command.default);
                }
            });
        });
    }
}
exports.Register = Register;
