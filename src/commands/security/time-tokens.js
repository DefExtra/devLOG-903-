"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "time-tokens",
    description: "🔒 Protect your server from token (set the time)",
    type: 1,
    options: [
        {
            name: "time",
            description: "🔧 time with days!!!",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "KICK_MEMBERS", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let text = args[0]?.value;
            let time = await db.get(`AntiTokensTime_${guild?.id}`);
            if (time == null)
                return db.set(`AntiTokensTime_${guild.id}`, 120);
            await db.set(`AntiTokensTime_${guild.id}`, Number(text));
            (0, respond_1.respond)(interaction, message, {
                content: `🔒 **| ANTI_TOKENS :: tokens time has been changed...**`,
            }, isSlash);
        }
    },
};
