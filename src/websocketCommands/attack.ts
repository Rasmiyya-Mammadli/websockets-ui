import { Server as WebSocketServer, WebSocket } from 'ws';
import { roomsDB } from "../db/rooms/room";
import { IRoomPlayers, TAttack } from "../db/rooms/roomModel";
import attack from "../response/attack";
import turn from "../response/turn";
import { WebSocketWithId } from "../server/webSocketserver";
import singlePlayAttack from "./singleAttack";
import win from "./winner";
import reAttack from './reAttack';

export const attackHandler = (
  data: string,
  wss: WebSocketServer,
  ws: WebSocket,
  random?: boolean,
): void => {
  const { gameId, x, y, indexPlayer } = JSON.parse(data);
  const room = roomsDB.rooms.get(gameId) as IRoomPlayers[];
  const currentUser = room.find((e) => e.index === indexPlayer) as IRoomPlayers;
  if (!currentUser.isTurn) return;

  let pos: string;
  if (random) {
    const variations = [...(currentUser.attackVariations as Set<string>)];
    const item = Math.floor(Math.random() * variations.length);
    pos = variations[item] as string;
  } else {
    pos = JSON.stringify({ x, y });
  }

  const users = room.map((e) => e.index);
  const index = users.find((e) => e !== indexPlayer) as number;
  const result = roomsDB.setAttack(gameId, index, pos);
  const isSinglePlay = room.some((e) => !e.index);

  if (result === 'empty') return;
  if (result === 'win') {
    win(currentUser, users, gameId, indexPlayer, wss, ws, isSinglePlay);
    return;
  }

  if (isSinglePlay) {
    singlePlayAttack(currentUser, pos, indexPlayer, result, room, gameId, ws);
    return;
  }

  if (reAttack(currentUser, users, gameId, pos, index, wss)) return;
  roomsDB.setAttackMap(gameId, indexPlayer, pos);

  for (const i of wss.clients) {
    const client = i as WebSocketWithId;
    if (users.includes(client.id)) {
      attack(pos, indexPlayer, result, ws);
      turn(result === 'miss' ? index : indexPlayer, i);
      if (result === 'miss') {
        roomsDB.setTurn(gameId, client.id);
      }
    }
  }
}
