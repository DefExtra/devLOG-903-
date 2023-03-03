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
    name: "maxprotect",
    description: "🔒 Enable All Bot Protection!.",
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
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`Help Commands`)
                .setColor(0x2f3136)
                .setAuthor(guild.name, guild.iconURL({ dynamic: true }) || "")
                .setDescription(`**[ZDRA Protection](https://github.com/DevelopersSupportAR/ZDRA-Protection.git), Protect your discord server from hackers and bad staff!!.**\n\n\nPress "❌" To Stop The Bot Protection\nPress "🔓" To Use All Bot Protection\nPress "🔒" To Allow NIRO Protection (your staff will can't use an permission thay have)\n`);
            let btn = new discord_js_1.MessageButton()
                .setCustomId("x")
                .setStyle("DANGER")
                .setLabel("❌ No Protection");
            let btn2 = new discord_js_1.MessageButton()
                .setCustomId("full")
                .setStyle("DANGER")
                .setLabel("🔓 Full Protection");
            let btn3 = new discord_js_1.MessageButton()
                .setCustomId("niro")
                .setStyle("DANGER")
                .setLabel("🔒 Niro Protection");
            let row = new discord_js_1.MessageActionRow().addComponents(btn, btn2, btn3);
            await (0, respond_1.respond)(interaction, message, {
                embeds: [embed],
                components: [row],
                ephemeral: true,
            }, isSlash)
                .then((iii) => {
                const filter = (i) => i.user.id === author.id;
                const collector = channel.createMessageComponentCollector({
                    filter,
                    time: 1000 * 60 * 3,
                });
                collector.on("collect", async (i) => {
                    await i.deferReply().catch(() => { });
                    if (i.customId == "x") {
                        await db.delete(`NIRO_Protection_${guild.id}`);
                        await db.delete(`ANTI_SWEAR_LIST_${guild.id}`);
                        await db.delete(`ANTI_BOTS_${guild.id}`);
                        await db.delete(`ANTI_LINK_${guild.id}`);
                        await db.delete(`AntiSpam_${guild.id}`);
                        await db.delete(`ANTI_SWEAR_${guild.id}`);
                        await db.delete(`AntiTokens_${guild.id}`);
                        await db.delete(`AntiTokensTime_${guild.id}`);
                        await db.delete(`RoleCreateToggle_${guild.id}`);
                        await db.delete(`RoleCreate_${guild.id}`);
                        await db.delete(`RoleDeleteToggle_${guild.id}`);
                        await db.delete(`RoleDelete_${guild.id}`);
                        await db.delete(`ChannelCreateToggle_${guild.id}`);
                        await db.delete(`ChannelCreate_${guild.id}`);
                        await db.delete(`ChannelDeleteToggle_${guild.id}`);
                        await db.delete(`ChannelDelete_${guild.id}`);
                        await db.delete(`MembersBanToggle_${guild.id}`);
                        await db.delete(`MemebersBan_${guild.id}`);
                        await (0, respond_1.editRespond)(interaction, message, {
                            content: "> ❌ **All Bot Protection Settings Is Off**",
                            embeds: [],
                            components: [],
                        }, isSlash, iii.id);
                    }
                    else if (i.customId == "full") {
                        await db.set(`ANTI_SWEAR_LIST_${guild.id}`, [
                            "fuck",
                            "pussy",
                            "نيك",
                            "كس",
                        ]);
                        await db.set(`ANTI_BOTS_${guild.id}`, "on");
                        await db.set(`ANTI_LINK_${guild.id}`, "on");
                        await db.set(`AntiSpam_${guild.id}`, "on");
                        await db.set(`ANTI_SWEAR_${guild.id}`, "on");
                        await db.set(`AntiTokens_${guild.id}`, "on");
                        await db.set(`AntiTokensTime_${guild.id}`, 120);
                        await db.set(`RoleCreateToggle_${guild.id}`, "on");
                        await db.set(`RoleCreate_${guild.id}`, "1");
                        await db.set(`RoleDeleteToggle_${guild.id}`, "on");
                        await db.set(`RoleDelete_${guild.id}`, "1");
                        await db.set(`ChannelCreateToggle_${guild.id}`, "on");
                        await db.set(`ChannelCreate_${guild.id}`, "1");
                        await db.set(`ChannelDeleteToggle_${guild.id}`, "on");
                        await db.set(`ChannelDelete_${guild.id}`, "1");
                        await db.set(`MembersBanToggle_${guild.id}`, "on");
                        await db.set(`MemebersBan_${guild.id}`, "1");
                        await (0, respond_1.editRespond)(interaction, message, {
                            content: "> 🔓 **All Bot Protection Settings Is On**",
                            embeds: [],
                            components: [],
                        }, isSlash, iii.id).catch(() => { });
                    }
                    else if (i.customId == "niro") {
                        // niro
                        await db.set(`NIRO_Protection_${guild.id}`, "on");
                        await (0, respond_1.editRespond)(interaction, message, {
                            content: "> 🔒 **NIRO Protection is active**",
                            embeds: [],
                            components: [],
                        }, isSlash, iii.id).catch(() => { });
                    }
                });
            })
                .catch(() => { });
        }
    },
};
