import { useAppTheme } from '../../Theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type CardCustomProps = {
  title: string;
  value: number;
  unit: string;
  icon: string;
};

export const CardCustom = ({
  title,
  value,
  unit,
  icon,
}: CardCustomProps) => {
  const theme = useAppTheme();
  const styles = StyleSheet.create({
    whiteText: {
      color: theme.colors.primary,
    },
  });

  return (
    <Card
      style={{
        flex: 1,
        // borderWidth: 1,
        // borderColor: theme.colors.primary,
        backgroundColor: 'white',
      }}
    >
      <Card.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={styles.whiteText}>{title}</Text>
          <Text style={{ marginTop: 12 }}>
            <Text style={[styles.whiteText]} variant='displaySmall'>
              {value}
            </Text>
            <Text style={[styles.whiteText]}>
              {'  '}
              {unit}
            </Text>
          </Text>
        </View>
        <Icon
          name={icon}
          size={40}
          style={{
            backgroundColor: 'rgba(220, 220, 220, 0.3)',
            borderRadius: 50,
            height: 50,
            width: 50,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: theme.colors.primary,
          }}
        />
      </Card.Content>
    </Card>
  );
};
