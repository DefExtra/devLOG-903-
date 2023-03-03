"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../../utils/modules/respond");
const canvas_1 = require("@napi-rs/canvas");
const node_fs_1 = require("node:fs");
exports.default = {
    name: "letters",
    description: "🎮 Try to beat the others players to type the word letters count faster.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        var x;
        var x = [
            "bullet",
            "take off",
            "supermarket",
            "actress",
            "wall",
            "luck",
            "bubble",
            "flowers",
            "doubt",
            "rotation",
            "bloat",
            "change",
            "Jarra",
            "pigtail",
            "candy",
            "spark",
            "today",
            "Fahramana",
            "button in the jacket",
            "castle",
            "harem",
            "daughter",
            "kosmk",
            "niro"
        ];
        setTimeout(async () => {
            var x3 = Math.floor(Math.random() * x.length);
            const canvas = (0, canvas_1.createCanvas)(1000, 400);
            const ctx = canvas.getContext("2d");
            var image = await (0, node_fs_1.readFileSync)(process.cwd() + "/src/data/background.png");
            const captcha = await (0, canvas_1.loadImage)(image);
            ctx.drawImage(captcha, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";
            ctx.font = "50px DejaVu Sans";
            ctx.fillText("Letters game!", canvas.width / 2 - ctx.measureText("Letters game!").width / 2, 100);
            ctx.fillText(x[x3], canvas.width / 2 - ctx.measureText(x[x3]).width / 2, 210);
            ctx.fillText("you have 15s", canvas.width / 2 -
                ctx.measureText(lang == "en" ? "You have 15s" : "لديك 15 ثاينه")
                    .width /
                    2, 325);
            const attachment = new discord_js_1.MessageAttachment(canvas.toBuffer("image/png"), "external.png");
            (0, respond_1.respond)(interaction, message, {
                content: "**🕹️ | Fast game**",
                files: [attachment],
            }, isSlash).then(async (br) => {
                let cal = channel
                    .createMessageCollector({
                    time: 1000 * 17,
                })
                    .on("collect", async (msg) => {
                    if (msg.author.bot)
                        return;
                    if (msg.content.toLowerCase() == String(x[x3].length + 1))
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
