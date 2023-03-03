"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require("../../../../"));
const dashboard_config_1 = __importDefault(
  require("../../../../dashboard.config")
);
const canvas_1 = __importDefault(require("@napi-rs/canvas"));
const promises_1 = require("fs/promises");
const undici_1 = require("undici");
exports.default = (app, db) => {
  app
    .get("/", async (req, res) => {
      let shut = await db.get(`Project`);
      if (shut == true) return res.render("underDev");
      res.render("index", {
        title: "Home",
        client: __1.default.bot.client,
        req,
        user: req.isAuthenticated() ? req.user : null,
        domain: dashboard_config_1.default.domain,
      });
    })
    .get("/dashboard", async (req, res) => {
      let check = await db.get(`Blacklist`);
      if (!check) check = [];
      if (check?.includes(req.isAuthenticated() ? req.user?.id : "")) {
        return res.send("You are on the blacklist");
      }
      let shut = await db.get(`Project`);
      if (shut == true) return res.render("underDev");
      res.render("servers", {
        title: "Servers",
        client: __1.default.bot.client,
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        permissions: discord_js_1.Permissions,
        domain: dashboard_config_1.default.domain,
      });
    })
    .get("/welcomerReset", async (req, res) => {
      res.render("moved", {});
    })
    .get("/owners", async (req, res) => {
      let userGG = req.user;
      if (!userGG) return res.redirect("/login");
      if (!dashboard_config_1.default.owners.includes(userGG.id))
        return res.redirect("/");
      res.render("owners", {});
    })
    .post("/owners", async (req, res) => {
      let userGG = req.user;
      if (!userGG) return res.redirect("/login");
      if (!dashboard_config_1.default.owners.includes(userGG.id))
        return res.redirect("/");
      let id = req.body?.blacklist_user_id;
      let check = await db.get(`Blacklist`);
      if (!check) db.set(`Blacklist`, [`${id}`]);
      if (check?.includes(id)) db.pull(`Blacklist`, id);
      else db.push(`Blacklist`, id);
      res.render("owners", {});
    })
    .get("/brgrzrfr3rmrsrnrwrfrfrfrfrfrfrfr309", async (req, res) => {
      let userGG = req.user;
      if (!userGG) return res.send("عارف يا كسمك لو جيت هنا تاني؟ هنيكك");
      if (!dashboard_config_1.default.owners.includes(userGG.id))
        return res.send("عارف يا كسمك لو جيت هنا تاني؟ هنيكك");
      let shut = await db.get(`Project`);
      if (shut == true) await db.set(`Project`, false);
      else await db.set(`Project`, true);
      res.redirect("/");
    })
    .get("/dashboard/:guildId", async (req, res) => {
      let shut = await db.get(`Project`);
      if (shut == true) return res.render("underDev");
      let guildId = req.params.guildId;
      if (!guildId) return res.redirect("/");
      let guild = __1.default.bot.client.guilds.cache.find(
        (g) => g.id == guildId
      );
      if (!guild) return res.redirect("/");
      let userGG = req.user;
      if (!userGG) return res.redirect("/");
      let user = guild.members.cache.find((u) => u.id == req.user.id);
      if (!user) {
        user = await guild.members
          .fetch(req.isAuthenticated() ? req.user.id : null)
          .then((u) => {
            if (!u) return res.redirect("/");
          });
      }
      let check = await db.get(`Blacklist`);
      if (!check) check = [];
      if (check?.includes(req.user?.id)) {
        return res.send("You are on the blacklist");
      }
      if (!user?.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))
        return res.redirect("/");
      res.render("server", {
        title: guild.name,
        client: __1.default.bot.client,
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        guild: guild,
        domain: dashboard_config_1.default.domain,
      });
    })
    .post("/dashboard/:guildId", async (req, res) => {
      let guildId = req.params.guildId;
      if (!guildId) return res.redirect("/");
      let guild = __1.default.bot.client.guilds.cache.find(
        (g) => g.id == guildId
      );
      if (!guild) return res.redirect("/");
      let userGG = req.user;
      if (!userGG) return res.redirect("/");
      let user = guild.members.cache.find((u) => u.id == userGG?.id);
      if (!user) {
        await guild.members.fetch(userGG.id).then((u) => {
          if (!u) return res.redirect("/");
          user = u;
        });
      }
      if (!user?.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))
        return res.redirect("/");
      let body = req.body;
      let settingsTable = await db.table("settings");
      if (body?.prefix)
        await settingsTable.set(`Prefix_${guild.id}`, body?.prefix);
      if (body?.language)
        await settingsTable.set(`Lang_${guild.id}`, body?.language);
      if (body?.disableLevelSystem)
        await db.set(
          `LS_${guild.id}`,
          body?.disableLevelSystem == "on" ? true : false
        );
      if (body?.channelId) {
        let ch = guild.channels.cache.get(body?.channelId);
        if (ch) await db.set(`LSC_${guild.id}`, ch?.id);
      }
      if (body?.msgId) await db.set(`LSM_${guild.id}`, body?.msgId);
      if (body?.roleId && body?.levelId) {
        if (!isNaN(body?.levelId)) {
          let role = guild.roles.cache.get(body?.roleId);
          if (role) {
            let rewards = await db.get(`LSA_${guild?.id}`);
            if (!rewards) rewards = [];
            await rewards.forEach((V) => {
              if (V.roleId == role?.id || V.level == body?.levelId) return;
            });
            if (!rewards)
              db.set(`LSA_${guild.id}`, [
                {
                  roleId: role?.id,
                  level: body?.levelId,
                },
              ]);
            else
              db.push(`LSA_${guild.id}`, {
                roleId: role?.id,
                level: body?.levelId,
              });
          }
        }
      }
      res.render("server", {
        title: guild.name,
        client: __1.default.bot.client,
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        guild: guild,
        domain: dashboard_config_1.default.domain,
      });
    })
    .get("/welcomer/:guildId", async (req, res) => {
      let shut = await db.get(`Project`);
      if (shut == true) return res.render("underDev");
      let guildId = req.params.guildId;
      if (!guildId) return res.redirect("/");
      let guild = __1.default.bot.client.guilds.cache.find(
        (g) => g.id == guildId
      );
      if (!guild) return res.redirect("/");
      let userGG = req.user;
      if (!userGG) return res.redirect("/");
      let user = guild.members.cache.find((u) => u.id == userGG.id);
      if (!user) return res.redirect("/");
      let check = await db.get(`Blacklist`);
      if (!check) check = [];
      if (check?.includes(user?.id || "")) {
        return res.send("You are on the blacklist");
      }
      if (!user?.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))
        return res.redirect("/");
      async function makeIT() {
        const canvas = canvas_1.default.createCanvas(
          Number(await db.get(`dimensionX_${guild?.id}`)) || 600,
          Number(await db.get(`dimensionY_${guild?.id}`)) || 280
        );
        const ctx = canvas.getContext("2d");
        const img = await canvas_1.default.loadImage(
          (await db.get(`backgroundURL_${guild?.id}`)) ||
            "https://v13.discordjs.guide/assets/canvas-preview.30c4fe9e.png"
        );
        let x = 0;
        let y = 0;
        ctx.drawImage(img, x, y);
        let trab = req.user;
        var name = __1.default.bot.client.users.cache.get(trab.id)?.username;
        ctx.strokeStyle =
          (await db.get(`usernameColor_${guild?.id}`)) || "#ed9209";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${
          (await db.get(`usernameFSize_${guild?.id}`)) || "20"
        }px DejaVu Sans`;
        ctx.fillStyle =
          (await db.get(`usernameColor_${guild?.id}`)) || "#ed9209";
        ctx.fillText(
          name || "",
          Number(await db.get(`usernamePosX_${guild?.id}`)) || 200,
          Number(await db.get(`usernamePosY_${guild?.id}`)) || 150
        );
        var join =
          (await db.get(`textContent_${guild?.id}`)) ||
          "Welcome to {guildName} !";
        join = join
          .replace("{guildName}", guild?.name || "")
          .replace(
            "{userName}",
            __1.default.bot.client.users.cache.get(trab.id)?.username || ""
          );
        ctx.strokeStyle = (await db.get(`textColor_${guild?.id}`)) || "#ffffff";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${
          (await db.get(`textFSize_${guild?.id}`)) || "20"
        }px DejaVu Sans`;
        ctx.fillStyle = (await db.get(`textColor_${guild?.id}`)) || "#ffffff";
        ctx.fillText(
          join,
          Number(await db.get(`textPosX_${guild?.id}`)) || 300,
          Number(await db.get(`textPosY_${guild?.id}`)) || 120
        );
        x = Number(await db.get(`avatarXpostion_${guild?.id}`)) || 40;
        y = Number(await db.get(`avatarYpostion_${guild?.id}`)) || 80;
        let xC = Number(await db.get(`avatarXCpostion_${guild?.id}`)) || 105;
        let yC = Number(await db.get(`avatarYCpostion_${guild?.id}`)) || 144;
        let deg = Number(await db.get(`Deg_${guild?.id}`)) || 65;
        ctx.beginPath();
        ctx.arc(xC, yC, deg, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const { body } = await (0, undici_1.request)(
          user?.displayAvatarURL({ format: "jpg" }) || ""
        );
        const avatar = new canvas_1.default.Image();
        avatar.src = Buffer.from(await body.arrayBuffer());
        ctx.lineTo(250, 150);
        ctx.drawImage(avatar, x, y);
        function makeid(length) {
          var result = "";
          var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        }
        let imageId = makeid(15);
        await (0, promises_1.writeFile)(
          process.cwd() + `/src/server/assets/${imageId}.png`,
          await canvas.encode("png")
        );
        setTimeout(() => {
          (0, promises_1.unlink)(
            process.cwd() + `/src/server/assets/${imageId}.png`
          );
        }, 3000);
        return imageId;
      }
      res.render("welcome", {
        title: guild.name,
        client: __1.default.bot.client,
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        guild: guild,
        image: await makeIT(),
        avatarXpostion:
          Number(await db.get(`avatarXpostion_${guild?.id}`)) || 40,
        avatarYpostion:
          Number(await db.get(`avatarYpostion_${guild?.id}`)) || 80,
        avatarXCpostion:
          Number(await db.get(`avatarXCpostion_${guild?.id}`)) || 105,
        avatarYCpostion:
          Number(await db.get(`avatarYCpostion_${guild?.id}`)) || 144,
        dimensionY: Number(await db.get(`dimensionY_${guild?.id}`)) || 280,
        dimensionX: Number(await db.get(`dimensionX_${guild?.id}`)) || 600,
        deg: Number(await db.get(`Deg_${guild?.id}`)) || 65,
        usernamePosX: Number(await db.get(`usernamePosX_${guild?.id}`)) || 200,
        usernamePosY: Number(await db.get(`usernamePosY_${guild?.id}`)) || 150,
        usernameFSize: (await db.get(`usernameFSize_${guild?.id}`)) || "20",
        usernameColor:
          (await db.get(`usernameColor_${guild?.id}`)) || "#ed9209",
        textPosY: Number(await db.get(`textPosY_${guild?.id}`)) || 120,
        textPosX: Number(await db.get(`textPosX_${guild?.id}`)) || 300,
        textFSize: (await db.get(`textFSize_${guild?.id}`)) || "20",
        textColor: (await db.get(`textColor_${guild?.id}`)) || "#ed9209",
        textContent: "{guildName} => server name, {userName} => user username",
      });
    })
    .post("/welcomer/:guildId", async (req, res) => {
      let shut = await db.get(`Project`);
      if (shut == true) return res.render("underDev");
      let guildId = req.params.guildId;
      if (!guildId) return res.redirect("/");
      let guild = __1.default.bot.client.guilds.cache.find(
        (g) => g.id == guildId
      );
      if (!guild) return res.redirect("/");
      let userGG = req.user;
      if (!userGG) return res.redirect("/");
      let user = guild.members.cache.find((u) => u.id == userGG.id);
      if (!user) return res.redirect("/");
      let check = await db.get(`Blacklist`);
      if (!check) check = [];
      if (check?.includes(user?.id || "")) {
        return res.send("You are on the blacklist");
      }
      if (!user?.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))
        return res.redirect("/");
      if (req.body?.avatarXpostion) {
        await db.set(`avatarXpostion_${guild.id}`, req.body?.avatarXpostion);
        await db.set(`Deg_${guild.id}`, 60);
        await db.set(
          `avatarXCpostion_${guild.id}`,
          Number(req.body?.avatarXpostion) + 60
        );
      }
      if (req.body?.avatarYpostion) {
        await db.set(`avatarYpostion_${guild.id}`, req.body?.avatarYpostion);
        await db.set(`Deg_${guild.id}`, 60);
        await db.set(
          `avatarYCpostion_${guild.id}`,
          Number(req.body?.avatarYpostion) + 60
        );
      }
      if (req.body?.avatarXCpostion)
        await db.set(`avatarXCpostion_${guild.id}`, req.body?.avatarXCpostion);
      if (req.body?.avatarYCpostion)
        await db.set(`avatarYCpostion_${guild.id}`, req.body?.avatarYCpostion);
      if (req.body?.dimensionY)
        await db.set(`dimensionY_${guild.id}`, req.body?.dimensionY);
      if (req.body?.dimensionX)
        await db.set(`dimensionX_${guild.id}`, req.body?.dimensionX);
      if (req.body?.backgroundURL)
        await db.set(`backgroundURL_${guild.id}`, req.body?.backgroundURL);
      if (req.body?.deg) await db.set(`Deg_${guild.id}`, req.body?.deg);
      if (req.body?.usernamePosY)
        await db.set(`usernamePosY_${guild.id}`, req.body?.usernamePosY);
      if (req.body?.usernamePosX)
        await db.set(`usernamePosX_${guild.id}`, req.body?.usernamePosX);
      if (req.body?.usernameFSize)
        await db.set(`usernameFSize_${guild.id}`, req.body?.usernameFSize);
      if (req.body?.usernameColor)
        await db.set(`usernameColor_${guild.id}`, req.body?.usernameColor);
      if (req.body?.textContent)
        await db.set(`textContent_${guild.id}`, req.body?.textContent);
      if (req.body?.textPosY)
        await db.set(`textPosY_${guild.id}`, req.body?.textPosY);
      if (req.body?.textPosX)
        await db.set(`textPosX_${guild.id}`, req.body?.textPosX);
      if (req.body?.textFSize)
        await db.set(`textFSize_${guild.id}`, req.body?.textFSize);
      if (req.body?.textColor)
        await db.set(`textColor_${guild.id}`, req.body?.textColor);
      async function makeIT() {
        const canvas = canvas_1.default.createCanvas(
          Number(await db.get(`dimensionX_${guild?.id}`)) || 640,
          Number(await db.get(`dimensionY_${guild?.id}`)) || 240
        );
        const ctx = canvas.getContext("2d");
        const img = await canvas_1.default.loadImage(
          (await db.get(`backgroundURL_${guild?.id}`)) ||
            "https://v13.discordjs.guide/assets/canvas-preview.30c4fe9e.png"
        );
        let x = 0;
        let y = 0;
        ctx.drawImage(img, x, y);
        let trab = req.user;
        var name = __1.default.bot.client.users.cache.get(trab.id)?.username;
        ctx.strokeStyle =
          (await db.get(`usernameColor_${guild?.id}`)) || "#ed9209";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${
          (await db.get(`usernameFSize_${guild?.id}`)) || "20"
        }px DejaVu Sans`;
        ctx.fillStyle =
          (await db.get(`usernameColor_${guild?.id}`)) || "#ed9209";
        ctx.fillText(
          name || "",
          Number(await db.get(`usernamePosX_${guild?.id}`)) || 70,
          Number(await db.get(`usernamePosY_${guild?.id}`)) || 50
        );
        var join =
          (await db.get(`textContent_${guild?.id}`)) ||
          "Welcome to {guildName} !";
        join = join
          .replace("{guildName}", guild?.name || "")
          .replace(
            "{userName}",
            __1.default.bot.client.users.cache.get(trab.id)?.username || ""
          );
        ctx.strokeStyle = (await db.get(`textColor_${guild?.id}`)) || "#ffffff";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${
          (await db.get(`textFSize_${guild?.id}`)) || "20"
        }px DejaVu Sans`;
        ctx.fillStyle = (await db.get(`textColor_${guild?.id}`)) || "#ffffff";
        ctx.fillText(
          join,
          Number(await db.get(`textPosX_${guild?.id}`)) || 70,
          Number(await db.get(`textPosY_${guild?.id}`)) || 50
        );
        x = Number(await db.get(`avatarXpostion_${guild?.id}`)) || 40;
        y = Number(await db.get(`avatarYpostion_${guild?.id}`)) || 80;
        let xC = Number(await db.get(`avatarXCpostion_${guild?.id}`)) || 105;
        let yC = Number(await db.get(`avatarYCpostion_${guild?.id}`)) || 144;
        let deg = Number(await db.get(`Deg_${guild?.id}`)) || 65;
        ctx.beginPath();
        ctx.arc(xC, yC, deg, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const { body } = await (0, undici_1.request)(
          user?.displayAvatarURL({ format: "jpg" }) || ""
        );
        const avatar = new canvas_1.default.Image();
        avatar.src = Buffer.from(await body.arrayBuffer());
        ctx.lineTo(250, 150);
        ctx.drawImage(avatar, x, y);
        function makeid(length) {
          var result = "";
          var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        }
        let imageId = makeid(15);
        await (0, promises_1.writeFile)(
          process.cwd() + `/src/server/assets/${imageId}.png`,
          await canvas.encode("png")
        );
        setTimeout(() => {
          (0, promises_1.unlink)(
            process.cwd() + `/src/server/assets/${imageId}.png`
          );
        }, 3000);
        return imageId;
      }
      res.render("welcome", {
        title: guild.name,
        client: __1.default.bot.client,
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        guild: guild,
        image: await makeIT(),
        avatarXpostion:
          Number(await db.get(`avatarXpostion_${guild?.id}`)) || 25,
        avatarYpostion:
          Number(await db.get(`avatarYpostion_${guild?.id}`)) || 25,
        avatarXCpostion:
          Number(await db.get(`avatarXCpostion_${guild?.id}`)) || 105,
        avatarYCpostion:
          Number(await db.get(`avatarYCpostion_${guild?.id}`)) || 144,
        dimensionY: Number(await db.get(`dimensionY_${guild?.id}`)) || 240,
        dimensionX: Number(await db.get(`dimensionX_${guild?.id}`)) || 640,
        deg: Number(await db.get(`Deg_${guild?.id}`)) || 65,
        usernamePosX: Number(await db.get(`usernamePosX_${guild?.id}`)) || 2.7,
        usernamePosY: Number(await db.get(`usernamePosY_${guild?.id}`)) || 2.4,
        usernameFSize: (await db.get(`usernameFSize_${guild?.id}`)) || "20",
        usernameColor:
          (await db.get(`usernameColor_${guild?.id}`)) || "#ed9209",
        textPosY: Number(await db.get(`textPosY_${guild?.id}`)) || 2.7,
        textPosX: Number(await db.get(`textPosX_${guild?.id}`)) || 2.4,
        textFSize: (await db.get(`textFSize_${guild?.id}`)) || "20",
        textColor: (await db.get(`textColor_${guild?.id}`)) || "#ed9209",
        textContent: "{guildName} => server name, {userName} => user username",
      });
    });
};
