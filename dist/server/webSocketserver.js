"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
const reg_1 = require("../websocketCommands/reg");
const createRoom_1 = require("../websocketCommands/createRoom");
const startGame_1 = require("../websocketCommands/startGame");
const addShips_1 = require("../websocketCommands/addShips");
const attack_1 = require("../websocketCommands/attack");
const turn_1 = require("../websocketCommands/turn");
const finishGame_1 = require("../websocketCommands/finishGame");
const updateWinners_1 = require("../websocketCommands/updateWinners");
const updateRoom_1 = require("../websocketCommands/updateRoom");
const startWebSocketServer = (port) => {
    console.log(`Start WebSocket server on localhost:${port}`);
    const wss = new ws_1.default.Server({ port });
    wss.on('connection', (ws) => {
        console.log('WebSocket connection established');
        ws.on('message', (message) => {
            console.log('Received message:', message);
            try {
                const messageString = message.toString();
                const { type, data, id } = JSON.parse(messageString);
                switch (type) {
                    case 'reg':
                        (0, reg_1.handleRegCommand)(ws, data);
                        break;
                    case 'create_game':
                        (0, createRoom_1.createRoomHandler)(ws, data);
                        break;
                    case 'start_game':
                        (0, startGame_1.startGameHandler)(ws, data.roomId);
                        break;
                    case 'add_ships':
                        (0, addShips_1.addShipsHandler)(data.roomId, data.userId, data.ships, data.indexPlayer);
                        break;
                    case 'attack':
                        (0, attack_1.attackHandler)(data.roomId, data.userId, data.x, data.y);
                        break;
                    case 'turn':
                        (0, turn_1.turnHandler)(data.roomId);
                        break;
                    case 'finish':
                        (0, finishGame_1.finishGameHandler)(data.roomId);
                        break;
                    case 'update_winners':
                        (0, updateWinners_1.updateWinnersHandler)();
                        break;
                    case 'update_room':
                        (0, updateRoom_1.updateRoomHandler)();
                        break;
                    default:
                        // Handle unknown message types or invalid requests
                        break;
                }
            }
            catch (error) {
                console.error('Error processing message:', error);
                // Handle parsing or other errors
            }
        });
        ws.on('close', () => {
            console.log('WebSocket connection closed');
            // Clean up any resources or handle disconnection logic here
        });
    });
};
exports.startWebSocketServer = startWebSocketServer;
