"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "user",
    description: "user information.",
    options: [
        {
            name: "user",
            description: "the user.",
            required: true,
            type: 6,
        },
    ],
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let statusAF;
        let badgs = [];
        let user = await guild.members.cache.get(args[0]?.value)?.fetch();
        if (user?.user.flags?.has("BUGHUNTER_LEVEL_1"))
            badgs.push("BugHunter 1");
        if (user?.user.flags?.has("BUGHUNTER_LEVEL_2"))
            badgs.push("BugHunter 2");
        if (user?.user.flags?.has("EARLY_VERIFIED_BOT_DEVELOPER"))
            badgs.push("BotDeveloper");
        if (user?.user.flags?.has("HOUSE_BALANCE"))
            badgs.push("House Balance");
        if (user?.user.flags?.has("HOUSE_BRAVERY"))
            badgs.push("House Bravery");
        if (user?.user.flags?.has("HOUSE_BRILLIANCE"))
            badgs.push("House Brilliance");
        if (user?.user.flags?.has("PARTNERED_SERVER_OWNER"))
            badgs.push("Parter");
        if (user?.user.flags?.has("HYPESQUAD_EVENTS"))
            badgs.push("HyperSquad Events");
        if (user?.user.flags?.has("DISCORD_EMPLOYEE"))
            badgs.push("Employee");
        switch (user?.presence?.status) {
            case "dnd":
                statusAF = "🔴 DND";
                break;
            case "idle":
                statusAF = "🟡 Idle";
                break;
            case "invisible":
                statusAF = "⚫ Offline";
                break;
            case "online":
                statusAF = "🟢 Online";
                break;
            case "offline":
                statusAF = "⚫ Offline";
                break;
            default:
                statusAF = "⚫ unknowen";
                break;
        }
        let embed = new discord_js_1.MessageEmbed()
            .setAuthor({
            name: guild?.name || "",
            iconURL: guild?.iconURL({ dynamic: true }) || "",
        })
            .setThumbnail(user?.user?.avatarURL({ dynamic: true }) || "")
            .setImage(`https://cdn.discordapp.com/banners/${user?.id}/${user?.user.banner}?size=4096` ||
            "")
            .setColor(user?.displayHexColor || 0x0f1ed3)
            .setFields([
            {
                inline: true,
                name: "👤 **Username:**",
                value: user?.user.username + `(${user?.nickname || "none"})`,
            },
            {
                inline: true,
                name: "🎫 **Discriminator:**",
                value: user?.user.discriminator,
            },
            {
                inline: true,
                name: "🙄 **Status:**",
                value: statusAF,
            },
            {
                inline: true,
                name: "📛 **Badgs:**",
                value: badgs.map((c) => `${c},`).join(" "),
            },
            {
                inline: true,
                name: "📆 **Joined At:**",
                value: `${user?.joinedAt?.getFullYear()}/${user?.joinedAt?.getMonth()}/${user?.joinedAt?.getDay()} - ${user?.joinedAt?.getHours()}:${user?.joinedAt?.getMinutes()}:${user?.joinedAt?.getSeconds()} (${user?.joinedAt?.getDate()})`,
            },
        ]);
        (0, respond_1.respond)(interaction, message, { embeds: [embed] }, isSlash);
    },
};
