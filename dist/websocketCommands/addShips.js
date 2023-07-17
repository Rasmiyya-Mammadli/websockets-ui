"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addShipsHandler = void 0;
const room_1 = require("../db/rooms/room");
const addShipsHandler = (roomId, userId, ships, indexPlayer) => {
    const room = room_1.roomsDB.rooms.get(roomId);
    if (!room)
        return undefined;
    const user = room.find((user) => user.index === userId);
    if (!user)
        return undefined;
    user.ships = ships;
    user.shipsCells = [];
    for (const ship of ships) {
        const { position, direction, length, type } = ship;
        const shipCells = [];
        if (direction) {
            for (let i = 0; i < length; i++) {
                shipCells.push({ x: position.x + i, y: position.y });
            }
        }
        else {
            for (let i = 0; i < length; i++) {
                shipCells.push({ x: position.x, y: position.y + i });
            }
        }
        user.shipsCells.push(new Set(shipCells.map((cell) => JSON.stringify(cell))));
    }
    const allShipsPlaced = room.every((user) => user.ships);
    if (allShipsPlaced) {
        const currentPlayerIndex = indexPlayer;
        const roomData = {
            roomId,
            roomUsers: room,
        };
        return { roomData, currentPlayerIndex };
    }
    return undefined;
};
exports.addShipsHandler = addShipsHandler;
