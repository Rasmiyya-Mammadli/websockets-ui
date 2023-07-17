import { Server as WebSocketServer } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { IRoomPlayers } from '../db/rooms/roomModel';
import createGame from '../response/createGame';
import updateRoom from '../response/updateRoom';
import { WebSocketWithId } from '../server/webSocketserver';

export default function addUserToRoom (
  data: string,
  wss: WebSocketServer,
  userId: number,
): void {
  const { indexRoom } = JSON.parse(data);

  const currentUserRoom = roomsDB.userInRoom(userId);
  if(currentUserRoom) roomsDB.removeRoom(currentUserRoom);

  const success = roomsDB.addUserToRoom(indexRoom, userId);

  if (!success) return;

  const users = (roomsDB.rooms.get(indexRoom) as IRoomPlayers[]).map(
    (e) => e.index,
  );

  for (const i of wss.clients) {
    const client = i as WebSocketWithId;
    if (users.includes(client.id)) {
      createGame(indexRoom, client.id, i);
    } else {
      updateRoom(i);
    }
  }
}
