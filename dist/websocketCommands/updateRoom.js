"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomHandler = void 0;
const room_1 = require("../db/rooms/room");
const updateRoomHandler = () => {
    const rooms = room_1.roomsDB.rooms;
    const roomList = [];
    rooms.forEach((players, roomId) => {
        if (players.length === 1) {
            const roomUsers = players.map((player) => ({ name: player.name, index: player.index }));
            roomList.push({ roomId, roomUsers });
        }
    });
    return roomList;
};
exports.updateRoomHandler = updateRoomHandler;
