"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "status",
    description: "user status information.",
    options: [
        {
            name: "user",
            description: "the user.",
            required: false,
            type: 6,
        },
    ],
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let user = guild.members.cache.get(args[0]?.value) ||
            guild.members.cache.get(author.id || "");
        if (!user?.presence?.activities.length) {
            const sembed = new discord_js_1.MessageEmbed()
                .setAuthor({
                name: user?.user.username || "",
                iconURL: user?.user.displayAvatarURL({ dynamic: true }) || "",
            })
                .setColor("GREEN")
                .setThumbnail(user?.user.displayAvatarURL() || "")
                .addFields([
                {
                    name: "**No Status**",
                    value: "This user does not have any custom status!",
                },
            ])
                .setFooter({
                text: guild.name,
                iconURL: guild.iconURL() || "",
            })
                .setTimestamp();
            (0, respond_1.respond)(interaction, message, { embeds: [sembed] }, isSlash);
            return;
        }
        user.presence.activities.forEach((activity) => {
            if (activity.type == "CUSTOM") {
                const embed = new discord_js_1.MessageEmbed()
                    .setAuthor({
                    name: user?.user.username || "",
                    iconURL: user?.user.displayAvatarURL({ dynamic: true }) || "",
                })
                    .setColor("GREEN")
                    .addFields([
                    {
                        name: "**Status**",
                        value: `**Custom status** -\n${activity.emoji || ""} ${activity.state}`,
                    },
                ])
                    .setThumbnail(user?.user.displayAvatarURL() || "")
                    .setFooter({
                    text: guild.name,
                    iconURL: guild.iconURL() || "",
                })
                    .setTimestamp();
                (0, respond_1.respond)(interaction, message, { embeds: [embed] }, isSlash);
            }
            else if (activity.type === "PLAYING") {
                let name1 = activity.name;
                let details1 = activity.details;
                let state1 = activity.state;
                let image = user?.user.displayAvatarURL({ dynamic: true });
                const sembed = new discord_js_1.MessageEmbed()
                    .setAuthor({ name: `${user?.user.username}'s Activity` })
                    .setColor(0xffff00)
                    .setThumbnail(image || "")
                    .addFields([
                    {
                        name: "**Type**",
                        value: "Playing",
                        inline: false,
                    },
                    {
                        name: "**App**",
                        value: name1,
                        inline: false,
                    },
                    {
                        name: "**Details**",
                        value: details1 || "No Details",
                        inline: false,
                    },
                    {
                        name: "**Working On**",
                        value: state1 || "No Details",
                        inline: false,
                    },
                ]);
                (0, respond_1.respond)(interaction, message, { embeds: [sembed] }, isSlash);
            }
            else if (activity.type === "LISTENING" &&
                activity.name === "Spotify" &&
                activity.assets !== null) {
                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage?.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncId}`;
                let trackName = activity.details || "unReal??";
                let trackAuthor = activity.state || "unReal??";
                let trackAlbum = activity.assets.largeText || "unReal??";
                trackAuthor = trackAuthor.replace(/;/g, ",");
                const embed = new discord_js_1.MessageEmbed()
                    .setAuthor({
                    name: "Spotify Track Info",
                    iconURL: "https://cdn.discordapp.com/emojis/408668371039682560.png",
                })
                    .setColor("GREEN")
                    .setThumbnail(trackIMG)
                    .addFields([
                    {
                        name: "Song Name",
                        value: trackName,
                        inline: true,
                    },
                    {
                        name: "Album",
                        value: trackAlbum,
                        inline: true,
                    },
                    {
                        name: "Author",
                        value: trackAuthor,
                        inline: false,
                    },
                    {
                        name: "Listen to Track",
                        value: trackURL,
                        inline: false,
                    },
                ])
                    .setFooter({
                    text: user?.displayName || "",
                    iconURL: user?.user.displayAvatarURL({ dynamic: true }) || "",
                });
                (0, respond_1.respond)(interaction, message, { embeds: [embed] }, isSlash);
            }
        });
    },
};
