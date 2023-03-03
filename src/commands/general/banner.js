"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.default = {
    name: "banner",
    description: "provide user banner .",
    type: 1,
    options: [
        {
            name: "user",
            description: "the user.",
            type: 6,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        const member = guild.members.cache.get(args[0]?.value) ||
            guild.members.cache.get(author.id);
        let response = (0, node_fetch_1.default)(`https://discord.com/api/v8/users/${member?.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${client.token}`
            }
        });
        let receive = '';
        let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif';
        response.then(a => {
            if (a.status !== 404) {
                a.json().then(data => {
                    receive = data['banner'];
                    if (receive !== null) {
                        let format = 'png';
                        if (receive.substring(0, 2) === 'a_') {
                            format = 'gif';
                        }
                        banner = `https://cdn.discordapp.com/banners/${member?.id}/${receive}.${format}`;
                    }
                });
            }
        });
        setTimeout(async () => {
            let embed = new discord_js_1.MessageEmbed()
                .setTitle(`${member?.user.username} banner`)
                .setImage(`${banner}`)
                .setColor(guild.me?.displayColor || "AQUA")
                .setFooter({
                text: `Requested By ${author.username}`,
                iconURL: author.avatarURL({ dynamic: true }) || "",
            })
                .setTimestamp();
            await (0, respond_1.respond)(interaction, message, { embeds: [embed] }, isSlash);
        }, 1000);
    },
};
