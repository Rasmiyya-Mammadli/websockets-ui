import { Server as WebSocketServer, WebSocket } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { usersDB } from '../db/users/user';
import { IUser } from '../db/users/userModel';
import updateRoom from '../response/updateRoom';
import createGame from '../response/createGame';

export default function singlePlayer(
  wss: WebSocketServer,
  ws: WebSocket,
  userId: number,
) {
  for (const [key, value] of roomsDB.rooms) {
    if (value.some((i) => i.index === userId)) {
      roomsDB.removeRoom(key);
      wss.clients.forEach(updateRoom);
      break;
    }
  }

  const thisUser = usersDB.getPlayerByID(userId) as IUser;
  const indexRoom = roomsDB.createRoom(
    {
      name: thisUser.name,
      index: thisUser.currentID,
      isTurn: true,
    },
    true,
  );
  roomsDB.addUserToRoom(indexRoom, 0);
  createGame(indexRoom, userId, ws);
}
