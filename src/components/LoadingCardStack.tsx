import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

export default function LoadingCardStack() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
          <View style={styles.loadingContent}>
            <Text style={{color: "white", fontSize: 24}}>Loading Recipes...</Text>
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
    height: _screen.height * 0.75,
    borderRadius: 30,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  loadingContent: {
    justifyContent: "center",
    alignItems: "center",
  }

});
