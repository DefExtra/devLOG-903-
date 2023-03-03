"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
const discord_temp_channels_1 = __importDefault(require("discord-temp-channels"));
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// did you see casperMusic? chack out: https://discord.gg/ws9jA2cR5s
/**
   ⚠️ stop right there ⚠️
   did you know you are stealing my project when you remove the copyright?
   you can just contact me http://discord.com/users/933856726770413578 for publish it
   or if you are using it for your server know the no one will see the copyrights only you in the project
   so why you are removing it?, be nice and just leave it
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
 */
exports.default = {
    name: "temp",
    description: "🔊 temp voices.",
    type: 1,
    options: [],
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
            let primeTable = await db.table("prime");
            guild.channels
                .create("Join To Create", { type: "GUILD_VOICE" })
                .then(async (c) => {
                let cate = await guild.channels.create("temp channels", {
                    type: "GUILD_CATEGORY",
                });
                c.setParent(cate);
                await primeTable.set("Temp_" + guild.id, {
                    channel: c.id,
                    cate: cate.id,
                });
                const tempChannels = new discord_temp_channels_1.default(client);
                tempChannels.registerChannel(c.id, {
                    childCategory: cate.id,
                    childAutoDeleteIfEmpty: true,
                    childAutoDeleteIfOwnerLeaves: true,
                    childFormat: (member, count) => `#${count} | ${member.user.username}`,
                });
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.doneTempChannelCreated,
                }, isSlash);
            });
        }
    },
};
