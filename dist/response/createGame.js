"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createGame(indexRoom, userId, ws) {
    const response = {
        type: 'create_game',
        data: JSON.stringify({
            idGame: indexRoom,
            idPlayer: userId,
        }),
        id: 0,
    };
    ws.send(JSON.stringify(response));
}
exports.default = createGame;
