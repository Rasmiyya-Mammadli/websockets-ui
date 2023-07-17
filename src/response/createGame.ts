import { WebSocket } from 'ws';

export default function createGame(
  indexRoom: number,
  userId: number,
  ws: WebSocket,
): void {
  const response = {
    type: 'create_game',
    data: JSON.stringify({
      idGame: indexRoom,
      idPlayer: userId,
    }),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}
