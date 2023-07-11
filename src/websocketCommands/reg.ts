import WebSocket from 'ws';
import { usersDB } from '../db/users/user';

export const handleRegCommand = (ws: WebSocket, data: any) => {
  try {
    const { name, password } = data;

    // Check if the player name already exists in the database
    const existingPlayer = usersDB.getPlayerByName(name);

    if (existingPlayer) {
      // Player already exists, return error response
      const response = {
        type: 'reg',
        data: {
          name: existingPlayer.name,
          index: existingPlayer.currentID,
          error: true,
          errorText: 'Player already exists',
        },
        id: 0,
      };

      ws.send(JSON.stringify(response));
    } else {
      // Player doesn't exist, create a new player
      const newPlayerId = usersDB.users.length;
      usersDB.addPlayer(name, password, newPlayerId);

      // Return success response
      const response = {
        type: 'reg',
        data: {
          name,
          index: newPlayerId,
          error: false,
          errorText: '',
        },
        id: 0,
      };

      ws.send(JSON.stringify(response));
    }
  } catch (error) {
    // Handle any errors that occur during registration
    console.error('Error during player registration:', error);

    // Return error response
    const response = {
      type: 'reg',
      data: {
        name: '',
        index: -1,
        error: true,
        errorText: 'An error occurred during registration',
      },
      id: 0,
    };

    ws.send(JSON.stringify(response));
  }
};
