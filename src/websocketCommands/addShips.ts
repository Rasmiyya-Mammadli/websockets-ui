import { Server as WebSocketServer, WebSocket } from 'ws';
import { roomsDB } from "../db/rooms/room";
import startGame from "../response/startGame";
import turn from "../response/turn";
import { WebSocketWithId } from "../server/webSocketserver";
import getShipsList from "./getShip";
import randomShips from "./randomShip";
import { IRoomPlayers } from "../db/rooms/roomModel";


export default function addShipsHandler  (
  data: string,
  wss: WebSocketServer,
  ws: WebSocket,
): void {
  const { gameId, ships, indexPlayer } = JSON.parse(data);
  const shipsList = getShipsList(ships);
  const shipsCount = roomsDB.setShips(gameId, indexPlayer, ships, shipsList);
  const room = roomsDB.rooms.get(gameId) as IRoomPlayers[];
  const isSinglePlay = room.some((e) => !e.index);

  if (isSinglePlay) {
    const random = randomShips();
    const randomList = getShipsList(random);
    roomsDB.setShips(gameId, 0, random, randomList);
    startGame(ships, indexPlayer, ws);
    turn(indexPlayer, ws);
    return;
  }

  if (shipsCount === 2) {
    const users = room.map((e) => e.index);
    const currentTurn: number = users[Math.round(Math.random())] as number;
    roomsDB.setTurn(gameId, currentTurn);
    for (const i of wss.clients) {
      const client = i as WebSocketWithId;
      if (!users.includes(client.id)) continue;
      const thisShips = (
        room.find((e) => e.index === client.id) as IRoomPlayers
      ).ships;
      if (!thisShips) continue;
      startGame(thisShips, client.id, i);
      turn(currentTurn, i);
    }
  }
}
