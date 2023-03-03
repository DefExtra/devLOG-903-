"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "anti-spam",
    description: "🔒 Protect your server from spam.",
    type: 1,
    options: [
        {
            name: "toggle",
            description: "🔧 on or off??!",
            type: 3,
            required: true,
            choices: [
                { name: "on", value: "on" },
                { name: "off", value: "off" },
            ],
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
            let toggle = args[0]?.value;
            await db.set(`AntiSpam_${guild.id}`, toggle);
            (0, respond_1.respond)(interaction, message, {
                content: `🔒 **| ANTI_SPAM :: system \`${toggle}\`...**`,
            }, isSlash);
        }
    },
};
