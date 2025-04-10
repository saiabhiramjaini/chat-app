'use client';

import { useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useSocketEvents } from "@/hooks/useSocketEvents";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export default function ChatPage() {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to the chat!',
      sender: 'System',
      timestamp: new Date(),
      isCurrentUser: false
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  useSocketEvents(socket, (newMsg) => {
    const message: Message = {
      id: Math.random().toString(),
      text: newMsg,
      sender: 'John Doe',
      timestamp: new Date(),
      isCurrentUser: false
    };
    setMessages((prev) => [...prev, message]);
  });

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const message: Message = {
        id: Math.random().toString(),
        text: newMessage,
        sender: 'You',
        timestamp: new Date(),
        isCurrentUser: true
      };
      socket.emit("message", newMessage);
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="flex flex-col w-full max-w-4xl mx-auto my-8 overflow-hidden rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Group Chat</h2>
              <p className="text-sm text-muted-foreground">3 members online</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                  {!message.isCurrentUser && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.sender}`} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      message.isCurrentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {!message.isCurrentUser && (
                      <p className="text-sm font-medium mb-1">{message.sender}</p>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {format(message.timestamp, 'HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-card">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={sendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}