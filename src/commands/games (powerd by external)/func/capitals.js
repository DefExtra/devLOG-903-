"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../../utils/modules/respond");
exports.default = {
    name: "capitals",
    description: "🎮 Try Gussing The Capitals.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        if (lang == "en") {
            var x = [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/125px-Flag_of_Egypt.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/130px-Flag_of_Brazil.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/125px-Flag_of_Canada_%28Pantone%29.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/160px-Flag_of_Saudi_Arabia.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Syria.svg/1024px-Flag_of_Syria.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/125px-Flag_of_Palestine.svg.png",
            ];
            var x2 = ["cairo", "brasil", "ottawa", "Riyadh", "Damascus", "Jerusalem"];
        }
        else {
            var x = [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/125px-Flag_of_Egypt.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/130px-Flag_of_Brazil.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/125px-Flag_of_Canada_%28Pantone%29.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/160px-Flag_of_Saudi_Arabia.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Syria.svg/1024px-Flag_of_Syria.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/125px-Flag_of_Palestine.svg.png",
            ];
            var x2 = ["القاهره", "برازيليا", "اوتاوا", "الرياض", "دمشق", "القدس"];
        }
        var x3 = Math.floor(Math.random() * x.length);
        var capitals = new discord_js_1.MessageEmbed()
            .setColor("YELLOW")
            .setImage(`${x[x3]}`)
            .setDescription("⚠" +
            `** You Have ` +
            "17" +
            `s To Type The Correct Answer!\nWhat is this Capital**`);
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
