import { WebSocket } from 'ws';
import { winnersDB } from '../db/winners/winner';

export default function updateWinners(ws: WebSocket): void {
  const winners = [];
  for (const [name, wins] of winnersDB.winners) winners.push({ name, wins });
  const response = {
    type: 'update_winners',
    data: JSON.stringify(winners),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}
