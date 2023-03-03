"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
exports.default = {
    name: "my-suggestions",
    description: "➕ view all your suggestions and edit them.",
    type: 1,
    options: [
        {
            name: "message_id",
            description: "id of the message you won't edit",
            required: false,
            type: 3,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let messageId = args[0]?.value;
        let userKey = "Suggestions_" + guild.id + "_" + author.id.toString() + ".sugs";
        let udb = await db.get(userKey);
        if (!messageId) {
            if (udb == null)
                return (0, respond_1.respond)(interaction, message, {
                    content: "you have no suggestion on **" + guild?.name + "**.",
                }, isSlash);
            else {
                let calSugs = await udb
                    .map((message, index) => `${index + 1}. [go to suggestion message](${message.url}) (${message.url
                    .split("https://discord.com/channels/" + guild.id + "/")
                    .join("")
                    .split("/")[1]})\n\`\`\`\n${message.content}\`\`\``)
                    .join("\n\n");
                (0, respond_1.respond)(interaction, message, {
                    content: calSugs,
                }, isSlash);
            }
        }
        else {
            let key = "SuggestionsChannel_" + guild?.id;
            let data = await db.get(key);
            if (data?.channel) {
                let c = guild.channels.cache.get(data?.channel);
                if (!c?.isText())
                    return;
                let m = await c.messages.fetch(messageId);
                await (0, respond_1.respond)(interaction, message, {
                    content: "How we can help u??",
                    components: [
                        new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                            .setCustomId("delete")
                            .setStyle("DANGER")
                            .setLabel("🗑️ Remove"), new discord_js_1.MessageButton()
                            .setCustomId("edit")
                            .setStyle("SECONDARY")
                            .setLabel("🖍️ Edit")),
                    ],
                }, isSlash).then((zby) => {
                    channel
                        .createMessageComponentCollector({
                        componentType: "BUTTON",
                        filter: (u) => u.user.id == author.id,
                        max: 1,
                    })
                        .on("collect", async (s) => {
                        (0, respond_1.editRespond)(interaction, message, {
                            content: "Thank u for chooseing us <3",
                            components: [],
                        }, isSlash, zby.id);
                        if (s.customId == "delete") {
                            let u = guild.members.cache.find((o) => o.user.username == m.embeds[0].author?.name);
                            let userKey = "Suggestions_" + guild?.id + "_" + u?.id + ".sugs";
                            let key2 = messageId.toString();
                            let db32 = await db.get(userKey);
                            let newD = [];
                            db32?.forEach(async (d) => {
                                if (d.content !== m.embeds[0].description) {
                                    newD.push({
                                        url: d.url,
                                        content: d.content,
                                    });
                                }
                            });
                            setTimeout(async () => {
                                await db.set(userKey, newD);
                                await db.delete(key2);
                                if (m && m.deletable)
                                    m.delete();
                            }, 6574);
                        }
                        else {
                        }
                    });
                });
            }
            else
                (0, respond_1.respond)(interaction, message, {
                    content: "error ??: suggestion channel not here?",
                }, isSlash);
        }
    },
};
