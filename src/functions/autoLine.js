"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = async (db, messgae) => {
    let data = await db.get(`Line_${messgae.channel.id}`);
    if (!data)
        return;
    if (data.embed == "false")
        messgae.channel.send({
            files: [new discord_js_1.MessageAttachment(data.url)],
        });
    else
        messgae.channel.send({ embeds: [new discord_js_1.MessageEmbed().setImage(data.url)] });
};
