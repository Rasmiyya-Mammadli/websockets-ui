import { WebSocket } from 'ws';
import { TAttack } from '../db/rooms/roomModel';

export default function attack(
  pos: string,
  userId: number,
  attackResult: TAttack,
  ws: WebSocket,
): void {
  const response = {
    type: 'attack',
    data: JSON.stringify({
      position: JSON.parse(pos),
      currentPlayer: userId,
      status: attackResult,
    }),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}
