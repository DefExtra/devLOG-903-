"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../../utils/modules/respond");
const __1 = __importDefault(require("../../../.."));
exports.default = {
    name: "letters",
    description: "🎮 Try to beat the others players to type the word letters count faster.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        if (guild.members.cache.get(author.id)?.voice.channel) {
            var x = [
                "Imagine Dragons - Believers",
                "XXXTENTACION - SAD",
                "Masked wolf - Astronaut in the ocean",
                "Juice wrld - LUCID DREAMS",
                "Alan walker - Faded",
                "Travis scott - OUT WEST",
                "Travis scott - SICKO MODE",
                "XXXTENTACION - MOONLIGHT",
            ];
            var music = Math.floor(Math.random() * x.length);
            let manager = __1.default.Manager;
            let res = await manager?.search(`${x[music]}`, author);
            if (res?.loadType == "LOAD_FAILED")
                return;
            else if (res?.loadType == "NO_MATCHES")
                return;
            const player = await manager?.create({
                guild: guild.id,
                voiceChannel: guild.members.cache.get(author.id)?.voice.channel?.id,
                textChannel: channel.id,
                volume: 60,
            });
            await player?.connect();
            await player?.queue.add(res?.tracks[0]);
            if (!player?.playing && !player?.paused && !player?.queue.size)
                await player?.play();
            if (!player?.playing &&
                !player?.paused &&
                player?.queue.totalSize === res.tracks.length)
                await player?.play();
            (0, respond_1.respond)(interaction, message, { content: "**🎵 | guess the song name**" }, isSlash).then(async (dt) => {
                var awaitMessage = channel.createMessageCollector({
                    filter: (msg) => !msg.author.bot && x[music].includes(msg.content),
                    time: 60 * 1000,
                });
                awaitMessage
                    .on("collect", async (msg) => {
                    await awaitMessage.stop("external");
                    await player?.destroy(true);
                    (0, respond_1.respond)(interaction, message, {
                        embeds: [
                            {
                                color: "GREEN",
                                description: `**${author}** got the correct answer ، it was: \`${x[music]}\`` +
                                    "🎉",
                            },
                        ],
                    }, isSlash);
                })
                    .on("end", async (c, r) => {
                    if (r == "external")
                        return;
                    else {
                        (0, respond_1.respond)(interaction, message, {
                            embeds: [
                                {
                                    color: "RED",
                                    title: "⚠" + ` **Time Out!**`,
                                    description: `**Time out with no answers ، the right answer is: \`${x[music]}\`**`,
                                },
                            ],
                        }, isSlash);
                        await player?.destroy(true);
                    }
                });
            });
        }
    },
};
