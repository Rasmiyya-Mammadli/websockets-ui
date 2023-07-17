"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserToRoom = void 0;
const room_1 = require("../db/rooms/room");
const user_1 = require("../db/users/user");
const addUserToRoom = (roomId, userId) => {
    const room = room_1.roomsDB.rooms.get(roomId);
    if (room) {
        const userName = user_1.usersDB.getPlayerByID(userId).name;
        const isAdded = room.find((user) => user.index === userId);
        if (isAdded || room.length >= 2) {
            return { success: false };
        }
        room.push({
            name: userName,
            index: userId,
            isTurn: false,
        });
        return { success: true, roomData: room };
    }
    return { success: false };
};
exports.addUserToRoom = addUserToRoom;
