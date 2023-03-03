"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
exports.default = {
    name: "close",
    description: "🗿 close the ticket.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let ticketsTable = await db.table("ticket_system");
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let data = await ticketsTable.get(`TK_${interaction.guild?.id}`);
        if (!data)
            return (0, respond_1.respond)(interaction, message, {
                content: "🚫 | **Ticket system have missing items, please reSETUP the system and try againe ...**",
            }, isSlash);
        let role = interaction.guild?.roles.cache.get(data.adminRole);
        let cate2 = interaction.guild?.channels.cache.get(data.closedCate);
        if (!cate2)
            return (0, respond_1.respond)(interaction, message, {
                content: "🚫 | **Ticket system have missing items, please reSETUP the system and try againe ...**",
            }, isSlash);
        if (guild.members.cache.get(author.id)?.roles.cache.has(role?.id || "")) {
            if (!channel?.isText())
                return;
            if (!channel.name.startsWith("ticket-"))
                return (0, respond_1.respond)(interaction, message, {
                    content: "🚫 | **Only in tickets...**",
                }, isSlash);
            if (!channel?.permissionsFor(guild?.roles.everyone.id)?.has("ATTACH_FILES")) {
                channel.delete();
            }
            else {
                (0, respond_1.respond)(interaction, message, {
                    content: "🎫 | **Ticket has been disabled ...**",
                }, isSlash);
                await channel.setParent(cate2);
                await channel.permissionOverwrites.set([
                    {
                        id: guild?.roles.everyone.id,
                        deny: [
                            "VIEW_CHANNEL",
                            "SEND_MESSAGES",
                            "READ_MESSAGE_HISTORY",
                            "ADD_REACTIONS",
                            "EMBED_LINKS",
                            "ATTACH_FILES",
                        ],
                    },
                    {
                        id: role?.id || "",
                        allow: [
                            "VIEW_CHANNEL",
                            "SEND_MESSAGES",
                            "READ_MESSAGE_HISTORY",
                            "ADD_REACTIONS",
                            "EMBED_LINKS",
                            "MANAGE_CHANNELS",
                        ],
                    },
                ]);
            }
        }
        else
            return (0, respond_1.respond)(interaction, message, {
                content: "🚫 | **You are not allowed to use this type of commands ...**",
            }, isSlash);
    },
};
