import { Server, Socket } from "socket.io";

const registerUserHandlers = (io: Server, socket: Socket) => {
  socket.on("join", (username: string) => {
    console.log(`${username} joined`);
    socket.broadcast.emit("userJoined", username);
  });
};

export default registerUserHandlers;
