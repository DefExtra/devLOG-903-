"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "points",
    description: "modify members points.",
    type: 1,
    options: [
        {
            name: "action",
            description: "what you will do.",
            type: 3,
            required: true,
            choices: [
                { name: "increase", value: "add" },
                { name: "decrease", value: "remove" },
                { name: "set", value: "set" },
                { name: "view", value: "view" },
                { name: "reset", value: "reset" },
            ],
        },
        {
            name: "user",
            description: "action for who?",
            type: 6,
            required: true,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let action = args[0]?.value;
        let user = guild.members.cache.get(args[1]?.value);
        if (!["view", "add", "remove", "set", "reset"].includes(action))
            return (0, respond_1.respond)(interaction, message, {
                content: '🚫 | **action must be one of these ["view", "add", "remove", "set", "reset"]**',
            }, isSlash);
        let dataer = (await db.get(`Points_${user?.id}_${guild.id}`)) || 0;
        if (action == "view")
            return (0, respond_1.respond)(interaction, message, {
                embeds: [
                    {
                        title: "Points!",
                        timestamp: new Date(),
                        footer: {
                            text: `Requested by: ${author.tag}`,
                            icon_url: author.avatarURL({ dynamic: true }),
                        },
                        description: `> \` - \` - **${user?.user.username},** points: \`${dataer}\``,
                    },
                ],
            }, isSlash);
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let data = (await db.get(`Points_${user?.id}_${guild.id}`)) || 0;
            switch (action) {
                case "add":
                    {
                        (0, respond_1.respond)(interaction, message, {
                            content: "Please type the amount you won't to add // يرجى كتابة المقدار الزي تريد اضافتة",
                        }, isSlash).then((d) => {
                            if (!channel.isText())
                                return;
                            channel
                                .createMessageCollector({
                                filter: (a) => a.author.id == author.id,
                                max: 1,
                            })
                                .on("collect", async (y) => {
                                y.delete();
                                if (isNaN(y.content)) {
                                    (0, respond_1.editRespond)(interaction, message, {
                                        content: `\`\`\`yml
                        only numbers.\`\`\``,
                                    }, isSlash, d.id);
                                    return;
                                }
                                await db.set(`Points_${user?.id}_${guild.id}`, Number(data) + Number(y.content));
                                (0, respond_1.editRespond)(interaction, message, {
                                    content: `\`\`\`yml
Points has been added successfully.\`\`\``,
                                }, isSlash, d.id);
                            });
                        });
                    }
                    break;
                case "remove":
                    {
                        (0, respond_1.respond)(interaction, message, {
                            content: "Please type the amount you won't to add // يرجى كتابة المقدار الزي تريد اضافتة",
                        }, isSlash).then((d) => {
                            if (!channel.isText())
                                return;
                            channel
                                .createMessageCollector({
                                filter: (a) => a.author.id == author.id,
                                max: 1,
                            })
                                .on("collect", async (y) => {
                                y.delete();
                                if (isNaN(y.content)) {
                                    (0, respond_1.editRespond)(interaction, message, {
                                        content: `\`\`\`yml
only numbers.\`\`\``,
                                    }, isSlash, d.id);
                                    return;
                                }
                                await db.set(`Points_${user?.id}_${guild.id}`, Number(data) - Number(y.content));
                                (0, respond_1.editRespond)(interaction, message, {
                                    content: `\`\`\`yml
Points has been removed successfully.\`\`\``,
                                }, isSlash, d.id);
                            });
                        });
                    }
                    break;
                case "set":
                    {
                        (0, respond_1.respond)(interaction, message, {
                            content: "Please type the amount you won't to add // يرجى كتابة المقدار الزي تريد اضافتة",
                        }, isSlash).then((d) => {
                            if (!channel.isText())
                                return;
                            channel
                                .createMessageCollector({
                                filter: (a) => a.author.id == author.id,
                                max: 1,
                            })
                                .on("collect", async (y) => {
                                y.delete();
                                if (isNaN(y.content)) {
                                    (0, respond_1.editRespond)(interaction, message, {
                                        content: `\`\`\`yml
only numbers.\`\`\``,
                                    }, isSlash, d.id);
                                    return;
                                }
                                await db.set(`Points_${user?.id}_${guild.id}`, Number(y.content));
                                (0, respond_1.editRespond)(interaction, message, {
                                    content: `\`\`\`yml
Points has been set successfully.\`\`\``,
                                }, isSlash, d.id);
                            });
                        });
                    }
                    break;
                case "reset":
                    {
                        guild.members.cache.forEach(async ({ user: user2 }) => {
                            await db.set(`Points_${user2?.id}_${guild.id}`, 0);
                        });
                        (0, respond_1.respond)(interaction, message, {
                            content: `\`\`\`yml
Server points has been reseted successfully.\`\`\``,
                        }, isSlash);
                    }
                    break;
                default:
                    break;
            }
        }
    },
};
