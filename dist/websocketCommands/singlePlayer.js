"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const user_1 = require("../db/users/user");
const updateRoom_1 = __importDefault(require("../response/updateRoom"));
const createGame_1 = __importDefault(require("../response/createGame"));
function singlePlayer(wss, ws, userId) {
    for (const [key, value] of room_1.roomsDB.rooms) {
        if (value.some((i) => i.index === userId)) {
            room_1.roomsDB.removeRoom(key);
            wss.clients.forEach(updateRoom_1.default);
            break;
        }
    }
    const thisUser = user_1.usersDB.getPlayerByID(userId);
    const indexRoom = room_1.roomsDB.createRoom({
        name: thisUser.name,
        index: thisUser.currentID,
        isTurn: true,
    }, true);
    room_1.roomsDB.addUserToRoom(indexRoom, 0);
    (0, createGame_1.default)(indexRoom, userId, ws);
}
exports.default = singlePlayer;
