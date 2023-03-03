"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "unban",
    description: "unban members.",
    type: 1,
    options: [
        {
            name: "user_id",
            description: "the user you will unban.",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MODERATE_MEMBERS", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        let perms2 = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "BAN_MEMBERS", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true || perms2 == true) {
            let userID = args[0]?.value;
            await guild.bans
                .fetch(userID)
                .then((t) => {
                guild.bans
                    .remove(guild.bans.cache.get(userID)?.user || "")
                    .then(async () => {
                    (0, respond_1.respond)(interaction, message, {
                        content: REPLYS.unbanDONE.replace("{userTAG}", t.user.tag),
                    }, isSlash);
                })
                    .catch((err) => {
                    (0, respond_1.respond)(interaction, message, {
                        content: REPLYS.unbanERR,
                    }, isSlash);
                });
            })
                .catch((err) => {
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.unbanNOTfind,
                }, isSlash);
                return;
            });
        }
    },
};
