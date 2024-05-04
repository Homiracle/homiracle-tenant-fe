import { useEffect, useState } from 'react';
import { useAppSelector } from '../Store/hook'; // Assuming correct path
import { selectAuthToken } from '../Store/reducers';
import { io, Socket } from 'socket.io-client';

// type connectionErrorType = {
//   message: string;
//   code: number;
// };

export const useSocket = () => {
  const accessToken = useAppSelector(selectAuthToken);
  const IotServer = 'http://10.0.157.143:3001';
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const createSocket = async () => {
      try {
        const socket = io(`${IotServer}?token=${accessToken}`);

        socket.on('connect', () => {
          console.log('Connecting to the socket server');
          setIsConnected(true);
          setConnectionError(null);
        });

        socket.on('connected', data => {
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
    };

    // Create socket only when accessToken changes
    if (accessToken) {
      // console.log("🚀 ~ useEffect ~ accessToken:", accessToken)
      createSocket();
    }

    // Cleanup function: Close the socket when the component unmounts
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [accessToken]); // Dependency array includes accessToken

  return {
    socketInstance,
    isConnected,
    connectionError,
    message,
  };
};
