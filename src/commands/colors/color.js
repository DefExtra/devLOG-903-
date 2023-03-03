"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
exports.default = {
    name: "color",
    description: "choose from the colors palit.",
    type: 1,
    options: [
        {
            name: "color",
            type: 3,
            required: true,
            description: "the color number",
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let color = args[0]?.value;
        if (guild.roles.cache.find((c) => c.name == color)) {
            let memberRoles = guild.members.cache.get(author.id);
            memberRoles?.roles.cache.forEach((r) => {
                if (!isNaN(r.name))
                    memberRoles?.roles.remove(r);
            });
            memberRoles?.roles.add(guild.roles.cache.find((c) => c.name == color) || "");
            return (0, respond_1.respond)(interaction, message, { content: REPLYS.doCOLOR }, isSlash);
        }
        else
            return (0, respond_1.respond)(interaction, message, { content: REPLYS.noCOLOR }, isSlash);
    },
};
