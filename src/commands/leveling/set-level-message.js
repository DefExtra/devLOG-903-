"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "set-level-message",
    description: "💹 Set the level up alert message",
    type: 1,
    options: [
        {
            name: "msg",
            description: "⚙ {user} => mention the user, {level} => the user level",
            required: true,
            type: 3,
        },
    ],
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
            let msg = args[0]?.value;
            await db.set(`LSM_${guild.id}`, msg);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.LSMupdate
            }, isSlash);
        }
    },
};
