"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./src/utils/bot");
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const config = js_yaml_1.default.load(
  fs_1.default.readFileSync(__dirname + "/config.yml", "utf8")
);
const bot = new bot_1.Bot();
(() => {
  bot.registerCommands("/src/commands");
  bot.client.on("SystemLog", ({ text, error }) => {
    console.log(text);
    error ? console.log(error) : undefined;
  });
  bot.on("SystemLog", ({ text }) =>
    bot.client.emit("SystemLog", {
      type: "base",
      text: text,
      error: null,
    })
  );
  bot.login(config.BOT.TOKEN);
})();
exports.default = {
  Manager: bot.getManager(),
  bot: bot,
  replys: config.REPLYS,
  config,
};
