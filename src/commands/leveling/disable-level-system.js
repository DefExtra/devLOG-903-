"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "disable-level-system",
    description: "💹 Disable/Enable Leveling system in the server .",
    type: 1,
    options: [],
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
            let levelSystem = await db.get(`LS_${guild.id}`);
            if (!levelSystem)
                await db.set(`LS_${guild.id}`, false);
            else if (levelSystem == true)
                await db.set(`LS_${guild.id}`, false);
            else if (levelSystem == false)
                await db.set(`LS_${guild.id}`, true);
            await db.set(`LS_${guild.id}`, (await db.get(`LS_${guild.id}`)) == true ? false : true);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.doneDisableLS.replace("{status}", (await db.get(`LS_${guild.id}`)) == true ? "Enabled" : "Disabled"),
            }, isSlash);
        }
    },
};
