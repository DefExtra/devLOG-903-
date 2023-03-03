"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "games",
    description: "🎮 Games.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        var x;
        (0, respond_1.respond)(interaction, message, {
            ephemeral: false,
            content: "Choose a game: ...",
            components: [
                new discord_js_1.MessageActionRow().setComponents(new discord_js_1.MessageSelectMenu()
                    .setCustomId("meun")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions([
                    { label: "Activities", value: "activities", emoji: "🎮" },
                    { label: "Brand", value: "brand", emoji: "🎮" },
                    { label: "Capitals", value: "capitals", emoji: "🎮" },
                    { label: "Fast", value: "fast", emoji: "🎮" },
                    { label: "Fkk", value: "fkk", emoji: "🎮" },
                    { label: "Flags", value: "flags", emoji: "🎮" },
                    { label: "Fruits", value: "fruits", emoji: "🎮" },
                    { label: "Letters", value: "letters", emoji: "🎮" },
                    { label: "Music", value: "music", emoji: "🎮" },
                    { label: "Math", value: "math", emoji: "🎮" },
                    { label: "Puzzles", value: "puzzle", emoji: "🎮" },
                    { label: "Translate", value: "translate", emoji: "🎮" },
                ])),
            ],
        }, isSlash).then((ider) => {
            ider
                .createMessageComponentCollector({
                componentType: "SELECT_MENU",
                filter: (III) => III.user.id == author.id,
                max: 1,
            })
                .on("collect", async (poi) => {
                var _a;
                isSlash == true
                    ? interaction.editReply({
                        content: "Game has been created ..",
                        components: [],
                        embeds: [],
                        files: [],
                    })
                    : ider.delete();
                (await (_a = "./func/" + poi.values[0], Promise.resolve().then(() => __importStar(require(_a))))).default.run(client, interaction, message, args, isSlash, author, guild, channel, db);
            });
        });
    },
};
