"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../../utils/modules/respond");
exports.default = {
    name: "flags",
    description: "🎮 Try Gussing The Flag.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        if (lang == "en") {
            var x = [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/256px-Flag_of_Brazil.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/256px-Flag_of_Jordan.svg.png",
                "https://cdn.discordapp.com/attachments/756329106953601225/776908227476062258/images_4.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/1200px-Flag_of_Senegal.svg.png",
            ];
            var x2 = ["brazil", "jordan", "egypt", "senegal"];
        }
        else {
            var x = [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/256px-Flag_of_Brazil.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/256px-Flag_of_Jordan.svg.png",
                "https://cdn.discordapp.com/attachments/756329106953601225/776908227476062258/images_4.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/1200px-Flag_of_Senegal.svg.png",
            ];
            var x2 = ["البرازيل", "الاردن", "مصر", "السنغال"];
        }
        var x3 = Math.floor(Math.random() * x.length);
        var capitals = new discord_js_1.MessageEmbed()
            .setColor("YELLOW")
            .setImage(`${x[x3]}`)
            .setDescription("⚠" +
            `** You Have ` +
            "17" +
            `s To Type The Correct Answer!\nWhat is this Flag**`);
        (0, respond_1.respond)(interaction, message, {
            embeds: [capitals],
        }, isSlash).then((br) => {
            let cal = channel
                .createMessageCollector({
                time: 1000 * 17,
            })
                .on("collect", async (msg) => {
                if (msg.author.bot)
                    return;
                if (msg.content.toLowerCase() !== x2[x3])
                    return;
                cal.stop("external");
                (0, respond_1.respond)(interaction, message, {
                    embeds: [
                        {
                            description: `**${msg.author}** Has typed the correct answer 🎉`,
                            color: "GREEN",
                        },
                    ],
                }, isSlash);
                var points = await db.get(`points_${guild?.id}_${msg.author.id}`);
                if (points == null)
                    points = await db.set(`points_${guild?.id}_${msg.author.id}`, {
                        user: msg.author.id,
                        guild: msg.author.id,
                        points: 0,
                    });
                else {
                    await db.add(`points_${guild?.id}_${msg.author.id}.points`, 1);
                }
            })
                .on("end", (collected, reason) => {
                if (reason == "external")
                    return;
                else
                    (0, respond_1.respond)(interaction, message, {
                        embeds: [
                            {
                                color: "RED",
                                title: "❌" + " **Time Out!**",
                                description: `**Time is end and no one type the correct answer**`,
                            },
                        ],
                    }, isSlash);
            });
        });
    },
};
