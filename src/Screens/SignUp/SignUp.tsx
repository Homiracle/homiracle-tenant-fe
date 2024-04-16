import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Checkbox, TextInput  } from "react-native-paper";
import Logo from "../../static/image/logo";

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    // Thực hiện xử lý đăng ký ở đây
    console.log(`Email: ${email}, Full Name: ${fullName}, Password: ${password}, Confirm Password: ${confirmPassword}, Agreement: ${isChecked}`);
  };

  return (
    <View style={styles.container}>
      <View style ={styles.header}>
        <Logo />
        <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center', paddingBottom: 20}} >ĐĂNG KÝ</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        mode='outlined'
        label="Enter your email"
      />

    <TextInput
      style={styles.input}
      label="Họ và Tên"
      onChangeText={(text) => setFullName(text)}
      value={fullName}
      mode='outlined'
    />

    <TextInput
      style={styles.input}
      label="Mật khẩu"
      onChangeText={(text) => setPassword(text)}
      value={password}
      mode='outlined'
      secureTextEntry={!showPassword}
      right={
        <TextInput.Icon
          icon={showPassword ? "eye-off" : "eye"}
          onPress={handleTogglePasswordVisibility}
          style={{
            paddingTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
    />

    <TextInput
      style={styles.input}
      label="Xác nhận mật khẩu"
      onChangeText={(text) => setConfirmPassword(text)}
      value={confirmPassword}
      mode='outlined'
      secureTextEntry={!showPassword}
      right={
        <TextInput.Icon
          icon={showPassword ? "eye-off" : "eye"}
          onPress={handleTogglePasswordVisibility}
          style={{
            paddingTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
    />
    <Checkbox.Item
        label="Bạn đồng ý với điều khoản và chính sách bảo mật"
        status={isChecked ? "checked" : "unchecked"}
        onPress={() => setChecked(!isChecked)}
        color="#006c49"
        position="leading"
        labelStyle={{ fontSize: 12 }}
      />
    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
      <Text style={{ color: '#006c49', fontSize: 14, fontWeight: 'bold' }}>Tạo Tài Khoản</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header:{
    paddingTop: 0,
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 16,
    height: 20,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: 250,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#006C49',
    marginTop: 40,
  },
});

export default SignUp;