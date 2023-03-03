"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "stage_radio",
    description: "🌟 Premuim: external bot can play music in a spacific channel.",
    type: 1,
    options: [
        {
            name: "channel_id",
            description: "🌟 Premuim Option: the stage channel_id.",
            type: 3,
            required: true,
        },
        {
            name: "token",
            description: "🌟 Premuim Option: the bot token that well play the music.",
            type: 3,
            required: true,
        },
        {
            name: "only_admins",
            description: "🌟 Premuim Option: wont the channel controle for admins only?.",
            type: 3,
            required: true,
            choices: [
                { name: "yes", value: "yes" },
                { name: "no", value: "no" },
            ],
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        (0, respond_1.respond)(interaction, message, {
            content: "Command has disabled ...",
        }, isSlash);
    },
};
/**
 * let manager = index.bot.getManager();
    if (message?.deletable) message.delete();
    let channelID = args[0]?.value;
    let token = args[1]?.value;
    let adminsOkay = args[2]?.value;
    let stageChannel = guild.channels.cache.get(channelID);
    let perms = await checkPerms(
      guild.members.cache.get(author.id),
      "ADMINISTRATOR",
      {
        base1: interaction,
        base2: message,
        isSlash,
      },
      REPLYS
    );
    if (perms == true) {
      if (stageChannel?.type !== "GUILD_STAGE_VOICE")
        return respond(
          interaction,
          message,
          {
            content: "🌟 (🚫) | **Only Stage Channel Can Be Used!.**",
          },
          isSlash
        );
      let checkClient = new Client({ intents: 32767 });
      let loginCheck = await checkClient.login(token).catch((err) => err);
      if (loginCheck !== token)
        return respond(
          interaction,
          message,
          {
            content: "🌟 (🚫) | **Token is Invield!.**",
          },
          isSlash
        );
      else {
        await checkClient.destroy();
        await db.set(`SR_P_${guild.id}`, {
          stageChannelID: stageChannel?.id,
          textChannelID: channel.id,
          token: token,
          admin: adminsOkay,
          messageID: null,
        });
        await starter(
          guild,
          {
            stageChannelID: stageChannel?.id,
            textChannelID: channel.id,
            token: token,
            admin: adminsOkay,
            messageID: "",
          },
          client,
          db
        );
        await respond(
          interaction,
          message,
          {
            content: "🌟 (✅) | **Function Activited.**",
          },
          isSlash
        );
      }
    }
  },
};

async function starter(
  guild: Guild,
  {
    token,
    textChannelID,
    stageChannelID,
    messageID,
    admin,
  }: {
    stageChannelID: string;
    textChannelID: string;
    token: string;
    admin: string;
    messageID: string;
  },
  main: Client,
  db: QuickDB
) {
  var bot = new Client({ intents: 32767 });
  await bot.login(token);
  bot.on("ready", async () => {
    await bot.user?.setStatus("idle");
    await bot.user?.setUsername("Music Player ...");
  });
  let distube = new DisTube(bot, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true,
      }),
      new SoundCloudPlugin(),
      new YtDlpPlugin(),
    ],
  });
  bot.on("messageCreate", async (m) => {
    if (!m.guild) return;
    if (admin == "no") {
      if (!m.member) return;
      let perms = await checkPerms(
        m.member,
        "ADMINISTRATOR",
        {
          isSlash: false,
          base1: m,
          base2: m,
        },
        index.replys["en"]
      );
      if (perms !== true) return;
    }
    var channelV = bot.channels.cache.get(stageChannelID);
    var textChannel = bot.channels.cache.get(textChannelID);

    if (!channelV) return;
    if (!textChannel?.isText()) return;
    if (!m.author.bot && m.channel.id == textChannel.id) {
      if (!channelV?.isVoice()) return;
      m.delete()
      if (m.content == "music.stop") {
        distube.stop(m).then(async () => {
          (
            await m.channel.messages.fetch(
              (await db.get(`SR_P_${guild.id}.messageID`)) || ""
            )
          ).content
            ? (
                await m.channel.messages.fetch(
                  (await db.get(`SR_P_${guild.id}.messageID`)) || ""
                )
              ).edit(`🎶 | Running Track: ***(nothing)***...`)
            : await m.channel
                .send("🎶 | Running Track: ***(nothing)***...")
                .then(async (mr) => {
                  await db.set(`SR_P_${guild.id}`, {
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
        (
          await m.channel.messages.fetch(
            (await db.get(`SR_P_${guild.id}.messageID`)) || ""
          )
        ).content
          ? (
              await m.channel.messages.fetch(
                (await db.get(`SR_P_${guild.id}.messageID`)) || ""
              )
            ).edit(
              `🎶 | Running Track: ***(${
                distube.getQueue(m)?.songs[0].name
              })***...`
            )
          : await m.channel
              .send(
                `🎶 | Running Track: ***(${
                  distube.getQueue(m)?.songs[0].name
                })***...`
              )
              .then(async (mr) => {
                await db.set(`SR_P_${guild.id}`, {
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
 */
