"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishGameHandler = void 0;
const room_1 = require("../db/rooms/room");
const finishGameHandler = (roomId) => {
    var _a;
    const room = room_1.roomsDB.rooms.get(roomId);
    if (!room)
        return undefined;
    const remainingPlayers = room.filter((user) => user.shipsCells && user.shipsCells.length > 0);
    if (remainingPlayers.length > 1)
        return undefined;
    const winPlayer = (_a = remainingPlayers[0]) === null || _a === void 0 ? void 0 : _a.index;
    if (winPlayer === undefined)
        return undefined;
    return { winPlayer };
};
exports.finishGameHandler = finishGameHandler;
