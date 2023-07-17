"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWinnersHandler = void 0;
const winner_1 = require("../db/winners/winner");
const updateWinnersHandler = () => {
    const winners = winner_1.winnersDB.winners;
    const winnersTable = [];
    winners.forEach((wins, name) => {
        winnersTable.push({ name, wins });
    });
    return winnersTable;
};
exports.updateWinnersHandler = updateWinnersHandler;
