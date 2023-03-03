"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = async (client, modal, db) => {
    if (modal.customId == "send") {
        let key = "SuggestionsChannel_" + modal.guild?.id;
        let res = modal.getTextInputValue("input");
        let trtr = await db.get(key);
        let value = trtr?.channel;
        let channel = client?.channels.cache.get(value);
        if (!channel?.isText())
            return;
        if (!channel)
            return modal.reply({
                content: "Sorry! I can not find the suggestion channel in this server",
                ephemeral: true,
            });
        modal.reply({
            content: "Done! Your suggestion has been sent successfully, suggestion:```\n" +
                res +
                "```",
            ephemeral: true,
        });
        channel
            .send({
            embeds: [
                {
                    author: {
                        name: modal.user.username,
                        iconURL: modal.user.avatarURL({ dynamic: true }) || "",
                    },
                    color: 0x2c2f33,
                    timestamp: new Date(),
                    footer: {
                        iconURL: modal.guild?.iconURL({ dynamic: true }) || "",
                        text: modal.guild?.name,
                    },
                    description: res,
                    fields: [
                        { name: "👍 Up votes:", value: "```\n0```", inline: true },
                        {
                            name: "👎 Down votes:",
                            value: "```\n0```",
                            inline: true,
                        },
                    ],
                },
            ],
            components: [
                new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setCustomId("up")
                    .setStyle("DANGER")
                    .setLabel("👍 Up"), new discord_js_1.MessageButton()
                    .setCustomId("down")
                    .setStyle("DANGER")
                    .setLabel("👎 Down"), new discord_js_1.MessageButton()
                    .setCustomId("info")
                    .setStyle("SECONDARY")
                    .setLabel("❓ Who Voted")),
            ],
        })
            .then(async (message) => {
            let dataConstructor = {
                url: message.url.toString(),
                content: res,
            };
            let userKey = "Suggestions_" +
                modal.guild?.id +
                "_" +
                modal.user.id.toString() +
                ".sugs";
            let udata = await db.get(userKey);
            let value = { voters: [], votersInfo: [] };
            let key = message.id.toString();
            if (udata == null)
                await db.set(userKey, [dataConstructor]);
            else
                await db.push(userKey, dataConstructor);
            await db.set(key, value);
        });
    }
};
