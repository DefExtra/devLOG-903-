"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "add-level-role",
    description: "💹 Add a reward when any user rich a spacific level.",
    type: 1,
    options: [
        {
            name: "role",
            description: "⚙ the role you will give as a reward.",
            required: true,
            type: 8,
        },
        {
            name: "level",
            description: "⚙ the level that you will give the reward at.",
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
            let role = guild.roles.cache.get(args[0]?.value);
            let level = args[1]?.value;
            let rewards = await db.get(`LSA_${guild.id}`);
            if (!rewards)
                rewards = [];
            if (isNaN(level))
                return (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.notAlevel,
                }, isSlash);
            rewards.forEach((V) => {
                if (V.roleId == role?.id || V.level == level)
                    return (0, respond_1.respond)(interaction, message, {
                        content: REPLYS.rewardIsHere,
                    }, isSlash);
            });
            if (!rewards)
                db.set(`LSA_${guild.id}`, [
                    {
                        roleId: role?.id,
                        level: level,
                    },
                ]);
            else
                db.push(`LSA_${guild.id}`, {
                    roleId: role?.id,
                    level: level,
                });
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.updateRewards
            }, isSlash);
        }
    },
};
