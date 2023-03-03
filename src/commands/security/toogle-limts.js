"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "toggel-limit",
    description: "🔒 Toggel The Limit Commands",
    type: 1,
    options: [
        {
            name: "input",
            description: "🔧 The Setting You Wont To Change!.",
            type: 3,
            required: true,
            choices: [
                { name: "RoleCreate", value: "RoleCreate" },
                { name: "RoleDelete", value: "RoleDelete" },
                { name: "ChannelCreate", value: "ChannelCreate" },
                { name: "ChannelDelete", value: "ChannelDelete" },
                { name: "MembersBan", value: "MembersBan" },
                { name: "Others soon...", value: "powerd_by_zidra" },
            ],
        },
        {
            name: "value",
            description: "🔧 The Value You Wont To Change In The Setiing You Chosed!.",
            type: 3,
            required: true,
            choices: [
                { name: "ON", value: "on" },
                { name: "OFF", value: "off" },
            ],
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            if (lang == "ar") {
                if (args[0] == "RoleCreate") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  **تم وضع حالة حماية صنع الروملات لـ \`${args[1]}\`**`,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`RoleCreateToggle_${guild.id}`, args[1]);
                }
                else if (args[0] == "RoleDelete") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  **تم وضع حالة حماية حزف الروملات لـ \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`RoleDeleteToggle_${guild.id}`, args[1]);
                }
                else if (args[0] == "ChannelCreate") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  **تم وضع حالة حماية صنع الشنلات لـ \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`ChannelCreateToggle_${guild.id}`, args[1]);
                }
                else if (args[0] == "ChannelDelete") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  **تم وضع حالة حماية حزف الشنلات لـ \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`ChannelDeleteToggle_${guild.id}`, args[1]);
                }
                else if (args[0] == "MembersBan") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  **تم وضع حالة حماية الباندات لـ \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`MembersBanToggle_${guild.id}`, args[1]);
                }
            }
            else if (lang == "en") {
                if (args[0] === "RoleCreate") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  Done Set The Role Create To \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`RoleCreateToggle_${guild.id}`, args[1]);
                }
                else if (args[0] === "RoleDelete") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  Done Set The Role Delete To \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`RoleDeleteToggle_${guild.id}`, args[1]);
                }
                else if (args[0] === "ChannelCreate") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  Done Set The Channel Create To \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`ChannelCreateToggle_${guild.id}`, args[1]);
                }
                else if (args[0] === "ChannelDelete") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  Done Set The Channel Delete To \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`ChannelDeleteToggle_${guild.id}`, args[1]);
                }
                else if (args[0] === "MembersBan") {
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark:  Done Set The Members Ban To \`${args[1]}\``,
                        ephemeral: true,
                    }, isSlash);
                    await db.set(`MembersBanToggle_${guild.id}`, args[1]);
                }
            }
            else
                message.reply(`-_-`);
        }
    },
};
