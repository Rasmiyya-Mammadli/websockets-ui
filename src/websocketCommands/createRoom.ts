import { Server as WebSocketServer } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { usersDB } from '../db/users/user';
import { IUser } from '../db/users/userModel';
import updateRoom from '../response/updateRoom';


export default function createRoom(wss: WebSocketServer, userID: number): void {
  for (const room of roomsDB.rooms.values()) {
    if (room.some((i) => i.index === userID)) return;
  }
  const thisUser = usersDB.getPlayerByID(userID) as IUser;
  roomsDB.createRoom({
    name: thisUser.name,
    index: thisUser.currentID,
    isTurn: false,
  });
  wss.clients.forEach(updateRoom);
}
