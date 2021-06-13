import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { firebaseApp } from "../constants/Firebase";
import firebase from "firebase";

const _screen = Dimensions.get("screen");

export interface LoginScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "LoginScreen">;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
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

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Already have an account? Please login.</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={[styles.input, { justifyContent: "space-between" }]}>
              <View style={styles.passwordContainer}>
                <MaterialCommunityIcons name="account-outline" size={20} />
                <TextInput
                  style={{ width: _screen.width * 0.5 }}
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

            <View style={[styles.input, { justifyContent: "space-between" }]}>
              <View style={styles.passwordContainer}>
                <MaterialCommunityIcons name="lock-outline" size={20} />
                <TextInput
                  style={{ width: _screen.width * 0.5 }}
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

          <View style={styles.signInButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                blockLogin
                  ? () => {} // Fake function while blocked
                  : handleLogin(userInput); // Allow login while unblocked
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#5454FF", "#3B3BB3"]}
                style={styles.signUpButton}
              >
                <Text style={{ color: "white" }}>
                  {blockLogin ? "Processing..." : "Login"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text>Don't have an account yet? </Text>
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
              colors={["white", "whitesmoke"]}
              style={styles.aboutUsButton}
            >
              <Text style={{ color: "black" }}>About Us</Text>
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
    // backgroundColor: colorPalette.background,
  },

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.9,
    height: _screen.height * 0.6,
    borderRadius: 15,
    // backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  form: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    width: _screen.width * 0.8,
    height: _screen.height * 0.3,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  title: {
    marginVertical: 8,
    fontSize: 28,
    fontWeight: "bold",
    // color: colorPalette.background,
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    padding: 6,
    paddingBottom: 18,
    width: _screen.width * 0.8,
    borderRadius: 10,
    backgroundColor: colorPalette.background,
  },

  input: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 3,
    width: _screen.width * 0.7,
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.trim,
  },

  passwordContainer: {
    flexDirection: "row",
  },

  signInButtonContainer: {
    marginTop: 10,
  },

  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 200,
    borderRadius: 10,
    padding: 8,
  },

  signUp: {
    // margin: 8,
    // fontSize: 18,
    // color: "blue",
    textDecorationLine: "underline",
    color: "#5c5c5c",
    // color: colorPalette.background,
  },

  aboutUsButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 8,
    width: 200,
    backgroundColor: "#FFAA54",
    borderRadius: 10,
    padding: 8,
    borderWidth: 0.2,
    borderStyle: "solid",
    shadowOpacity: 0.3,
    shadowRadius: 0.2,
    shadowOffset: { width: 0.2, height: 0.3 },
  },
});
