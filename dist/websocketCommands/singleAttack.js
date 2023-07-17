"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const finishGame_1 = __importDefault(require("../response/finishGame"));
const attack_1 = __importDefault(require("../response/attack"));
const turn_1 = __importDefault(require("../response/turn"));
function singlePlayAttack(currentUser, pos, indexPlayer, attackResult, room, gameId, ws) {
    var _a;
    const isReAttack = !!((_a = currentUser.attackMap) === null || _a === void 0 ? void 0 : _a.has(pos));
    if (!isReAttack) {
        (0, attack_1.default)(pos, indexPlayer, attackResult, ws);
    }
    if (attackResult === 'miss' || isReAttack) {
        const bot = room.find((e) => !e.index);
        const variationsBot = [...bot.attackVariations];
        let botAttack = 'empty';
        while (botAttack !== 'miss') {
            (0, turn_1.default)(0, ws);
            const itemBot = Math.floor(Math.random() * variationsBot.length);
            const botPos = variationsBot.splice(itemBot, 1)[0];
            botAttack = room_1.roomsDB.setAttack(gameId, indexPlayer, botPos);
            if (botAttack === 'win') {
                (0, finishGame_1.default)(0, ws);
                return;
            }
            (0, attack_1.default)(botPos, 0, botAttack, ws);
        }
    }
    (0, turn_1.default)(indexPlayer, ws);
    room_1.roomsDB.setAttackMap(gameId, indexPlayer, pos);
}
exports.default = singlePlayAttack;
