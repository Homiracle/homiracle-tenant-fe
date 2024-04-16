import { Header, CustomStatusBar } from '../../Components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme, { useAppTheme } from '../../Theme';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';

export const Home = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Header
        title='Home'
        height={80}
        mode='center-aligned'
        onBack={() => {
          console.log('back');
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.onPrimary,
            paddingHorizontal: 50,
            marginHorizontal: 120,
          }}
        >
          <Text>Home</Text>
        </View>
      </Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
