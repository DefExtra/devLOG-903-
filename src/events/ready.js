"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const myCodes_1 = __importDefault(require("../../myCodes"));
const chalk_1 = __importDefault(require("chalk"));
const serverBoat_1 = __importDefault(require("../server/serverBoat"));
const axios_1 = __importDefault(require("axios"));
const ytNoti_1 = __importDefault(require("../functions/ytNoti"));
const prime_stage_1 = __importDefault(require("../functions/prime.stage"));
const prime_stats_1 = __importDefault(require("../functions/prime.stats"));
const protection_def_1 = __importDefault(require("../functions/protection.def"));
const discord_temp_channels_1 = __importDefault(require("discord-temp-channels"));
exports.default = async (client, config, db, commands, thiser) => {
    await (0, protection_def_1.default)(client, db);
    await (0, prime_stage_1.default)(client, db);
    await (0, prime_stats_1.default)(client, db);
    setInterval(() => {
        client?.guilds.cache.forEach((g) => {
            (0, ytNoti_1.default)(db, g);
        });
    }, 10000);
    client?.guilds.cache.forEach(async (g) => {
        let activitys = config.BOT;
        await client.user?.setActivity(activitys.ACTIVITYS);
        await client.user?.setStatus(activitys.STATUS);
        let primeTable = await db.table("prime");
        let tempData = await primeTable.get("Temp_" + g.id);
        if (tempData) {
            let c = g.channels.cache.get(tempData.channel);
            let cate = g.channels.cache.get(tempData.cate);
            if (!c || !cate)
                return;
            const tempChannels = new discord_temp_channels_1.default(client);
            tempChannels.registerChannel(c.id, {
                childCategory: cate.id,
                childAutoDeleteIfEmpty: true,
                childAutoDeleteIfOwnerLeaves: true,
                childFormat: (member, count) => `#${count} | ${member.user.username}`,
            });
        }
        let settingsTable = await db.table("settings");
        let prf = await settingsTable.get(`Prefix_${g?.id}`);
        if (prf == null || !prf)
            await settingsTable.set(`Prefix_${g?.id}`, config.BOT.PREFIX);
    });
    (0, myCodes_1.default)(client, config.BOT.PREFIX).then(() => {
        thiser.emit("SystemLog", {
            type: "connection",
            text: chalk_1.default.blue.bold("[ + ]") + " Loading Custom Commands...",
        });
    });
    thiser.emit("SystemLog", {
        type: "connection",
        text: chalk_1.default.blue.bold("[ + ]") + " Loading System Commands...",
    });
    (0, serverBoat_1.default)(db, thiser);
    setTimeout(async () => {
        const commandsArray = [];
        commands.forEach((command) => {
            commandsArray.push(command);
        });
        (async () => {
            try {
                await client?.application?.commands.set(commandsArray);
            }
            catch (error) {
                console.log(error);
            }
        })();
        console.log(chalk_1.default.bgGrey("ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ"));
        console.log(chalk_1.default.green.bold("[ / ]  ") +
            (await (await axios_1.default.get(`https://api-Casper.ggturbo.repl.co/hello/tk`)).data));
        console.log(chalk_1.default.green.bold("[ / ] ") +
            " Bot Developers: @ニロ#6271 / @ÒnlyTurbo ♪.#9890 / @ABO FARGHALY#1222");
        console.log(chalk_1.default.green.bold("[ / ] ") +
            " Powerd By: " +
            chalk_1.default.white.bgYellow("Rexom, Casper, Discord JQVA, devTOOLS, NSystemV3"));
        console.log(chalk_1.default.green.bold("[ / ] ") +
            " Thank you very much for using our bot,  best regards NIRO and devTOOLS team");
    }, 2000);
};
