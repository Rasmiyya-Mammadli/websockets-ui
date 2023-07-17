"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomHandler = void 0;
const room_1 = require("../db/rooms/room");
const user_1 = require("../db/users/user");
const createRoomHandler = (ws, data) => {
    try {
        const { index } = data;
        // Get the user from the usersDB based on the index
        const user = user_1.usersDB.getPlayerByID(index);
        if (user) {
            // Create a new room and add the user to it
            const roomId = room_1.roomsDB.createRoom(user);
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
        }
        else {
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
    }
    catch (error) {
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
exports.createRoomHandler = createRoomHandler;
