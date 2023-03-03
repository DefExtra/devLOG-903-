"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (m, db) => {
    let status = await db.get(`AFK_${m.mentions.users.first()?.id}`);
    if (status == true)
        return true;
    else
        return false;
};
