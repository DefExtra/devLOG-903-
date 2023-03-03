"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "add-swear",
    description: "🔒 Protect your server from bad words",
    type: 1,
    options: [
        {
            name: "word",
            description: "🔧 the bad word??!",
            type: 3,
            required: true,
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
            let text = args[0]?.value;
            let check = await db.get(`ANTI_SWEAR_LIST_${guild.id}`);
            if (!check)
                await db.set(`ANTI_SWEAR_LIST_${guild.id}`, [`${text}`]);
            else
                db.push(`ANTI_SWEAR_LIST_${guild.id}`, `${text}`);
            (0, respond_1.respond)(interaction, message, {
                content: `🔒 **| ANTI_SWEAR :: list add a new word \`${text}\`...**`,
            }, isSlash);
        }
    },
};
