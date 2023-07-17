"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpServer_1 = require("./server/httpServer");
const webSocketserver_1 = require("./server/webSocketserver");
const httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 8181;
const websocketPort = process.env.WEBSOCKET_PORT ? parseInt(process.env.WEBSOCKET_PORT, 10) : 3000;
(0, httpServer_1.startHttpServer)(httpPort);
(0, webSocketserver_1.startWebSocketServer)(websocketPort);
process.on('SIGINT', () => {
    console.log('\nServer was stopped. All connections were terminated.');
    process.exit();
});
