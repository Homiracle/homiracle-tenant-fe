import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RoomContainer, RoomDetailContainer } from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the RoomingHouseStack component
export const RoomStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootScreens.ROOM} component={RoomContainer} />
      <Stack.Screen
        name={RootScreens.ROOM_DETAIL}
        component={RoomDetailContainer}
      />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};
