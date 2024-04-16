import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '../Theme';
import {
  HomeStack,
  RoomStack,
  FinanceStack,
  ProfileStack,
  NotificationStack,
} from './Stacks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// @refresh reset
export const TabNavigator = () => {
  const theme = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStatusBarHeight: 4,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelPosition: 'below-icon',
        tabBarInactiveTintColor: '#b8b4b4',
        tabBarLabelStyle: { fontWeight: '600' },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Icon name='view-dashboard-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='RoomStack'
        component={RoomStack}
        options={{
          tabBarLabel: 'Phòng',
          tabBarIcon: ({ color, size }) => (
            <Icon name='door' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='FinanceStack'
        component={FinanceStack}
        options={{
          tabBarLabel: 'Tài chính',
          tabBarIcon: ({ color, size }) => (
            <Icon name='finance' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='NotificationStack'
        component={NotificationStack}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => (
            <Icon name='bell-outline' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => (
            <Icon name='account-outline' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
