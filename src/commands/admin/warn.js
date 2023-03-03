"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "warns",
    description: "warn members.",
    type: 1,
    options: [
        {
            name: "action",
            description: "what you will do.",
            type: 3,
            required: true,
            choices: [
                { name: "add", value: "add" },
                { name: "remove", value: "remove" },
                { name: "view", value: "view" },
                { name: "reset", value: "reset" },
            ],
        },
        {
            name: "user",
            description: "action for who?",
            type: 6,
            required: true,
        },
        {
            name: "reason",
            description: "why the warn?",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let action = args[0]?.value;
        let user = guild.members.cache.get(args[1]?.value);
        let reason = args[2]?.value;
        if (!["view", "add", "remove", "reset"].includes(action))
            return (0, respond_1.respond)(interaction, message, {
                content: '🚫 | **action must be one of these ["view", "add", "remove", "reset"]**',
            }, isSlash);
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let data = await db.get(`Warns_${user?.id}_${guild.id}`);
            switch (action) {
                case "add":
                    {
                        if (!data || data == null)
                            await db.set(`Warns_${user?.id}_${guild.id}`, [`${reason}]`]);
                        else
                            await db.push(`Warns_${user?.id}_${guild.id}`, reason);
                        return (0, respond_1.respond)(interaction, message, { content: "⚠ | **Warn has been added.**" }, isSlash);
                    }
                    break;
                case "remove":
                    {
                        if (!data || data == null)
                            await db.set(`Warns_${user?.id}_${guild.id}`, [`${reason}]`]);
                        else
                            await db.pull(`Warns_${user?.id}_${guild.id}`, reason);
                        return (0, respond_1.respond)(interaction, message, { content: "⚠ | **Warn has been added.**" }, isSlash);
                    }
                    break;
                case "view":
                    {
                        if (!data || data == null)
                            return (0, respond_1.respond)(interaction, message, {
                                content: "⚠ | **this user have no warns**",
                            }, isSlash);
                        return (0, respond_1.respond)(interaction, message, {
                            content: `⚠ | User have **${data.length}** warn(s)`,
                            embeds: [
                                {
                                    title: "⚠ Warns",
                                    color: 0xf43f,
                                    description: data
                                        .map((v, i) => `${i + 1}. reason: **${v}**`)
                                        .join("\n"),
                                },
                            ],
                        }, isSlash);
                    }
                    break;
                case "reset":
                    {
                        await db.set(`Warns_${user?.id}_${guild.id}`, []);
                        return (0, respond_1.respond)(interaction, message, { content: "⚠ | **Warn has been reseted.**" }, isSlash);
                    }
                    break;
                default:
                    break;
            }
        }
    },
};
