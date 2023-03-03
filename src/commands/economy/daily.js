"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const parse_ms_1 = __importDefault(require("parse-ms"));
exports.default = {
    name: "daily",
    description: "💸 get your daily reward.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let creditsTable = await db.table("credits");
        let timeout = 86400000;
        let amount = Math.floor(Math.random() * 1000) + 1;
        let daily = await creditsTable.get(`daily_${author.id}`);
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = (0, parse_ms_1.default)(timeout - (Date.now() - daily));
            (0, respond_1.respond)(interaction, message, {
                content: `**⏰ | ${author.username}, your daily credits refreshes in ${time.hours}h ${time.minutes}m ${time.seconds}s .**`,
            }, isSlash);
        }
        else {
            (0, respond_1.respond)(interaction, message, {
                content: `**💸 |  ${author.username}, you got :dollar: ${amount} daily credits!**`,
            }, isSlash);
            await creditsTable.add(`Credits_${author.id}`, amount);
            await creditsTable.set(`daily_${author.id}`, Date.now());
        }
    },
};
