"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const startGame_1 = __importDefault(require("../response/startGame"));
const turn_1 = __importDefault(require("../response/turn"));
const getShip_1 = __importDefault(require("./getShip"));
const randomShip_1 = __importDefault(require("./randomShip"));
function addShipsHandler(data, wss, ws) {
    const { gameId, ships, indexPlayer } = JSON.parse(data);
    const shipsList = (0, getShip_1.default)(ships);
    const shipsCount = room_1.roomsDB.setShips(gameId, indexPlayer, ships, shipsList);
    const room = room_1.roomsDB.rooms.get(gameId);
    const isSinglePlay = room.some((e) => !e.index);
    if (isSinglePlay) {
        const random = (0, randomShip_1.default)();
        const randomList = (0, getShip_1.default)(random);
        room_1.roomsDB.setShips(gameId, 0, random, randomList);
        (0, startGame_1.default)(ships, indexPlayer, ws);
        (0, turn_1.default)(indexPlayer, ws);
        return;
    }
    if (shipsCount === 2) {
        const users = room.map((e) => e.index);
        const currentTurn = users[Math.round(Math.random())];
        room_1.roomsDB.setTurn(gameId, currentTurn);
        for (const i of wss.clients) {
            const client = i;
            if (!users.includes(client.id))
                continue;
            const thisShips = room.find((e) => e.index === client.id).ships;
            if (!thisShips)
                continue;
            (0, startGame_1.default)(thisShips, client.id, i);
            (0, turn_1.default)(currentTurn, i);
        }
    }
}
exports.default = addShipsHandler;
