import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorPalette, font, shadowStyle } from "../constants/Styling";
import { firebaseApp } from "../constants/Firebase";
import { postUserDb, postFiltersDb, postRecipeDb } from "../db/db";
import { initialState } from "../redux/reducers/filters";
import { useFonts } from "expo-font";
const _screen = Dimensions.get("screen");

export interface SignupScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "SignupScreen">;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [blockSignup, setBlockSignup] = React.useState(false);

  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );

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
    setBlockSignup(true);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email.");
      setBlockSignup(false);
    } else if (password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be 6 characters or longer."
      );
      setBlockSignup(false);
    } else {
      try {
        const resp = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password);

        const postUserResp = await postUserDb(resp.user?.uid, resp.user?.email);
        const postFiltersResp = await postFiltersDb(
          resp.user?.uid,
          initialState.filters
        );

        if (resp.additionalUserInfo?.isNewUser) {
          if (userRecipeListState.userRecipeList.length !== 0) {
            for (const savoredRcp of userRecipeListState.userRecipeList) {
              const postRecipeResp = await postRecipeDb(
                resp.user?.uid,
                savoredRcp
              );
            }
          }
          navigation.goBack();
          setBlockSignup(false);
        }
      } catch (error) {
        Alert.alert("Invalid Request", error.message);
        setBlockSignup(false);
      }
    }
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/header.png")}
          style={styles.headerImage}
        />
        <Text style={styles.title}>
          Put on your apron and sharpen your knife,
        </Text>
        <Text style={styles.title}>
          Heat up the pan and spice up your life!
        </Text>
        <View style={styles.form}>
          <View style={styles.inputsContainer}>
            <View style={styles.inputWithIcons}>
              <View style={styles.singleInputContainer}>
                <MaterialCommunityIcons name="account-outline" size={20} />
                <TextInput
                  style={styles.inputText}
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

            <View style={styles.inputWithIcons}>
              <View style={styles.singleInputContainer}>
                <MaterialCommunityIcons name="lock-outline" size={20} />
                <TextInput
                  style={styles.inputText}
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

          <Text style={styles.text}>
            By signing up your are agreeing to our terms and conditions.
          </Text>

          <View style={styles.signUpButtonContainer}>
            <TouchableOpacity
              onPress={
                blockSignup
                  ? () => {} // Fake function while blocked
                  : handleSignUp // Allow Register while unblocked
              }
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#5454FF", "#3B3BB3"]}
                style={styles.signUpButton}
              >
                <Text style={{ color: "white" }}>
                  {blockSignup ? "Processing..." : "Sign Up"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  headerImage: {
    resizeMode: "contain",
    width: 200,
    height: 60,
    marginVertical: _screen.height * 0.03,
  },

  title: {
    textAlign: "center",
    fontSize: font.subHeaderSize,
    fontFamily: "OpenSansBold",
    width: _screen.width * 0.93,
  },

  form: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: _screen.height * 0.03,
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

  signUpButtonContainer: {
    marginTop: _screen.height * 0.01
  },

  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    borderRadius: 10,
  },

  text: {
    fontSize: font.tagSize,
    fontFamily: "OpenSans",
    color: colorPalette.darkGray
  },
});
