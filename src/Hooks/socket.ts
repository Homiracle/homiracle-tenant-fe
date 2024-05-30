import { useEffect, useState, useRef, useCallback } from 'react';
import { useAppSelector } from '../Store/hook'; // Assuming correct path
import { selectAuthToken } from '../Store/reducers';
import { io, Socket } from 'socket.io-client';
import { Config } from '../Config';

export const useSocket = () => {
  const accessToken = useAppSelector(selectAuthToken);
  const IotServer = Config.IOT_API_URL;
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [message, setMessage] = useState(null);
  const socketRef = useRef<Socket | null>(null);

  const connectSocket = useCallback(() => {
    if (socketRef.current) {
      return; // If already connected, do nothing
    }

    try {
      const socket = io(`${IotServer}?token=${accessToken}`);
      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('Connecting to the socket server');
        setConnectionError(null);
      });

      socket.on('connected', data => {
        setIsConnected(true);
        console.log('Is connected:', data);
      });

      socket.on('disconnect', () => {
        console.log('Disconnecting from the socket server');
        setIsConnected(false);
        setConnectionError(null); // Clear potential error on disconnect
      });

      socket.on('error', error => {
        console.error('Socket error:', error);
        setConnectionError(error);
      });

      socket.on('message', (data: any) => {
        setMessage(data);
      });

      setSocketInstance(socket); // Update socket instance in state
    } catch (error) {
      console.error(error);
    }
  }, [accessToken, IotServer]);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [accessToken, connectSocket, disconnectSocket]);

  return {
    socketInstance,
    isConnected,
    connectionError,
    message,
    connectSocket,
    disconnectSocket,
  };
};
