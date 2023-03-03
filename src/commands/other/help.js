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
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
const node_fs_1 = __importDefault(require("node:fs"));
exports.default = {
    name: "help",
    description: "🙋‍♂️ need help??.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let fileds = [];
        (0, respond_1.respond)(interaction, message, {
            content: "Choose a category: ...",
            components: [
                new discord_js_1.MessageActionRow().setComponents(new discord_js_1.MessageSelectMenu()
                    .setCustomId("menu")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions([
                    { label: "Admin Commands", value: "admin", emoji: "👮‍♂️" },
                    { label: "Auto Commands", value: "auto", emoji: "🤖" },
                    { label: "Colors Commands", value: "colors", emoji: "🎨" },
                    { label: "Config Commands", value: "config", emoji: "⚙" },
                    { label: "Economy Commands", value: "eco", emoji: "💸" },
                    { label: "Games Commands", value: "games", emoji: "🎮" },
                    { label: "General Commands", value: "public", emoji: "🌍" },
                    { label: "Leveling Commands", value: "level", emoji: "💹" },
                    { label: "Music Commands", value: "music", emoji: "🎶" },
                    { label: "Other Commands", value: "other", emoji: "🧩" },
                    { label: "Premuim Commands", value: "prime", emoji: "✨" },
                    { label: "Security Commands", value: "protect", emoji: "🛡" },
                    { label: "Suggestions Commands", value: "sug", emoji: "🎤" },
                    { label: "Ticket Commands", value: "ticket", emoji: "🎫" },
                    { label: "Reaction Roles Commands", value: "rr", emoji: "📐" },
                ])),
            ],
        }, isSlash).then((iii) => {
            channel
                .createMessageComponentCollector({
                filter: (i) => i.user.id == author.id,
            })
                .on("collect", async (i) => {
                if (!i.isSelectMenu())
                    return;
                await i.deferUpdate().catch(() => { });
                switch (i.values[0]) {
                    case "admin":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/admin/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/admin/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Admin Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "auto":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/auto/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/auto/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Auto Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "colors":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/colors/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/colors/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Colors Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "config":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/config/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/config/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Config Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "eco":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/economy/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/economy/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Economy Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "games":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/games (powerd by external)/")
                                .filter((c) => c.endsWith(".js"))
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() +
                                    "/src/commands/games (powerd by external)/" +
                                    f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Games Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "public":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/general/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/general/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `General Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "level":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/leveling/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/leveling/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Leveling Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "music":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/music/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/music/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Music Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "other":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/other/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/other/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Other Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "prime":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/premuim/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/premuim/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Premuim Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "sug":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/suggestions/")
                                .filter((f) => f.endsWith(".js"))
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/suggestions/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name || "_ _",
                                    value: command.default.description || "_ _",
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Suggestions Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "protect":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/security/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/security/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Security Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "ticket":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/ticket/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/ticket/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Ticket Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    case "rr":
                        {
                            let fileds = [];
                            await node_fs_1.default
                                .readdirSync(process.cwd() + "/src/commands/rr/")
                                .forEach(async (f) => {
                                var _a;
                                let command = await (_a = process.cwd() + "/src/commands/rr/" + f, Promise.resolve().then(() => __importStar(require(_a))));
                                fileds.push({
                                    name: command.default.name,
                                    value: command.default.description,
                                    inline: true,
                                });
                            });
                            setTimeout(async () => {
                                await (0, respond_1.editRespond)(interaction, message, {
                                    content: `Reaction Role Commands:`,
                                    embeds: [
                                        new discord_js_1.MessageEmbed({
                                            description: "> Bot has been developed by devTools",
                                            fields: fileds,
                                        }),
                                    ],
                                }, isSlash, iii.id);
                            }, 1323);
                        }
                        break;
                    default:
                        break;
                }
            });
        });
    },
};
