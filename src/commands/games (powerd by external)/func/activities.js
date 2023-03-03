"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require("../../../../"));
const respond_1 = require("../../../utils/modules/respond");
const discord_modals_1 = require("discord-modals");
const node_fetch_1 = __importDefault(require("node-fetch"));
const defaultApplications = {
    youtube: "880218394199220334",
    youtubedev: "880218832743055411",
    poker: "755827207812677713",
    betrayal: "773336526917861400",
    fishing: "814288819477020702",
    chess: "832012774040141894",
    chessdev: "832012586023256104",
    lettertile: "879863686565621790",
    wordsnack: "879863976006127627",
    doodlecrew: "878067389634314250",
    awkword: "879863881349087252",
    spellcast: "852509694341283871",
    checkers: "832013003968348200",
    puttparty: "763133495793942528",
    sketchheads: "902271654783242291",
    ocho: "832025144389533716",
    puttpartyqa: "945748195256979606",
    sketchyartist: "879864070101172255",
    land: "903769130790969345",
    meme: "950505761862189096",
    askaway: "976052223358406656",
    bobble: "947957217959759964",
};
exports.default = {
    name: "activities",
    description: "play all the activitys in your server.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        if (!guild.members.cache.get(author.id)?.voice.channel?.id)
            return (0, respond_1.respond)(interaction, message, {
                content: REPLYS.mc1,
            }, isSlash);
        let menu = new discord_modals_1.SelectMenuComponent();
        menu
            .setCustomId("active")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Choose Your Game ..")
            .setOptions([
            {
                label: "youtube",
                value: "youtube",
            },
            {
                label: "poker",
                value: "poker",
            },
            {
                label: "chess",
                value: "chess",
            },
            {
                label: "checkers",
                value: "checkers",
            },
            {
                label: "betrayal",
                value: "betrayal",
            },
            {
                label: "fishing",
                value: "fishing",
            },
            {
                label: "lettertile",
                value: "lettertile",
            },
            {
                label: "wordsnack",
                value: "wordsnack",
            },
            {
                label: "doodlecrew",
                value: "doodlecrew",
            },
            {
                label: "spellcast",
                value: "spellcast",
            },
            {
                label: "awkword",
                value: "awkword",
            },
            {
                label: "sketchheads",
                value: "sketchheads",
            },
            {
                label: "puttparty",
                value: "puttparty",
            },
            {
                label: "ocho",
                value: "ocho",
            },
        ]);
        (0, respond_1.respond)(interaction, message, {
            content: "Choose your activitie:",
            components: [new discord_js_1.MessageActionRow().addComponents(menu)],
        }, isSlash).then(async (def) => {
            await def
                .createMessageComponentCollector({
                filter: (i) => i.user.id == author.id,
                max: 1,
            })
                .on("collect", async (i) => {
                if (i.isSelectMenu()) {
                    let applicationID = defaultApplications[i.values[0] || "youtube"];
                    await (0, node_fetch_1.default)(`https://discord.com/api/v10/channels/${guild.members.cache.get(author.id)?.voice.channel?.id}/invites`, {
                        method: "POST",
                        body: JSON.stringify({
                            max_age: 86400,
                            max_uses: 0,
                            target_application_id: applicationID,
                            target_type: 2,
                            temporary: false,
                            validate: null,
                        }),
                        headers: {
                            Authorization: `Bot ${client.token}`,
                            "Content-Type": "application/json",
                        },
                    })
                        .then((res) => res.json())
                        .then((invite) => {
                        if (invite.error || !invite.code)
                            return (0, respond_1.respond)(interaction, message, {
                                content: "An error occured while retrieving data !",
                                components: [],
                            }, isSlash);
                        if (Number(invite.code) === 50013)
                            (0, respond_1.respond)(interaction, message, {
                                content: "Your bot lacks permissions to perform that action",
                                components: [],
                            }, isSlash);
                        (0, respond_1.respond)(interaction, message, {
                            components: [],
                            content: "powerd by: external...",
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setDescription(`** [Join The Activivty](https://discord.com/invite/${invite?.code}) **`),
                            ],
                        }, isSlash);
                    });
                }
            });
        });
    },
};
