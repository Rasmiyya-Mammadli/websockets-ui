"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpServer_1 = require("./httpServer");
const ws_1 = require("ws");
const reg_1 = __importDefault(require("../websocketCommands/reg"));
const createRoom_1 = __importDefault(require("../websocketCommands/createRoom"));
const addShips_1 = __importDefault(require("../websocketCommands/addShips"));
const attack_1 = require("../websocketCommands/attack");
const singlePlayer_1 = __importDefault(require("../websocketCommands/singlePlayer"));
const closeGame_1 = __importDefault(require("../websocketCommands/closeGame"));
const addUserToRoom_1 = __importDefault(require("../websocketCommands/addUserToRoom"));
function startWebSocketServer() {
    const wss = new ws_1.WebSocket.Server({ server: httpServer_1.httpServer });
    wss.on('connection', function connection(ws) {
        ws.id = Date.now();
        ws.on('message', function incoming(message) {
            try {
                const mes = JSON.parse(message);
                console.log(mes.type);
                switch (mes.type) {
                    case 'reg':
                        (0, reg_1.default)(mes.ws, mes.data, ws.id);
                        break;
                    case 'create_room':
                        (0, createRoom_1.default)(wss, ws.id);
                        break;
                    case 'add_user_to_room':
                        (0, addUserToRoom_1.default)(mes.data, wss, ws.id);
                        break;
                    case 'add_ships':
                        (0, addShips_1.default)(mes.data, wss, ws);
                        break;
                    case 'attack':
                        (0, attack_1.attackHandler)(mes.roomId, mes.userId, mes.x, mes.y);
                        break;
                    case 'random_attack':
                        (0, attack_1.attackHandler)(mes.data, wss, ws, true);
                        break;
                    case 'single_play':
                        (0, singlePlayer_1.default)(wss, ws, ws.id);
                        break;
                    default:
                        console.log('Unknown message:', mes.type);
                        break;
                }
            }
            catch (error) {
                console.error('Error processing message:', error);
                // Handle parsing or other errors
            }
        });
        ws.on('close', () => {
            (0, closeGame_1.default)(wss, ws.id);
            console.log('WebSocket connection closed');
        });
    });
}
exports.default = startWebSocketServer;
