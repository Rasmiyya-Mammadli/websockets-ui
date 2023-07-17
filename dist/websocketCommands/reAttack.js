"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const turn_1 = __importDefault(require("../response/turn"));
function reAttack(currentUser, users, gameId, pos, index, wss) {
    let isReAttack = false;
    if (currentUser.attackMap) {
        isReAttack = currentUser.attackMap.has(pos);
        if (isReAttack) {
            for (const i of wss.clients) {
                const client = i;
                if (users.includes(client.id)) {
                    const client = i;
                    (0, turn_1.default)(index, i);
                    room_1.roomsDB.setTurn(gameId, client.id);
                }
            }
        }
    }
    return isReAttack;
}
exports.default = reAttack;
