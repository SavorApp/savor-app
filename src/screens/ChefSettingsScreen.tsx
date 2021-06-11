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
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { firebaseApp } from "../constants/Firebase";
import {
  removeUser,
  resetUserRecipeList,
  resetFilters,
} from "../redux/actions/index";

const _screen = Dimensions.get("screen");

export interface ChefSettingsScreenProps {
    navigation: StackNavigationProp<ChefStackParamList, "ChefSettingsScreen">;
}

export default function ChefSettingsScreen({navigation} : ChefSettingsScreenProps) {
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
      <View style={styles.subContainer}>
        <Text style={styles.title}>Chef Settings</Text>
        <View style={styles.profileContainer}>
        </View>

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
            onPress={
              blockLogout
                ? () => {} // Fake function while blocked
                : handleLogout // Allow logout while unblocked
            }
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colorPalette.trimLight, colorPalette.trim]}
              style={styles.button}
            >
              <Text style={{ color: "black" }}>
                {blockLogout ? "Processing..." : "Logout"}
              </Text>
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
    height: _screen.height * 0.7,
    borderRadius: 15,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    width: _screen.width * 0.83,
    height: _screen.height * 0.4,
    borderRadius: 15,
    backgroundColor: colorPalette.secondary,
  },

  title: {
    justifyContent: "flex-start",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: colorPalette.background,
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
