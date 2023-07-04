import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Input, Button, Text } from "@rneui/themed";
const RegisterScreen = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const register = () => {
    console.warn("Register");
  };
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full Name'
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder='Profile Picture URL (optional)'
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title='Register'
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
