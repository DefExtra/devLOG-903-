"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = __importDefault(require("@napi-rs/canvas"));
const discord_js_1 = require("discord.js");
const undici_1 = require("undici");
exports.default = async (member, db, index) => {
    let autoTable = await db.table("auto");
    let autoRole = await autoTable.get(`AutoRole_${member.guild.id}`);
    if (autoRole)
        member.roles.add(autoRole);
    let data = await db.get(`WelcomeConfig_${member.guild.id}`);
    let nedko = await db.get(`nadeko_${member.guild.id}`);
    if (nedko) {
        let channel = member.guild.channels.cache.get(nedko);
        if (channel && channel.isText())
            channel
                .send({ content: `${member.user}, check this`, allowedMentions: { repliedUser: true } })
                .then((drdr) => setTimeout(() => drdr.delete(), 5365));
    }
    if (data?.ch && data?.msg) {
        let channel = member.guild.channels.cache.get(data?.ch);
        if (!channel || !channel.isText())
            return;
        async function makeIT() {
            const canvas = canvas_1.default.createCanvas(Number(await db.get(`dimensionX_${member.guild?.id}`)) || 640, Number(await db.get(`dimensionY_${member.guild?.id}`)) || 240);
            const ctx = canvas.getContext("2d");
            const img = await canvas_1.default.loadImage((await db.get(`backgroundURL_${member.guild?.id}`)) ||
                "https://v13.discordjs.guide/assets/canvas-preview.30c4fe9e.png");
            let x = 0;
            let y = 0;
            ctx.drawImage(img, x, y);
            let trab = member.user;
            var name = index.bot.client.users.cache.get(trab.id)?.username;
            ctx.strokeStyle =
                (await db.get(`usernameColor_${member.guild?.id}`)) || "#ed9209";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${(await db.get(`usernameFSize_${member.guild?.id}`)) || "20"}px DejaVu Sans`;
            ctx.fillStyle =
                (await db.get(`usernameColor_${member.guild?.id}`)) || "#ed9209";
            ctx.fillText(name || "", Number(await db.get(`usernamePosX_${member.guild?.id}`)) || 70, Number(await db.get(`usernamePosY_${member.guild?.id}`)) || 50);
            var join = (await db.get(`textContent_${member.guild?.id}`)) ||
                "Welcome to {guildName} !";
            join = join
                .replace("{guildName}", member.guild?.name || "")
                .replace("{userName}", index.bot.client.users.cache.get(trab.id)?.username || "");
            ctx.strokeStyle =
                (await db.get(`textColor_${member.guild?.id}`)) || "#ffffff";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${(await db.get(`textFSize_${member.guild?.id}`)) || "20"}px DejaVu Sans`;
            ctx.fillStyle =
                (await db.get(`textColor_${member.guild?.id}`)) || "#ffffff";
            ctx.fillText(join, Number(await db.get(`textPosX_${member.guild?.id}`)) || 70, Number(await db.get(`textPosY_${member.guild?.id}`)) || 50);
            x = Number(await db.get(`avatarXpostion_${member.guild?.id}`)) || 40;
            y = Number(await db.get(`avatarYpostion_${member.guild?.id}`)) || 80;
            let xC = Number(await db.get(`avatarXCpostion_${member.guild?.id}`)) || 105;
            let yC = Number(await db.get(`avatarYCpostion_${member.guild?.id}`)) || 144;
            let deg = Number(await db.get(`Deg_${member.guild?.id}`)) || 65;
            ctx.beginPath();
            ctx.arc(xC, yC, deg, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            const { body } = await (0, undici_1.request)(member.user?.displayAvatarURL({ format: "jpg" }) || "");
            const avatar = new canvas_1.default.Image();
            avatar.src = Buffer.from(await body.arrayBuffer());
            ctx.lineTo(250, 150);
            ctx.drawImage(avatar, x, y);
            let imgEr = new discord_js_1.MessageAttachment(canvas.toBuffer("image/png"));
            return imgEr;
        }
        channel.send({
            content: data?.msg
                .replace("{userId}", member.id)
                .replace("{userName}", member.user.username)
                .replace("{userTag}", member.user.tag)
                .replace("{serverName}", member.guild.name)
                .replace("{memberCount}", String(member.guild.memberCount)),
            files: [await makeIT()],
        });
    }
};
