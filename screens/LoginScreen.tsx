import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "@rneui/themed";
import React from "react";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  return (
    <View>
      <StatusBar style='light' />
      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
        }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
