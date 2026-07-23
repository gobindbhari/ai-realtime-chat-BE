import { Server } from "socket.io";

let io: Server;

export const initSocket = (socket: Server) => {
  io = socket;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
};