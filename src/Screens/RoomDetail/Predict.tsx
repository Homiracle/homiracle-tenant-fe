import React from "react";
import { View } from "react-native";
import { Header, TabView } from "../../Components";
import {LineChart} from 'react-native-gifted-charts'
import { ScrollView } from "native-base";
export const Predict = () => {
const data1=[ {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70} ]
const data2=[ {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},
    {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90}, {value:70},
    {value:50}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}]
return(
    <ScrollView>
        <LineChart data = {data1}/>
        
    </ScrollView>
);
};