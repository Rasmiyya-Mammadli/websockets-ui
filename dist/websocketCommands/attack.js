"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attackHandler = void 0;
const room_1 = require("../db/rooms/room");
const attackHandler = (roomId, userId, x, y) => {
    const room = room_1.roomsDB.rooms.get(roomId);
    if (!room)
        return undefined;
    const currentPlayer = room.find((user) => user.index === userId);
    const enemyPlayer = room.find((user) => user.index !== userId);
    if (!currentPlayer || !enemyPlayer)
        return undefined;
    const position = { x, y };
    const status = performAttack(enemyPlayer, position);
    const feedback = { position, currentPlayer: userId, status };
    return feedback;
};
exports.attackHandler = attackHandler;
const performAttack = (player, position) => {
    const ships = player.shipsCells;
    if (!ships)
        return "empty";
    for (let i = 0; i < ships.length; i++) {
        const shipCells = ships[i];
        if (shipCells.has(JSON.stringify(position))) {
            shipCells.delete(JSON.stringify(position));
            if (shipCells.size === 0) {
                ships.splice(i, 1);
                markSurroundingCellsAsMiss(player, shipCells);
                return "killed";
            }
            return "shot";
        }
    }
    return "miss";
};
const markSurroundingCellsAsMiss = (player, shipCells) => {
    var _a;
    const { x, y } = JSON.parse(Array.from(shipCells)[0]);
    const surroundingCells = [
        JSON.stringify({ x: x - 1, y: y - 1 }),
        JSON.stringify({ x: x - 1, y }),
        JSON.stringify({ x: x - 1, y: y + 1 }),
        JSON.stringify({ x, y: y - 1 }),
        JSON.stringify({ x, y: y + 1 }),
        JSON.stringify({ x: x + 1, y: y - 1 }),
        JSON.stringify({ x: x + 1, y }),
        JSON.stringify({ x: x + 1, y: y + 1 }),
    ];
    for (const cell of surroundingCells) {
        if (!shipCells.has(cell)) {
            (_a = player.attackMap) === null || _a === void 0 ? void 0 : _a.add(cell);
        }
    }
};
