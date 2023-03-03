"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
exports.default = {
    name: "admin-role",
    description: "🔧 add/remove a bot op roles .",
    type: 1,
    options: [
        {
            name: "role",
            required: true,
            type: 8,
            description: "🔧 the role you will make his acess all bot options",
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        if (author.id !== __1.default.config.OWNER_ID) {
            let check = await settingsTable.get(`ARoles_${guild.id}`);
            if (check) {
                if (check.find((r) => args[0]?.value)) {
                    await settingsTable.pull(`ARoles_${guild.id}`, args[0]?.value);
                    (0, respond_1.respond)(interaction, message, {
                        content: "**🔧 | Role has been removed !**",
                    }, isSlash);
                }
                else {
                    await settingsTable.push(`ARoles_${guild.id}`, args[0]?.value);
                    (0, respond_1.respond)(interaction, message, {
                        content: "**🔧 | Role has been added !**",
                    }, isSlash);
                }
            }
            else {
                await settingsTable.set(`ARoles_${guild.id}`, [`${args[0]?.value}`]);
                (0, respond_1.respond)(interaction, message, {
                    content: "**🔧 | Role has been added !**",
                }, isSlash);
            }
        }
        else
            (0, respond_1.respond)(interaction, message, {
                content: "**🚫 | Only Owners!!**",
            }, isSlash);
    },
};
