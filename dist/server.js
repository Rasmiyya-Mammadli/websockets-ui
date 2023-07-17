"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpServer_1 = require("./server/httpServer");
const webSocketserver_1 = __importDefault(require("./server/webSocketserver"));
const httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 3000;
(0, webSocketserver_1.default)();
console.log(`Start static HTTP server on port ${httpPort}!`);
httpServer_1.httpServer.listen(httpPort);
