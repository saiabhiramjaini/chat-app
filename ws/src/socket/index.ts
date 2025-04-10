import { Server, Socket } from "socket.io";
import registerChatHandlers from "./handlers/chat.handler";
import registerUserHandlers from "./handlers/user.handler";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Register all feature handlers
    registerUserHandlers(io, socket);
    registerChatHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
