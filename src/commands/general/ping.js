"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "ping",
    description: "Pong.",
    options: [
    ],
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        
        (0, respond_1.respond)(interaction, message, { content: `**:ping_pong: Pong ${client.ws.ping}ms**` }, isSlash);
    },
};
