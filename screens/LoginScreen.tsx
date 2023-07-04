import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Input, Image } from "@rneui/themed";
import React from "react";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const signIn = () => {};
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
        }}
        style={{ width: 100, height: 100 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button
        containerStyle={styles.button}
        title='Login'
        onPress={signIn}
      />
      <Button
        containerStyle={styles.button}
        type='outline'
        title='Register'
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
