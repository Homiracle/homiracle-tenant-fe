import { TouchableOpacity, View } from 'react-native';
import React, { ReactNode, useState } from 'react';
import IconFeather from 'react-native-vector-icons/Feather';
import { Text } from 'react-native-paper';

export interface deviceItemProps {
  icon: ReactNode;
  title: string;
  desc: string;
  content?: ReactNode;
  footer: ReactNode;
}
const DeviceItem = ({
  icon,
  title,
  desc,
  content,
  footer,
}: deviceItemProps) => {
  const [status, setStatus] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'column',
        padding: 16,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 2 },
        flex: 1,
        backgroundColor: 'white',
        overflow: 'hidden',
        gap: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        {icon}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: status ? '#30896b' : '#F4F4F4',
            borderRadius: 30,
          }}
          onPress={() => setStatus(prev => !prev)}
        >
          <IconFeather
            style={{ padding: 10 }}
            name='power'
            size={30}
            color={status ? '#F4F4F4' : '#30896b'}
          />
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 20, fontWeight: '700' }} numberOfLines={1}>
        {title}
      </Text>
      <Text style={{ fontSize: 14, color: 'grey' }}>{desc}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 10,
          paddingBottom: 10,
          borderBottomColor: '#EAEAEA',
          borderBottomWidth: 1,
        }}
      >
        {content}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        {footer}
      </View>
    </View>
  );
};

export default DeviceItem;
