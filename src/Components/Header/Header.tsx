import { Box } from 'native-base';
import { useAppTheme } from '../../Theme';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { CustomStatusBar } from '../StatusBar';

export interface HeaderProps {
  children?: React.ReactNode;
  title: string;
  mode?: 'center-aligned' | 'medium' | 'small' | 'large';
  height?: number | string;
  top?: number | string;
  scroll?: 'horizontal' | 'vertical' | 'none';
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  title,
  height,
  mode = 'small',
  scroll = 'none',
  onBack,
}) => {
  const theme = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    header: {
      backgroundColor: theme.colors.primary,
      zIndex: 2,
      // elevation: 1,
    },
    scrollViewContainer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0, // Đảm bảo ScrollView nằm dưới Header và Box
      top: 64,
    },
    viewContainer: {
      position: 'absolute',
      top: 64,
    },
    scrollView: {
      flex: 1,
    },
    box: {
      zIndex: 0, // Đảm bảo Box nằm dưới ScrollView
      elevation: 0, // Đảm bảo Box nằm dưới ScrollView trên Android
    },
  });

  return (
    <View style={scroll !== 'none' ? styles.container : {}}>
      <CustomStatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header
        mode={mode}
        style={
          scroll !== 'none'
            ? styles.header
            : { backgroundColor: theme.colors.primary }
        }
      >
        {onBack && (
          <Appbar.BackAction onPress={onBack} color={theme.colors.onPrimary} />
        )}
        <Appbar.Content
          title={title}
          color={theme.colors.onPrimary}
          titleStyle={theme.fonts.titleLarge}
        />
      </Appbar.Header>
      <Box
        height={height}
        backgroundColor={theme.colors.primary}
        borderBottomRadius={20}
        style={scroll !== 'none' ? styles.box : {}}
      />

      {scroll !== 'none' ? (
        <View style={styles.scrollViewContainer}>
          <ScrollView
            style={styles.scrollView}
            horizontal={scroll === 'horizontal'}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.viewContainer}>{children}</View>
      )}
    </View>
  );
};
