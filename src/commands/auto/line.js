"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "auto-line",
    description: "🤖 set auto line to channels",
    type: 1,
    options: [
        {
            name: "channel",
            description: "🔧 the channel you will.",
            required: true,
            type: 7,
        },
        {
            name: "url",
            description: "🔧 the line image url.",
            required: true,
            type: 3,
        },
        {
            name: "embed",
            description: "🔧 wont the line in embed or not?.",
            required: true,
            type: 3,
            choices: [
                { name: "yes", value: "true" },
                { name: "no", value: "false" },
            ],
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
            let channel = guild.channels.cache.get(args[0]?.value);
            let embed = args[2]?.value;
            let url = args[1]?.value;
            let بتأكد = await db.get(`Line_${channel?.id}`);
            if (بتأكد) {
                await db.delete(`Line_${channel?.id}`);
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.deleLINE,
                }, isSlash);
            }
            else {
                await db.set(`Line_${channel?.id}`, {
                    embed,
                    url,
                });
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.doneLINE,
                }, isSlash);
            }
        }
    },
};
