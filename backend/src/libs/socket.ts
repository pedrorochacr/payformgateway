import { Server as SocketIO } from "socket.io";
import { Server } from "http";
import { logger } from "../utils/logger";

let io: SocketIO;

export const initIO = (httpServer: Server): SocketIO => {
  io = new SocketIO(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL
    }
  });

  io.on("connection", async socket => {
    logger.info("Client Connected");
    
    socket.on("joinChatBox", (ticketId: string) => {
      logger.info("A client joined a ticket channel");
      socket.join(ticketId);
    });

    socket.on("joinNotification", () => {
      logger.info("A client joined notification channel");
      socket.join("notification");
    });

    socket.on("joinTickets", (status: string) => {
      logger.info(`A client joined to ${status} tickets channel.`);
      socket.join(status);
    });
    socket.onAny((eventName, ...args) => {
      console.log(`Received event: ${eventName}`);
    });
  });
  return io;
};

export const getIO = (): SocketIO => {
  if (!io) {
    logger.error("Socket IO not initialized");
  }
  return io;
};
