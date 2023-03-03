"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "create_colors",
    description: "create colors for the server.",
    type: 1,
    options: [],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_ROLES", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            await (0, respond_1.respond)(interaction, message, {
                content: REPLYS.preCOLORS,
            }, isSlash).then(async (d) => {
                await guild?.roles.create({
                    name: "1",
                    color: "#FFB6C1",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "2",
                    color: "#FFC0CB",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "3",
                    color: "#FF69B4",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "4",
                    color: "#FF1493",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "5",
                    color: "#DB7093",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "6",
                    color: "#C71585",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "7",
                    color: "#E6E6FA",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "8",
                    color: "#D8BFD8",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "8",
                    color: "#DDA0DD",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "9",
                    color: "#DA70D6",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "10",
                    color: "#EE82EE",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "11",
                    color: "#FF00FF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "12",
                    color: "#BA55D3",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "13",
                    color: "#9932CC",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "14",
                    color: "#9400D3",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "15",
                    color: "#8A2BE2",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "16",
                    color: "#8B008B",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "17",
                    color: "#800080",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "18",
                    color: "#9370DB",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "19",
                    color: "#7B68EE",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "20",
                    color: "#6A5ACD",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "21",
                    color: "#483D8B",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "22",
                    color: "#663399",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "23",
                    color: "#4B0082",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "24",
                    color: "#FFA07A",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "25",
                    color: "#FA8072",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "26",
                    color: "#E9967A",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "27",
                    color: "#F08080",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "28",
                    color: "#CD5C5C",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "29",
                    color: "#DC143C",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "30",
                    color: "#FF0000",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "31",
                    color: "#B22222",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "32",
                    color: "#8B0000",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "33",
                    color: "#FFA500",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "34",
                    color: "#FF8C00",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "35",
                    color: "#FF7F50",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "36",
                    color: "#FF6347",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "37",
                    color: "#FF4500",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "38",
                    color: "#FFD700",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "39",
                    color: "#FFFFE0",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "40",
                    color: "#FFFACD",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "41",
                    color: "#FAFAD2",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "42",
                    color: "#FFEFD5",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "43",
                    color: "#FFE4B5",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "44",
                    color: "#FFDAB9",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "45",
                    color: "#EEE8AA",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "46",
                    color: "#F0E68C",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "47",
                    color: "#BDB76B",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "48",
                    color: "#ADFF2F",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "49",
                    color: "#7FFF00",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "50",
                    color: "#7CFC00",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "51",
                    color: "#00FF00",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "52",
                    color: "#32CD32",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "53",
                    color: "#98FB98",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "54",
                    color: "#90EE90",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "55",
                    color: "#00FA9A",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "56",
                    color: "#00FF7F",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "57",
                    color: "#3CB371",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "58",
                    color: "#2E8B57",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "59",
                    color: "#2E8B57",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "60",
                    color: "#008000",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "61",
                    color: "#006400",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "62",
                    color: "#9ACD32",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "63",
                    color: "#6B8E23",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "64",
                    color: "#556B2F",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "65",
                    color: "#66CDAA",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "66",
                    color: "#8FBC8F",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "67",
                    color: "#20B2AA",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "68",
                    color: "#008B8B",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "69",
                    color: "#008080",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "70",
                    color: "#00FFFF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "71",
                    color: "#E0FFFF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "72",
                    color: "#AFEEEE",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "73",
                    color: "#7FFFD4",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "74",
                    color: "#40E0D0",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "75",
                    color: "#48D1CC",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "76",
                    color: "#00CED1",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "77",
                    color: "#5F9EA0",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "78",
                    color: "#4682B4",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "79",
                    color: "#B0C4DE",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "80",
                    color: "#ADD8E6",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "81",
                    color: "#B0E0E6",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "82",
                    color: "#87CEFA",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "83",
                    color: "#87CEEB",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "84",
                    color: "#6495ED",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "85",
                    color: "#00BFFF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "86",
                    color: "#1E90FF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "87",
                    color: "#4169E1",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "88",
                    color: "#0000FF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "89",
                    color: "#0000CD",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "90",
                    color: "#00008B",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "91",
                    color: "#000080",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "92",
                    color: "#191970",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "93",
                    color: "#FFF8DC",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "94",
                    color: "#FFEBCD",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "95",
                    color: "#FFE4C4",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "96",
                    color: "#FFDEAD",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "97",
                    color: "#F5DEB3",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "98",
                    color: "#DEB887",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "99",
                    color: "#D2B48C",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "100",
                    color: "#BC8F8F",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "101",
                    color: "#F4A460",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "102",
                    color: "#DAA520",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "103",
                    color: "#B8860B",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "104",
                    color: "#CD853F",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "105",
                    color: "#D2691E",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "106",
                    color: "#808000",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "107",
                    color: "#8B4513",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "108",
                    color: "#A0522D",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "109",
                    color: "#A52A2A",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "110",
                    color: "#800000",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "111",
                    color: "#FFFFFF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "112",
                    color: "#FFFAFA",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "113",
                    color: "#F0FFF0",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "114",
                    color: "#F5FFFA",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "115",
                    color: "#F0FFFF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "116",
                    color: "#F0F8FF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "117",
                    color: "#F8F8FF",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "118",
                    color: "#F5F5F5",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "119",
                    color: "#FFF5EE",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "120",
                    color: "#F5F5DC",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "121",
                    color: "#FDF5E6",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "122",
                    color: "#FFFAF0",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "123",
                    color: "#FFFFF0",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "124",
                    color: "#FAEBD7",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "125",
                    color: "#FAF0E6",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "126",
                    color: "#FFF0F5",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "127",
                    color: "#FFE4E1",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "128",
                    color: "#DCDCDC",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "129",
                    color: "#D3D3D3",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "130",
                    color: "#C0C0C0",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "131",
                    color: "#f7f7f7",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "132",
                    color: "#b2b2b2",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "133",
                    color: "#6f6c6c",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "134",
                    color: "#4d4646",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "135",
                    color: "#4c4c4c",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "136",
                    color: "#2F4F4F",
                    permissions: [],
                });
                await guild?.roles.create({
                    name: "137",
                    color: "#040000",
                    permissions: [],
                });
                await (0, respond_1.editRespond)(interaction, message, {
                    content: REPLYS.doneCOLORS,
                }, isSlash, d.id);
            });
        }
    },
};
