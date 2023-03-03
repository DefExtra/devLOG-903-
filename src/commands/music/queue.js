"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const progressbar = require("string-progressbar");
exports.default = {
    name: "queue",
    description: "muisc queue.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let manager = __1.default.bot.getManager();
        let memberVoiceChannel = guild.members.cache.get(author.id)?.voice.channel;
        let botVoiceChannel = guild.me?.voice.channel;
        if (!memberVoiceChannel)
            return (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc1,
            }, isSlash);
        if (botVoiceChannel && botVoiceChannel.id !== memberVoiceChannel.id)
            return (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc2.replace("${botVoiceChannel.name}", `${botVoiceChannel.name}`),
            }, isSlash);
        let player = manager?.players.get(guild.id);
        if (!player || !player.queue.current)
            return (0, respond_1.respond)(interaction, message, {
                content: "**:frowning2: No music playing.**",
                embeds: [
                    {
                        title: "**:notes: Current Queue | 0 entries**",
                    },
                ],
            }, isSlash);
        (0, respond_1.respond)(interaction, message, {
            content: `**:arrow_forward: ${player.queue.current.title}**`,
            embeds: [
                {
                    title: "**:notes: Current Queue | 0 entries**",
                    description: player.queue
                        .map((track, index) => {
                        let req = track.requester;
                        return `**${index + 1}** ${track.title} - <@!${req?.id}>`;
                    })
                        .slice(0, 20)
                        .join("\n"),
                },
            ],
        }, isSlash);
    },
};
