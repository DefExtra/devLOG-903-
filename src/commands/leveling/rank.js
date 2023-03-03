"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const canvacord_1 = __importDefault(require("canvacord"));
exports.default = {
    name: "rank",
    description: "💹 View you level in this server.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        canvacord_1.default.Welcomer;
        let settingsTable = await db.table("settings");
        let creditsTable = await db.table("credits");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let LevelingSystem = {
            dot: await db.get(`LS_${guild?.id}`),
            channel: await db.get(`LSC_${guild?.id}`),
            msg: await db.get(`LSM_${guild?.id}`),
            userPoints: await db.get(`LSUP_${guild?.id}_${author.id}`),
            userLevel: await db.get(`LSUL_${guild?.id}_${author.id}`),
            userRep: (await creditsTable.get(`Rep_${author.id}`)) || 1,
        };
        let حسبه = Number((Number(LevelingSystem["userLevel"]) * 500) /
            Number(LevelingSystem["userRep"])).toFixed(0);
        let STATUS = guild.members.cache.get(author.id)?.presence?.status;
        const rank = new canvacord_1.default.Rank()
            .setAvatar(author.avatarURL({ dynamic: false, format: "png" }) ||
            "https://cdn.discordapp.com/embed/avatars/0.png")
            .setCurrentXP(Number(LevelingSystem["userPoints"]))
            .setRequiredXP(Number(حسبه))
            .setStatus(STATUS || "online", false)
            .setProgressBar(["#5865f2", "#ee459e"], "GRADIENT")
            .setUsername(author.username)
            .setLevel(Number(LevelingSystem["userLevel"]))
            .setLevelColor("#ed4245")
            .setRank(Number(LevelingSystem["userRep"]), "Reps", true)
            .setDiscriminator(author.discriminator);
        try {
            rank.build({}).then((data) => {
                let attch = new discord_js_1.MessageAttachment(data, "RankCard.png");
                (0, respond_1.respond)(interaction, message, {
                    files: [attch],
                }, isSlash);
            });
        }
        catch (err) {
        }
    },
};
