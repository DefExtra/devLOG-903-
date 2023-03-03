"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "unmute",
    description: "unmute members.",
    type: 1,
    options: [
        {
            name: "member",
            description: "the member you won't to change mute him.",
            type: 6,
            required: true,
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
            let member = guild.members.cache.get(args[0]?.value);
            let muteRole = await guild.roles.cache.find((e) => e.name == "🔇 - Muted");
            if (!muteRole) {
                await guild.roles
                    .create({
                    name: "🔇 - Muted",
                    color: "GREY",
                    hoist: true,
                    mentionable: false,
                    reason: "N-System v4",
                })
                    .then(async (r) => {
                    await r.setPermissions(0n);
                    guild.channels.cache.filter((r) => r.type == "GUILD_TEXT").forEach(c => {
                        if (c.type == "GUILD_TEXT") {
                            c.permissionOverwrites.edit(r, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            });
                        }
                    });
                    muteRole = r;
                });
            }
            await member?.roles.remove(muteRole || "")
                .then(() => {
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.doneUNMUTE.replace("{userTAG}", member?.user.tag),
                }, isSlash);
            })
                .catch((err) => {
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.errUNMUTE,
                }, isSlash);
            });
        }
    },
};
