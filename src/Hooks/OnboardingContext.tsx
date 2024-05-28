import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OnboardingContextProps {
  isShowOnboarding: boolean;
  setIsShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  checkOnboardingStatus: () => void;
}

export const OnboardingContext = createContext<
  OnboardingContextProps | undefined
>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isShowOnboarding, setIsShowOnboarding] = useState(true);

  const getOnboardingStatus = useCallback(async () => {
    try {
      const persistedState = await AsyncStorage.getItem('persist:root');
      if (persistedState !== null) {
        const parsedState = JSON.parse(persistedState);
        const onboarding = JSON.parse(parsedState.onboarding);
        return onboarding.isShow;
      }
      return true;
    } catch (error) {
      console.error('Error fetching onboarding data from AsyncStorage', error);
      return true;
    }
  }, []);

  const checkOnboardingStatus = useCallback(async () => {
    const status = await getOnboardingStatus();
    setIsShowOnboarding(status);
  }, [getOnboardingStatus]);

  useEffect(() => {
    checkOnboardingStatus();
  }, [checkOnboardingStatus]);

  return (
    <OnboardingContext.Provider
      value={{ isShowOnboarding, setIsShowOnboarding, checkOnboardingStatus }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
