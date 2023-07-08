import dotenv from 'dotenv';

import { startHttpServer } from "./server/httpServer";
import { startWebSocketServer } from './server/webSocketserver';

dotenv.config();

const httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 8181;
const websocketPort = process.env.WEBSOCKET_PORT ? parseInt(process.env.WEBSOCKET_PORT, 10) : 8080;

if (isNaN(httpPort) || isNaN(websocketPort)) {
  console.error('Invalid port configuration. Please check your environment variables.');
  process.exit(1);
}

startHttpServer(httpPort);
startWebSocketServer(websocketPort);

process.on('SIGINT', () => {
  console.log('\nServer was stopped. All connections were terminated.');
  process.exit();
});
