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
    name: "setup-rr",
    description: "📐 all reaction role system commands.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let rr = await db.table("rr_system");
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), ["MANAGE_GUILD", "MANAGE_ROLES"], {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            (0, respond_1.respond)(interaction, message, {
                content: `✨ Welcome to Reaction-Role system .\nwhat do you need to do now?\n\n**"THIS COMMAND IS ONLY SUPPORTED WITH ENGLISH"**`,
                components: [
                    new discord_js_1.MessageActionRow().addComponents([
                        new discord_js_1.MessageSelectMenu()
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setCustomId("menu")
                            .setOptions([
                            {
                                label: "Setup Reaction-Message",
                                value: "srm",
                            },
                            {
                                label: "Setup Reaction-React",
                                value: "srr",
                            },
                            {
                                label: "Edit Reaction-Message",
                                value: "erm",
                            },
                            {
                                label: "Remove Reaction-React",
                                value: "err",
                            },
                        ]),
                    ]),
                ],
            }, isSlash).then((iii) => iii
                .createMessageComponentCollector({
                filter: (u) => u.user.id == author.id,
            })
                .on("collect", async (y) => {
                if (y.customId == "menu" && y.isSelectMenu()) {
                    await y.deferUpdate();
                    let i = y;
                    switch (i.values[0]) {
                        case "srm":
                            {
                                (0, respond_1.editRespond)(interaction, message, {
                                    content: "🤖 Do you wont the reaction system be on user message or bot message??",
                                    components: [
                                        new discord_js_1.MessageActionRow().setComponents(new discord_js_1.MessageButton()
                                            .setCustomId("user")
                                            .setLabel("User Message")
                                            .setStyle("SECONDARY"), new discord_js_1.MessageButton()
                                            .setCustomId("BOT")
                                            .setLabel("Bot Message")
                                            .setStyle("SECONDARY")),
                                    ],
                                }, isSlash, iii.id).then((br) => br
                                    .createMessageComponentCollector({
                                    filter: (u) => u.user.id == author.id,
                                })
                                    .on("collect", async (f) => {
                                    if (f.customId == "user") {
                                        (0, respond_1.editRespond)(interaction, message, {
                                            content: "✏️ Send the user Message-ID to continue to process ...",
                                            components: [],
                                        }, isSlash, br.id).then((kr) => {
                                            channel
                                                .createMessageCollector({
                                                filter: (u) => u.author.id == author.id,
                                                max: 1,
                                            })
                                                .on("collect", async (msg) => {
                                                await (0, respond_1.editRespond)(interaction, message, {
                                                    content: "🧐 Fetching the message in progress ...",
                                                    components: [],
                                                }, isSlash, br.id);
                                                msg.delete().catch(() => { });
                                                let messager;
                                                await guild.channels.cache.forEach(async (c) => {
                                                    if (c.isText()) {
                                                        try {
                                                            let optra = await c.messages.fetch(msg.content);
                                                            if (optra.id == msg.content)
                                                                messager = optra;
                                                        }
                                                        catch (error) {
                                                            console.log(String(error));
                                                        }
                                                    }
                                                });
                                                setTimeout(async () => {
                                                    if (messager) {
                                                        await rr.set(`rr_${messager.id}`, []);
                                                        (0, respond_1.editRespond)(interaction, message, {
                                                            content: "✅ Message has been added successfully ...",
                                                            components: [],
                                                        }, isSlash, br.id);
                                                    }
                                                    else {
                                                        (0, respond_1.editRespond)(interaction, message, {
                                                            content: "❌ Can not find this message, check the message id and try again ...",
                                                        }, isSlash, br.id);
                                                    }
                                                }, 7400);
                                            });
                                        });
                                    }
                                    else {
                                        (0, respond_1.editRespond)(interaction, message, {
                                            content: "✏️ Send the channel-id that the bot will send the reaction-role message in ...",
                                            components: [],
                                        }, isSlash, br.id).then((kr) => {
                                            channel
                                                .createMessageCollector({
                                                filter: (u) => u.author.id == author.id,
                                                max: 1,
                                            })
                                                .on("collect", async (msg) => {
                                                msg.delete().catch(() => { });
                                                let channel = guild.channels.cache.get(msg.content);
                                                if (channel && channel.isText()) {
                                                    let messager = await channel.send("[reaction-role] system (powerd by: optera)");
                                                    messager;
                                                    await rr.set(`rr_${messager.id}`, []);
                                                    (0, respond_1.editRespond)(interaction, message, {
                                                        content: "✅ Message has been added successfully ...",
                                                        components: [],
                                                    }, isSlash, br.id);
                                                }
                                                else {
                                                    (0, respond_1.editRespond)(interaction, message, {
                                                        content: "❌ Can not find this channel, check the channel id and try again ...",
                                                        components: [],
                                                    }, isSlash, br.id);
                                                }
                                            });
                                        });
                                    }
                                }));
                            }
                            break;
                        case "srr":
                            {
                                let emoji;
                                let role;
                                (0, respond_1.editRespond)(interaction, message, {
                                    content: "✏️ Send the emoji,",
                                    components: [],
                                }, isSlash, iii.id).then((br) => channel
                                    .createMessageCollector({
                                    filter: (u) => u.author.id == author.id,
                                    max: 1,
                                })
                                    .on("collect", (msg) => {
                                    msg.delete().catch(() => { });
                                    let emojier = discord_js_1.Util.parseEmoji(msg.content);
                                    if (!emojier || !emojier.id) {
                                        (0, respond_1.editRespond)(interaction, message, {
                                            content: "❌ Can not find this emoji, check the emoji and try again ...",
                                            components: [],
                                        }, isSlash, br.id);
                                    }
                                    else {
                                        emoji = emojier;
                                        (0, respond_1.editRespond)(interaction, message, {
                                            content: "✏️ Send the role id,",
                                            components: [],
                                        }, isSlash, br.id).then((br) => channel
                                            .createMessageCollector({
                                            filter: (u) => u.author.id == author.id,
                                            max: 1,
                                        })
                                            .on("collect", (msg) => {
                                            msg.delete().catch(() => { });
                                            let roler = guild.roles.cache.get(msg.content);
                                            if (!roler) {
                                                (0, respond_1.editRespond)(interaction, message, {
                                                    content: "❌ Can not find this role, check the role id and try again ...",
                                                    components: [],
                                                }, isSlash, br.id);
                                            }
                                            else {
                                                role = roler;
                                                (0, respond_1.editRespond)(interaction, message, {
                                                    content: "✏️ Send the reaction-role message id,",
                                                    components: [],
                                                }, isSlash, br.id).then((br) => channel
                                                    .createMessageCollector({
                                                    filter: (u) => u.author.id == author.id,
                                                    max: 1,
                                                })
                                                    .on("collect", async (msg) => {
                                                    await (0, respond_1.editRespond)(interaction, message, {
                                                        content: "🧐 Fetching the message in progress ...",
                                                        components: [],
                                                    }, isSlash, br.id);
                                                    msg.delete().catch(() => { });
                                                    let data = await rr.get(`rr_${msg.content}`);
                                                    let messager;
                                                    await guild.channels.cache.forEach(async (c) => {
                                                        if (c.isText()) {
                                                            try {
                                                                let optra = await c.messages.fetch(msg.content);
                                                                if (optra.id == msg.content)
                                                                    messager = optra;
                                                            }
                                                            catch (error) {
                                                                console.log(String(error));
                                                            }
                                                        }
                                                    });
                                                    setTimeout(async () => {
                                                        if (data == null || !messager) {
                                                            (0, respond_1.editRespond)(interaction, message, {
                                                                content: "❌ Can not find this reaction-role message, check the message id and try again ...",
                                                                components: [],
                                                            }, isSlash, br.id);
                                                        }
                                                        else {
                                                            messager.react(emoji.id || "");
                                                            await rr.push(`rr_${msg.content}`, {
                                                                role: role.id,
                                                                emoji: emoji.id,
                                                            });
                                                            (0, respond_1.editRespond)(interaction, message, {
                                                                content: "✅ Reaction has been added successfully ...",
                                                                components: [],
                                                            }, isSlash, br.id);
                                                        }
                                                    }, 7600);
                                                }));
                                            }
                                        }));
                                    }
                                }));
                            }
                            break;
                        case "err":
                            {
                                (0, respond_1.editRespond)(interaction, message, {
                                    content: "✏️ Send the emoji of the role you wont to remove...",
                                    components: [],
                                }, isSlash, iii.id).then((br) => channel
                                    .createMessageCollector({
                                    filter: (y) => y.author.id == author.id,
                                    max: 1,
                                })
                                    .on("collect", async (msg) => {
                                    msg.delete().catch(() => { });
                                    let emojier = discord_js_1.Util.parseEmoji(msg.content);
                                    if (!emojier || !emojier.id) {
                                        (0, respond_1.editRespond)(interaction, message, {
                                            content: "❌ Can not find this emoji, check the emoji and try again ...",
                                            components: [],
                                        }, isSlash, br.id);
                                    }
                                    else {
                                        (0, respond_1.editRespond)(interaction, message, {
                                            content: "✏️ Send the reaction-role message id...",
                                            components: [],
                                        }, isSlash, iii.id).then((br) => channel
                                            .createMessageCollector({
                                            filter: (y) => y.author.id == author.id,
                                            max: 1,
                                        })
                                            .on("collect", async (msg) => {
                                            let messageID = await rr.get(`rr_${msg.content}`);
                                            if (!messageID) {
                                                (0, respond_1.editRespond)(interaction, message, {
                                                    content: "❌ Can not find this message, check the message id and try again ...",
                                                    components: [],
                                                }, isSlash, br.id);
                                            }
                                            else {
                                                await (0, respond_1.editRespond)(interaction, message, {
                                                    content: "🧐 Fetching the message in progress ...",
                                                    components: [],
                                                }, isSlash, br.id);
                                                msg.delete().catch(() => { });
                                                let messager;
                                                await guild.channels.cache.forEach(async (c) => {
                                                    if (c.isText()) {
                                                        try {
                                                            let optra = await c.messages.fetch(msg.content);
                                                            if (optra.id == msg.content)
                                                                messager = optra;
                                                        }
                                                        catch (error) {
                                                            console.log(String(error));
                                                        }
                                                    }
                                                });
                                                setTimeout(async () => {
                                                    await messager.reactions.cache
                                                        .get(emojier?.id || "")
                                                        ?.remove();
                                                    let emojiInData = await messageID?.find((i) => i.emoji == emojier?.id);
                                                    guild.members.cache
                                                        .filter((m) => m.roles.cache.has(emojiInData?.role || ""))
                                                        .map(async (m) => {
                                                        await m.roles.remove(emojiInData?.role || "");
                                                    });
                                                }, 7400);
                                            }
                                        }));
                                    }
                                }));
                            }
                            break;
                        default:
                            break;
                    }
                }
            }));
        }
    },
};
