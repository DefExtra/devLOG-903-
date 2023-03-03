"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_config_1 = __importDefault(require("../../dashboard.config"));
const sugs_1 = __importDefault(require("../functions/sugs"));
const ticketSystem_1 = __importDefault(require("../functions/ticketSystem"));
exports.default = async (interaction, db, commands) => {
    const client = interaction.client;
    if (interaction.isButton()) {
        sugs_1.default.buttons(interaction, db);
        (0, ticketSystem_1.default)(interaction, db);
    }
    else if (interaction.isCommand()) {
        if (interaction.commandName !== "send-suggestion")
            await interaction.deferReply().catch(() => { });
        let check = await db.get(`Blacklist`);
        if (!check)
            check = [];
        if (check?.includes(interaction.user.id)) {
            interaction.followUp(">>> **You are on the blacklist.**").catch(() => { });
            return;
        }
        let shut = await db.get(`Project`);
        if (shut == true) {
            interaction
                .followUp(">>> bot is underdevelopment: " + dashboard_config_1.default.domain)
                .catch(() => { });
            return;
        }
        if (interaction.user.bot)
            return;
        if (interaction.guildId == null)
            return;
        let command = commands.get(interaction.commandName);
        if (command)
            command.run(client, interaction, null, interaction.options.data, true, interaction.user, interaction.guild, interaction.channel, db);
    }
};
