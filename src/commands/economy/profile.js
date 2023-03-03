"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const respond_1 = require("../../utils/modules/respond");
exports.default = {
    name: "profile",
    description: "🧐 Your profile/ your stats",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let creditsTable = await db.table("credits");
        var user = author;
        var reps = (await creditsTable.get(`Rep_${user.id}`)) || 1;
        var credits = (await creditsTable.get(`Credits_${user.id}`)) || 0;
        var title = (await creditsTable.get(`ProfileT_${user.id}`)) || "";
        var user_xp = (await db.get(`LSUP_${guild?.id}_${user.id}`)) || 0;
        var user_level = (await db.get(`LSUL_${guild?.id}_${user.id}`)) || 1;
        var pbg = await (0, fs_1.readFileSync)(process.cwd() + "/src/data/profile.png");
        var image1 = await (0, fs_1.readFileSync)(process.cwd() + "/src/data/xp.png");
        let i = (await db.all())
            .filter((data) => data.id.startsWith(`LSUL_`))
            .sort((a, b) => b.value - a.value)
            .find((e) => e.id.split("_")[2] === user.id);
        const canvas = (0, canvas_1.createCanvas)(1048, 1048);
        const ctx = canvas.getContext("2d");
        const ctx1 = canvas.getContext("2d");
        (0, canvas_1.loadImage)(pbg).then((image) => {
            ctx.drawImage(image, 0, 0, 1048, 1048);
            ctx.fillStyle = "#373737";
            ctx.rotate(0);
            ctx.font = "600 40px Impact";
            var title1 = "";
            ctx.fillText(`${title || ""}`, 440, 490);
            ctx.fillText(`${title1 || ""}`, 435, 540);
            ctx.font = "blod 60px Impact";
            ctx.fillText(`${i?.value}`, 65, 975);
            ctx.font = "blod 70px Impact";
            ctx.fillText(user.username, 400, 250);
            ctx.fillText(`$${convert(credits)}`, 50, 815);
            ctx.fillText(`${reps || 0}`, 65, 665);
            ctx.fillText(`${user_level || 0}`, 65, 510);
            ctx.font = "100 32px Impact";
            ctx.fillText(` ${user_xp || 0}`, 730, 925);
            ctx.font = "30px Impact";
            ctx.fillStyle = "#333333";
            ctx.fillRect(435, 837.5, Math.round((user_xp * 389) / 1000), 39);
            ctx.font = "40px Impact";
            (0, canvas_1.loadImage)(image1).then((image11) => {
                ctx.drawImage(image11, 420, 813.5, 535, 92);
                ctx.beginPath();
                ctx.arc(209, 170, 157, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.clip();
                (0, canvas_1.loadImage)(user.avatarURL({ format: "png" }) || "").then((avatar) => {
                    ctx.drawImage(avatar, 45, 0, 350, 350);
                    ctx1.beginPath();
                    ctx1.arc(400, 400, 20, 0, Math.PI * 2, false);
                    ctx1.closePath();
                    ctx1.clip();
                    const attachment = new discord_js_1.MessageAttachment(canvas.toBuffer("image/png"), "profile.png");
                    (0, respond_1.respond)(interaction, message, {
                        files: [attachment],
                    }, isSlash);
                });
            });
        });
    },
};
function convert(number) {
    let lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup
        .slice()
        .reverse()
        .find((item) => {
        return number >= item.value;
    });
    return item
        ? (number / item.value).toFixed(1).replace(rx, "$1") + item.symbol
        : "0";
}
