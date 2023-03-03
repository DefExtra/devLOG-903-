"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "set-limt",
    description: "🔒 Protect your server from token bad admin",
    type: 1,
    options: [
        {
            name: "action",
            description: "🔧 what do you wont to change!!!",
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
            name: "limt",
            description: "🔧 your new limt number!!!",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            if (lang == "ar") {
                if (args[0] == "RoleCreate") {
                    await db.set(`RoleCreate_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **تم وضع حد صنع الرتب الي \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else if (args[0] == "RoleDelete") {
                    await db.set(`RoleDelete_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **تم وضع حد حزف الرتب الي \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else if (args[0] == "ChannelCreate") {
                    await db.set(`ChannelCreate_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **تم وضع حد صنع الرومات الي \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else if (args[0] == "ChannelDelete") {
                    await db.set(`ChannelDelete_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **تم وضع حد حزف الرومات الي \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else if (args[0] == "MembersBan") {
                    await db.set(`MemebersBan_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **تم وضع حد اعطاء باند الي \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **يوفر البوت الخيارات الأتيه: ['RoleCreate','RoleDelete','ChannelCreate','ChannelDelete','MembersBan']**`,
                    }, isSlash);
            }
            else if (lang == "en") {
                if (args[0] == "RoleCreate") {
                    await db.set(`RoleCreate_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **Done.. Set The Role Create Limit \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else if (args[0] == "RoleDelete") {
                    await db.set(`RoleDelete_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **Done.. Set The Role Delete Limit \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else if (args[0] == "ChannelCreate") {
                    await db.set(`ChannelCreate_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **Done.. Set The Channel Create Limit \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else if (args[0] == "ChannelDelete") {
                    await db.set(`ChannelDelete_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **Done.. Set The Channel Delete Limit \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else if (args[0] == "MembersBan") {
                    await db.set(`MemebersBan_${guild.id}`, args[1] || 3);
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **Done.. Set The Memeber Ban Limit \`${args[1] || 3}\`**`,
                    }, isSlash);
                }
                else
                    await (0, respond_1.respond)(interaction, message, {
                        content: `> :white_check_mark: **Please Select One Of This : ['RoleCreate','RoleDelete','ChannelCreate','ChannelDelete','MembersBan']**`,
                    }, isSlash);
            }
            else
                message.reply(`-_-`);
        }
    },
};
