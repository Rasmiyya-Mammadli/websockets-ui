"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsDB = void 0;
const allCells_1 = require("../../websocketCommands/allCells");
const user_1 = require("../users/user");
exports.roomsDB = {
    rooms: new Map(),
    createRoom(user, bot) {
        const roomId = Date.now() * (bot ? -1 : 1);
        const roomUsers = [user];
        this.rooms.set(roomId, roomUsers);
        return roomId;
    },
    addUserToRoom(roomId, userId) {
        const room = this.rooms.get(roomId);
        if (room) {
            const userName = user_1.usersDB.getPlayerByID(userId).name;
            const isAdded = room.find((user) => user.index === userId);
            if (isAdded || room.length >= 2)
                return false;
            room.push({
                name: userName,
                index: userId,
                isTurn: false,
            });
            return true;
        }
        return false;
    },
    setShips(roomId, userId, ships, shipsCells) {
        const room = this.rooms.get(roomId);
        if (!room)
            return 0;
        const user = room.find((user) => user.index === userId);
        if (!user)
            return 0;
        user.ships = ships;
        user.shipsCells = shipsCells;
        user.attackVariations = new Set(allCells_1.allCells);
        return room.reduce((s, c) => s + +!!c.ships, 0);
    },
    setAttack(roomId, userId, position) {
        let res = 'empty';
        const room = this.rooms.get(roomId);
        if (!room)
            return res;
        const user = room.find((user) => user.index === userId);
        const currentUser = room.find((user) => user.index !== userId);
        if (!user)
            return res;
        const ships = user.shipsCells;
        if (!ships)
            return res;
        res = 'miss';
        const variations = currentUser.attackVariations;
        if (variations) {
            if (variations.has(position))
                variations.delete(position);
        }
        for (let i = 0; i < ships.length; i += 1) {
            const shipCells = ships[i];
            if (!shipCells)
                continue;
            if (shipCells.has(position)) {
                res = 'shot';
                shipCells.delete(position);
                if (!shipCells.size) {
                    ships.splice(i, 1);
                    res = 'killed';
                    break;
                }
            }
        }
        if (!ships.length)
            res = 'win';
        return res;
    },
    setTurn(roomId, userId) {
        const room = this.rooms.get(roomId);
        if (!room)
            return;
        const user = room.find((user) => user.index === userId);
        if (!user)
            return;
        user.isTurn = !user.isTurn;
        return user.isTurn;
    },
    setAttackMap(roomId, userId, position) {
        const room = this.rooms.get(roomId);
        if (!room)
            return;
        const user = room.find((user) => user.index === userId);
        if (!user)
            return;
        if (!user.attackMap)
            user.attackMap = new Set();
        user.attackMap.add(position);
    },
    removeRoom(roomId) {
        if (this.rooms.get(roomId))
            this.rooms.delete(roomId);
    },
    userInRoom(userId) {
        for (const [key, value] of this.rooms) {
            if (value.some(e => e.index === userId))
                return key;
        }
        return 0;
    }
};
