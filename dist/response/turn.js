"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function turn(userID, ws) {
    const response = {
        type: 'turn',
        data: JSON.stringify({
            currentPlayer: userID,
        }),
        id: 0,
    };
    ws.send(JSON.stringify(response));
}
exports.default = turn;
