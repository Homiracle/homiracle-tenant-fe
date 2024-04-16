import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingContainer } from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the OnboardingStack component
export const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RootScreens.ONBOARDING}
        component={OnboardingContainer}
      />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};
