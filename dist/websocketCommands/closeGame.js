"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const user_1 = require("../db/users/user");
const updateRoom_1 = __importDefault(require("../response/updateRoom"));
const winner_1 = __importDefault(require("./winner"));
function closeGameHandler(wss, userID) {
    for (const [key, value] of room_1.roomsDB.rooms) {
        if (value.some((i) => i.index === userID)) {
            const secondUser = value.find((i) => i.index !== userID);
            const withBot = secondUser ? !secondUser.index : false;
            if (value.length < 2 || withBot) {
                room_1.roomsDB.removeRoom(key);
                wss.clients.forEach(updateRoom_1.default);
                break;
            }
            else {
                if (!secondUser)
                    break;
                for (const i of wss.clients) {
                    const client = i;
                    if (client.id === secondUser.index) {
                        (0, winner_1.default)(secondUser, [client.id, userID], key, client.id, wss, client);
                    }
                }
            }
        }
    }
    user_1.usersDB.exitPlayer(userID);
}
exports.default = closeGameHandler;
