import React from "react";
import { useDispatch } from "react-redux";
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
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorPalette, font, shadowStyle } from "../constants/Styling";
import { firebaseApp } from "../constants/Firebase";
import {
  removeUser,
  resetUserRecipeList,
  resetFilters,
} from "../redux/actions/index";
import { useFonts } from "expo-font";

const _screen = Dimensions.get("screen");

export interface ChefSettingsScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "ChefSettingsScreen">;
}

export default function ChefSettingsScreen({
  navigation,
}: ChefSettingsScreenProps) {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });
  const dispatch = useDispatch();
  const [blockLogout, setBlockLogout] = React.useState(false);

  function handleChangePassword() {
    Alert.alert("In Development 🛠", "Sorry, this feature is still being built.")
  }

  function handleLogout() {
    setBlockLogout(true);
    //Log out chef with firebase
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        // Remove cached access-token on mobile storage
        removeCachedAccessToken();
        // - Update global state
        dispatch(removeUser());
        dispatch(resetUserRecipeList());
        dispatch(resetFilters());
        navigation.goBack();
        setBlockLogout(false);
      })
      .catch((err: { code: string; message: string }) => {
        Alert.alert(
          "Internal Error 🤕",
          "Sorry for the inconvenience, please try again later."
        );
        setBlockLogout(false);
      });
  }

  async function removeCachedAccessToken() {
    try {
      await AsyncStorage.removeItem("access-token");
    } catch (err) {
      // Handle failed asyncStorage removal error
    }
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.accountFeaturesContainer}>
          <TouchableOpacity
            onPress={handleChangePassword}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colorPalette.whiteSmokeGradient}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AboutUsScreen")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colorPalette.whiteSmokeGradient}
              style={styles.button}
            >
              <Text style={styles.buttonText}>About Us</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.logOutAndDeleteContainer}>
          <TouchableOpacity
            onPress={
              blockLogout
                ? () => {} // Fake function while blocked
                : handleLogout // Allow logout while unblocked
            }
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colorPalette.whiteSmokeGradient}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {blockLogout ? "Processing..." : "Logout"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("DeleteAccountScreen")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colorPalette.whiteSmokeGradient}
              style={styles.button}
            >
              <Text style={{ ...styles.buttonText, color: colorPalette.deleteAccount }}>
                Delete Account
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: _screen.height * 0.01,
    marginBottom: _screen.height * 0.03,
  },

  buttonText: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans"
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: _screen.height * 0.01,
    width: _screen.width * 0.93,
    height: 30,
    borderRadius: 10,
    borderColor: colorPalette.darkGray,
    borderWidth: Platform.OS === "android" ? 0.5 : 0.3,
  },

  accountFeaturesContainer: {},

  logOutAndDeleteContainer: {}
});
