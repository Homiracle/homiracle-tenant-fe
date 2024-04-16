import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileContainer } from '../../Screens'; // Import your Profile screen here
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the ProfileStack component
export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootScreens.PROFILE} component={ProfileContainer} />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};