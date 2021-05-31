import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoggedOutParamList } from "../../types";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { firebaseApp, api } from "../constants/Firebase";
import { setUser } from "../redux/actions";

const _screen = Dimensions.get("screen");
export interface SignupScreenProps {
  navigation: StackNavigationProp<LoggedOutParamList, "SignupScreen">;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  const handleSignUp = async () => {
    // Check that both email and password field are populated.
    // Also check that the email is somewhat valid
    if (email && password && /^\S+@\S+\.\S+$/.test(email)) {
      try {
        const user = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (user.additionalUserInfo?.isNewUser) {
          //TODO:
          //Send user info to DB
        }
        //Update global state
        dispatch(
          setUser({
            ...userState.user,
            id: user?.user?.uid,
            username: user?.user?.email,
            image_url: user?.user?.photoURL,
            isLoggedIn: true,
          })
        );
        navigation.navigate("MenuScreen");
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text> Signup Screen </Text>
      <Text>{error ? error : null}</Text>
      <View style={styles.subContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => {
            // TODO:
            // - Register user by making API request
            handleSignUp();
            // navigation.goBack();
          }}
        >
          <Text>Register</Text>
        </TouchableOpacity>
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
});
