import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorPalette, shadowStyle } from "../constants/Styling";
import { firebaseApp } from "../constants/Firebase";
import {
  removeUser,
  resetUserRecipeList,
  resetFilters,
} from "../redux/actions/index";
import { TouchableHighlight } from "react-native-gesture-handler";

const _screen = Dimensions.get("screen");

export interface ChefSettingsScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "ChefSettingsScreen">;
}

export default function ChefSettingsScreen({
  navigation,
}: ChefSettingsScreenProps) {
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );

  const dispatch = useDispatch();
  const [blockLogout, setBlockLogout] = React.useState(false);

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("AboutUsScreen")}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["white", "whitesmoke"]}
          style={styles.aboutUsButton}
        >
          <Text style={styles.buttonText}>About Us</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={
          blockLogout
            ? () => {} // Fake function while blocked
            : handleLogout // Allow logout while unblocked
        }
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["white", "whitesmoke"]}
          style={styles.aboutUsButton}
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
          colors={["white", "whitesmoke"]}
          style={styles.aboutUsButton}
        >
          <Text style={{ ...styles.buttonText, color: "#990000" }}>
            Delete Account
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
    marginTop: 20,
    // backgroundColor: colorPalette.background,
  },

  // buttonText: {
  //   fontSize: 20,
  // },

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.9,
    height: _screen.height * 0.7,
    borderRadius: 15,
    // backgroundColor: colorPalette.primary,
  },

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    width: _screen.width * 0.83,
    height: _screen.height * 0.4,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  title: {
    justifyContent: "flex-start",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: colorPalette.white,
  },

  username: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 24,
    fontWeight: "bold",
    color: colorPalette.popDark,
  },

  scrollView: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.8,
    borderRadius: 15,
  },

  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 6,
  },

  subTitle2: {
    fontWeight: "bold",
    marginVertical: 6,
  },

  caption: {
    fontStyle: "italic",
  },

  buttonText: {
    fontSize: 22,
  },

  aboutUsButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 8,
    width: 300,
    backgroundColor: "#FFAA54",
    borderRadius: 10,
    padding: 12,
    borderWidth: 0.2,
    borderStyle: "solid",
    shadowOpacity: 0.3,
    shadowRadius: 0.2,
    shadowOffset: { width: 0.2, height: 0.3 },
  },

  bottomButtonsContainer: {
    flexDirection: "row",
    margin: 8,
  },
});
