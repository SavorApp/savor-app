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
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import {
  InputUser,
  LoggedOutParamList,
  RootState,
  UserState,
  User,
} from "../../types";
import { setUser } from "../redux/actions";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";

// Johan and Mark auth work
import { firebaseApp } from "../constants/Firebase";
import firebase from "firebase";

const _screen = Dimensions.get("screen");

export interface LoginScreenProps {
  navigation: StackNavigationProp<LoggedOutParamList, "LoginScreen">;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  // userSelector allows us to access global store variables
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  // useDispatch allows us to dispatch Actions to mutate global store variables
  const dispatch = useDispatch();
  const [userInput, setUserInput] = React.useState<InputUser>({
    username: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = React.useState(true);
  const [error, setError] = React.useState("");

  function usernameInputChange(val: string) {
    setUserInput({
      ...userInput,
      username: val,
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

  function handleLogin(data: InputUser) {
    console.log("USERNAME: ", data.username);
    console.log("PASSWORD: ", data.password);

    if (data.username.length < 4) {
      Alert.alert(
        "Invalid Username",
        "Username must be 4 characters or longer."
      );
    } else if (data.password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be 6 characters or longer."
      );
    }

    // Authenticate user and log user in
    // Use Oauth or axios, etc..
    // const user: User = <AUTHENTICATE>
    firebaseApp
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(data.username, data.password);
      })
      .then((data) => {
        //TODO:
        // Check if uid exists in the DB - if so - grab the data associated with it.
        dispatch(
          setUser({
            ...userState.user,
            id: data.user?.uid,
            username: data.user?.email,
            image_url: data.user?.photoURL,
          })
        );
        navigation.navigate("MenuScreen");
      })
      .catch((error: any) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.form}>
          <View style={styles.input}>
            <MaterialCommunityIcons name="account-outline" size={20} />
            <TextInput
              style={{ width: _screen.width * 0.5 }}
              placeholder="Your Username"
              autoCapitalize="none"
              onChangeText={(val) => usernameInputChange(val)}
            />
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
                <MaterialCommunityIcons name="eye-off" color="grey" size={20} />
              ) : (
                <MaterialCommunityIcons name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => handleLogin(userInput)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colorPalette.alternate, colorPalette.alternate2]}
                style={styles.signUpButton}
              >
                <Text style={{ color: colorPalette.background }}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View>
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
              colors={[colorPalette.popLight, colorPalette.popDark]}
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
    width: _screen.width * 0.7,
    height: _screen.height * 0.4,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  input: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 3,
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.trim,
    width: _screen.width * 0.69,
  },

  passwordContainer: {
    flexDirection: "row",
  },

  errorMessage: {
    height: 20,
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
    margin: 8,
    fontSize: 18,
    textDecorationLine: "underline",
    color: colorPalette.background,
  },

  aboutUsButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    width: 120,
    borderRadius: 10,
    padding: 8,
  },
});
