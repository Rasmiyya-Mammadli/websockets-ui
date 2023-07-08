import { httpServer } from "./index";

const startHttpServer = (port: number) => {
    console.log(`Start http server on localhost:${port}`);
    
    httpServer.listen(port);
};

export { startHttpServer };