"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
const dashboard_config_1 = __importDefault(require("../../../dashboard.config"));
exports.default = {
    name: "set-welcome",
    description: "👋 set welcome channel .",
    type: 1,
    options: [
        {
            name: "channel",
            type: 7,
            required: true,
            description: "🔧 The channel you will make it as welcome",
        },
    ],
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
            let ch = guild.channels.cache.get(args[0]?.value);
            if (!ch?.isText())
                return (0, respond_1.respond)(interaction, message, {
                    content: "🚫 | **Only text channel.**",
                }, isSlash);
            (0, respond_1.respond)(interaction, message, {
                content: "🔧 | **please type your welcome message.**\n\nKey words: {userId}, {userName}, {userTag}, {serverName}, {memberCount}",
            }, isSlash).then(async (der) => {
                channel
                    .createMessageCollector({
                    max: 1,
                    filter: (a) => a.author.id == author.id,
                })
                    .on("collect", async (d) => {
                    d.delete();
                    await db.set(`WelcomeConfig_${guild.id}`, {
                        ch: ch?.id,
                        msg: d.content,
                    });
                    (0, respond_1.editRespond)(interaction, message, {
                        content: "👋 | **Welcome config updated!!. \nyou can edit the welcome banner from the website: **" + dashboard_config_1.default.domain + "/welcomer/" + guild.id,
                    }, isSlash, der.id);
                });
            });
        }
    },
};
