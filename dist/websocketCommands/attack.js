"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attackHandler = void 0;
const room_1 = require("../db/rooms/room");
const attack_1 = __importDefault(require("../response/attack"));
const turn_1 = __importDefault(require("../response/turn"));
const singleAttack_1 = __importDefault(require("./singleAttack"));
const winner_1 = __importDefault(require("./winner"));
const reAttack_1 = __importDefault(require("./reAttack"));
const attackHandler = (data, wss, ws, random) => {
    const { gameId, x, y, indexPlayer } = JSON.parse(data);
    const room = room_1.roomsDB.rooms.get(gameId);
    const currentUser = room.find((e) => e.index === indexPlayer);
    if (!currentUser.isTurn)
        return;
    let pos;
    if (random) {
        const variations = [...currentUser.attackVariations];
        const item = Math.floor(Math.random() * variations.length);
        pos = variations[item];
    }
    else {
        pos = JSON.stringify({ x, y });
    }
    const users = room.map((e) => e.index);
    const index = users.find((e) => e !== indexPlayer);
    const result = room_1.roomsDB.setAttack(gameId, index, pos);
    const isSinglePlay = room.some((e) => !e.index);
    if (result === 'empty')
        return;
    if (result === 'win') {
        (0, winner_1.default)(currentUser, users, gameId, indexPlayer, wss, ws, isSinglePlay);
        return;
    }
    if (isSinglePlay) {
        (0, singleAttack_1.default)(currentUser, pos, indexPlayer, result, room, gameId, ws);
        return;
    }
    if ((0, reAttack_1.default)(currentUser, users, gameId, pos, index, wss))
        return;
    room_1.roomsDB.setAttackMap(gameId, indexPlayer, pos);
    for (const i of wss.clients) {
        const client = i;
        if (users.includes(client.id)) {
            (0, attack_1.default)(pos, indexPlayer, result, ws);
            (0, turn_1.default)(result === 'miss' ? index : indexPlayer, i);
            if (result === 'miss') {
                room_1.roomsDB.setTurn(gameId, client.id);
            }
        }
    }
};
exports.attackHandler = attackHandler;
