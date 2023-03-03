"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "title",
    description: "💸 you profile title.",
    type: 1,
    options: [
        {
            name: "title",
            description: "🔧 منتا عارف تكتب ايه لازم تبص هنا يعني؟",
            required: true,
            type: 3,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let creditsTable = await db.table("credits");
        await creditsTable.set(`ProfileT_${author.id}`, args[0]?.value);
        (0, respond_1.respond)(interaction, message, {
            content: `**🔧 | your profile title has been added.**`,
        }, isSlash);
    },
};
