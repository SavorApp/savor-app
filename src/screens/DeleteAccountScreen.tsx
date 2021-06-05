import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import {
  removeUser,
  resetFilters,
  resetUserRecipeList,
} from "../redux/actions";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { LinearGradient } from "expo-linear-gradient";
import { firebaseApp } from "../constants/Firebase";

const _screen = Dimensions.get("screen");

export interface DeleteAccountScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "DeleteAccountScreen">;
}

export default function DeleteAccountScreen({
  navigation,
}: DeleteAccountScreenProps) {
  const dispatch = useDispatch();

  const [blockDeleteAccount, setBlockDeleteAccount] = React.useState(false);

  function handleDeleteAccount() {
    setBlockDeleteAccount(true);
    // TODO: Delete Account in DB
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        // Remove cached access-token on mobile storage
        removeCachedAccessToken()
        // - Update global state
        dispatch(removeUser());
        dispatch(resetUserRecipeList());
        dispatch(resetFilters());
        setBlockDeleteAccount(false);
        Alert.alert("Enjoy your time off", "We hope you come back soon 👨‍🍳");
        navigation.goBack();
      })
      .catch((err: { code: string; message: string }) => {
        Alert.alert(
          "Internal Error 🤕",
          "Sorry for the inconvenience, please try again later."
        );
        setBlockDeleteAccount(false);
      });
  }

  async function removeCachedAccessToken() {
    try {
      await AsyncStorage.removeItem("access-token")
    } catch(err) {
      // Handle failed asyncStorage removal error
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Are you sure you want to delete your account?
        </Text>
        <View style={styles.form}>
          <Text>Yes, I'm hanging my apron for now...</Text>
          <TouchableOpacity
            onPress={
              blockDeleteAccount
                ? () => {} // Fake function while blocked
                : handleDeleteAccount // Allow delete account while unblocked
            }
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#ffe6e6", "#ff6666"]}
              style={styles.button}
            >
              <Text style={{ color: "black" }}>
                {blockDeleteAccount ? "Processing..." : "Delete Account"}
              </Text>
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

  form: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    width: _screen.width * 0.8,
    height: _screen.height * 0.3,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  title: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 8,
    fontSize: 16,
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
});
