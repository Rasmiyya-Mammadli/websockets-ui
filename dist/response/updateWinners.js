"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winner_1 = require("../db/winners/winner");
function updateWinners(ws) {
    const winners = [];
    for (const [name, wins] of winner_1.winnersDB.winners)
        winners.push({ name, wins });
    const response = {
        type: 'update_winners',
        data: JSON.stringify(winners),
        id: 0,
    };
    ws.send(JSON.stringify(response));
}
exports.default = updateWinners;
