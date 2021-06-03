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
import { useDispatch } from "react-redux";
import { InputUser, LoggedOutParamList } from "../../types";
import { setUser } from "../redux/actions";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { firebaseApp } from "../constants/Firebase";
import firebase from "firebase";

const _screen = Dimensions.get("screen");

export interface LoginScreenProps {
  navigation: StackNavigationProp<LoggedOutParamList, "LoginScreen">;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = React.useState<InputUser>({
    email: "",
    password: "",
  });
  const [validEmail, setValidEmail] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);

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
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email.");
    } else if (data.password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be 6 characters or longer."
      );
    } else {
      firebaseApp
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password);
        })
        .then((data) => {
          dispatch(
            setUser({
              id: data.user?.uid,
              username: data.user?.email,
              image_url: data.user?.photoURL,
            })
          );
          navigation.navigate("MenuScreen");
        })
        .catch((error: any) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Please Sign In</Text>
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
                handleLogin(userInput);
              }}
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
    marginBottom: 48,
    width: _screen.width * 0.8,
    height: _screen.height * 0.3,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  title: {
    marginVertical: 8,
    fontSize: 28,
    fontWeight: "bold",
    color: colorPalette.background,
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    padding: 6,
    paddingBottom: 18,
    width: _screen.width * 0.7,
    borderRadius: 10,
    backgroundColor: colorPalette.background,
  },

  input: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 3,
    width: _screen.width * 0.65,
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
