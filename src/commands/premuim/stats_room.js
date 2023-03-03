"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const respond_1 = require("../../utils/modules/respond");
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "stats_room",
    description: "🌟 Premuim: make a room for the voice online / members count / etc...",
    type: 1,
    options: [
        {
            name: "channel",
            description: "🌟 Premuim Option: the channel.",
            type: 7,
            required: true,
        },
        {
            name: "feature",
            description: "🌟 Premuim Option: What do you want the channel to display?.",
            type: 3,
            required: true,
            choices: [
                { name: "voice_online", value: "voice_online" },
                { name: "guild_member_count", value: "guild_member_count" },
                { name: "server_channels", value: "server_channels" },
                { name: "boosters", value: "boosters" },
                { name: "online_members", value: "online_members" },
            ],
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let primeTable = await db.table("prime");
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_CHANNELS", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let channelID = args[0]?.value;
            if (!guild.channels.cache.get(channelID)?.isVoice())
                return (0, respond_1.respond)(interaction, message, {
                    content: "🌟 (🚫) **| Only voice channels...**",
                }, isSlash);
            await primeTable.set(`InfoRoom_${guild.channels.cache.get(channelID)?.id}`, args[1]?.value);
            (0, respond_1.respond)(interaction, message, {
                content: "🌟 (✅) **| Status Room has been Added...**",
            }, isSlash);
        }
    },
};
