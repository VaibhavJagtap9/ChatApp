import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socketInstance = io("https://chatapp-ojyk.onrender.com");  // Replace with your actual Socket.IO server URL

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Listening for online users (for demonstration)
    socketInstance.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    setSocket(socketInstance);

    // Cleanup on dismount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
