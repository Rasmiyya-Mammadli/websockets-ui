import { httpServer } from './httpServer';
import { WebSocket, Server as WebSocketServer } from 'ws';
import handleRegCommand from '../websocketCommands/reg';
import createRoomHandler  from '../websocketCommands/createRoom';
import  addShipsHandler  from '../websocketCommands/addShips';
import { attackHandler } from '../websocketCommands/attack';
import singlePlayer from '../websocketCommands/singlePlayer';
import closeGameHandler from '../websocketCommands/closeGame';
import addUserToRoom from '../websocketCommands/addUserToRoom';

export interface WebSocketWithId extends WebSocket {
  id: number;
}

export default function startWebSocketServer () {
  const wss: WebSocketServer = new WebSocket.Server({ server: httpServer });

  wss.on('connection', function connection(ws: WebSocketWithId) {
    ws.id = Date.now();
    ws.on('message', function incoming(message: string) {
      try {
        const mes = JSON.parse(message);
        console.log(mes.type);
        switch (mes.type) {
          case 'reg':
            handleRegCommand(mes.ws, mes.data, ws.id);
            break;
          case 'create_room':
            createRoomHandler(wss, ws.id);
            break;
          case 'add_user_to_room':
            addUserToRoom(mes.data, wss, ws.id);
            break;
          case 'add_ships':
            addShipsHandler(mes.data, wss, ws);
            break;
          case 'attack':
            attackHandler(mes.roomId, mes.userId, mes.x, mes.y);
            break;
          case 'random_attack':
            attackHandler(mes.data, wss, ws, true);
            break;
          case 'single_play':
            singlePlayer(wss, ws, ws.id);
            break;
          default:
            console.log('Unknown message:', mes.type);
            break;
            
        }
      } catch (error) {
        console.error('Error processing message:', error);
        // Handle parsing or other errors
      }
    });
  
    ws.on('close', () => {
      closeGameHandler(wss, ws.id);
      console.log('WebSocket connection closed');

    });
  });
}
