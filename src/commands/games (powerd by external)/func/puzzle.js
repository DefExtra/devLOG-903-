"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../../utils/modules/respond");
const canvas_1 = require("@napi-rs/canvas");
const node_fs_1 = require("node:fs");
exports.default = {
    name: "puzzle",
    description: "🎮 Try to beat the others players to solving this puzzles.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        var x;
        if (lang == "en") {
            var x = [
                "What is the longest sea bridge in the world?",
                "What is the motto of the United States?",
                "In which city is the famous Big Ben located?",
                "What does the term black gold refer to?",
                "What is the name of the spacecraft that exploded in 1986?",
                "Who is the smartest marine creature?",
                "In which city is the Olive Mosque located?",
                "The human body has sinuses, how many are there?",
                "How many teeth does a cat have?",
                "What is an animal dressed as when it is hungry and eats its children?",
                "What is the smallest Arab country?",
            ];
            var x2 = [
                "king Fahd's bridge",
                "bald eagle",
                "London",
                "petroleum",
                "Challenger",
                "dolphin",
                "Tunisia",
                "8",
                "40",
                "Tiger",
                "the two seas",
            ];
        }
        else if (lang == "ar") {
            var x = [
                "ماهو اطول جسر بحري في العالم؟",
                "ما هو شعار الولايات المتحده؟",
                "في اي مدينة تقع ساعة بيج بين الشهيرة؟",
                "الي ماذا يشير مصطلح الذهب الاسود؟",
                "ما اسم المركبه الفضاءيه التي انفجرت في 1986؟",
                "من اذكا كاءن بحري ؟",
                "في أي مدينة يقع جامع الزيتون؟",
                "يوجد بجسم الانسان الجيوب الانفية فما عددها؟",
                "كم عدد أسنان القط ؟",
                "ما هوا الحيوان الزي عندما يجوع يأكل أطفاله؟",
                "ما هي أصغر دوله عربيه؟",
            ];
            var x2 = [
                "جسر الملك فهد",
                "النسر الاصلع",
                "لندن",
                "البترول",
                "تشالنجر",
                "الدولفين",
                "تونس",
                "8",
                "40",
                "النمر",
                "البحرين",
            ];
        }
        setTimeout(async () => {
            var x3 = Math.floor(Math.random() * x.length);
            const canvas = (0, canvas_1.createCanvas)(1000, 400);
            const ctx = canvas.getContext("2d");
            var image = await (0, node_fs_1.readFileSync)(process.cwd() + "/src/data/background.png");
            const captcha = await (0, canvas_1.loadImage)(image);
            ctx.drawImage(captcha, 0, 0, canvas.width, canvas.height);
            ctx.shadowColor = "black";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 15;
            ctx.fillStyle = "#ffffff";
            ctx.font = "60px DejaVu Sans";
            ctx.fillText("Puzzles game!", canvas.width / 2 - ctx.measureText("Puzzles game!").width / 2, 100);
            ctx.fillText(x[x3], canvas.width / 2 - ctx.measureText(x[x3]).width / 2, 210);
            ctx.fillText("you have 15s", canvas.width / 2 -
                ctx.measureText(lang == "en" ? "You have 15s" : "لديك 15 ثاينه")
                    .width /
                    2, 325);
            const attachment = new discord_js_1.MessageAttachment(canvas.toBuffer("image/png"), "external.png");
            (0, respond_1.respond)(interaction, message, {
                content: "**🕹️ | Fkk game**",
                files: [attachment],
            }, isSlash).then(async (br) => {
                let cal = channel
                    .createMessageCollector({
                    time: 1000 * 17,
                })
                    .on("collect", async (msg) => {
                    if (msg.author.bot)
                        return;
                    if (!msg.content.toLowerCase().includes(x2[x3]))
                        return;
                    cal.stop("external");
                    (0, respond_1.respond)(interaction, message, {
                        content: "_ _",
                        files: [],
                        embeds: [
                            {
                                color: "GREEN",
                                description: `**${msg.author}** Has typed the correct answer ` + "🎉",
                            },
                        ],
                    }, isSlash);
                    var points = await db.get(`points_${guild.id}_${msg.author.id}`);
                    if (points == null)
                        points = await db.set(`points_${guild.id}_${msg.author.id}`, {
                            user: msg.author.id,
                            guild: msg.author.id,
                            points: 0,
                        });
                    else {
                        await db.add(`points_${guild.id}_${msg.author.id}.points`, 1);
                    }
                })
                    .on("end", (col, reason) => {
                    if (reason == "external")
                        return;
                    (0, respond_1.respond)(interaction, message, {
                        content: "_ _",
                        files: [],
                        embeds: [
                            {
                                color: "RED",
                                title: "⚠" + ` **Time Out!**`,
                                description: `**Time is end and no one type the correct answer**`,
                            },
                        ],
                    }, isSlash);
                });
            });
        });
    },
};
