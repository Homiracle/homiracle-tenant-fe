import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import { useSignUpMutation } from '../../Services';
import Logo from '../../static/image/logo';
import { useNavigation } from '@react-navigation/native';
import { CustomStatusBar } from '../../Components';
import { useAppTheme } from '../../Theme';
export const SignUp = () => {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [user_name, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const role = 'landlord';
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [signup, { data, isSuccess, isLoading, error }] = useSignUpMutation();
  const handleSignUp = () => {
    // Thực hiện xử lý đăng ký ở đây
    signup({ email, password, user_name, role, phone });
    console.log(
      `Email: ${email}, Full Name: ${user_name}, Password: ${password}, Confirm Password: ${confirmPassword}, Agreement: ${isChecked}`,
    );
  };
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      navigation.navigate('SignIn' as never);
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   }
  // }, [error]);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={theme.colors.onPrimary}
        barStyle='dark-content'
      />
      <View style={styles.header}>
        <Logo />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: 20,
          }}
        >
          ĐĂNG KÝ
        </Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        mode='outlined'
        label='Email'
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPhone(text)}
        value={phone}
        mode='outlined'
        label='Số điện thoại'
      />

      <TextInput
        style={styles.input}
        label='Họ và Tên'
        onChangeText={text => setFullName(text)}
        value={user_name}
        mode='outlined'
      />

      <TextInput
        style={styles.input}
        label='Mật khẩu'
        onChangeText={text => setPassword(text)}
        value={password}
        mode='outlined'
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={handleTogglePasswordVisibility}
            style={{
              paddingTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        }
      />

      {/* <TextInput
        style={styles.input}
        label='Xác nhận mật khẩu'
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        mode='outlined'
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={handleTogglePasswordVisibility}
            style={{
              paddingTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        }
      />
      <Checkbox.Item
        label='Bạn đồng ý với điều khoản và chính sách bảo mật'
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => setChecked(!isChecked)}
        color='#006c49'
        position='leading'
        labelStyle={{ fontSize: 12 }}
      /> */}
      <Button
        style={styles.button}
        onPress={handleSignUp}
        loading={isLoading}
        disabled={isLoading}
        mode='outlined'
      >
        Đăng ký
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 0,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 12,
    height: 25,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    // backgroundColor: '#fff',
    // padding: 16,
    // borderRadius: 12,
    // width: 200,
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#006C49',
    marginTop: 40,
  },
});

export default SignUp;
