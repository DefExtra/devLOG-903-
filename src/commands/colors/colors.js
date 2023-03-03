"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const fs_1 = require("fs");
const canvas_constructor_1 = require("canvas-constructor");
exports.default = {
    name: "colors",
    description: "colors palit.",
    type: 1,
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        var x = 0;
        var y = 0;
        if (guild.roles.cache.filter((role) => !isNaN(role.name)).size <= 0)
            return;
        guild.roles.cache
            .filter((role) => !isNaN(role.name))
            .sort((b1, b2) => Number(b1.name) - Number(b2.name))
            .forEach(() => {
            x += 100;
            if (x > 100 * 12) {
                x = 100;
                y += 80;
            }
        });
        var image = await (0, fs_1.readFileSync)(process.cwd() + "/src/data/colorsImage.png");
        var xd = new canvas_constructor_1.Canvas(100 * 11, y + 350)
            .addBeveledImage(image, 0, 0, 100 * 11, y + 350, 100)
            .setTextBaseline("middle")
            .setColor("white")
            .setTextSize(60)
            .addText(`قائمة الألوان`, 375, 80);
        x = 0;
        y = 150;
        guild.roles.cache
            .filter((role) => !isNaN(role.name))
            .sort((b1, b2) => Number(b1.name) - Number(b2.name))
            .forEach((role) => {
            x += 75;
            if (x > 100 * 10) {
                x = 75;
                y += 80;
            }
            xd.setTextBaseline("middle")
                .setTextAlign("center")
                .setColor(role.hexColor)
                .addBeveledRect(x, y, 60, 60, 15)
                .setColor("white");
            if (`${role.name}`.length > 2) {
                xd.setTextSize(30);
            }
            else if (`${role.name}`.length > 1) {
                xd.setTextSize(40);
            }
            else {
                xd.setTextSize(50);
            }
            xd.addText(role.name, x + 30, y + 30);
        });
        (0, respond_1.respond)(interaction, message, {
            content: "Req:",
            files: [
                {
                    attachment: xd.toBuffer(),
                    name: "image.png",
                },
            ],
        }, isSlash);
    },
};
