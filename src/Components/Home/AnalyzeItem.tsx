import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Icon from 'react-native-vector-icons/Ionicons';

export interface AnalyzeItemProps {
  header: string;
  mid: string;
  footer: string;
  bgColor: string;
  icon: ReactNode;
  midRight: ReactNode;
}
const AnalyzeItem = (item: AnalyzeItemProps) => {
  return (
    <View
      style={{
        flex: 1,
        gap: 5,
        height: 130,
        backgroundColor: item.bgColor, //"#006C49",
        borderRadius: 20,
        flexDirection: 'row',
        padding: 15,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Text style={{ color: '#ECFDF5', paddingBottom: 10 }}>
          {item.header}
        </Text>
        <View
          style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}
        >
          <Text style={{ color: '#ECFDF5', fontWeight: '700', fontSize: 30 }}>
            {item.mid}
          </Text>

          {item.midRight}
        </View>
        <Text style={{ color: '#ECFDF5', fontWeight: '700', fontSize: 16 }}>
          {item.footer}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {item.icon}
      </View>
    </View>
  );
};
export default AnalyzeItem;
