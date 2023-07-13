import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  CollectionReference,
  DocumentData,
  Query,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";

const ChatScreen = ({ navigation, route }: any) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<DocumentData[]>(
    []
  );
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
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}>
          <AntDesign
            name='arrowleft'
            size={24}
            color={"white"}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}>
          <TouchableOpacity>
            <FontAwesome
              name='video-camera'
              size={24}
              color='white'
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color='white' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const sendMessage = async () => {
    Keyboard.dismiss();

    await addDoc(
      collection(db, "chats", route.params.id, "messages"),
      {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        photoURL: auth.currentUser?.photoURL,
      }
    );

    setInput("");
  };
  useLayoutEffect(() => {
    async function fetchData() {
      const messagesRef: CollectionReference<DocumentData> =
        collection(
          db,
          "chats",
          route.params.id,
          "messages"
        );
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
      setMessages(messagesArray);
    }

    fetchData();
  }, [route]);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios" ? "padding" : "height"
        }
        style={styles.container}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser?.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      rounded
                      source={{
                        uri: data.photoURL,
                      }}
                      size={30}
                    />
                    <Text style={styles.recieverText}>
                      {data.message}
                    </Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      rounded
                      source={{
                        uri: data.photoURL,
                      }}
                      size={30}
                    />
                    <Text style={styles.senderText}>
                      {data.message}
                    </Text>
                    <Text style={styles.senderName}>
                      {data.displayName}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder='Signal Message'
                onSubmitEditing={sendMessage}
                value={input}
                onChangeText={(text) => setInput(text)}
                style={styles.textInput}
              />

              <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.5}>
                <Ionicons
                  name='send'
                  size={24}
                  color={"#2B68E6"}
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ececec",
    borderWidth: 0,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ececec",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2b68e6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,

    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "#fff",
  },
});
