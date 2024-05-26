import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, TextInput, Pressable} from "react-native";
import { Header, TabView } from "../../Components";
import { useAppTheme } from '../../Theme';
import {LineChart, BarChart} from 'react-native-gifted-charts';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from "native-base";
import { useGetConsumptionQuery } from "../../Services";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Surface, DataTable } from "react-native-paper";
export const Predict = ({ roomId }: { roomId: string }) => {

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
        },
        title: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            paddingBottom: hp(3),
          },
          subTitle: {
            fontWeight: 'bold',
          },
          textInput: {
            borderBottomColor: theme.colors.primary,
            borderBottomWidth: 1,
            paddingVertical: hp(0.5),
            color: 'black',
          },
    });

const data1=[ {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70} ]
const data2=[ {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},
    {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},
    {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}]
    const [data, setData] = useState(data1);

    const dateE = new Date().toISOString().split('T')[0];
    const dateS = new Date();
    dateS.setDate(1);
    const formattedDateS = dateS.toISOString().split('T')[0];
    const [start, setStart] = useState(formattedDateS);
    const [end, setEnd] = useState(dateE);
    const [datetimePicker, showDatetimePicker] = React.useState({
        startDate: false,
        endDate: false,
      });
      const { data: DetailData } = useGetConsumptionQuery({roomId, start, end});
      console.log(roomId);
      console.log(start);
      console.log(end);
     
    const chartData = DetailData?.map((item: any) => ({
        value: item.electric,
        label: item.date.slice(-2),
    }));
    console.log('Chart',chartData);
return (
    <View style={styles.container}>
        <Surface style={styles.surface}>
        <Text style={styles.title}>Dự đoán tiêu thụ điện</Text>
       {datetimePicker.startDate && (
        <DateTimePicker
          value={new Date(start)}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              const currentDate = selectedDate.toISOString().split('T')[0];
              setStart(currentDate);
            }
            showDatetimePicker({
              ...datetimePicker,
              startDate: false,
            });
          }}
          />
       )}
        {datetimePicker.endDate && (
            <DateTimePicker
              value={new Date(end)}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  const currentDate = selectedDate.toISOString().split('T')[0];
                  setEnd(currentDate);
                }
                showDatetimePicker({
                  ...datetimePicker,
                  endDate: false,
                });
              }}
            />
          )}
        <View style={{ flexDirection: 'row', gap: wp(2)}}>
             <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Từ ngày</Text>
                  <Pressable
                    onPress={() =>{
                      showDatetimePicker({
                        ...datetimePicker,
                        startDate: true,
                      });
                    }}
                  >
                    <TextInput
                      placeholder='1/1/2024'
                      style={styles.textInput}
                      showSoftInputOnFocus
                      value={`${start}`}
                      editable = {false}
                    />
                  </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>Đến ngày</Text>
                  <Pressable
                    onPress={() =>{
                      showDatetimePicker({
                        ...datetimePicker,
                        endDate: true,
                      });
                    }}
                  >
                    <TextInput
                      placeholder='1/1/2024'
                      style={styles.textInput}
                      showSoftInputOnFocus
                      value={`${end}`}
                      editable = {false}
                    />
                  </Pressable>
                </View>
        </View>
            <BarChart
                data={chartData}
                initialSpacing={0}
                frontColor={theme.colors.primary}
                width={wp(80)}
                backgroundColor="white"
                hideRules
                hideYAxisText
                yAxisThickness={0}
                xAxisThickness={1}
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