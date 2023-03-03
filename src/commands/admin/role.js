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
    name: "role",
    description: "add/remove roles for members/bots.",
    type: 1,
    options: [
        {
            name: "action",
            description: "the action you will do.",
            type: 3,
            required: true,
            choices: [
                { name: "add", value: "add" },
                { name: "remove", value: "remove" },
            ],
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_ROLES", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let action = args[0]?.value;
            if (!["add", "remove"].includes(action))
                return (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.undefinedAction,
                }, isSlash);
            (0, respond_1.respond)(interaction, message, {
                content: "` - ` - For who you wil give/remove the role // من من سوف تعطي/تحزف الرتبه",
                components: [
                    new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                        .setCustomId("menu")
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setOptions([
                        {
                            label: "member - الأعضاء",
                            value: "member",
                        },
                        {
                            label: "humans - البشر",
                            value: "humans",
                        },
                        {
                            label: "bots - البوتات",
                            value: "bots",
                        },
                        {
                            label: "all - الكل",
                            value: "all",
                        },
                    ])),
                ],
            }, isSlash).then((d) => {
                d.createMessageComponentCollector({
                    filter: (i) => i.user.id == author.id,
                    max: 1,
                }).on("collect", (c) => {
                    if (c.componentType !== "SELECT_MENU")
                        return;
                    let forWho = c.values[0];
                    (0, respond_1.editRespond)(interaction, message, {
                        components: [],
                        content: "` - ` - please `send mention/name/id` for the role // يرجى ارسال `mention/name/id` للرول",
                    }, isSlash, d.id).then((d2) => {
                        if (channel.isText()) {
                            channel
                                .createMessageCollector({
                                filter: (dpo) => dpo.author.id == author.id,
                                max: 1,
                            })
                                .on("collect", (j) => {
                                j.delete();
                                let role = j.mentions.roles.first() ||
                                    guild.roles.cache.get(j.content) ||
                                    guild.roles.cache.find((z) => z.name == j.content);
                                if (!role) {
                                    (0, respond_1.editRespond)(interaction, message, {
                                        components: [],
                                        content: REPLYS.cantROLE,
                                    }, isSlash, d.id);
                                    return;
                                }
                                switch (forWho) {
                                    case "humans":
                                        {
                                            guild.members.cache
                                                .filter(({ user }) => user.bot == false)
                                                .forEach((m) => {
                                                m.roles[action](role);
                                            });
                                            (0, respond_1.editRespond)(interaction, message, {
                                                components: [],
                                                content: REPLYS.doneROLING
                                                    .replace("{action}", action)
                                                    .replace("{who}", forWho)
                                                    .replace("{role}", role.name),
                                            }, isSlash, d.id);
                                        }
                                        break;
                                    case "bots":
                                        {
                                            guild.members.cache
                                                .filter(({ user }) => user.bot == true)
                                                .forEach((m) => {
                                                m.roles[action](role);
                                            });
                                            (0, respond_1.editRespond)(interaction, message, {
                                                components: [],
                                                content: REPLYS.doneROLING
                                                    .replace("{action}", action)
                                                    .replace("{who}", forWho)
                                                    .replace("{role}", role.name),
                                            }, isSlash, d.id);
                                        }
                                        break;
                                    case "all":
                                        {
                                            guild.members.cache.forEach((m) => {
                                                m.roles[action](role);
                                            });
                                            (0, respond_1.editRespond)(interaction, message, {
                                                components: [],
                                                content: REPLYS.doneROLING
                                                    .replace("{action}", action)
                                                    .replace("{who}", forWho)
                                                    .replace("{role}", role.name),
                                            }, isSlash, d.id);
                                        }
                                        break;
                                    case "member": {
                                        (0, respond_1.editRespond)(interaction, message, {
                                            components: [],
                                            content: "mention/name/id user you won't to add/remove role // mention/name/id الشخص الي تريد add/remove الرتبة منه",
                                        }, isSlash, d.id);
                                        channel
                                            .createMessageCollector({
                                            filter: (our) => our.author.id == author.id,
                                            max: 1,
                                        })
                                            .on("collect", (m) => {
                                            m.delete();
                                            let user = m.mentions.members?.first() ||
                                                guild.members.cache.get(m.content) ||
                                                guild.members.cache.find((c) => c.user.username == m.content);
                                            if (!user) {
                                                (0, respond_1.editRespond)(interaction, message, {
                                                    components: [],
                                                    content: REPLYS.cantROLE2,
                                                }, isSlash, d.id);
                                                return;
                                            }
                                            (0, respond_1.editRespond)(interaction, message, {
                                                components: [],
                                                content: REPLYS.doneROLING
                                                    .replace("{action}", action)
                                                    .replace("{who}", forWho)
                                                    .replace("{role}", role.name),
                                            }, isSlash, d.id);
                                            user.roles[action](role);
                                        });
                                    }
                                    default:
                                        break;
                                }
                            });
                        }
                    });
                });
            });
        }
    },
};
