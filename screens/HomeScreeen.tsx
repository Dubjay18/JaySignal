import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import {
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  CollectionReference,
  DocumentData,
  Query,
  QuerySnapshot,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { User, updateProfile } from "firebase/auth";

const HomeScreeen = ({ navigation, route }: any) => {
  const [chats, setChats] = useState<DocumentData[]>([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useEffect(() => {
    let isMounted = true;
    // console.log("mount", auth?.currentUser);

    const fetchData = async () => {
      const chatsRef: CollectionReference<DocumentData> =
        collection(db, "chats");
      const q: Query<DocumentData> = query(chatsRef);
      const chatsArray: DocumentData[] = [];
      const querySnapshot: QuerySnapshot<DocumentData> =
        await getDocs(q);
      if (isMounted) {
        querySnapshot.forEach((doc) => {
          chatsArray.push({
            id: doc.id,
            data: doc.data(),
          });
          console.log(doc.id, " => ", doc.data());
        });
        setChats(chatsArray);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [navigation]);
  const funcUp = () => {
    updateProfile(auth.currentUser as User, {
      displayName: "Jay",
      photoURL:
        "https://cdn.oneesports.gg/cdn-data/2023/04/Anime_DemonSlayer_Muzan_3.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={signOutUser}>
            <Avatar
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 90,
            marginRight: 20,
          }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign
              name='camerao'
              size={24}
              color='black'
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons
              name='pencil'
              size={24}
              color='black'
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, route]);
  const enterChat = (id: string, chatName: string) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map((chat, i: number) => (
          <CustomListItem
            key={i}
            id={chat.id}
            chatName={chat.data.chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreeen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
