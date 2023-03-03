"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const parse_ms_1 = __importDefault(require("parse-ms"));
exports.default = {
    abbreviations: [],
    name: "play",
    description: "play muisc.",
    type: 1,
    options: [
        {
            name: "term",
            description: "the song you wont to play.",
            type: 3,
            required: false,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let memberVoiceChannel = guild.members.cache.get(author.id)?.voice.channel;
        let manager = __1.default.Manager;
        let botVoiceChannel = guild?.me?.voice?.channel;
        let songName = args[0]?.value;
        if (!memberVoiceChannel)
            return (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc1,
            }, isSlash);
        if (botVoiceChannel && botVoiceChannel.id !== memberVoiceChannel.id)
            return (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc2.replace("${botVoiceChannel.name}", `${botVoiceChannel.name}`),
            }, isSlash);
        if (manager?.players.get(guild.id)?.paused && !songName) {
            manager.players.get(guild.id)?.pause(false);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc3.replace("{songName}", `${manager.players.get(guild.id)?.queue?.current?.title}`),
            }, isSlash);
            return;
        }
        else if (manager?.players.get(guild.id)?.paused && !songName)
            return manager.players.get(guild.id)?.pause(false);
        (0, respond_1.respond)(interaction, message, {
            content: `⌚ Searching ... (\`${songName}\`)`,
        }, isSlash).then(async (m) => {
            try {
                let res = await manager?.search(songName, author);
                if (res?.loadType == "LOAD_FAILED")
                    return m.react("❌");
                else if (res?.loadType == "NO_MATCHES")
                    return m.react("❌");
                const player = await manager?.create({
                    guild: guild.id,
                    voiceChannel: memberVoiceChannel?.id,
                    textChannel: channel.id,
                    volume: 60
                });
                await player?.connect();
                await player?.queue.add(res?.tracks[0]);
                if (!player?.playing && !player?.paused && !player?.queue.size)
                    await player?.play();
                if (!player?.playing &&
                    !player?.paused &&
                    player?.queue.totalSize === res.tracks.length)
                    await player?.play();
                (0, respond_1.editRespond)(interaction, message, {
                    content: REPLYS.mc4
                        .replace("{songName}", `${res.tracks[0].title}`)
                        .replace("{time}", `${(0, parse_ms_1.default)(res.tracks[0].duration).minutes}:${s((0, parse_ms_1.default)(res.tracks[0].duration).seconds)
                        ? s((0, parse_ms_1.default)(res.tracks[0].duration).seconds)
                        : (0, parse_ms_1.default)(res.tracks[0].duration).seconds}`),
                }, isSlash, m?.id);
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
};
