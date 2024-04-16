import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FinanceContainer } from '../../Screens';
import { RootScreens } from '../../Constants/RootScreen';
import { RootStackParamList } from '../../Constants/RootStackParam';

const Stack = createStackNavigator<RootStackParamList>();

export const FinanceStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RootScreens.FINANCE} component={FinanceContainer} />
    </Stack.Navigator>
  );
};
