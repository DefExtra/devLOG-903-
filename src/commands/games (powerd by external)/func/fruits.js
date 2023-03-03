"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../../utils/modules/respond");
exports.default = {
    name: "fruits",
    description: "🎮 Give it a shot.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        var x;
        let slot1 = ["🍏", "🍇", "🍒", "🍍", "🍅", "🍆", "🍑", "🍓"];
        let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
        let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
        let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
        let we;
        if (slots1 === slots2 && slots2 === slots3) {
            var points = await db.get(`points_${guild.id}_${author.id}`);
            if (points == null)
                points = db.set(`points_${guild.id}_${author.id}`, {
                    user: author.id,
                    guild: author.id,
                    points: 0,
                });
            else {
                db.add(`points_${guild.id}_${author.id}.points`, 3);
            }
            we = "Win!";
        }
        else {
            we = "Lose!";
        }
        (0, respond_1.respond)(interaction, message, {
            content: `${slots1} | ${slots2} | ${slots3} - ${we}`,
        }, isSlash);
    },
};
