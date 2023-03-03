"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const afk_1 = __importDefault(require("../functions/afk"));
const leveling_1 = __importDefault(require("../functions/leveling"));
const dashboard_config_1 = __importDefault(require("../../dashboard.config"));
const autoLine_1 = __importDefault(require("../functions/autoLine"));
const sugs_1 = __importDefault(require("../functions/sugs"));
const ms_1 = __importDefault(require("ms"));
var cooldown = new Map();
exports.default = async (message, db, config, commands, index) => {
    if (!message.content)
        return;
    const client = message.client;
    if (message.author.bot)
        return;
    if (message.guildId == null)
        return;
    // shutdown the bot
    let shut = await db.get(`Project`);
    if (shut == true) {
        message
            .reply(">>> bot is underdevelopment: " + dashboard_config_1.default.domain)
            .catch(() => { });
        return;
    }
    // functions (out of commands)
    let data = await db.get(`files-only_${message.guildId}`);
    if (!data)
        data = [];
    if (data.includes(message.channel.id)) {
        let attch = [];
        await message.attachments.forEach(async (a) => {
            await attch.push(a);
        });
        if (message.content && !attch[0])
            message.delete().catch(() => { });
    }
    let settingsTable = await db.table("settings");
    let lang = (await settingsTable.get(`Lang_${message.guild?.id}`)) || "en";
    var REPLYS = index.replys[lang];
    if (!message.content.startsWith((await settingsTable.get(`Prefix_${message.guild?.id}`)) ||
        config.BOT.PREFIX)) {
        await (0, autoLine_1.default)(db, message);
        await sugs_1.default.msg(message, db);
        if ((await (0, afk_1.default)(message, db)) == true) {
            message.reply("please do not mention this user, its away from keyboard...");
            message.delete().catch(() => { });
        }
        await (0, leveling_1.default)(message, db);
    }
    // the commands
    else {
        let [commandNameS, ...args] = message.content
            .toLocaleLowerCase()
            .split(" ");
        let settingsTable = await db.table("settings");
        let commandName = commandNameS.split((await settingsTable.get(`Prefix_${message.guild?.id}`)) ||
            config.BOT.PREFIX)[1];
        let aliases = config.CMD_ALIASES;
        let command = commands.get(commandName);
        if (!command) {
            let ali = aliases.find((t) => t.aliases.includes(commandName));
            if (ali)
                command = commands.get(ali.name);
        }
        let aguments = [];
        let check = await db.get(`Blacklist`);
        if (!check)
            check = [];
        if (check?.includes(message.author.id)) {
            message.reply(">>> **You are on the blacklist.**").catch(() => { });
            return;
        }
        // options built in function (sbaka alert ⚠)
        if (command?.options) {
            let options = command.options;
            async function check(optionNumber) {
                let option = options;
                if (option[optionNumber]) {
                    switch (option[optionNumber].type) {
                        case 7: {
                            {
                                let channel = message.mentions.channels?.first() ||
                                    message.guild?.channels.cache.get(option.length == 1 ? args.join(" ") : args[optionNumber]);
                                if (channel)
                                    return {
                                        name: option[optionNumber].name,
                                        type: option[optionNumber].type,
                                        value: channel.id,
                                    };
                                else
                                    return optionNumber;
                            }
                        }
                        case 8:
                            {
                                let role = message.mentions.roles?.first() ||
                                    message.guild?.roles.cache.get(option.length == 1 ? args.join(" ") : args[optionNumber]);
                                if (role)
                                    return {
                                        name: option[optionNumber].name,
                                        type: option[optionNumber].type,
                                        value: role.id,
                                    };
                                else
                                    return optionNumber;
                            }
                            break;
                        case 6:
                            {
                                let user = message.mentions.members?.first() ||
                                    message.guild?.members.cache.get(option.length == 1 ? args.join(" ") : args[optionNumber]);
                                if (user)
                                    return {
                                        name: option[optionNumber].name,
                                        type: option[optionNumber].type,
                                        value: user.id,
                                    };
                                else
                                    return optionNumber;
                            }
                            break;
                        case 3:
                            {
                                let arg = option.length == 1 ? args.join(" ") : args[optionNumber];
                                if (arg)
                                    return {
                                        name: option[optionNumber].name,
                                        type: option[optionNumber].type,
                                        value: arg,
                                    };
                                else
                                    return optionNumber;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            async function checkTwo(choices, arg) {
                var inter = 0;
                await choices.forEach((brbr) => {
                    if (brbr.name == arg)
                        inter = 1;
                });
                return inter;
            }
            let optionsLength = options.length;
            async function checkTree(options, optionNumber) {
                let value = await check(optionNumber);
                if (value == optionNumber && options[optionNumber].required == true) {
                    message.reply({
                        content: REPLYS.noArg.replace("{arg}", options[optionNumber].name),
                    });
                    return 0;
                }
                else if (value !== optionNumber &&
                    options[optionNumber].required == true &&
                    options[optionNumber].choices) {
                    let koko = await checkTwo(options[optionNumber].choices, value.value);
                    if (koko == 1) {
                        aguments.push(value);
                    }
                    else {
                        message.reply({
                            content: REPLYS.noArgC.replace("{c}", options[optionNumber].choices
                                .map((brbr) => `${brbr.name}`)
                                .join(", ")),
                        });
                        return 0;
                    }
                }
                else if (value == optionNumber &&
                    options[optionNumber].required == false &&
                    !options[optionNumber].choices) {
                    aguments.push(null);
                }
                else
                    aguments.push(value);
            }
            if (optionsLength == 1) {
                let tr1 = await checkTree(options, 0);
                if (tr1 == 0)
                    return;
            }
            if (optionsLength == 2) {
                let tr1 = await checkTree(options, 0);
                if (tr1 == 0)
                    return;
                let tr2 = await checkTree(options, 1);
                if (tr2 == 0)
                    return;
            }
            if (optionsLength == 3) {
                let tr1 = await checkTree(options, 0);
                if (tr1 == 0)
                    return;
                let tr2 = await checkTree(options, 1);
                if (tr2 == 0)
                    return;
                let tr3 = await checkTree(options, 2);
                if (tr3 == 0)
                    return;
            }
            if (optionsLength == 4) {
                let tr1 = await checkTree(options, 0);
                if (tr1 == 0)
                    return;
                let tr2 = await checkTree(options, 1);
                if (tr2 == 0)
                    return;
                let tr3 = await checkTree(options, 2);
                if (tr3 == 0)
                    return;
                let tr4 = await checkTree(options, 3);
                if (tr4 == 0)
                    return;
            }
        }
        if (cooldown.has(`${message.author.id}`)) {
            message.reply(`${REPLYS.coolDown.replace("{time}", `**${(0, ms_1.default)(cooldown.get(`${message.author.id}`) - Date.now(), {
                long: true,
            }).includes("ms")
                ? "0 second"
                : (0, ms_1.default)(cooldown.get(`${message.author.id}`) - Date.now(), {
                    long: true,
                })}**`)}`);
            return;
        }
        if (command) {
            command.run(client, null, message, aguments, false, message.author, message.guild, message.channel, db);
            setTimeout(() => {
                cooldown.set(`${message.author.id}`, Date.now() + 5000);
                setTimeout(() => {
                    cooldown.delete(`${message.author.id}`);
                }, 5000);
            });
        }
    }
};
