"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../.."));
const discord_modals_1 = require("discord-modals");
exports.default = {
    name: "send-suggestion",
    description: "➕ send a suggestion to suggestions channel.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        const modal = new discord_modals_1.Modal()
            .setCustomId("send")
            .setTitle("type you suggestion down below:")
            .addComponents(new discord_modals_1.TextInputComponent()
            .setCustomId("input")
            .setLabel("Some text Here")
            .setStyle("LONG")
            .setMinLength(3)
            .setMaxLength(1024)
            .setPlaceholder("write the suggestion here!.")
            .setRequired(true));
        let modalData = await (0, discord_modals_1.showModal)(modal, {
            client: client,
            interaction: interaction,
        });
        modalData;
    },
};
