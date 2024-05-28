import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthContextProps {
  isGuest: boolean;
  isLoading: boolean;
  setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthToken: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGuest, setIsGuest] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthToken = useCallback(async () => {
    try {
      const persistedState = await AsyncStorage.getItem('persist:root');
      if (persistedState !== null) {
        const parsedState = JSON.parse(persistedState);
        const authData = JSON.parse(parsedState.auth);
        return authData.accessToken;
      }
      return null;
    } catch (error) {
      console.error('Error fetching auth data from AsyncStorage', error);
      return null;
    }
  }, []);

  const checkAuthToken = useCallback(async () => {
    const token = await getAuthToken();
    setIsGuest(!token);
    setIsLoading(false);
  }, [getAuthToken]);

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  return (
    <AuthContext.Provider value={{ isGuest, isLoading, setIsGuest, checkAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
