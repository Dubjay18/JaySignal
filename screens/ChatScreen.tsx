import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar } from "react-native-elements";

const ChatScreen = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Avatar
            rounded
            source={{
              uri: "https://via.placeholder.com/150x150.png?text=Profile+Image",
            }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
            }}>
            {" "}
            {route.params.chatName}
          </Text>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
