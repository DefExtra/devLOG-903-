"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "avatar",
    description: "user avatar.",
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
        let user = await guild.members.cache.get(args[0]?.value)?.fetch();
        let embed = new discord_js_1.MessageEmbed()
            .setAuthor({
            name: guild?.name || "",
            iconURL: guild?.iconURL({ dynamic: true }) || "",
        })
            .setImage(user?.user.avatarURL({ dynamic: true, size: 4096 }) || "")
            .setColor(user?.displayHexColor || 0x0f1ed3);
        (0, respond_1.respond)(interaction, message, { embeds: [embed] }, isSlash);
    },
};
