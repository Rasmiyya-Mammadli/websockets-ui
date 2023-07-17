import { WebSocket } from 'ws';
import { IShip } from '../db/rooms/roomModel';

export default function startGame(
  thisShips: IShip[],
  userId: number,
  ws: WebSocket,
): void {
  const response = {
    type: 'start_game',
    data: JSON.stringify({
      ships: thisShips,
      currentPlayerIndex: userId,
    }),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}
