"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spotify_1 = require("@distube/spotify");
const soundcloud_1 = require("@distube/soundcloud");
const yt_dlp_1 = require("@distube/yt-dlp");
const discord_js_1 = require("discord.js");
const register_1 = __importDefault(require("../utils/modules/register"));
const index_1 = __importDefault(require("../../index"));
const distube_1 = require("distube");
const checkPerms_1 = __importDefault(require("./checkPerms"));
exports.default = (client, db) => {
    client?.guilds.cache.forEach(async (guild) => {
        let checkData = await db.get(`SR_P_${guild.id}`);
        if (checkData) {
            starter(guild, checkData, client);
        }
    });
};
async function starter(guild, { token, textChannelID, stageChannelID, messageID, admin, }, main) {
    var bot = new discord_js_1.Client({ intents: 32767 });
    await bot.login(token);
    bot.on("ready", async () => {
        await bot.user?.setStatus("idle");
        await bot.user?.setUsername("Music Player ...");
    });
    let distube = new distube_1.DisTube(bot, {
        leaveOnStop: false,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        plugins: [
            new spotify_1.SpotifyPlugin({
                emitEventsAfterFetching: true,
            }),
            new soundcloud_1.SoundCloudPlugin(),
            new yt_dlp_1.YtDlpPlugin(),
        ],
    });
    bot.on("messageCreate", async (m) => {
        if (!m.guild)
            return;
        if (admin == "no") {
            if (!m.member)
                return;
            let perms = await (0, checkPerms_1.default)(m.member, "ADMINISTRATOR", {
                isSlash: false,
                base1: m,
                base2: m,
            }, index_1.default.replys["en"]);
            if (perms !== true)
                return;
        }
        var channelV = bot.channels.cache.get(stageChannelID);
        var textChannel = bot.channels.cache.get(textChannelID);
        if (!channelV)
            return;
        if (!textChannel?.isText())
            return;
        if (!m.author.bot && m.channel.id == textChannel.id) {
            if (!channelV?.isVoice())
                return;
            m.delete().catch(() => { });
            if (m.content == "music.stop") {
                distube.stop(m).then(async () => {
                    (await m.channel.messages.fetch((await register_1.default.get(`SR_P_${guild.id}.messageID`)) || "")).content
                        ? (await m.channel.messages.fetch((await register_1.default.get(`SR_P_${guild.id}.messageID`)) || "")).edit(`🎶 | Running Track: ***(nothing)***...`)
                        : await m.channel
                            .send("🎶 | Running Track: ***(nothing)***...")
                            .then(async (mr) => {
                            await register_1.default.set(`SR_P_${guild.id}`, {
                                stageChannelID: stageChannelID,
                                textChannelID: textChannelID,
                                token: token,
                                admin: admin,
                                messageID: mr?.id,
                            });
                        });
                });
                return;
            }
            await distube.play(channelV, m.content).then(async (dd) => {
                (await m.channel.messages.fetch((await register_1.default.get(`SR_P_${guild.id}.messageID`)) || "")).content
                    ? (await m.channel.messages.fetch((await register_1.default.get(`SR_P_${guild.id}.messageID`)) || "")).edit(`🎶 | Running Track: ***(${distube.getQueue(m)?.songs[0].name})***...`)
                    : await m.channel
                        .send(`🎶 | Running Track: ***(${distube.getQueue(m)?.songs[0].name})***...`)
                        .then(async (mr) => {
                        await register_1.default.set(`SR_P_${guild.id}`, {
                            stageChannelID: stageChannelID,
                            textChannelID: textChannelID,
                            token: token,
                            admin: admin,
                            messageID: mr?.id,
                        });
                    });
                await guild.me?.voice.setRequestToSpeak(true);
                await guild.me?.voice.setSuppressed(false);
            });
        }
    });
}
