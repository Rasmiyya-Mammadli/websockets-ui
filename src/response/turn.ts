import { WebSocket } from 'ws';

export default function turn(userID: number, ws: WebSocket): void {
  const response = {
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: userID,
    }),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}
