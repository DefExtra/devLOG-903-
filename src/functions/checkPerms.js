"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../utils/modules/respond");
const register_1 = __importDefault(require("../utils/modules/register"));
exports.default = async (user, perms, respondCIG, replys) => {
    let is = 0;
    let settingsTable = await register_1.default.table("settings");
    let roles = await settingsTable.get(`ARoles_${user?.guild.id}`);
    await roles?.forEach((roleID) => {
        if (user?.roles.cache.get(roleID))
            is = 1;
    });
    if (is == 1)
        return true;
    if (!user?.permissions.has(perms))
        return (0, respond_1.respond)(respondCIG.base1, respondCIG.base2, {
            content: replys.noPerms
                .replace("{userID}", user?.id)
                .replace("{perm}", perms),
        }, respondCIG.isSlash);
    else
        return true;
};
