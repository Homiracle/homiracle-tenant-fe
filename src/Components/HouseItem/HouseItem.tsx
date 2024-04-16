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

export interface HouseItemProps {
    house_id: string,
    house_name: string,
    address: string,
    num_of_room: number,
    num_of_tenant: number,
}

export type RootStackHouseParamList = {
    RoomingHouseDetail: { house_id: string } | undefined;
    CreateDevice: { isHouse?: boolean; isFloor?: boolean; isRoom?: boolean } | undefined;
  };

export const HouseItem = ({
    house_id,
    house_name,
    address,
    num_of_room,
    num_of_tenant,
}:HouseItemProps) => {
    const homiralceTheme = useAppTheme();
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackHouseParamList>>();
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
              // console.log(house_id);
              dispatch(storeId({ field: 'house_id', id: house_id }));
              navigation.navigate(RootScreens.ROOMING_HOUSED_DETAIL, { house_id });
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
                alt='this is an image of rooming-house'>

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
            >{house_name}</Text>

            <Text
                style={[{
                    textAlign: 'left',
                    width: 149,
                    height: 41,
                    position: 'absolute',
                    left: 175,
                    top: 35,
                }, homiralceTheme.fonts.bodySmall]}
                numberOfLines={2}
                ellipsizeMode='tail'
            >{address}</Text>

            
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
                {num_of_room}
            </Text>

            <Icon 
                style={{
                    right: 52,
                    bottom: 9,
                    position: 'absolute',
                }}
                name='account-multiple'size={24} color={homiralceTheme.colors.primary}
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