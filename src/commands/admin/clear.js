"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "clear",
    description: "clear messages.",
    type: 1,
    options: [
        {
            name: "number_of_messages",
            type: 3,
            description: "the number of messages you won't to delete.",
            required: false,
        },
        {
            name: "stack",
            type: 3,
            description: "how many stacks of messages you wan't to delete (stack = 100).",
            required: false,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_MESSAGES", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            try {
                let count = 100;
                if (args[0]?.value)
                    count = args[0].value;
                if (count && !args[1]?.value) {
                    if (isNaN(count))
                        return (0, respond_1.respond)(interaction, message, {
                            content: REPLYS.cmdOptionsNana,
                        }, isSlash);
                    channel
                        .bulkDelete(Number(count));
                }
                else {
                    if (isNaN(args[1]?.value))
                        return (0, respond_1.respond)(interaction, message, { content: REPLYS.cmdOptionsNana }, isSlash);
                    for (let index = 0; index < Number(args[1]?.value); index++) {
                        channel
                            .bulkDelete(100);
                    }
                }
                (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.clearDone
                }, isSlash);
            }
            catch (err) {
                console.log(err);
                (0, respond_1.respond)(interaction, message, {
                    content: `Error: ${err}`
                }, isSlash);
            }
        }
    },
};
