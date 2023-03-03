"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const index_1 = __importDefault(require("../../../index"));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "nadeko-welcome",
    description: "🙋‍♂️ welcome a user when join the server with mention him/her.",
    type: 1,
    options: [
        {
            name: "channel",
            type: 7,
            required: true,
            description: "🔧 The channel that the bor will mention in",
        }
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = index_1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let channel = await guild.channels.cache.get(args[0]?.value);
            await db.set(`nadeko_${guild.id}`, channel?.id);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.marwaaaaaaaaaaaaanPabloooooooooooo
            }, isSlash);
        }
    },
};
