import { WebSocketServer } from "ws";


export const startWebSocketServer = (port: number) => {
    const wss = new WebSocketServer({ port: port });

    console.log(`Start websocket server on localhost:${port}`);
};
