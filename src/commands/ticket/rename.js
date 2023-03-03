"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
exports.default = {
    name: "rename",
    description: "🗿 rename the ticket.",
    type: 1,
    options: [
        { type: 3, name: "name", description: "🔧 the new name", required: true },
    ],
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
        if (!role)
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
            await channel.setName("ticket-" + args[0]?.value);
            (0, respond_1.respond)(interaction, message, {
                content: "🎫 | **Ticket name has changed ...**",
            }, isSlash);
        }
        else
            return (0, respond_1.respond)(interaction, message, {
                content: "🚫 | **You are not allowed to use this type of commands ...**",
            }, isSlash);
    },
};
