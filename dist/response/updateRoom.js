"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
function updateRoom(ws) {
    const roomsList = [];
    for (const [roomId, roomUsers] of room_1.roomsDB.rooms) {
        if (roomId > 0)
            roomsList.push({ roomId, roomUsers });
    }
    const response = {
        type: 'update_room',
        data: JSON.stringify(roomsList),
        id: 0,
    };
    ws.send(JSON.stringify(response));
}
exports.default = updateRoom;
