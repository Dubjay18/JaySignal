import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Input, Button, Text } from "@rneui/themed";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);
  const register = async () => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, {
      displayName: name,
      photoURL:
        imageUrl ||
        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
    });
  };
  // const register = () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((authUser) => {
  //       const user = authUser.user;
  //       updateProfile(user, {
  //         displayName: name,
  //         photoURL:
  //           imageUrl ||
  //           "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
  //       })
  //         .then((res) => {
  //           console.log(res);

  //           alert("Profile updated");
  //           // Profile updated!
  //           // ...
  //         })
  //         .catch((error) => {
  //           alert(error);
  //           console.log(error);

  //           // An error occurred
  //           // ...
  //         });
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       alert(errorMessage);
  //     });
  // };
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
