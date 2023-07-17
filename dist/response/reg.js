"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reg(ws, name, index, error = false, errorText = '') {
    const response = {
        type: 'reg',
        data: JSON.stringify({ name, index, error, errorText }),
        id: 0,
    };
    ws.send(JSON.stringify(response));
}
exports.default = reg;
