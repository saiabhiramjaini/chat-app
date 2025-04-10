import { Server, Socket } from "socket.io";

const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on("message", (msg: string) => {
    console.log("Received chat message:", msg);
    io.emit("message", msg);
  });
};

export default registerChatHandlers;
