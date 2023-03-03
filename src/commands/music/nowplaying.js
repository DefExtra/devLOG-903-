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
    name: "nowplaying",
    description: "current muisc.",
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
                content: REPLYS.mc10,
            }, isSlash);
        let postion = player.position;
        let dur = player.queue.current.duration;
        (0, respond_1.respond)(interaction, message, {
            content: `**:notes: Now Playing in ${memberVoiceChannel.name}....**`,
            embeds: [
                {
                    author: {
                        name: isSlash == true ? interaction.user.tag : message.author.tag,
                        iconURL: isSlash == true
                            ? interaction.user?.avatarURL({ dynamic: true }) || ""
                            : message.author?.avatarURL({ dynamic: true }) || "",
                    },
                    title: `**${player?.queue?.current.title}**`,
                    description: `${player.paused == false ? "▶️" : "⏸️"} ${progressbar.splitBar(dur, postion, 12)[0]} \`[${(0, parse_ms_1.default)(postion).minutes}:${s((0, parse_ms_1.default)(postion).seconds)
                        ? s((0, parse_ms_1.default)(postion).seconds)
                        : (0, parse_ms_1.default)(postion).seconds}/${(0, parse_ms_1.default)(dur).minutes}:${s((0, parse_ms_1.default)(dur).seconds) ? s((0, parse_ms_1.default)(dur).seconds) : (0, parse_ms_1.default)(dur).seconds}]\`:loud_sound:`,
                },
            ],
        }, isSlash);
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
