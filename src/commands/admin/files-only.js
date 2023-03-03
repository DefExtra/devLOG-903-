"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "files-only",
    description: "make channel for files only.",
    type: 1,
    options: [
        {
            name: "channel",
            description: "the channel you will make in files only.",
            type: 7,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_CHANNELS", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let ch = guild.channels.cache.get(channel.id || args[0]?.value);
            let d = await db.get(`files-only_${guild.id}`);
            if (d)
                db.push(`files-only_${guild.id}`, ch?.id);
            else
                await db.set(`files-only_${guild.id}`, [`${ch?.id}`]);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.FILES_ONLY,
            }, isSlash);
        }
    },
};
