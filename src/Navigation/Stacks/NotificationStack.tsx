import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationContainer } from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

const Stack = createStackNavigator<RootStackParamList>();

export const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootScreens.NOTIFICATION} component={NotificationContainer} />
    </Stack.Navigator>
  );
};
