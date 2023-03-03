"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../../../"));
const messageCreate_1 = __importDefault(require("../../events/messageCreate"));
const guildMemberAdd_1 = __importDefault(require("../../events/guildMemberAdd"));
const interactionCreate_1 = __importDefault(require("../../events/interactionCreate"));
const ready_1 = __importDefault(require("../../events/ready"));
const submitModalEvent_1 = __importDefault(require("../../events/submitModalEvent"));
exports.default = (client, manager, thiser, config, db) => {
    client
        ?.on("raw", (d) => manager?.updateVoiceState(d))
        .on("ready", async () => {
        console.log(thiser.commands.size);
        let rr = await db.table("rr_system");
        (await rr.all()).forEach((d) => {
            let id = d.id.split("rr_").join("");
            client.channels.cache
                .filter((c) => c.isText())
                .forEach((c) => {
                if (c.isText())
                    c.messages
                        .fetch(id)
                        .then((m) => { })
                        .catch((c) => { });
            });
        });
        manager?.init(client?.user?.id || "");
        (0, ready_1.default)(client, config, db, thiser.commands, thiser);
    })
        .on("messageReactionAdd", async (r, u) => {
        let rr = await db.table("rr_system");
        let data = await rr.get(`rr_${r.message.id}`);
        if (data) {
            let role = r.message.guild?.roles.cache.get(data.find((d) => d.emoji == r.emoji.id)?.role || "");
            if (!role)
                return;
            let member = r.message.guild?.members.cache.get(u.id);
            if (member)
                member?.roles.add(role);
        }
    })
        .on("messageReactionRemove", async (r, u) => {
        let rr = await db.table("rr_system");
        let data = await rr.get(`rr_${r.message.id}`);
        if (data) {
            let role = r.message.guild?.roles.cache.get(data.find((d) => d.emoji == r.emoji.id)?.role || "");
            if (!role)
                return;
            let member = r.message.guild?.members.cache.get(u.id);
            if (member)
                member?.roles.remove(role);
        }
    })
        .on("interactionCreate", async (interaction) => (0, interactionCreate_1.default)(interaction, db, thiser.commands))
        .on("messageCreate", async (message) => (0, messageCreate_1.default)(message, db, config, thiser.commands, __1.default))
        .on("guildMemberAdd", async (member) => (0, guildMemberAdd_1.default)(member, db, __1.default))
        .on("modalSubmit", async (modal) => {
        if (!client)
            return;
        (0, submitModalEvent_1.default)(client, modal, db);
    });
};
