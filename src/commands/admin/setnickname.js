"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "nickname",
    description: "change nickname for any member.",
    type: 1,
    options: [
        {
            name: "member",
            description: "the member you won't to change his nickname.",
            type: 6,
            required: true,
        },
        {
            name: "name",
            description: "the nickname.",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_NICKNAMES", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let name = args[1]?.value;
            let user = guild.members.cache.get(args[0]?.value);
            user?.setNickname(name, "Nsysten-v4")
                .then(() => {
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.doneNICK
                        .replace("{userUsername}", user?.user.username)
                        .replace("{nickname}", name),
                }, isSlash);
            })
                .catch((err) => {
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.errNICK,
                }, isSlash);
            });
        }
    },
};
