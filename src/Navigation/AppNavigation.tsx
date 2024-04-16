import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigation';
import { AuthStack, OnboardingStack } from './Stacks';
import { RootStackParamList } from '../Constants/RootStackParam';
import { useAppTheme } from '../Theme';
import { CustomStatusBar } from '../Components';

const isGuest = true;
const isOnboarding = false;

// @refresh reset
const RootStack = createNativeStackNavigator<RootStackParamList>();
const ApplicationNavigator = () => {
  const theme = useAppTheme();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* {isOnboarding ? (
          <RootStack.Screen
            name='OnboardingStack'
            component={OnboardingStack}
          />
        ) : isGuest ? (
          <RootStack.Screen name='AuthStack' component={AuthStack} />
        ) : (
          <RootStack.Screen name='TabNavigator' component={TabNavigator} />
        )} */}
        {/* <RootStack.Screen name='OnboardingStack' component={OnboardingStack} /> */}
        {/* <RootStack.Screen name='AuthStack' component={AuthStack} /> */}
        <RootStack.Screen name='TabNavigator' component={TabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
