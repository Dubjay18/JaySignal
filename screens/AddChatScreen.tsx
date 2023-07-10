import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }: any) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    const chatsRef = collection(db, "chats");
    await addDoc(chatsRef, {
      chatName: "input",
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name='wechat' size={24} color={"black"} />
        }
      />
      <Button
        onPress={createChat}
        title={"Create new Chat"}
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
