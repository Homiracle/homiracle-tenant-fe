import { RootScreens } from "../../Constants/RootScreen";
import { useAppTheme } from "../../Theme"
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export interface DeviceItemProps {
    device_id: string,
    device_name: string,
    type: string,
    status: string,
}

export type RootStackDeviceParamList = {
    DeviceDetail: {device_id: string} | undefined;
}

export const DeviceItem = ({
    device_id,
    device_name,
    type,
    status,
}: DeviceItemProps) => {
    const homiralceTheme = useAppTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackDeviceParamList>>();

    const style = StyleSheet.create({
        container: {
            width: wp('85%'),
            height: hp('13,5%'),
            backgroundColor: 'white',
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('10%'),
            alignItems: 'center',
        },
        leftText: {
            width: wp('40%')
        },
        rightText: {
            width: wp('30%'),
            alignItems: 'center',
        },

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
            <View
                style={[
                    style.leftText
                ]}
            >
                <Text
                    style={[
                        homiralceTheme.fonts.titleMedium,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {device_name}
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
                    {type}
                </Text>
            </View>

            <View
                style= {[
                    style.rightText,
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
                    {device_id}
                </Text>

                <Text
                    style={[
                        {
                        color: status!=='connected'? '#410E0B': '#0B57D0',
                        },
                        homiralceTheme.fonts.titleSmall,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {status}
                </Text>
            </View>
        </TouchableOpacity>
    )
}