"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../../src/utils/modules/respond");
const index_1 = __importDefault(require("../../../index"));
const checkPerms_1 = __importDefault(require("../../../src/functions/checkPerms"));
exports.default = {
    name: "welcomer-reset",
    description: "👋 Reset DASHBOARD-welcomer data .",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = index_1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            await db.set(`avatarXpostion_${guild.id}`, 40);
            await db.set(`avatarYpostion_${guild.id}`, 80);
            await db.set(`avatarXCpostion_${guild.id}`, 105);
            await db.set(`avatarYCpostion_${guild.id}`, 144);
            await db.set(`dimensionY_${guild.id}`, 280);
            await db.set(`dimensionX_${guild.id}`, 600);
            await db.set(`backgroundURL_${guild.id}`, "https://v13.discordjs.guide/assets/canvas-preview.30c4fe9e.png");
            await db.set(`Deg_${guild.id}`, 65);
            await db.set(`usernamePosY_${guild.id}`, 150);
            await db.set(`usernamePosX_${guild.id}`, 200);
            await db.set(`usernameFSize_${guild.id}`, "20");
            await db.set(`usernameColor_${guild.id}`, "#ed9209");
            await db.set(`textContent_${guild.id}`, "Welcome to {guildName} !");
            await db.set(`textPosY_${guild.id}`, 120);
            await db.set(`textPosX_${guild.id}`, 300);
            await db.set(`textFSize_${guild.id}`, "20");
            await db.set(`textColor_${guild.id}`, "#ffffff");
            (0, respond_1.respond)(interaction, message, {
                content: "🎨 Welcomer has been reseted .",
            }, isSlash);
        }
    },
};
