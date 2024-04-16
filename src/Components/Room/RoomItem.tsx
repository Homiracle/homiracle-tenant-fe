import { theme } from 'native-base';
import { useAppTheme } from '../../Theme';
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { position } from 'native-base/lib/typescript/theme/styled-system';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '../../Constants/RootScreen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from '../../Store/hook';
import { storeId } from '../../Store/reducers';

export interface RoomItemProps {
    room_id: string,
    room_name: string,
    num_of_device: number,
    cost: number,
    num_of_tenant: number,
}

export const RoomItem = ({
    room_id,
    room_name,
    num_of_device,
    cost,
    num_of_tenant,
}:RoomItemProps) => {
    const dispatch = useAppDispatch();
    const homiralceTheme = useAppTheme();
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{
                width: 335,
                height: 110,
                display: 'flex',
                backgroundColor: "white",
                borderRadius: 10,
                shadowColor: homiralceTheme.colors.surfaceBright,
                shadowOpacity: 31,
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }}
            onPress={() => {
                dispatch(storeId({ field: 'room_id', id: room_id }));
                navigation.navigate(RootScreens.ROOMDETAIL as never);
            }}
        >
            <Image
                style={{
                    width: 146,
                    height: 90,
                    position: 'absolute',
                    left: 6,
                    top: 10,
                    borderRadius: 10,
                }}
                source={{
                    uri: 'https://file4.batdongsan.com.vn/resize/1275x717/2024/03/07/20240307114527-38f0_wm.jpg'
                }}
                alt='this is a image of rooming-house'>

            </Image>
            <Text
                style={[{
                    textAlign: 'left',
                    position: 'absolute',
                    left: 175,
                    top: 10,
                }, homiralceTheme.fonts.titleMedium]}
                numberOfLines={1}
                ellipsizeMode='tail'
            >{room_name}</Text>

            <Text
                style={[{
                    textAlign: 'left',
                    width: 149,
                    height: 41,
                    position: 'absolute',
                    left: 175,
                    top: 35,
                }, homiralceTheme.fonts.bodyMedium]}
                numberOfLines={2}
                ellipsizeMode='tail'
            >{cost}</Text>

            
            <Icon 
                style={{
                    right: 138,
                    bottom: 9,
                    position: 'absolute',
                }}
                name='home-variant'size={24} color={homiralceTheme.colors.primary}
            />
            <Text
                style={[
                    {
                        position: 'absolute',
                        right: 123,
                        bottom: 12,
                        color: homiralceTheme.colors.primary,
                    },
                    homiralceTheme.fonts.bodySmall,
                ]}>
                {num_of_device}
            </Text>

            <Icon 
                style={{
                    right: 52,
                    bottom: 9,
                    position: 'absolute',
                }}
                name='account'size={24} color={homiralceTheme.colors.primary}
            />
            <Text
                style={[
                    {
                        position: 'absolute',
                        right: 32,
                        bottom: 12,
                        color: homiralceTheme.colors.primary,
                    },
                    homiralceTheme.fonts.bodySmall
                ]}>
                {num_of_tenant}
            </Text>


        </TouchableOpacity>
    );
};