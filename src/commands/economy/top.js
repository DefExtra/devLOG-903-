"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "top",
    description: "💸 rich people.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let creditsTable = await db.table("credits");
        let content = (await creditsTable.all())
            .filter((data) => data.id.startsWith(`Credits_`))
            .sort((a, b) => b.value - a.value)
            .map(({ id, value }, index) => `${index + 1}. ${client.users.cache.get(id.split("_")[1])?.username} - **$${value}**`)
            .join("\n").slice(0, 20);
        (0, respond_1.respond)(interaction, message, {
            embeds: [
                {
                    title: "💸 rich people.",
                    color: 0xf43f,
                    description: content,
                    thumbnail: { url: guild.iconURL({ dynamic: true }) },
                },
            ],
        }, isSlash);
    },
};
