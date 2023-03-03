"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "setcolor",
    description: "change role color.",
    type: 1,
    options: [
        {
            name: "hex",
            description: "the hex color code.",
            type: 3,
            required: true,
        },
        {
            name: "role",
            description: "the role you won't to change.",
            type: 8,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_ROLES", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let hex = args[0]?.value;
            let role = guild.roles.cache.get(args[1]?.value);
            role?.setColor(hex);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.colorDOne,
            }, isSlash);
        }
    },
};
