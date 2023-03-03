"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "games-points",
    description: "🎮 View your/user points.",
    type: 1,
    options: [
        {
            name: "user",
            description: "🔧 the user id you wont to see his/her points.",
            type: 6,
            required: false,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let user = guild.members.cache.get(args[0]?.value)?.user || author;
        if (lang == "en") {
            (0, respond_1.respond)(interaction, message, {
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor(user.tag + " - Points! " + "🎉")
                        .setDescription(`<@!${user.id}> Points Is: \`${await db.get(`points_${guild.id}_${user.id}.points`)}\``)
                        .setFooter("Requested By " + author.tag)
                        .setTimestamp(),
                ],
            }, isSlash);
        }
        else if (lang == "ar") {
            (0, respond_1.respond)(interaction, message, {
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor(user.tag + " - نقاط! " + "🎉")
                        .setDescription(`نفط <@!${user.id}> هيا: \`${await db.get(`points_${guild.id}_${user.id}.points`)}\``)
                        .setFooter("Requested By " + user.tag)
                        .setTimestamp(),
                ],
            }, isSlash);
        }
    },
};
