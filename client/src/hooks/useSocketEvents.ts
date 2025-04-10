import { useEffect } from "react";
import { Socket } from "socket.io-client";

export const useSocketEvents = (socket: Socket | null, onMessage: (msg: string) => void) => {
  useEffect(() => {
    if (!socket) return;

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [socket, onMessage]);
};
