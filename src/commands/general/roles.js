"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "roles",
    description: "server roles.",
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let embed = new discord_js_1.MessageEmbed()
            .setAuthor({
            name: guild?.name || "",
            iconURL: guild?.iconURL({ dynamic: true }) || "",
        })
            .setDescription(`\`\`\`yml\n${guild.roles.cache
            .map((r) => `${r.members.size} ${r.name}`)
            .join("\n")}\`\`\``)
            .setColor(0x0f1ed3);
        (0, respond_1.respond)(interaction, message, { embeds: [embed] }, isSlash);
    },
};
