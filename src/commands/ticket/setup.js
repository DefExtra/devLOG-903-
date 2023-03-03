"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "setup-tickets",
    description: "🗿 setup the ticket system.",
    type: 1,
    options: [
        {
            name: "image",
            description: "⚙ if you wont to add image to ticket embed.",
            required: false,
            type: 3,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let ticketsTable = await db.table("ticket_system");
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_GUILD", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            channel
                .send({
                embeds: [
                    {
                        title: 'Press "🎫" To Open a Ticket',
                        author: {
                            icon_url: guild.iconURL({ dynamic: true }) || "",
                            name: guild.name,
                        },
                        image: {
                            url: args[0]?.value ? args[0]?.value : "",
                        },
                        color: "RANDOM",
                    },
                ],
                components: [
                    new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                        .setCustomId("OPEN-T")
                        .setEmoji("🎫")
                        .setStyle("SECONDARY")),
                ],
            })
                .then(async (tr) => {
                let adminRole = await guild.roles.create({
                    name: "Support Team",
                    mentionable: true,
                });
                let cate1 = await guild.channels.create("OPENED TICKET", {
                    type: "GUILD_CATEGORY",
                });
                let cate2 = await guild.channels.create("CLOSED TICKET", {
                    type: "GUILD_CATEGORY",
                });
                await ticketsTable.set(`TK_${guild.id}`, {
                    adminRole: adminRole.id,
                    openedCate: cate1.id,
                    closedCate: cate2.id,
                });
            });
        }
    },
};
