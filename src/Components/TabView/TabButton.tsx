import { onFocus } from "@reduxjs/toolkit/dist/query/core/setupListeners";
import { useAppTheme } from "../../Theme";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Badge } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";

export interface TabButtonProps {
    isClicked: boolean;
    name: string;
    displayNumber: boolean;
    number?: number;
    onFocus?: (render: any) => void,
}

export const TabButton: React.FC<TabButtonProps> = ({
    isClicked = false,
    name,
    displayNumber,
    number,
    onFocus,
}) => {
    const homiralceTheme = useAppTheme();

    const styles = StyleSheet.create({
        button: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
            borderRadius: 100,
            paddingHorizontal: 15,
            paddingVertical: 10,
        },
        backGroundActive: {
            backgroundColor: homiralceTheme.colors.primary,
            
        },
        backGroundInActive: {
            backgroundColor: 'white',
            borderColor: homiralceTheme.colors.primary,
        },
        textActive: {
            color: 'white',
        },
        textInActive: {
            color:  homiralceTheme.colors.primary,
        }
    })

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isClicked? styles.backGroundActive: styles.backGroundInActive,
            ]}
            onPress={onFocus}>
            <Text
                style={[
                    homiralceTheme.fonts.labelLarge,
                    isClicked? styles.textActive: styles.textInActive,
                    {height: 20}
                ]}>
                {name}
            </Text>
            {displayNumber && (<Text
                style={[
                    {
                        borderRadius: 10,
                        padding: 2,
                        minWidth: 20,
                        textAlign: 'center',
                    },
                    homiralceTheme.fonts.labelSmall,
                    isClicked? styles.textInActive: styles.textActive,
                    isClicked? styles.backGroundInActive: styles.backGroundActive,
                ]}>
                    {number? number: 0}
            </Text>)}
        </TouchableOpacity>
    )
}