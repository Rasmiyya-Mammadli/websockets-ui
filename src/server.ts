import { httpServer } from "./server/httpServer";
import  startWebSocketServer  from "./server/webSocketserver";

const HTTP_PORT = 3000;

startWebSocketServer();

console.log(`Start static HTTP server on port ${HTTP_PORT}!`);
httpServer.listen(HTTP_PORT);


