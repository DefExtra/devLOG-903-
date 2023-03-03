"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "test",
    description: "Mde in heaven",
    type: 1,
    options: [
        {
            name: "only_admins",
            description: "🌟 Premuim Option: wont the channel controle for admins only?.",
            type: 3,
            required: true,
            choices: [
                { name: "yes", value: "yes" },
                { name: "no", value: "no" },
            ],
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        (0, respond_1.respond)(interaction, message, {
            content: "Choose a category: ...",
        }, isSlash);
    },
};
