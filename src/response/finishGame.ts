import { WebSocket } from 'ws';

export default function finish(userId: number, ws: WebSocket): void {
  const response = {
    type: 'finish',
    data: JSON.stringify({
      winPlayer: userId,
    }),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}
