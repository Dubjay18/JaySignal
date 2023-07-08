import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth } from "../firebase";

const HomeScreeen = ({ navigation }: any) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity>
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
