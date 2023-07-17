"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const createGame_1 = __importDefault(require("../response/createGame"));
const updateRoom_1 = __importDefault(require("../response/updateRoom"));
function addUserToRoom(data, wss, userId) {
    const { indexRoom } = JSON.parse(data);
    const currentUserRoom = room_1.roomsDB.userInRoom(userId);
    if (currentUserRoom)
        room_1.roomsDB.removeRoom(currentUserRoom);
    const success = room_1.roomsDB.addUserToRoom(indexRoom, userId);
    if (!success)
        return;
    const users = room_1.roomsDB.rooms.get(indexRoom).map((e) => e.index);
    for (const i of wss.clients) {
        const client = i;
        if (users.includes(client.id)) {
            (0, createGame_1.default)(indexRoom, client.id, i);
        }
        else {
            (0, updateRoom_1.default)(i);
        }
    }
}
exports.default = addUserToRoom;
