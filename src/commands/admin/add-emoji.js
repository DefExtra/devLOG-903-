"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
const progressbar = require("string-progressbar");
exports.default = {
    name: "add-emoji",
    description: "add emojis to the server.",
    type: 1,
    options: [
        {
            name: "emojis",
            type: 3,
            required: true,
            description: "the emoji you won't to add",
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "BAN_MEMBERS", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        let emoji = args[0]?.value;
        if (perms == true) {
            let customemoji = discord_js_1.Util.parseEmoji(emoji);
            if (customemoji?.id) {
                const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`;
                const name = args.slice(1).join(" ");
                guild.emojis.create(`${Link}`, `${name || `${customemoji.name}`}`);
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.emojiADD.replace("{emoji}", `${name || `${customemoji.name}`}`),
                }, isSlash);
            }
            else {
                return (0, respond_1.respond)(interaction, message, {
                    content: "Bad reading."
                }, isSlash);
            }
        }
    },
};
