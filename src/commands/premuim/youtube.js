"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "youtube-notic",
    description: "👋 set youtube notifications channel.",
    type: 1,
    options: [
        {
            name: "text-channel",
            type: 7,
            required: true,
            description: "🔧 The channel that the bot will send the notification in",
        },
        {
            name: "channel",
            type: 3,
            required: true,
            description: "🔧 The channel id you will notifications for it",
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let primeTable = await db.table("prime");
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_CHANNELS", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            await primeTable.set(`YTnt_${guild.id}`, {
                c: args[0]?.value,
                id: args[1]?.value,
            });
            (0, respond_1.respond)(interaction, message, {
                content: "🔧 | Channel has benn added .",
            }, isSlash);
        }
    },
};
