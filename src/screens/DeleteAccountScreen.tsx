import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import {
  removeUser,
  resetFilters,
  resetUserRecipeList,
} from "../redux/actions";
import { colorPalette, font, shadowStyle } from "../constants/Styling";
import { LinearGradient } from "expo-linear-gradient";
import { firebaseApp } from "../constants/Firebase";
import { deleteAccount } from "../db/db";
import { useFonts } from "expo-font";

const _screen = Dimensions.get("screen");

export interface DeleteAccountScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "DeleteAccountScreen">;
}

export default function DeleteAccountScreen({
  navigation,
}: DeleteAccountScreenProps) {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const dispatch = useDispatch();
  const [blockDeleteAccount, setBlockDeleteAccount] = React.useState(false);

  function handleDeleteAccount() {
    setBlockDeleteAccount(true);
    // TODO: Delete Account in DB
    const user = firebaseApp.auth().currentUser;
    // console.log(user?.uid);
    user
      ?.delete()
      .then(async () => {
        // Remove cached access-token on mobile storage
        removeCachedAccessToken();
        // - Update global state
        dispatch(removeUser());
        dispatch(resetUserRecipeList());
        dispatch(resetFilters());
        setBlockDeleteAccount(false);
        // - Delete from DB
        await deleteAccount(user?.uid);
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
      await AsyncStorage.removeItem("access-token");
    } catch (err) {
      // Handle failed asyncStorage removal error
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          Are you sure you want to delete your account?
        </Text>
          <Text style={styles.contentText}>Yes, I'm hanging up my apron for now...</Text>
          <TouchableOpacity
            onPress={
              blockDeleteAccount
                ? () => {} // Fake function while blocked
                : handleDeleteAccount // Allow delete account while unblocked
            }
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colorPalette.deleteAccountGradient}
              style={styles.button}
            >
              <Text style={{...styles.contentText, color: "white" }}>
                {blockDeleteAccount ? "Processing..." : "Delete Account"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: _screen.height * 0.03,
  },

  title: {
    textAlign: "center",
    fontSize: font.subHeaderSize,
    fontFamily: "OpenSansBold",
    width: _screen.width * 0.93,
    marginBottom: _screen.height * 0.01,
  },

  contentText: {
    textAlign: "center",
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    borderRadius: 10,
    borderColor: colorPalette.darkGray,
    borderWidth: Platform.OS === "android" ? 0.5 : 0.3,
    marginVertical: _screen.height * 0.01,
  },
});
