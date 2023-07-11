import WebSocket from 'ws';
import { roomsDB } from '../db/rooms/room';
import { usersDB } from '../db/users/user';

export const handleCreateRoomCommand = (ws: WebSocket, data: any) => {
  try {
    const { index } = data;

    // Get the user from the usersDB based on the index
    const user = usersDB.getPlayerByID(index);

    if (user) {
      // Create a new room and add the user to it
      const roomId = roomsDB.createRoom(user);

      // Return the room and player information in the response
      const response = {
        type: 'create_game',
        data: {
          idGame: roomId,
          idPlayer: index,
        },
        id: 0,
      };

      ws.send(JSON.stringify(response));
    } else {
      // User not found, return error response
      const response = {
        type: 'create_game',
        data: null,
        id: 0,
        error: true,
        errorText: 'User not found',
      };

      ws.send(JSON.stringify(response));
    }
  } catch (error) {
    // Handle any errors that occur during room creation
    console.error('Error during room creation:', error);

    // Return error response
    const response = {
      type: 'create_game',
      data: null,
      id: 0,
      error: true,
      errorText: 'An error occurred during room creation',
    };

    ws.send(JSON.stringify(response));
  }
};
