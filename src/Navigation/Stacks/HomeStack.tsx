import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeContainer } from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the HomeStack component
export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootScreens.HOME} component={HomeContainer} />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};
