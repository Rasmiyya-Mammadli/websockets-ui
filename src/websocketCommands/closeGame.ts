import { Server as WebSocketServer } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { usersDB } from '../db/users/user';
import updateRoom from '../response/updateRoom';
import { WebSocketWithId } from '../server/webSocketserver';
import win from './winner';

export default function closeGameHandler(wss: WebSocketServer, userID: number): void {
  for (const [key, value] of roomsDB.rooms) {
    if (value.some((i) => i.index === userID)) {
      const secondUser = value.find((i) => i.index !== userID);
      const withBot = secondUser ? !secondUser.index : false;
      if (value.length < 2 || withBot) {
        roomsDB.removeRoom(key);
        wss.clients.forEach(updateRoom);
        break;
      } else {
        if (!secondUser) break;
        for (const i of wss.clients) {
          const client = i as WebSocketWithId;
          if (client.id === secondUser.index) {
            win(secondUser, [client.id, userID], key, client.id, wss, client);
          }
        }
      }
    }
  }
  usersDB.exitPlayer(userID);
}
