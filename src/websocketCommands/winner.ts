import { Server as WebSocketServer, WebSocket } from 'ws';
import { roomsDB } from '../db/rooms/room';
import { IRoomPlayers } from '../db/rooms/roomModel';
import { winnersDB } from '../db/winners/winner';
import updateRoom from '../response/updateRoom';
import updateWinners from '../response/updateWinners';
import { WebSocketWithId } from '../server/webSocketserver';
import finish from '../response/finishGame';


export default function win(
  currentUser: IRoomPlayers,
  users: number[],
  gameId: number,
  indexPlayer: number,
  wss: WebSocketServer,
  ws: WebSocket,
  isSingle?: boolean,
): void {
  roomsDB.removeRoom(gameId);

  if (isSingle) {
    finish(indexPlayer, ws);
    return;
  }

  winnersDB.addWinner(currentUser.name);
  for (const i of wss.clients) {
    const client = i as WebSocketWithId;
    if (users.includes(client.id)) finish(indexPlayer, i);
    updateRoom(i);
    updateWinners(i);
  }
}
