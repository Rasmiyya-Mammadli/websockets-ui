"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winnersDB = void 0;
exports.winnersDB = {
    winners: new Map(),
    addWinner(name) {
        const winners = this.winners;
        winners.set(name, (winners.get(name) || 0) + 1);
    },
};
