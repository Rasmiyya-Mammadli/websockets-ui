import { WebSocket } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { usersDB } from '../db/users/user';
import reg from '../response/reg';
import updateRoom from '../response/updateRoom';

export default function handleRegCommand(data: string, ws: WebSocket, userId: number) {
  const { name, password } = JSON.parse(data);
  const isSign = usersDB.getPlayerByName(name);
  if (isSign) {
    if (password === isSign.password) {
      if (isSign.currentID > 0) {
        reg(ws, name, -1, true, 'Player with this name already exists');
      } else {
        usersDB.updateId(name, userId);
        reg(ws, name, userId);
        if (roomsDB.rooms.size) updateRoom(ws);
      }
    } else {
      reg(ws, name, -1, true, 'Incorrect password');
    }
  } else {
    usersDB.addPlayer(name, password, userId);
    reg(ws, name, userId);
    if (roomsDB.rooms.size) updateRoom(ws);
  }
}
