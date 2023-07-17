"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const winner_1 = require("../db/winners/winner");
const updateRoom_1 = __importDefault(require("../response/updateRoom"));
const updateWinners_1 = __importDefault(require("../response/updateWinners"));
const finishGame_1 = __importDefault(require("../response/finishGame"));
function win(currentUser, users, gameId, indexPlayer, wss, ws, isSingle) {
    room_1.roomsDB.removeRoom(gameId);
    if (isSingle) {
        (0, finishGame_1.default)(indexPlayer, ws);
        return;
    }
    winner_1.winnersDB.addWinner(currentUser.name);
    for (const i of wss.clients) {
        const client = i;
        if (users.includes(client.id))
            (0, finishGame_1.default)(indexPlayer, i);
        (0, updateRoom_1.default)(i);
        (0, updateWinners_1.default)(i);
    }
}
exports.default = win;
