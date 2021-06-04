import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
const serverUrl = 'http://localhost:5000';
const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(serverUrl, {
      //     this id will be passed down to the server
      query: { id },
    });
    setSocket(newSocket);
    //     close socket after render(or remove old socket)
    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
