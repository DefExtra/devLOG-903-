"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const parse_ms_1 = __importDefault(require("parse-ms"));
const progressbar = require("string-progressbar");
exports.default = {
    name: "search",
    description: "seacrh for muisc.",
    type: 1,
    options: [
        {
            name: "song",
            description: "Song to search for.",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let manager = __1.default.bot.getManager();
        let memberVoiceChannel = guild.members.cache.get(author.id)?.voice.channel;
        let botVoiceChannel = guild.me?.voice.channel;
        let songName = args[0]?.value;
        if (!memberVoiceChannel)
            return (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc1,
            }, isSlash);
        if (botVoiceChannel && botVoiceChannel.id !== memberVoiceChannel.id)
            return (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc2.replace("${botVoiceChannel.name}", `${botVoiceChannel.name}`),
            }, isSlash);
        if (!songName)
            return (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc12,
            }, isSlash);
        (0, respond_1.respond)(interaction, message, {
            content: `⌚ Searching ... (\`${songName}\`)`,
        }, isSlash).then(async (m) => {
            try {
                let res = await manager?.search(songName, author);
                if (res?.loadType == "LOAD_FAILED")
                    return m.react("❌");
                else if (res?.loadType == "NO_MATCHES")
                    return m.react("❌");
                let player = await manager?.players.get(guild.id);
                if (!player)
                    player = await manager?.create({
                        guild: guild.id,
                        voiceChannel: memberVoiceChannel?.id,
                        textChannel: channel.id,
                    });
                await player?.connect();
                await (0, respond_1.editRespond)(interaction, message, {
                    embeds: [
                        {
                            description: res?.tracks
                                .map((track, index) => `>>> ${trunNumToEmoji(index)}\`${(0, parse_ms_1.default)(track.duration).minutes}:${s((0, parse_ms_1.default)(res?.tracks[index].duration).seconds)
                                ? s((0, parse_ms_1.default)(res?.tracks[index].duration).seconds)
                                : (0, parse_ms_1.default)(res?.tracks[index].duration).seconds}\` | **${track.title}**`)
                                .slice(0, 5)
                                .join("\n"),
                        },
                    ],
                }, isSlash, m?.id).then(async (d) => {
                    if (isSlash == false) {
                        await d?.react("1️⃣");
                        await d?.react("2️⃣");
                        await d?.react("3️⃣");
                        await d?.react("4️⃣");
                        await d?.react("5️⃣");
                        await d?.react("❌");
                        channel.messages.cache
                            .get(d?.id)
                            ?.createReactionCollector({
                            filter: (args_0, args_1) => args_1.id == author.id,
                            max: 1,
                            time: 1000 * 60 * 60 * 24,
                        })
                            ?.on("collect", async (reaction, user) => {
                            if (reaction.emoji.name == "❌") {
                                if (isSlash)
                                    await interaction.deleteReply();
                                else
                                    await channel.messages.cache.get(d?.id)?.delete();
                            }
                            else {
                                await playMusic(await trunEmojiToNum(reaction.emoji.name || ""), player, d, res, interaction, isSlash);
                            }
                        });
                    }
                    channel
                        .createMessageCollector({
                        filter: (args_0) => [1, 2, 3, 4, 5].includes(Number(args_0.content)) &&
                            args_0.author.id == author.id,
                        max: 1,
                        time: 1000 * 60 * 60 * 24,
                    })
                        ?.on("collect", async (msgg) => {
                        await playMusic(Number(msgg.content), player, d, res, interaction, isSlash);
                    });
                });
            }
            catch (err) {
                console.log(err);
                (0, respond_1.editRespond)(interaction, message, {
                    embeds: [
                        {
                            color: "RED",
                            description: `**there was an error while searching**: \`\`\`\n${err?.message}\`\`\``,
                        },
                    ],
                }, isSlash, m?.id);
            }
        });
    },
};
const s = (time) => {
    if (time == 1) {
        return "01";
    }
    else if (time == 2) {
        return "02";
    }
    else if (time == 3) {
        return "03";
    }
    else if (time == 4) {
        return "04";
    }
    else if (time == 5) {
        return "05";
    }
    else if (time == 6) {
        return "06";
    }
    else if (time == 7) {
        return "07";
    }
    else if (time == 8) {
        return "08";
    }
    else if (time == 9) {
        return "09";
    }
    else if (time == 0) {
        return "00";
    }
    else
        return time;
};
const trunNumToEmoji = (index) => {
    if (index == 0)
        return "1️⃣";
    else if (index == 1)
        return "2️⃣";
    else if (index == 2)
        return "3️⃣";
    else if (index == 3)
        return "4️⃣";
    else if (index == 4)
        return "5️⃣";
    else
        return "6️⃣";
};
const trunEmojiToNum = (index) => {
    if (index == "1️⃣")
        return 0;
    else if (index == "2️⃣")
        return 1;
    else if (index == "3️⃣")
        return 2;
    else if (index == "4️⃣")
        return 3;
    else if (index == "5️⃣")
        return 4;
    else
        return 5;
};
async function playMusic(index, player, m, res, interaction, isSlash) {
    await player?.queue.add(res.tracks[Number(index)]);
    if (!player?.playing && !player?.paused && !player?.queue.size)
        await player?.play();
    if (!player?.playing &&
        !player?.paused &&
        player?.queue.totalSize === res.tracks.length)
        await player?.play();
    isSlash == false ? m.reactions.removeAll() : true;
    (0, respond_1.editRespond)(interaction, m, {
        content: `:notes: **${res.tracks[Number(index)].title}** Added to **ProQueue** (\`${(0, parse_ms_1.default)(res.tracks[Number(index)].duration).minutes}:${s((0, parse_ms_1.default)(res.tracks[Number(index)].duration).seconds)
            ? s((0, parse_ms_1.default)(res.tracks[Number(index)].duration).seconds)
            : (0, parse_ms_1.default)(res.tracks[Number(index)].duration).seconds}\`)!`,
        embeds: [],
    }, isSlash, m.id);
}
