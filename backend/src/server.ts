import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
// import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { initWebSocket } from "./websocketServer"; 

const server = app.listen(process.env.PORT, async () => {

  logger.info(`Server started on port: ${process.env.PORT}`);
});

// initIO(server);
initWebSocket(server);
gracefulShutdown(server);
