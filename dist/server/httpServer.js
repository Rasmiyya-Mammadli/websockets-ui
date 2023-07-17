"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHttpServer = void 0;
const index_1 = require("./index");
const startHttpServer = (port) => {
    console.log(`Start http server on localhost:${port}`);
    index_1.httpServer.listen(port);
};
exports.startHttpServer = startHttpServer;
