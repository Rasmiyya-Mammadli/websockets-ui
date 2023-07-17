"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function startGame(thisShips, userId, ws) {
    const response = {
        type: 'start_game',
        data: JSON.stringify({
            ships: thisShips,
            currentPlayerIndex: userId,
        }),
        id: 0,
    };
    ws.send(JSON.stringify(response));
}
exports.default = startGame;
