import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform, PlatformIOSStatic } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { colorPalette, shadowStyle } from "../constants/Styling";

const _screen = Dimensions.get("screen");
let PlatformIdentifier
if (Platform.OS === 'ios') {
  // Used to determine iPad vs non-iPad
  PlatformIdentifier = Platform as PlatformIOSStatic
} else {
  PlatformIdentifier = Platform
}

export default function SwipeButtons({
  handleOnPressLeft,
  handleOnPressRight,
  rcp,
  navigateToMoreInfoScreen,
}: SwipeButtonsParamList) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOnPressLeft}>
        <Ionicons name="thumbs-down-sharp" size={36} color={colorPalette.thumbsDown} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => {
          rcp && navigateToMoreInfoScreen(rcp);
        }}
      >
        <Entypo name="info" size={28} color={colorPalette.secondary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOnPressRight}>
        <Ionicons name="thumbs-up-sharp" size={36} color={colorPalette.thumbsUp} />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    // Adjust size for iPads
    width: PlatformIdentifier.OS === "ios" ? (PlatformIdentifier.isPad ? _screen.width*0.1: _screen.width*0.19) : _screen.width*0.19,
    height: PlatformIdentifier.OS === "ios" ? (PlatformIdentifier.isPad ? _screen.width*0.1: _screen.width*0.19) : _screen.width*0.19,
    marginHorizontal: _screen.width*0.03,
    borderRadius: 50,
    backgroundColor: colorPalette.white,
    elevation: 10,
    zIndex: 10,
    ...shadowStyle,
  },

  infoButton: {
    justifyContent: "center",
    alignItems: "center",
    // Adjust size for iPads
    width: PlatformIdentifier.OS === "ios" ? (PlatformIdentifier.isPad ? _screen.width*0.08: _screen.width*0.15) : _screen.width*0.15,
    height: PlatformIdentifier.OS === "ios" ? (PlatformIdentifier.isPad ? _screen.width*0.08: _screen.width*0.15) : _screen.width*0.15,
    marginTop: _screen.height*0.01,
    marginHorizontal: _screen.width*0.05,
    borderRadius: 50,
    backgroundColor: colorPalette.white,
    elevation: 10,
    zIndex: 10,
    ...shadowStyle,
  },
});
