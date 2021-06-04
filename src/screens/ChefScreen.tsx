import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { firebaseApp } from "../constants/Firebase";
import {
  removeUser,
  resetUserRecipeList,
  resetFilters,
} from "../redux/actions/index";

const _screen = Dimensions.get("screen");

export interface ChefScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "ChefScreen">;
}

export default function ChefScreen({ navigation }: ChefScreenProps) {
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Chef{"\n"} {userState.user.username}
        </Text>
        <View style={styles.profileContainer}></View>

        <TouchableOpacity
          onPress={() => navigation.navigate("AboutUsScreen")}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colorPalette.popLight, colorPalette.popDark]}
            style={styles.button}
          >
            <Text style={{ color: "black" }}>About Us</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            onPress={() => {
              //Log out chef with firebase
              firebaseApp
                .auth()
                .signOut()
                .then(() => {
                  // - Update global state
                  dispatch(removeUser());
                  dispatch(resetUserRecipeList());
                  dispatch(resetFilters());
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colorPalette.trimLight, colorPalette.trim]}
              style={styles.button}
            >
              <Text style={{ color: "black" }}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("DeleteAccountScreen")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#ffe6e6", "#ff6666"]}
              style={styles.button}
            >
              <Text style={{ color: "black" }}>Delete Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    width: _screen.width * 0.8,
    height: _screen.height * 0.3,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 28,
    fontWeight: "bold",
    color: colorPalette.background,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 8,
    width: 120,
    borderRadius: 10,
    padding: 8,
  },

  bottomButtonsContainer: {
    flexDirection: "row",
    margin: 8,
  },
});
