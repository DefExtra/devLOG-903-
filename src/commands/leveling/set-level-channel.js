"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "set-level-channel",
    description: "💹 Set/Remove the level up channel",
    type: 1,
    options: [
        {
            name: "channel",
            description: "⚙ The channel you will make the level up alerts in.",
            required: true,
            type: 7,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_GUILD", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let ch = guild.channels.cache.get(args[0]?.value);
            let data = await db.get(`LSC_${guild?.id}`);
            if (!data)
                db.set(`LSC_${guild?.id}`, ch?.id);
            else if (data == ch?.id)
                db.delete(`LSC_${ch?.id}`);
            else
                db.set(`LSC_${ch?.id}`, ch?.id);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.LSCupdated
            }, isSlash);
        }
    },
};
