import WebSocket from 'ws';
import { handleRegCommand } from '../websocketCommands/reg';
import { handleCreateRoomCommand } from '../websocketCommands/createRoom';
import { handleAddUserToRoomCommand } from '../websocketCommands/addUserToRoom';
// Import other WebSocket command handlers as needed

export const startWebSocketServer = (port: number) => {
  console.log(`Start WebSocket server on localhost:${port}`);

  const wss = new WebSocket.Server({ port });

  wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
      console.log('Received message:', message);
      const parsedMessage = JSON.parse(message);

      switch (parsedMessage.type) {
        case 'reg':
          handleRegCommand(ws, parsedMessage.data);
          break;
        case 'create_room':
          handleCreateRoomCommand(ws, parsedMessage.data);
          break;
        case 'add_user_to_room':
          handleAddUserToRoomCommand(ws, parsedMessage.data);
          break;
        // Add cases for other WebSocket commands and their corresponding handlers
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      // Clean up any resources or handle disconnection logic here
    });
  });
};
