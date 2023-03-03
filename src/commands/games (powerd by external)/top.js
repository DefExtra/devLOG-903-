"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "games-top",
    description: "🎮 Points leaderboard.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        const usersData = [];
        await guild.members.cache.forEach((member) => {
            usersData.push(member.user);
        });
        let pointsContent = usersData.length;
        let usersContent = 0;
        let usersMaxContent = 21;
        let tempData = [];
        for (let i = 0; i < pointsContent; i++) {
            var database = await db.get(`points_${guild.id}_${usersData[i].id}`);
            if (database == null)
                continue;
            tempData.push({
                name: usersData[i].id,
                data: database,
            });
        }
        const leaderboardData = [];
        tempData.sort((a, b) => b.data.points - a.data.points);
        for (let k = 0; k < tempData.length; k++) {
            usersContent++;
            if (usersContent >= usersMaxContent)
                continue;
            leaderboardData.push(`${k + 1}# <@!${tempData[k].name}> points: \`${tempData[k].data.points}\``);
        }
        var topValue = leaderboardData.join("\n");
        (0, respond_1.respond)(interaction, message, {
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setAuthor(guild.name + ` - Leaderboard! 📋`, guild.iconURL({ dynamic: true }) || "")
                    .setColor("GREEN")
                    .setDescription(topValue)
                    .setFooter("Requesed By " + author.tag)
                    .setTimestamp(),
            ],
        }, isSlash);
    },
};
