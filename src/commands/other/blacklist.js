"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "blacklist",
    description: "🎃 Blacklisted user .",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let blacklist = await db.get(`Blacklist`);
        if (!blacklist)
            blacklist = [];
        (0, respond_1.respond)(interaction, message, {
            content: "Blacklisted users:",
            embeds: [
                new discord_js_1.MessageEmbed().setColor("GREY").setDescription(blacklist
                    ?.map((V, I) => `${I + 1} ${V.name}`)
                    .slice(0, 40)
                    .join("\n") || ""),
            ],
        }, isSlash);
    },
};
