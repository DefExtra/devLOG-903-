"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "ban",
    description: "ban members.",
    type: 1,
    options: [
        {
            name: "member",
            description: "the member you will ban.",
            type: 6,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "BAN_MEMBERS", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            (0, respond_1.respond)(interaction, message, {
                components: [
                    new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                        .setCustomId("menu")
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setOptions(REPLYS.ban_kickREASONS)),
                ],
            }, isSlash).then((d) => {
                d.createMessageComponentCollector({
                    filter: (i) => i.user.id == author.id,
                    max: 1,
                }).on("collect", (c) => {
                    let member = guild.members.cache.get(args[0]?.value);
                    if (!member)
                        return;
                    if (member?.id == author.id) {
                        (0, respond_1.editRespond)(interaction, message, {
                            components: [],
                            content: REPLYS.cantBanurSelf,
                        }, isSlash, d.id);
                        return;
                    }
                    let pr = guild.members.cache.get(author.id)?.roles.highest.position;
                    if (member?.roles.highest?.position >= pr) {
                        (0, respond_1.editRespond)(interaction, message, {
                            components: [],
                            content: REPLYS.errBAN,
                        }, isSlash, d.id);
                        return;
                    }
                    member
                        ?.ban({
                        reason: c.values[0],
                    })
                        .then(() => {
                        (0, respond_1.editRespond)(interaction, message, {
                            components: [],
                            content: REPLYS.doneBAN
                                .replace("{userTAG}", member?.user.tag)
                                .replace("{reason}", c.values[0]),
                        }, isSlash, d.id);
                    })
                        .catch((err) => {
                        (0, respond_1.editRespond)(interaction, message, {
                            components: [],
                            content: REPLYS.errBAN,
                        }, isSlash, d.id);
                    });
                });
            });
        }
    },
};
