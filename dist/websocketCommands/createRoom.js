"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const user_1 = require("../db/users/user");
const updateRoom_1 = __importDefault(require("../response/updateRoom"));
function createRoom(wss, userID) {
    for (const room of room_1.roomsDB.rooms.values()) {
        if (room.some((i) => i.index === userID))
            return;
    }
    const thisUser = user_1.usersDB.getPlayerByID(userID);
    room_1.roomsDB.createRoom({
        name: thisUser.name,
        index: thisUser.currentID,
        isTurn: false,
    });
    wss.clients.forEach(updateRoom_1.default);
}
exports.default = createRoom;
