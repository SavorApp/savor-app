import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChefStackParamList } from "../../types";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { firebaseApp } from "../constants/Firebase";
import { resetFilters, resetUserRecipeList, setUser } from "../redux/actions";
import axios from "axios";
const _screen = Dimensions.get("screen");
export interface SignupScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "SignupScreen">;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (/^\S+@\S+\.\S+$/.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  function handleHidePassword() {
    setHidePassword(!hidePassword);
  }

  async function handleSignUp() {
    // Check that both email and password field are populated.
    // Also check that the email is somewhat valid

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email."
      );
    }

    else if (password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be 6 characters or longer."
      );
    }

    else {
      try {
        const resp = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (resp.additionalUserInfo?.isNewUser) {
          await axios("https://savored-server.herokuapp.com/", {
            method: "POST",
            data: {
              query: `
            mutation createUser($_id: String!, $username: String!) {
              createUser(_id:$_id, username:$username) {
               _id
                username
              }
            }
            `,
              variables: {
                _id: resp.user?.uid,
                username: resp.user?.email,
              },
            },
            headers: {
              "Content-Type": "application/json",
            },
          });

          // setUser with new user
          dispatch(
            setUser({
              id: resp.user?.uid,
              username: resp.user?.email,
              image_url: resp.user?.photoURL,
            })
          );
          // Reset UserRecipeList
          dispatch(resetUserRecipeList());
          // Reset Filters
          dispatch(resetFilters());
          
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert("Invalid Request", error.message);

      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Please Register</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={[styles.input, { justifyContent: "space-between" }]}>
              <View style={styles.passwordContainer}>
                <MaterialCommunityIcons name="account-outline" size={20} />
                <TextInput
                  style={{ width: _screen.width * 0.5 }}
                  placeholder="Your Email"
                  autoCapitalize="none"
                  onChangeText={(val) => setEmail(val)}
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
                  onChangeText={(val) => setPassword(val)}
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
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colorPalette.popLight, colorPalette.popDark]}
                style={styles.signUpButton}
              >
                <Text>Register</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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