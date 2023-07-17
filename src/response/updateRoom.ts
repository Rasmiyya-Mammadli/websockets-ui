import { WebSocket } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { IRoom } from '../db/rooms/roomModel';

export default function updateRoom(ws: WebSocket): void {
  const roomsList = [] as IRoom[];
  for (const [roomId, roomUsers] of roomsDB.rooms) {
    if (roomId > 0) roomsList.push({ roomId, roomUsers });
  }
  const response = {
    type: 'update_room',
    data: JSON.stringify(roomsList),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}
