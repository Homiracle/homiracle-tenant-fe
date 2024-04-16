import { RootScreens } from "../../Constants/RootScreen";
import { useAppTheme } from "../../Theme"
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export interface TenantItemProps {
    avt_url?: string,
    tenant_id?: string,
    tenant_name?: string,
    phone?: string,
    room_name?: string,
    role?: string,
}

export type RootStackTenantParamList = {
    DeviceDetail: {device_id: string} | undefined;
}

export const TenantItem = ({
    avt_url,
    tenant_id,
    tenant_name,
    phone,
    room_name,
    role,
}: TenantItemProps) => {
    const homiralceTheme = useAppTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackTenantParamList>>();

    const style = StyleSheet.create({
        container: {
            width: wp('85%'),
            height: hp('13,5%'),
            backgroundColor: 'white',
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('5%'),
            alignItems: 'center',
            
        },
        rightText: {
            width: wp('30%'),
        },
        leftText: {
            width: wp('25%'),
            alignItems: 'center',
        }
    })

    return (
        <TouchableOpacity
            style={[
                style.container,
            ]}
            onPress={() => {
                // navigation.navigate(RootScreens.CREATE_ROOMING_HOUSE, {device_id})
            }}
        >
            <Image
                style={{
                    width: hp('8%'),
                    height: hp('8%'),
                    borderRadius: 100,
                }}
                source={{
                    uri: 'https://file4.batdongsan.com.vn/resize/1275x717/2024/03/07/20240307114527-38f0_wm.jpg'
                }}
                alt='this is an image of rooming-house'>
            </Image>

            <View
                style={[
                    style.rightText,
                ]}
            >
                <Text
                    style={[
                        homiralceTheme.fonts.titleMedium,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {tenant_name}
                </Text>

                <Text
                    style={[
                        {
                            color: '#ABABAB',
                        },
                        homiralceTheme.fonts.titleSmall,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {phone}
                </Text>
            </View>

            <View
                style= {[
                    style.leftText,
                ]}>
                <Text
                    style={[
                        {
                            color: homiralceTheme.colors.primary,
                        },
                        homiralceTheme.fonts.titleMedium,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {'Phòng ' + room_name}
                </Text>

                <Text
                    style={[
                        {
                        color: role!=='truong phong'? '#410E0B': '#0B57D0',
                        },
                        homiralceTheme.fonts.titleSmall,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {role}
                </Text>
            </View>
        </TouchableOpacity>
    )
}