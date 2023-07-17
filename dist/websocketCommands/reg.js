"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../db/rooms/room");
const user_1 = require("../db/users/user");
const reg_1 = __importDefault(require("../response/reg"));
const updateRoom_1 = __importDefault(require("../response/updateRoom"));
function handleRegCommand(data, ws, userId) {
    const { name, password } = JSON.parse(data);
    const isSign = user_1.usersDB.getPlayerByName(name);
    if (isSign) {
        if (password === isSign.password) {
            if (isSign.currentID > 0) {
                (0, reg_1.default)(ws, name, -1, true, 'Player with this name already exists');
            }
            else {
                user_1.usersDB.updateId(name, userId);
                (0, reg_1.default)(ws, name, userId);
                if (room_1.roomsDB.rooms.size)
                    (0, updateRoom_1.default)(ws);
            }
        }
        else {
            (0, reg_1.default)(ws, name, -1, true, 'Incorrect password');
        }
    }
    else {
        user_1.usersDB.addPlayer(name, password, userId);
        (0, reg_1.default)(ws, name, userId);
        if (room_1.roomsDB.rooms.size)
            (0, updateRoom_1.default)(ws);
    }
}
exports.default = handleRegCommand;
