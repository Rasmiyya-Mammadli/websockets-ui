import { Server as WebSocketServer } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { IRoomPlayers } from '../db/rooms/roomModel';
import turn from '../response/turn';
import { WebSocketWithId } from '../server/webSocketserver';

export default function reAttack(
  currentUser: IRoomPlayers,
  users: number[],
  gameId: number,
  pos: string,
  index: number,
  wss: WebSocketServer,
): boolean {
  let isReAttack = false;
  if (currentUser.attackMap) {
    isReAttack = currentUser.attackMap.has(pos);
    if (isReAttack) {
      for (const i of wss.clients) {
        const client = i as WebSocketWithId;
        if (users.includes(client.id)) {
          const client = i as WebSocketWithId;
          turn(index, i);
          roomsDB.setTurn(gameId, client.id);
        }
      }
    }
  }
  return isReAttack;
}
