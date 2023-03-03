"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const captcha_generator_1 = __importDefault(require("@haileybot/captcha-generator"));
exports.default = {
    name: "credits",
    description: "💸 view you credits.",
    type: 1,
    options: [
        {
            name: "user",
            type: 6,
            required: false,
            description: "🔧 The user you wont to view her/his credits .",
        },
        {
            name: "amount",
            type: 3,
            required: false,
            description: "🔧 The amount of credits you wont to transfer.",
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let creditsTable = await db.table("credits");
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let user = client.users.cache.get(args[0]?.value) || author;
        let amount = Number(args[1]?.value);
        let credits = Number(await creditsTable.get(`Credits_${user.id}`)) || 0;
        if (args[0]?.value) {
            if (Number(await creditsTable.get(`Credits_${client.users.cache.get(args[0]?.value)?.id}`)) == null)
                await creditsTable.set(`Credits_${client.users.cache.get(args[0]?.value)?.id}`, 0);
            if ((await creditsTable.get(`Credits_${author.id}`)) == null)
                await creditsTable.set(`Credits_${author.id}`, 0);
        }
        else {
            if ((await creditsTable.get(`Credits_${author.id}`)) == null)
                await creditsTable.set(`Credits_${author.id}`, 0);
        }
        if (!amount)
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.urcredits.replace("{user.username}", user.username).replace("{credits}", credits),
            }, isSlash);
        else if (amount) {
            if (!args[0]?.value) {
                return (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.transFrWOOO.replace("{author.username}", author.username),
                }, isSlash);
            }
            if (user.id == author.id) {
                return (0, respond_1.respond)(interaction, message, {
                    content: `**🚫 | ${author.username}, احا??**`,
                }, isSlash);
            }
            let yourCredits = Number(await creditsTable.get(`Credits_${author.id}`));
            let hisCredits = await creditsTable.get(`Credits_${args[0]?.value}`);
            if (!yourCredits) {
                return (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.urCisGant.replace("{author.username}", author.username),
                }, isSlash);
            }
            if (yourCredits < amount) {
                return (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.cmjdiehu.replace("{author.username}", author.username),
                }, isSlash);
            }
            if (isNaN(amount)) {
                return (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.onlyNUMMMS.replace("{author.username}", author.username),
                }, isSlash);
            }
            if (String(amount).includes("-")) {
                return (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.nowooordsa.replace("{author.username}", author.username),
                }, isSlash);
            }
            let captcha = new captcha_generator_1.default();
            /**
            {
              attachment: captcha.JPEGStream,
              name: "captcha.jpeg",
              height: 480,
              width: 720,
            },
            */
            let attachment = new discord_js_1.MessageAttachment(captcha.PNGStream, "captcha.png");
            (attachment.height = 10), (attachment.width = 20);
            (0, respond_1.respond)(interaction, message, {
                content: "⏰ You Have 15s To Confirm The Captcha...",
                files: [attachment],
            }, isSlash).then((defLock) => {
                channel
                    .createMessageCollector({
                    filter: (a) => a.author.id == author.id,
                    max: 1,
                })
                    .on("collect", async (m) => {
                    m.delete();
                    if (m.content.toUpperCase() == captcha.value) {
                        let userC = await creditsTable.get(`Credits_${user.id}`);
                        let authC = await creditsTable.get(`Credits_${author.id}`);
                        await creditsTable.set(`Credits_${author.id}`, Number(authC) - Number(amount));
                        await creditsTable.set(`Credits_${user.id}`, Number(userC) + Number(amount));
                        (0, respond_1.editRespond)(interaction, message, {
                            content: REPLYS.doneTrans.replace("{author.username}", author.username).replace("{user}", user).replace("{amount}", amount),
                            files: [],
                        }, isSlash, defLock.id);
                        user
                            .send(`:atm:  |  Transfer Receipt \n\`\`\`You have received \`$${amount}\` from user ${author.username} (ID: ${author.id})\`\`\``);
                    }
                    else {
                        isSlash == true
                            ? interaction
                                .deleteReply()
                            : defLock.delete();
                    }
                });
            });
        }
    },
};
