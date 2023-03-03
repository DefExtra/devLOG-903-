"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const parse_ms_1 = __importDefault(require("parse-ms"));
exports.default = {
    name: "rep",
    description: "➕ give your friend a rep.",
    type: 1,
    options: [
        {
            name: "user",
            type: 6,
            required: true,
            description: "🔧 The user you wont to rep him/her .",
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let creditsTable = await db.table("credits");
        let timeout = 7200000;
        let user = client.users.cache.get(args[0]?.value);
        if (user?.id == author.id) {
            (0, respond_1.respond)(interaction, message, {
                content: `**🚫 | ${user?.username}, you can't rep your self .**`,
            }, isSlash);
            return;
        }
        let amount = 1;
        let daily = await creditsTable.get(`Rdaily_${author.id}`);
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = (0, parse_ms_1.default)(timeout - (Date.now() - daily));
            (0, respond_1.respond)(interaction, message, {
                content: `**⏰ | ${user?.username}, your daily reps refreshes in ${time.hours}h ${time.minutes}m ${time.seconds}s .**`,
            }, isSlash);
        }
        else {
            (0, respond_1.respond)(interaction, message, {
                content: `**🤯 | you added ➕ ${amount} rep!**`,
            }, isSlash);
            await creditsTable.add(`Rep_${user?.id}`, Number(amount));
            await creditsTable.set(`Rdaily_${author?.id}`, Date.now());
        }
    },
};
