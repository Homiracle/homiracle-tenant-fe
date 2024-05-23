import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text} from "react-native";
import { Header, TabView } from "../../Components";
import { useAppTheme } from '../../Theme';
import {LineChart, BarChart} from 'react-native-gifted-charts';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from "native-base";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import { Surface, DataTable } from "react-native-paper";
export const Predict = () => {
    const [selectedValue, setSelectedValue] = useState('Month');
    const theme = useAppTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
        },
        graph: {
            flex: 1,
            width: wp(100),
            backgroundColor: "white",
            
        },
        surface: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.onPrimary,
            marginHorizontal: wp(2),
            borderRadius: wp(2),
            width: wp(96),
            paddingHorizontal: wp(2),
            paddingRight: wp(2),
            paddingBottom: hp(2),
          },
        picker: {
            width: wp(45),
            backgroundColor: "white",
            marginTop: hp(1),
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 4,
        }
    });

const data1=[ {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70} ]
const data2=[ {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},
    {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},
    {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}]
    const [selectedPeriod, setSelectedPeriod] = useState('Month');
    const [selectedTime, setSelectedTime] = useState('Jan');
    const [data, setData] = useState(data1);

    useEffect(() => {
      setData(selectedPeriod === 'Month' ? data2 : data1);
    }, [selectedPeriod]);
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];


return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Picker
                selectedValue={selectedPeriod}
                onValueChange={(itemValue) => {
                    setSelectedPeriod(itemValue);
                    setSelectedTime(itemValue === 'Month' ? 'Jan' : '2020');
                }}
                style={styles.picker}
            >
                <Picker.Item label="Theo tháng" value="Month" />
                <Picker.Item label="Theo năm" value="Year" />
            </Picker>

            <Picker
                selectedValue={selectedTime}
                onValueChange={(itemValue) => setSelectedTime(itemValue)}
                style={styles.picker}
            >
                {selectedPeriod === 'Month' ? (
                    months.map((month) => (
                        <Picker.Item key={month} label={month} value={month} />
                    ))
                ) : (
                    years.map((year) => (
                        <Picker.Item key={year} label={year} value={year} />
                    ))
                )}
            </Picker>
        </View>
        <Surface style={styles.surface}>
            <BarChart
                data={data}
                initialSpacing={0}
                frontColor={theme.colors.primary}
                width={wp(80)}
                backgroundColor="white"
                hideRules
                yAxisThickness={0}
                xAxisThickness={0}
                isAnimated
                barBorderRadius={4}
            />

            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>Tổng số điện</DataTable.Cell>
                    <DataTable.Cell numeric>1000</DataTable.Cell>
                    <DataTable.Cell>KWh</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Giá</DataTable.Cell>
                    <DataTable.Cell numeric>4000</DataTable.Cell>
                    <DataTable.Cell>VND</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Tổng số tiền</DataTable.Cell>
                    <DataTable.Cell numeric>4,000,000</DataTable.Cell>
                    <DataTable.Cell>VND</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </Surface>
    </View>
);
};