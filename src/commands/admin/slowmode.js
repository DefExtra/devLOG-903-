"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const ms_1 = __importDefault(require("ms"));
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "slowmode",
    description: "change slowmode for any channel.",
    type: 1,
    options: [
        {
            name: "time",
            description: "the slowmode time (with seconds).",
            type: 3,
            required: true,
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
            let t = args[0]?.value;
            let time = (0, ms_1.default)(t);
            if (channel.type == "GUILD_TEXT") {
                let td = channel;
                td.setRateLimitPerUser(time).catch(() => {
                    (0, respond_1.respond)(interaction, message, {
                        content: ":x:",
                    }, isSlash);
                });
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.slowDONE,
                }, isSlash);
            }
        }
    },
};
