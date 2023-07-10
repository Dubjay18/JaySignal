import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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

const HomeScreeen = ({ navigation }: any) => {
  const [chats, setChats] = useState<DocumentData[]>([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const chatsRef: CollectionReference<DocumentData> =
        collection(db, "chats");
      const q: Query<DocumentData> = query(chatsRef);
      const chatsArray: DocumentData[] = [];
      const querySnapshot: QuerySnapshot<DocumentData> =
        await getDocs(q);
      querySnapshot.forEach((doc) => {
        chatsArray.push({
          id: doc.id,
          data: doc.data(),
        });
        console.log(doc.id, " => ", doc.data());
      });
      setChats(chatsArray);
    };

    fetchData();
  }, []);

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
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem id='test' chatName='CChat' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreeen;
