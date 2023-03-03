"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "afk",
    description: "set user as afk",
    options: [],
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let status = await db.get(`AFK_${author.id}`);
        if (status == true)
            await db.set(`AFK_${author.id}`, false);
        else
            await db.set(`AFK_${author.id}`, true);
        await (0, respond_1.respond)(interaction, message, {
            content: `>>> **⌨ | Your are${(await db.get(`AFK_${author.id}`)) == true ? "" : " not"} AFK!!.**`,
        }, isSlash);
    },
};
