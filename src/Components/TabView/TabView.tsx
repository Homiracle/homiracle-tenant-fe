import { FlatList, ScrollView } from "native-base";
import React, { Children, useState } from "react";
import { TabButton, TabButtonProps } from "./TabButton";
import { StyleSheet, View } from "react-native";

export interface TabViewProps {
    children: React.ReactNode;
}

export const TabView: React.FC<TabViewProps> = ({
    children,
}) => {
    const styles = StyleSheet.create({
        scrollView: {
            flex: 1,
        }
    })
    return (
        <View
            style={{
                margin: 10,
            }}>
            <ScrollView
                contentContainerStyle={{
                    gap: 8,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            >{children}</ScrollView>
        </View>
    )
}