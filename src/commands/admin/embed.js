"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "embed",
    description: "makes the bot say something in embed.",
    type: 1,
    options: [
        {
            name: "text",
            description: "the word that the bot will say.",
            type: 3,
            required: true,
        },
        {
            name: "color",
            description: "the embed color.",
            type: 3,
            required: false,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_MESSAGES", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            if (message)
                setTimeout(() => message.delete());
            if (interaction)
                setTimeout(() => interaction.deleteReply());
            channel.send({
                embeds: [
                    {
                        color: args[1] ? args[1].value.toUpperCase() : "RANDOM",
                        description: args[0]?.value,
                    },
                ],
            });
        }
    },
};
