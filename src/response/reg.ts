import { WebSocket } from 'ws';

export default function reg(
  ws: WebSocket,
  name: string,
  index: number,
  error = false,
  errorText = '',
): void {
  const response = {
    type: 'reg',
    data: JSON.stringify({ name, index, error, errorText }),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}
