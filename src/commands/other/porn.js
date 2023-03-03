"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "porn",
    description: "Only For Adults and niro?.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        (0, respond_1.respond)(interaction, message, {
            content: "روح يا نجس يا ابن الوسخه العب بعيد ، ايه الأشكال بنت المره دي"
        }, isSlash);
    },
};
