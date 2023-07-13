import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import {
  CollectionReference,
  DocumentData,
  Query,
  QuerySnapshot,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

interface ICustomListItemProps {
  id: string;
  chatName: string;
  enterChat: (id: string, chatName: string) => void;
}
const CustomListItem = ({
  id,
  chatName,
  enterChat,
}: ICustomListItemProps) => {
  const [chatMessages, setChatMessages] =
    useState<DocumentData>([]);
  // console.log(chatName);
  async function fetchData() {
    const messagesRef: CollectionReference<DocumentData> =
      collection(db, "chats", id, "messages");
    const messagesArray: DocumentData[] = [];
    const q: Query<DocumentData> = query(
      messagesRef,
      orderBy("timestamp", "desc")
    );
    const querySnapshot: QuerySnapshot<DocumentData> =
      await getDocs(q);
    querySnapshot.forEach((doc) => {
      messagesArray.push({
        id: doc.id,
        data: doc.data(),
      });
      // console.log(doc.id, " => ", doc.data());
    });
    setChatMessages(messagesArray);
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <ListItem
      onPress={() => enterChat(id, chatName)}
      key={id}
      bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.data?.photoURL ||
            "https://via.placeholder.com/150x150.png?text=Profile+Image",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode='tail'>
          {chatMessages?.[0]?.data.displayName}
          {chatMessages?.[0] ? ":" : "tap to view chat"}
          {chatMessages?.[0]?.data.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
const styles = StyleSheet.create({});
