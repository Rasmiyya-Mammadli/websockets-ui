"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function attack(pos, userId, attackResult, ws) {
    const response = {
        type: 'attack',
        data: JSON.stringify({
            position: JSON.parse(pos),
            currentPlayer: userId,
            status: attackResult,
        }),
        id: 0,
    };
    ws.send(JSON.stringify(response));
}
exports.default = attack;
