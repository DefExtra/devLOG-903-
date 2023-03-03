"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (msg, db) => {
    let autoTable = await db.table("auto");
    msg.content.split(" ").forEach(async (content) => {
        let auto = await autoTable.get(`${content}_${msg.guild?.id}`);
        if (auto) {
            if (!auto)
                return;
            msg.channel.sendTyping().then(() => {
                msg.reply(auto || "");
            });
        }
    });
    let re = await db.get(`LSA_${msg.guild?.id}`);
    let creditsTable = await db.table("credits");
    // wait
    let LevelingSystem = {
        dot: await db.get(`LS_${msg.guild?.id}`),
        channel: await db.get(`LSC_${msg.guild?.id}`),
        msg: await db.get(`LSM_${msg.guild?.id}`),
        userPoints: await db.get(`LSUP_${msg.guild?.id}_${msg.author.id}`),
        userLevel: await db.get(`LSUL_${msg.guild?.id}_${msg.author.id}`),
        rewards: re,
        userRep: await creditsTable.get(`Rep_${msg.author.id}`),
    };
    // check if data is existing
    if (LevelingSystem["dot"] == null)
        await db.set(`LS_${msg.guild?.id}`, true);
    if (!LevelingSystem["channel"])
        await db.set(`LSC_${msg.guild?.id}`, "");
    if (!LevelingSystem["userRep"])
        await creditsTable.set(`Rep_${msg.guild?.id}`, 1);
    if (!LevelingSystem["rewards"])
        await db.set(`LSA_${msg.guild?.id}`, []);
    if (!LevelingSystem["userLevel"])
        await db.set(`LSUL_${msg.guild?.id}_${msg.author.id}`, 1);
    if (!LevelingSystem["userPoints"])
        await db.set(`LSUP_${msg.guild?.id}_${msg.author.id}`, 0);
    if (!LevelingSystem["msg"])
        await db.set(`LSM_${msg.guild?.id}`, `{user}, has rich a new level **{level}** 🎉🎉🎉`);
    if (LevelingSystem["dot"] == false)
        return;
    let reqPoints = (Number(LevelingSystem["userLevel"]) * 500) /
        Number(LevelingSystem["userRep"]);
    await db.add(`LSUP_${msg.guild?.id}_${msg.author.id}`, 1);
    LevelingSystem.rewards?.forEach(async (V) => {
        if (Number(V.level) <=
            Number(await db.get(`LSUL_${msg.guild?.id}_${msg.author.id}`))) {
            let r = msg.guild?.roles.cache.get(V.roleId);
            if (r)
                msg.member?.roles.add(r).catch((err) => { });
        }
    });
    if (reqPoints < Number(LevelingSystem["userPoints"])) {
        let ch = msg.guild?.channels.cache.get(String(LevelingSystem["channel"]));
        if (ch && ch.isText())
            ch.send({
                content: String(LevelingSystem["msg"])
                    .replace("{user}", `<@!${msg.author.id}>`)
                    .replace("{level}", String(await db.get(`LSUL_${msg.guild?.id}_${msg.author.id}`))),
            });
        await db.set(`LSUP_${msg.guild?.id}_${msg.author.id}`, 0);
        await db.add(`LSUL_${msg.guild?.id}_${msg.author.id}`, 1);
    }
};
