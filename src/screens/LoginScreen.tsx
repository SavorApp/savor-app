import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { colorPalette, font, shadowStyle } from "../constants/Styling";
import { firebaseApp } from "../constants/Firebase";
import firebase from "firebase";
import { useFonts } from "expo-font";
import Emoji from "react-native-emoji";

const _screen = Dimensions.get("screen");

export interface LoginScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "LoginScreen">;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const [userInput, setUserInput] = React.useState<InputUser>({
    email: "",
    password: "",
  });
  const [validEmail, setValidEmail] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [blockLogin, setBlockLogin] = React.useState(false);

  function emailInputChange(val: string) {
    setUserInput({
      ...userInput,
      email: val,
    });
  }

  function passwordInputChange(val: string) {
    setUserInput({
      ...userInput,
      password: val,
    });
  }

  function handleHidePassword() {
    setHidePassword(!hidePassword);
  }

  React.useEffect(() => {
    if (/^\S+@\S+\.\S+$/.test(userInput.email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [userInput]);

  function handleLogin(data: InputUser) {
    setBlockLogin(true);
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email.");
      setBlockLogin(false);
    } else if (data.password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be 6 characters or longer."
      );
      setBlockLogin(false);
    } else {
      firebaseApp
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password);
        })
        .then((userCreds) => {
          const accessToken = userCreds.user?.getIdToken();
          // Cache access-token on mobile storage
          cacheAccessToken(accessToken);
          // TODO: Get UserRecipeList & Filters from Backend Server

          if (userRecipeListState.userRecipeList.length > 0) {
            // Write to DB
            // Update UserRecipeList with these new recipes
            for (const rcp of userRecipeListState.userRecipeList) {
              // WRITE TO DB EACH RECIPE (with data.user?.uid)
            }

            // const concatUserRecipeList = [...USER_RECIPE_LIST_FROM_DB, ...userRecipeListState.userRecipeList];
            // dispatch(setUserRecipeList(concatUserRecipeList));
          } else {
            // dispatch(setUserRecipeList(USER_RECIPE_LIST_FROM_DB));
          }

          // dispatch(setFilters(USER_FILTERS_OBJ));

          setBlockLogin(false);
        })
        .catch((err: { code: string; message: string }) => {
          if (err.code === "auth/user-not-found") {
            Alert.alert(
              "User Not Found",
              "We cannot find this user, please check your input."
            );
            setBlockLogin(false);
          } else if (err.code === "auth/wrong-password") {
            Alert.alert(
              "Wrong Password",
              "The password is invalid, please check your credentials."
            );
            setBlockLogin(false);
          } else {
            Alert.alert(
              "Internal Error 🤕",
              "Sorry for the inconvenience, please try again later."
            );
            setBlockLogin(false);
          }
        });
    }
  }

  async function cacheAccessToken(
    PromisedAccessToken: Promise<string> | undefined
  ) {
    if (PromisedAccessToken) {
      const accessToken = await PromisedAccessToken;
      try {
        await AsyncStorage.setItem("access-token", accessToken);
      } catch (err) {
        // Handle failed asyncStorage error
      }
    } else {
      // Handle undefined Promise
    }
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome back chef{" "}
          <Emoji name="female-cook" style={{ fontSize: 24 }} />
        </Text>
        <View style={styles.form}>
          <View style={styles.inputsContainer}>
            <View style={[styles.inputWithIcons]}>
              <View style={styles.singleInputContainer}>
                <MaterialCommunityIcons name="account-outline" size={20} />
                <TextInput
                  style={styles.inputText}
                  placeholder="Your Email"
                  autoCapitalize="none"
                  onChangeText={(val) => emailInputChange(val)}
                />
              </View>

              {validEmail ? (
                <MaterialCommunityIcons
                  name="checkbox-marked-circle-outline"
                  color="green"
                  size={20}
                />
              ) : (
                <></>
              )}
            </View>

            <View style={[styles.inputWithIcons]}>
              <View style={styles.singleInputContainer}>
                <MaterialCommunityIcons name="lock-outline" size={20} />
                <TextInput
                  style={styles.inputText}
                  placeholder="Your Password"
                  secureTextEntry={hidePassword ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => passwordInputChange(val)}
                />
              </View>

              <TouchableOpacity onPress={handleHidePassword}>
                {hidePassword ? (
                  <MaterialCommunityIcons
                    name="eye-off"
                    color="grey"
                    size={20}
                  />
                ) : (
                  <MaterialCommunityIcons name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.loginButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                blockLogin
                  ? () => {} // Fake function while blocked
                  : handleLogin(userInput); // Allow login while unblocked
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={colorPalette.secondaryGradient}
                style={styles.loginButton}
              >
                <Text style={{ ...styles.text, color: "white" }}>
                  {blockLogin ? "Processing..." : "Login"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.text}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AboutUsScreen")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colorPalette.whiteSmokeGradient}
              style={styles.aboutUsButton}
            >
              <Text style={{ ...styles.text, color: "black" }}>About Us</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    textAlign: "center",
    fontSize: font.titleSize,
    fontFamily: "OpenSansBold",
    width: _screen.width * 0.93,
  },

  form: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: _screen.height * 0.1,
  },

  inputsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: _screen.height * 0.01,
    width: _screen.width * 0.93,
    borderRadius: 10,
    backgroundColor: colorPalette.white,
    ...shadowStyle,
  },

  inputWithIcons: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: _screen.height * 0.02,
    marginBottom: _screen.height * 0.01,
    paddingHorizontal: _screen.width * 0.01,
    width: _screen.width * 0.9,
    borderBottomWidth: 0.5,
    borderBottomColor: colorPalette.darkGray,
  },

  singleInputContainer: {
    flexDirection: "row",
  },

  inputText: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
    width: _screen.width * 0.7,
    marginLeft: 3,
  },

  loginButtonContainer: {},

  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    borderRadius: 10,
  },

  signUpContainer: {
    flexDirection: "row",
    marginBottom: _screen.height * 0.02,
  },

  text: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
  },

  signUp: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
    color: colorPalette.primary,
  },

  aboutUsButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    borderRadius: 10,
    borderColor: colorPalette.darkGray,
    borderWidth: Platform.OS === "android" ? 0.5 : 0.3,
  },
});
