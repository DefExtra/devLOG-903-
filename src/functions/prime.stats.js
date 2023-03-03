"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, db) => {
    setInterval(() => {
        client?.channels.cache.forEach(async (channel) => {
            let primeTable = await db.table("prime");
            let data = await primeTable.get(`InfoRoom_${channel.id}`);
            if (!channel.isVoice())
                return;
            if (data) {
                let guild = await client.guilds.cache.find((g) => g.channels.cache.get(channel.id));
                if (!guild)
                    return;
                if (data == "voice_online") {
                    let channelName = channel.name;
                    let newName = `🔊 Voice Online: ${Number(guild.memberCount) -
                        Number((await guild.members.fetch())?.filter((m) => !m.voice.channel?.id)
                            .size)}`;
                    if (channelName !== newName)
                        await channel.setName(newName);
                }
                if (data == "guild_member_count") {
                    let channelName = channel.name;
                    let newName = `👥 Members: ${guild.memberCount}`;
                    if (channelName !== newName)
                        await channel.setName(newName);
                }
                if (data == "server_channels") {
                    let channelName = channel.name;
                    let newName = `🚪 Channels: ${guild.channels.cache.size}`;
                    if (channelName !== newName)
                        await channel.setName(newName);
                }
                else if (data == "boosters") {
                    let channelName = channel.name;
                    let newName = `🚀 Boosts: ${guild.premiumSubscriptionCount}`;
                    if (channelName !== newName)
                        await channel.setName(newName);
                }
                else if (data == "online_members") {
                    let channelName = channel.name;
                    let newName = `🟢 Online: ${Number((await guild.members.fetch()).filter((member) => member.presence?.status == "online" && !member.user.bot).size) +
                        Number((await guild.members.fetch()).filter((member) => member.presence?.status == "idle" && !member.user.bot).size) +
                        Number((await guild.members.fetch()).filter((member) => member.presence?.status == "dnd" && !member.user.bot).size)}`;
                    if (channelName !== newName)
                        await channel.setName(newName);
                }
            }
        });
    }, 10000);
};
