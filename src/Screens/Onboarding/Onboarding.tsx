import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingPlugin from 'react-native-onboarding-swiper';
import { RootScreens } from '../../Constants/RootScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Onboarding1 from '../../static/image/Onboarding1';
import Onboarding2 from '../../static/image/Onboarding2';
import Onboarding3 from '../../static/image/Onboarding3';
import DotIcon from '../../static/icon/DotIcon';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

export const Onboarding = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingPlugin
        containerStyles={styles.container}
        imageContainerStyles={styles.image}
        flatlistProps={{ scrollEnabled: false } as any}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Onboarding1 />,
            titleStyles: styles.title,
            title: 'Truy cập mọi nơi',
            subTitleStyles: styles.subTitle,
            subtitle:
              'Bạn có thể giám sát và quản lý các thiệt bị trong nhà nhanh chóng dù ở bất cứ đâu',
          },
          {
            backgroundColor: '#fff',
            image: <Onboarding2 />,
            title: 'Quản lý căn hộ',
            titleStyles: styles.title,
            subTitleStyles: styles.subTitle,
            subtitle:
              'Thiết bị luôn luôn theo dõi và cảnh báo ngay khi có người lạ xâm nhập vào nhà',
          },
          {
            backgroundColor: '#fff',
            image: <Onboarding3 />,
            title: 'Thống kê hoá đơn',
            titleStyles: styles.title,
            subTitleStyles: styles.subTitle,
            subtitle:
              'Hóa đơn và thông tin chi tiết với số liệu rõ ràng minh bạch sẽ được gửi đến bạn',
          },
        ]}
        NextButtonComponent={(props: any) => (
          <Button
            mode={'text'}
            {...props}
            style={styles.buttonRight}
            textColor='#10B981'
          >
            Tiếp theo
          </Button>
        )}
        SkipButtonComponent={(props: any) => (
          <Button
            onPress={() => props.onNavigate(RootScreens.MAIN)}
            style={styles.buttonLeft}
          >
            Bỏ qua
          </Button>
        )}
        DotComponent={DotIcon}
        showPagination={true}
        bottomBarColor='#fff'
        DoneButtonComponent={() => (
          <View style={{ width: Dimensions.get('window').width, height: 200 }}>
            <Button
              mode='contained'
              buttonColor='#10B981'
              style={{ width: 120, borderRadius: 10, alignSelf: 'center' }}
              onPress={() => props.onNavigate('AuthStack' as never)}
            >
              Bắt đầu
            </Button>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  image: {},
  title: {
    fontWeight: 'bold',
  },
  subTitle: {
    paddingHorizontal: 30,
    opacity: 0.6,
  },
  buttonLeft: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  buttonRight: {
    paddingBottom: 10,
    paddingRight: 10,
  },
});
