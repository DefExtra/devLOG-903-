"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "server",
    description: "server information.",
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let embed = new discord_js_1.MessageEmbed()
            .setAuthor({
            name: guild?.name || "",
            iconURL: guild?.iconURL({ dynamic: true }) || "",
        })
            .setThumbnail(guild?.iconURL({ dynamic: true }) || "")
            .setImage(guild.bannerURL() || "")
            .setDescription(guild.description || "")
            .setColor(0x0f1ed3)
            .setFields([
            {
                inline: true,
                name: "🆔 **ID:**",
                value: `${guild.name} (${guild.id})`,
            },
            {
                inline: true,
                name: "**🗓 Created On:**",
                value: `**${guild?.createdAt?.getFullYear()}/${guild?.createdAt?.getMonth()}/${guild?.createdAt?.getDay()} - ${guild?.createdAt?.getHours()}:${guild?.createdAt?.getMinutes()}:${guild?.createdAt?.getSeconds()} (${guild?.createdAt?.getDate()})**`,
            },
            {
                inline: true,
                name: "**👑 Owned by:**",
                value: `<@!${guild.ownerId}>`,
            },
            {
                inline: true,
                name: `**👥 Members (${guild.memberCount})**`,
                value: `**${guild.members.cache.filter((m) => !["offline", "invisible"].includes(m.presence?.status || "online")).size}** Online\n${guild.premiumSubscriptionCount} Boosts ✨`,
            },
            {
                inline: true,
                name: `**💬 Channels (${guild.channels.cache.size})**`,
                value: `**${guild.channels.cache.filter((c) => c.isText()).size}** Text | **${guild.channels.cache.filter((c) => c.isVoice()).size}** Voice`,
            },
            {
                inline: true,
                name: `🔐 **Roles (${guild.roles.cache.size})**`,
                value: `To see a list with all roles use **/roles**`,
            },
            {
                inline: true,
                name: `😂 **Emojis (${guild.emojis.cache.size})**`,
                value: `**${guild.emojis.cache.filter((e) => e.animated == true).size}** Animated | **${guild.emojis.cache.filter((e) => e.animated == false).size}** Default`,
            },
            {
                inline: true,
                name: `**🌍 Others**`,
                value: `**Verifcation Level:** ${guild.verificationLevel}\n**AFK Channel**: <#${guild.afkChannelId}>`,
            },
        ]);
        (0, respond_1.respond)(interaction, message, { embeds: [embed] }, isSlash);
    },
};
