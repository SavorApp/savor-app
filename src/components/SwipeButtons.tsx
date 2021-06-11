import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { shadowStyle } from "../constants/ColorPalette";
import { StackNavigationProp } from "@react-navigation/stack";

export default function SwipeButtons({
  handleOnPressLeft,
  handleOnPressRight,
  rcp,
  navigateToMoreInfoScreen,
}: SwipeButtonsParamList) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOnPressLeft}>
        <Ionicons name="thumbs-down-sharp" size={35} color="#d64f4f" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => {
          navigateToMoreInfoScreen(rcp);
        }}
      >
        <Entypo name="info" size={27} color="#7e72c4" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOnPressRight}>
        <Ionicons name="thumbs-up-sharp" size={35} color="#75d177" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 75,
    height: 75,
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    ...shadowStyle,
    elevation: 9,
  },
  infoButton: {
    width: 60,
    height: 60,
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    ...shadowStyle,
    elevation: 9,
  },
});
