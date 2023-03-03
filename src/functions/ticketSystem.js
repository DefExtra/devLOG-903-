"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = async (interaction, db) => {
    await interaction.deferUpdate().catch(() => { });
    let ticketsTable = await db.table("ticket_system");
    let ticket_num = await ticketsTable.get("NUMS_" + interaction.guild?.id);
    if (!ticket_num) {
        await ticketsTable.set("NUMS_" + interaction.guild?.id, 1);
        ticket_num = 1;
    }
    let data = await ticketsTable.get(`TK_${interaction.guild?.id}`);
    if (!data)
        return console.log("data is missing (ticket system)");
    let role = interaction.guild?.roles.cache.get(data.adminRole);
    let cate1 = interaction.guild?.channels.cache.get(data.openedCate);
    let cate2 = interaction.guild?.channels.cache.get(data.closedCate);
    if (!cate1 || !cate2)
        return console.log("data is missing (ticket system)");
    if (interaction.customId == "OPEN-T") {
        interaction.guild?.channels
            .create(`ticket-${ticket_num}`, {
            type: "GUILD_TEXT",
        })
            .then(async (c) => {
            if (cate1)
                await c.setParent(cate1);
            await c.permissionOverwrites.set([
                {
                    id: interaction.guild?.roles.everyone.id || "",
                    deny: [
                        "VIEW_CHANNEL",
                        "SEND_MESSAGES",
                        "READ_MESSAGE_HISTORY",
                        "ADD_REACTIONS",
                        "EMBED_LINKS",
                    ],
                },
                {
                    id: interaction.user.id || "",
                    allow: [
                        "VIEW_CHANNEL",
                        "SEND_MESSAGES",
                        "READ_MESSAGE_HISTORY",
                        "ADD_REACTIONS",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                    ],
                },
                {
                    id: role?.id || "",
                    allow: [
                        "VIEW_CHANNEL",
                        "SEND_MESSAGES",
                        "READ_MESSAGE_HISTORY",
                        "ADD_REACTIONS",
                        "EMBED_LINKS",
                        "MANAGE_CHANNELS",
                    ],
                },
            ]);
            await ticketsTable.add("NUMS_" + interaction.guild?.id, 1);
            c.send({
                content: `${role}`,
                embeds: [
                    {
                        title: "Our Support Team Will Be Here Soon .",
                        color: "RANDOM",
                    },
                ],
                components: [
                    new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                        .setCustomId("CLOSE-T")
                        .setEmoji("❌")
                        .setStyle("DANGER")),
                ],
            });
        });
        interaction.followUp({
            ephemeral: true,
            content: "Your ticket has been created ..",
        });
    }
    else if (interaction.customId == "CLOSE-T") {
        let channel = interaction.guild?.channels.cache.get(interaction.channel?.id || "");
        if (!channel?.isText())
            return;
        if (!channel
            .permissionsFor(interaction.guild?.roles.everyone.id)
            .has("ATTACH_FILES")) {
            channel.delete();
        }
        else {
            interaction.followUp({
                ephemeral: true,
                content: "Ticket has been disabled ..",
            });
            await channel.setParent(cate2);
            await channel.permissionOverwrites.set([
                {
                    id: interaction.guild?.roles.everyone.id,
                    deny: [
                        "VIEW_CHANNEL",
                        "SEND_MESSAGES",
                        "READ_MESSAGE_HISTORY",
                        "ADD_REACTIONS",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                    ],
                },
                {
                    id: role?.id || "",
                    allow: [
                        "VIEW_CHANNEL",
                        "SEND_MESSAGES",
                        "READ_MESSAGE_HISTORY",
                        "ADD_REACTIONS",
                        "EMBED_LINKS",
                        "MANAGE_CHANNELS",
                    ],
                },
            ]);
        }
    }
};
