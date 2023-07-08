import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";

interface ICustomListItemProps {
  id: string;
  chatName: string;
  enterChat?: () => void;
}
const CustomListItem = ({
  id,
  chatName,
  enterChat,
}: ICustomListItemProps) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          Test Chat
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode='tail'>
          This is a test
          chatsdddddddddddddddddddddddddddddddddddd
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
const styles = StyleSheet.create({});
