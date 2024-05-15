import React from 'react';
import { RoomDetailScreenNavigatorProps } from './RoomDetailContainer';
import { useAppTheme } from '../../Theme';
import { StyleSheet, View } from 'react-native';
import { CustomDialog, Header, TabButton, TabView } from '../../Components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Portal } from 'react-native-paper';
import { AttendanceStatus } from '../../Constants/AttendanceStatus';
import { RoomInfo } from './RoomInfo';
import { DeviceComponent } from './Device';
import { Predict } from './Predict';

export const RoomDetail = ({
  route,
  navigation,
}: RoomDetailScreenNavigatorProps) => {
  const tabName = route.params.screenName;
  const name = route.params.name;
  const attendance_id = route.params.attendance_id;
  const room_id = route.params.room_id;

  const tabs = ['Thông tin hợp đồng', 'Thiết bị', 'Thành viên', 'Thống kê'];
  const [activeTab, setActiveTab] = React.useState(
    tabName === AttendanceStatus.ACCEPTED ? 0 : 1,
  );
  const [isOk, setIsOk] = React.useState(false);
  const [isAccept, setIsAccept] = React.useState(true);

  const focusInfo = () => {
    setActiveTab(1);
  };

  const focusDevice = () => {
    setActiveTab(0);
  };

  const focusTenant = () => {
    setActiveTab(2);
  };
  const focusPredict = () => {
    setActiveTab(3);
  };
  
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={name}
        height={hp(2)}
        mode='center-aligned'
        // scroll='vertical'
        onBack={() => navigation.goBack()}
      />
      <TabView>
        {tabName === AttendanceStatus.ACCEPTED && (
          <TabButton
            isClicked={activeTab === 0}
            name={tabs[1]}
            displayNumber={false}
            onFocus={focusDevice}
          />
        )}
        <TabButton
          isClicked={activeTab === 1}
          name={tabs[0]}
          displayNumber={false}
          onFocus={focusInfo}
        />
        <TabButton
          isClicked={activeTab === 2}
          name={tabs[2]}
          displayNumber={false}
          onFocus={focusTenant}
        />
        <TabButton
        isClicked={activeTab === 3}
        name={tabs[3]}
        displayNumber={false}
        onFocus={focusPredict}
      />
      </TabView>
      {activeTab === 0 && tabName === AttendanceStatus.ACCEPTED && <DeviceComponent id={attendance_id} />}
      {activeTab === 1 && (
        <RoomInfo
          tabName={tabName}
          id={attendance_id}
          setIsOk={setIsOk}
          setIsAccept={setIsAccept}
        />
      )}
      {activeTab === 3 && <Predict />}
      <Portal>
        <CustomDialog
          visible={isOk}
          content={
            isAccept
              ? 'Bạn đã được thêm vào phòng ở này'
              : 'Bạn đã từ chối phòng ở này'
          }
          confirmContent='OK'
          onConfirm={() => {
            setIsOk(false);
            navigation.goBack();
          }}
        />
      </Portal>
    </View>
  );
};
