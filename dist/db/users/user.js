"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDB = void 0;
const bot = {
    name: 'BOT',
    password: '',
    currentID: 0,
};
exports.usersDB = {
    users: [bot],
    getPlayerByName(name) {
        return this.users.find((player) => player.name === name) || false;
    },
    getPlayerByID(currentID) {
        return this.users.find((player) => player.currentID === currentID) || false;
    },
    addPlayer(name, password, currentID) {
        const player = { name, password, currentID };
        this.users.push(player);
    },
    exitPlayer(currentID) {
        const user = this.getPlayerByID(currentID);
        if (!user)
            return;
        user.currentID = -1;
    },
    updateId(name, newId) {
        const user = this.getPlayerByName(name);
        if (!user)
            return;
        user.currentID = newId;
    },
};
