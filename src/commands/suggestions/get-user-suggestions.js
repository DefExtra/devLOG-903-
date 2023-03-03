"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
exports.default = {
    name: "get-user-suggestions",
    description: "➕ get suggestions of any user.",
    type: 1,
    options: [
        {
            name: "user",
            description: "the user you will get the suggestion from",
            required: true,
            type: 6,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let userInfos = client.users.cache.get(args[0]?.value);
        let userKey = "Suggestions_" + guild.id + "_" + userInfos?.id.toString() + ".sugs";
        let udata = await db.get(userKey);
        if (udata == null)
            return (0, respond_1.respond)(interaction, message, {
                content: "<@" +
                    userInfos?.id +
                    "> has no suggestion on **" +
                    interaction.guild?.name +
                    "**.",
            }, isSlash);
        else {
            let calSugs = await udata
                .map((message, index) => `${index + 1}. [go to suggestion message](${message.url})\n\`\`\`\n${message.content}\`\`\``)
                .join("\n\n");
            (0, respond_1.respond)(interaction, message, {
                content: calSugs,
            }, isSlash);
        }
    },
};
