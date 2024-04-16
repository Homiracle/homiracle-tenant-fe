import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
import theme from '../../Theme';

const ButtonComponent = ({
  text,
  count,
  isEnable,
  setEnable
}: {
  text: string;
  count: number;
  isEnable: boolean;
  setEnable: any
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        borderRadius: 30,
        backgroundColor: isEnable? theme.colors.primary: "white",
      }}
      onPress={() => setEnable()}
    >
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Text style={{ color: isEnable? 'white': theme.colors.primary, fontSize: 16, fontWeight: '700' }}>
          {text}
        </Text>
        <View
          style={{
            borderRadius: 30,
            backgroundColor: isEnable? 'white': theme.colors.primary,
            height: 30,
            width: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color: isEnable? theme.colors.primary: "white"}}>{count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;