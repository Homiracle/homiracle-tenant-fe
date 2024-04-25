import { useAppTheme } from '../../Theme';
import { Header, TabButton, TabView } from '../../Components';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RoomList } from './RoomList';
import { AttendanceStatus } from '../../Constants/AttendanceStatus';
import { RoomScreenNavigatorProps } from './RoomContainer';

export const Room = ({ route, navigation }: RoomScreenNavigatorProps) => {
  const theme = useAppTheme();
  const tabs = ['Đang ở', 'Chờ chấp nhận', 'Đã hết hạn', 'Bị từ chối'];

  const [activeTab, setActiveTab] = useState<number>(0);

  const focusAcceptedRoom = () => {
    setActiveTab(0);
  };

  const focusWaitingRoom = () => {
    setActiveTab(1);
  };

  const focusExpiredRoom = () => {
    setActiveTab(2);
  };

  const focusRejectedRoom = () => {
    setActiveTab(3);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title='Phòng trọ của tôi' height={hp(2)} mode='center-aligned' />
      <TabView>
        <TabButton
          isClicked={activeTab === 0}
          name={tabs[0]}
          displayNumber={false}
          onFocus={focusAcceptedRoom}
        />
        <TabButton
          isClicked={activeTab === 1}
          name={tabs[1]}
          displayNumber={false}
          onFocus={focusWaitingRoom}
        />
        <TabButton
          isClicked={activeTab === 2}
          name={tabs[2]}
          displayNumber={false}
          onFocus={focusExpiredRoom}
        />
        <TabButton
          isClicked={activeTab === 3}
          name={tabs[3]}
          displayNumber={false}
          onFocus={focusRejectedRoom}
        />
      </TabView>
      {activeTab === 0 && (
        <RoomList
          status={AttendanceStatus.ACCEPTED}
          navigation={navigation}
          tabName={AttendanceStatus.ACCEPTED}
        />
      )}
      {activeTab === 1 && (
        <RoomList
          status={AttendanceStatus.INVITING}
          navigation={navigation}
          tabName={AttendanceStatus.INVITING}
        />
      )}
      {activeTab === 2 && (
        <RoomList
          status={AttendanceStatus.EXPIRED}
          navigation={navigation}
          tabName={AttendanceStatus.EXPIRED}
        />
      )}
      {activeTab === 3 && (
        <RoomList
          status={AttendanceStatus.DENIED}
          navigation={navigation}
          tabName={AttendanceStatus.DENIED}
        />
      )}
    </View>
  );
};
