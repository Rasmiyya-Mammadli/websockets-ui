"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnHandler = void 0;
const room_1 = require("../db/rooms/room");
const turnHandler = (roomId) => {
    var _a;
    const room = room_1.roomsDB.rooms.get(roomId);
    if (!room)
        return undefined;
    const currentPlayerIndex = room.findIndex((user) => user.isTurn);
    const currentPlayer = (_a = room[currentPlayerIndex]) === null || _a === void 0 ? void 0 : _a.index;
    if (currentPlayer === undefined)
        return undefined;
    return { currentPlayer };
};
exports.turnHandler = turnHandler;
