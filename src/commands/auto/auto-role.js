"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "auto-role",
    description: "🤖 add a role when any member join",
    type: 1,
    options: [
        {
            name: "role",
            description: "⚙ the role that the bot will give the member.",
            required: true,
            type: 8,
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
            let role = guild.roles.cache.get(args[0]?.value);
            let check = await autoTable.get(`AutoRole_${guild.id}`);
            if (check && check == role?.id) {
                await autoTable.delete(`AutoRole_${guild.id}`);
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.doneDeleteARole,
                }, isSlash);
            }
            else {
                await autoTable.set(`AutoRole_${guild.id}`, role?.id);
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.doneUpdateARole,
                }, isSlash);
            }
        }
    },
};
