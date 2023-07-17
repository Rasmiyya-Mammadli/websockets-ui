"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function finish(userId, ws) {
    const response = {
        type: 'finish',
        data: JSON.stringify({
            winPlayer: userId,
        }),
        id: 0,
    };
    ws.send(JSON.stringify(response));
}
exports.default = finish;
