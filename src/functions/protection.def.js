"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dateformat_1 = __importDefault(require("dateformat"));
exports.default = (client, db) => {
    const usersMap = new Map();
    const LIMIT = 5;
    const DIFF = 3000;
    client
        ?.on("message", async (message) => {
        try {
            if (message.member?.permissions.has(["ADMINISTRATOR"]))
                return;
            if (message.author.bot)
                return;
            let toggle3 = await db.get(`AntiSpam_${message.guild?.id}`);
            if (toggle3 == "on") {
                if (usersMap.has(message.author.id)) {
                    const userData = usersMap.get(message.author.id);
                    const { lastMessage, timer } = userData;
                    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
                    let msgCount = userData.msgCount;
                    if (difference > DIFF) {
                        clearTimeout(timer);
                        userData.msgCount = 1;
                        userData.lastMessage = message;
                        userData.timer = setTimeout(() => {
                            usersMap.delete(message.author.id);
                        }, 1000 * 60 * 5);
                        usersMap.set(message.author.id, userData);
                    }
                    else {
                        ++msgCount;
                        if (parseInt(msgCount) === LIMIT) {
                            message.member
                                ?.timeout(1000 * 30);
                            let messageS = `<@!${message.author.id}>` + ", Has Been Muted For Spaming!.";
                            message.channel.send(messageS);
                        }
                        else {
                            userData.msgCount = msgCount;
                            usersMap.set(message.author.id, userData);
                        }
                    }
                }
                else {
                    let fn = setTimeout(() => {
                        usersMap.delete(message.author.id);
                    }, 1000 * 60 * 5);
                    usersMap.set(message.author.id, {
                        msgCount: 1,
                        lastMessage: message,
                        timer: fn,
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
            return;
        }
    })
        .on("messageCreate", async (MSG) => {
        if (MSG.author.bot)
            return;
        let ALtoggle = await db.get(`ANTI_LINK_${MSG.guild?.id}`);
        let AStoggle = await db.get(`ANTI_SWEAR_${MSG.guild?.id}`);
        if (AStoggle == "on") {
            if (MSG.member?.permissions.has(["ADMINISTRATOR"]))
                return;
            let listOfWords = (await db.get(`ANTI_SWEAR_LIST_${MSG.guild?.id}`)) || [];
            let content = MSG.content;
            listOfWords?.forEach((word) => {
                var pattern = new RegExp("(\\w*" + word + "\\w*)", "gi");
                var matches = content?.match(pattern);
                if (matches !== null) {
                    MSG.reply(">>> (ANTI_SWEAR) :: this word is blacklisted in this server").then((KRP) => {
                        MSG.member
                            ?.timeout(120000);
                        MSG.delete();
                        setTimeout(() => {
                            KRP.delete();
                        }, 2000);
                    });
                    return;
                }
            });
        }
        if (ALtoggle == "on") {
            if (MSG.member?.permissions.has(["ADMINISTRATOR"]))
                return;
            if (MSG.content.includes("https") ||
                MSG.content.includes("discord.gg") ||
                MSG.content.includes("discord.com") ||
                MSG.content.includes("http") ||
                MSG.content.includes(".com") ||
                MSG.content.includes(".net") ||
                MSG.content.includes(".org")) {
                MSG.reply({
                    content: ">>> (ANTI_LINKS) :: links are not allowed in this server ...",
                }).then((KRP) => {
                    MSG.member
                        ?.timeout(1500000);
                    MSG.delete();
                    setTimeout(() => {
                        KRP.delete();
                    }, 2000);
                });
            }
        }
    })
        .on("messageUpdate", async (MSG, MSG2) => {
        let ALtoggle = await db.get(`ANTI_LINK_${MSG.guild?.id}`);
        let AStoggle = await db.get(`ANTI_SWEAR_${MSG.guild?.id}`);
        if (AStoggle == "on") {
            if (MSG.member?.permissions.has(["ADMINISTRATOR"]) ||
                MSG2.member?.permissions.has(["ADMINISTRATOR"]))
                return;
            let listOfWords = (await db.get(`ANTI_SWEAR_LIST_${MSG.guild?.id || MSG2.guild?.id}`)) || [];
            let content = MSG2.content || MSG.content;
            listOfWords?.forEach((word) => {
                var pattern = new RegExp("(\\w*" + word + "\\w*)", "gi");
                var matches = content?.match(pattern);
                if (matches !== null) {
                    MSG2.reply(">>> (ANTI_SWEAR) :: this word is blacklisted in this server").then((KRP) => {
                        MSG2.member
                            ?.timeout(120000);
                        MSG2.delete();
                        setTimeout(() => {
                            KRP.delete();
                        }, 2000);
                    });
                    return;
                }
            });
        }
        if (ALtoggle == "on") {
            if (MSG.member?.permissions.has(["ADMINISTRATOR"]) ||
                MSG2.member?.permissions.has(["ADMINISTRATOR"]))
                return;
            if (MSG2.content?.includes("https") ||
                MSG2.content?.includes("discord.gg") ||
                MSG2.content?.includes("discord.com") ||
                MSG2.content?.includes("http") ||
                MSG2.content?.includes(".com") ||
                MSG2.content?.includes(".net") ||
                MSG2.content?.includes(".org")) {
                MSG2?.reply({
                    content: ">>> (ANTI_LINKS) :: links are not allowed in this server ...",
                }).then((KRP) => {
                    MSG2?.delete();
                    setTimeout(() => {
                        KRP.delete();
                        MSG2.member
                            ?.timeout(1500000);
                    }, 2000);
                });
            }
            if (MSG.content?.includes("https") ||
                MSG.content?.includes("discord.gg") ||
                MSG.content?.includes("discord.com") ||
                MSG.content?.includes("http") ||
                MSG.content?.includes(".com") ||
                MSG.content?.includes(".net") ||
                MSG.content?.includes(".org")) {
                MSG?.reply({
                    content: "(ANTI_LINKS) :: links are not allowed in this server ...",
                }).then((KRP) => {
                    MSG?.delete();
                    setTimeout(() => {
                        KRP.delete();
                        MSG.member
                            ?.timeout(1500000);
                    }, 2000);
                });
            }
        }
    })
        .on("guildMemberAdd", async (member) => {
        if (member.user.bot) {
            let ABtoggle = await db.get(`ANTI_BOTS_${member.guild.id}`);
            if (ABtoggle == "on") {
                await member
                    .ban({
                    reason: `(ANTI_BOTS) :: added a bot ${member.user.username}...`,
                })
                    .catch(() => { });
                member.guild.fetchAuditLogs().then(async (d) => {
                    await member.guild.members.cache
                        .get((await d.entries
                        .filter((dr) => dr?.action == "BOT_ADD")
                        .first()?.executor?.id) || "")
                        ?.ban({
                        reason: `(ANTI_BOTS) :: added a bot ${member.user.username}...`,
                    });
                });
            }
        }
        else {
            let toggle2 = await db.get(`AntiTokens_${member.guild.id}`);
            if (toggle2 == "on") {
                const millis = new Date().getTime() - member.user.createdAt.getTime();
                const now = new Date();
                (0, dateformat_1.default)(now, "dddd, mmmm dS, yyyy");
                const days = millis / 1000 / 60 / 60 / 24;
                (0, dateformat_1.default)(now, "dddd, mmmm dS, yyyy");
                if (member.user.bot)
                    return;
                let time = Number(await db.get(`AntiTokensTime_${member.guild.id}`)) || 120;
                let userCt = Number(Number(days).toFixed(0));
                if (time > userCt) {
                    member.kick();
                }
            }
        }
    })
        .on("roleCreate", async (role) => {
        let rolecreate = (await db.get(`RoleCreate_${role.guild.id}`)) || 3;
        let fetch = await role.guild
            .fetchAuditLogs({
            type: "ROLE_CREATE",
        })
            .then((audit) => audit.entries.first())
            .catch((err) => {
            return;
        });
        let niro = await db.get(`NIRO_Protection_${role.guild.id}`);
        if (niro == "on") {
            let member = role.guild.members.cache.get(fetch?.executor?.id || "");
            if (member)
                member.ban();
            return;
        }
        if ((await db.get(`RoleCreateToggle_${role.guild.id}`)) === "on") {
            let userlimit = await db.get(`UDRoleCreate_${fetch?.executor?.id}_${role.guild.id}`);
            if (userlimit == null)
                return await db.set(`UDRoleCreate_${fetch?.executor?.id}_${role.guild.id}`, 1);
            await db.add(`UDRoleCreate_${fetch?.executor?.id}_${role.guild.id}`, 1);
            if (userlimit > rolecreate) {
                let member = await role.guild.members.cache.get(fetch?.executor?.id || "");
                if (member)
                    await member.ban();
                await db.delete(`UDRoleCreate_${fetch?.executor?.id}_${role.guild.id}`);
            }
        }
        else
            return undefined;
    })
        .on("roleDelete", async (role) => {
        let roledelete = (await db.get(`RoleDelete_${role.guild.id}`)) || 3;
        let fetch = await role.guild
            .fetchAuditLogs({
            type: "ROLE_DELETE",
        })
            .then((audit) => audit.entries.first())
            .catch((err) => {
            return;
        });
        let niro = await db.get(`NIRO_Protection_${role.guild.id}`);
        if (niro == "on") {
            let member = role.guild.members.cache.get(fetch?.executor?.id || "");
            if (member)
                member.ban();
            return;
        }
        if ((await db.get(`RoleDeleteToggle_${role.guild.id}`)) === "on") {
            let userlimit = await db.get(`UDRoleDelete_${fetch?.executor?.id}_${role.guild.id}`);
            if (userlimit == null)
                return await db.set(`UDRoleDelete_${fetch?.executor?.id}_${role.guild.id}`, 1);
            await db.add(`UDRoleDelete_${fetch?.executor?.id}_${role.guild.id}`, 1);
            if (userlimit > roledelete) {
                let member = role.guild.members.cache.get(fetch?.executor?.id || "");
                if (member)
                    member.ban();
                await db.delete(`UDRoleDelete_${fetch?.executor?.id}_${role.guild.id}`);
            }
        }
        else
            return undefined;
    })
        .on("channelCreate", async (channel) => {
        let channelcreate = (await db.get(`ChannelCreate_${channel.guild.id}`)) || 3;
        let fetch = await channel.guild
            .fetchAuditLogs({
            type: "CHANNEL_CREATE",
        })
            .then((audit) => audit.entries.first());
        let niro = await db.get(`NIRO_Protection_${channel.guild.id}`);
        if (niro == "on") {
            let member = channel.guild.members.cache.get(fetch?.executor?.id || "");
            if (member)
                member.ban();
            return;
        }
        if ((await db.get(`ChannelCreateToggle_${channel.guild.id}`)) === "on") {
            let userlimit = await db.get(`UDChannelCreate_${fetch?.executor?.id}_${channel.guild.id}`);
            if (userlimit == null)
                return await db.set(`UDChannelCreate_${fetch?.executor?.id}_${channel.guild.id}`, 1);
            await db.add(`UDChannelCreate_${fetch?.executor?.id}_${channel.guild.id}`, 1);
            if (userlimit > channelcreate) {
                let member = channel.guild.members.cache.get(fetch?.executor?.id || "");
                if (member)
                    member.ban();
                await db.delete(`UDChannelCreate_${fetch?.executor?.id}_${channel.guild.id}`);
            }
        }
        else
            return undefined;
    })
        .on("channelDelete", async (channel) => {
        if (!channel.isText() || !channel.isVoice())
            return;
        let channeldelete = (await db.get(`ChannelDelete_${channel?.guild?.id}`)) || 3;
        let fetch = await channel.guild
            .fetchAuditLogs({
            type: "CHANNEL_DELETE",
        })
            .then((audit) => audit.entries.first());
        let niro = await db.get(`NIRO_Protection_${channel.guild.id}`);
        if (niro == "on") {
            let member = channel.guild.members.cache.get(fetch?.executor?.id || "");
            if (member)
                member.ban();
            return;
        }
        if ((await db.get(`ChannelDeleteToggle_${channel.guild.id}`)) === "on") {
            let userlimit = await db.get(`UDChannelDelete_${fetch?.executor?.id}_${channel.guild.id}`);
            if (userlimit == null)
                return await db.set(`UDChannelDelete_${fetch?.executor?.id}_${channel.guild.id}`, 1);
            await db.add(`UDChannelDelete_${fetch?.executor?.id}_${channel.guild.id}`, 1);
            if (userlimit > channeldelete) {
                let member = channel.guild.members.cache.get(fetch?.executor?.id || "");
                if (member)
                    member.ban();
                await db.delete(`UDChannelDelete_${fetch?.executor?.id}_${channel.guild.id}`);
            }
        }
        else
            return undefined;
    })
        .on("guildBanAdd", async (ban) => {
        let banlimit = (await db.get(`MemebersBan_${ban.guild.id}`)) || 3;
        let fetch = await ban.guild
            .fetchAuditLogs({
            type: "MEMBER_BAN_ADD",
        })
            .then((audit) => audit.entries.first())
            .catch((err) => {
            return;
        });
        let niro = await db.get(`NIRO_Protection_${ban.guild.id}`);
        if (niro == "on") {
            let member = ban.guild.members.cache.get(fetch?.executor?.id || "");
            if (member)
                member.ban();
            return;
        }
        if ((await db.get(`MembersBanToggle_${ban.guild.id}`)) === "on") {
            let userlimit = await db.get(`UDMemebersBan_${fetch?.executor?.id}_${ban.guild.id}`);
            if (userlimit == null)
                return await db.set(`UDMemebersBan_${fetch?.executor?.id}_${ban.guild.id}`, 1);
            await db.add(`UDMemebersBan_${fetch?.executor?.id}_${ban.guild.id}`, 1);
            if (userlimit > banlimit) {
                let member = ban.guild.members.cache.get(fetch?.executor?.id || "");
                if (member)
                    member.ban();
                await db.delete(`UDMemebersBan_${fetch?.executor?.id}_${ban.guild.id}`);
            }
        }
        else
            return undefined;
    });
};
