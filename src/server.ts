import { httpServer } from "./server/httpServer";
import  startWebSocketServer  from "./server/webSocketserver";

const httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 3000;

startWebSocketServer();

console.log(`Start static HTTP server on port ${httpPort}!`);
httpServer.listen(httpPort);


