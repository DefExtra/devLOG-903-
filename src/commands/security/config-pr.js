"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "config-pr",
    description: "🔒 Your Protection Config",
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let embed = new discord_js_1.MessageEmbed()
                .setAuthor("Settings 🛠️", guild.iconURL({ dynamic: true }) || "", "https://discord.gg/developer-tools")
                .addField("Anti:", `**❯ Swear:** ${await await db.get(`ANTI_SWEAR_${guild.id}`)}, ${await db.get(`ANTI_SWEAR_LIST_${guild.id}`)} \n` +
                `**❯ Links:** ${await await db.get(`ANTI_LINK_${guild.id}`)}\n` +
                `**❯ Bots:** ${await await db.get(`ANTI_BOTS_${guild.id}`)} \n` +
                `**❯ Spam:** ${await await db.get(`AntiSpam_${guild.id}`)} \n` +
                `**❯ Tokens:** ${await await db.get(`AntiTokens_${guild.id}`)}, ${await await db.get(`AntiTokensTime_${guild.id}`)}`, false)
                .addField("Limit:", `**❯ RoleCreate:** ${await await db.get(`RoleCreateToggle_${guild.id}`)}, ${await await db.get(`RoleCreate_${guild.id}`)}\n` +
                `**❯ RoleDelete:** ${await await db.get(`RoleDeleteToggle_${guild.id}`)}, ${await await db.get(`RoleDelete_${guild.id}`)}\n` +
                `**❯ ChannelCreate:** ${await await db.get(`ChannelCreateToggle_${guild.id}`)}, ${await await db.get(`ChannelCreate_${guild.id}`)}\n` +
                `**❯ ChannelDelete:** ${await await db.get(`ChannelDeleteToggle_${guild.id}`)}, ${await await db.get(`ChannelDelete_${guild.id}`)}\n` +
                `**❯ MembersBan:** ${await await db.get(`MembersBanToggle_${guild.id}`)}, ${await await db.get(`MemebersBan_${guild.id}`)}\n`, false)
                .addField("Settings:", `**❯ Prefix:** ${await settingsTable.get(`Prefix_${guild?.id}`)}\n` + `**❯ Lang:** ${lang}\n`, false);
            (0, respond_1.respond)(interaction, message, { embeds: [embed], ephemeral: true }, isSlash);
        }
    },
};
