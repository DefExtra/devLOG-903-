"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "lock",
    description: "lock channels.",
    type: 1,
    options: [
        {
            name: "channel",
            description: "the channel you will lock.",
            type: 7,
            required: false,
        },
        {
            name: "user",
            description: "the user you will lock for.",
            type: 6,
            required: false,
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
            let ch = guild.channels.cache.get(args[0]?.value || channel.id);
            let target = guild.members.cache.get(args[1]?.value || args[0]?.value) ||
                guild.roles.everyone;
            if (ch?.type == "GUILD_TEXT") {
                ch.permissionOverwrites
                    .edit(target, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                });
            }
            else if (ch?.type == "GUILD_VOICE") {
                ch.permissionOverwrites
                    .edit(target, {
                    CONNECT: false,
                });
            }
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.doneLOCK,
            }, isSlash);
        }
    },
};
