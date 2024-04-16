import React from 'react';
import { StatusBar } from 'react-native';

interface CustomStatusBarProps {
  backgroundColor?: string;
  barStyle?: 'light-content' | 'dark-content';
}

export const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  barStyle = 'light-content',
}) => {
  return <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />;
};
