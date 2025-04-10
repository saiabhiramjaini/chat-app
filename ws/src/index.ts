import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { setupSocket } from "./socket";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupSocket(io);

server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT }`);
});
