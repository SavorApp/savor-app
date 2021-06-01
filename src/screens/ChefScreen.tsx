import React from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoggedInParamList } from "../../types";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { firebaseApp } from "../constants/Firebase";
import { removeUser } from "../redux/actions/index";

const _screen = Dimensions.get("screen");
export interface ChefScreenProps {
  navigation: StackNavigationProp<LoggedInParamList, "ChefScreen">;
}

export default function ChefScreen({ navigation }: ChefScreenProps) {
  // TODO: Make this page look like a profile page
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text> Chefs Screen </Text>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("AboutUsScreen")}>
          <Text>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //Log out chef with firebase
            firebaseApp
              .auth()
              .signOut()
              .then(() => {
                console.log("Signed out user successfully");
                // - Update global state
                dispatch(removeUser());
                navigation.navigate("LoginScreen");
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DeleteAccountScreen")}
        >
          <Text>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorPalette.background,
  },

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.9,
    height: _screen.height * 0.6,
    borderRadius: 30,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },
});
