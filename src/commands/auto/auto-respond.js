"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "auto-respond",
    description: "🤖 set auto respond system",
    type: 1,
    options: [
        {
            name: "msg",
            description: "✉ the message that the bot will auto respond for it.",
            required: true,
            type: 3,
        },
        {
            name: "reply",
            description: "✉ the reply that the bot will say it.",
            required: true,
            type: 3,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let autoTable = await db.table("auto");
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let reply = args[1]?.value;
            let msg = args[0]?.value;
            let check = await autoTable.get(`${msg}_${guild.id}`);
            if (check) {
                await autoTable.delete(`${msg}_${guild.id}`);
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.doneDeleteARes,
                }, isSlash);
            }
            else {
                await autoTable.set(`${msg}_${guild.id}`, reply);
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.doneMakedARes,
                }, isSlash);
            }
        }
    },
};
