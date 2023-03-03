"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
exports.default = async (db, guild) => {
    let { default: { getChannelVideos }, } = await Promise.resolve().then(() => __importStar(require("yt-channel-info")));
    let primeTable = await db.table("prime");
    let data = await primeTable.get(`YTnt_${guild.id}`);
    if (!data)
        return;
    let channel = guild.channels.cache.get(data.c);
    let video = await getChannelVideos({
        channelId: data.id,
        channelIdType: 0,
        sortBy: "newest",
    });
    if (channel && channel?.isText()) {
        let content = index_1.default.replys["videoNOT"]
            .replace("{videoURL}", `https://www.youtube.com/watch?v=${video.items[0].videoId}`)
            .replace("{videoName}", `${video.items[0].title}`);
        if ((await channel.messages.fetch())
            .filter((m) => m.author.id == guild.me?.user.id)
            .first()
            ?.content.includes(content))
            return;
        channel.send(content);
    }
};
