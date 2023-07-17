"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGameHandler = void 0;
const room_1 = require("../db/rooms/room");
const startGameHandler = (ws, data) => {
    const { roomId } = data;
    const room = room_1.roomsDB.rooms.get(roomId);
    if (!room)
        return;
    const allShipsPlaced = room.every((user) => user.ships);
    if (!allShipsPlaced)
        return;
    const currentPlayerIndex = room.findIndex((user) => user.isTurn);
    const currentPlayer = room[currentPlayerIndex];
    const ships = [];
    for (const shipCells of currentPlayer.shipsCells) {
        const shipPositions = [];
        for (const cell of shipCells) {
            shipPositions.push(JSON.parse(cell));
        }
        const { x, y } = shipPositions[0];
        const direction = shipPositions[1].x === x + 1;
        const length = shipPositions.length;
        const type = getShipType(length);
        ships.push({
            position: { x, y },
            direction,
            length,
            type,
        });
    }
    const response = {
        type: 'start_game',
        data: {
            ships,
            currentPlayerIndex,
        },
        id: 0,
    };
    ws.send(JSON.stringify(response));
};
exports.startGameHandler = startGameHandler;
const getShipType = (length) => {
    if (length === 1) {
        return 'small';
    }
    else if (length === 2) {
        return 'medium';
    }
    else if (length === 3) {
        return 'large';
    }
    else {
        return 'huge';
    }
};
