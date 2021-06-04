import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import {
  removeUser,
  resetFilters,
  resetUserRecipeList,
} from "../redux/actions";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { LinearGradient } from "expo-linear-gradient";

const _screen = Dimensions.get("screen");

export interface DeleteAccountScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "DeleteAccountScreen">;
}

export default function DeleteAccountScreen({
  navigation,
}: DeleteAccountScreenProps) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Are you sure you want to delete your account?
        </Text>
        <View style={styles.form}>
          <Text>Yes, I'm hanging my apron for now...</Text>
          <TouchableOpacity
            onPress={() => {
              // TODO:
              // - Sign Chef out & Delete Account in DB
              dispatch(removeUser());
              dispatch(resetUserRecipeList());
              dispatch(resetFilters());
              Alert.alert("Enjoy your time off", "We hope you come back soon 👨‍🍳")
              navigation.goBack();
            }}
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: colorPalette.background,
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
});
