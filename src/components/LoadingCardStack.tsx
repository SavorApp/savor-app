import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Emoji from "react-native-emoji";
import { colorPalette } from "../constants/Styling";


export default function LoadingCardStack() {
  return (
        <View style={styles.container}>
          <Emoji name="yum" style={{fontSize: 24}}/>
          <Text style={styles.loadingText}>Loading Recipes...</Text>
          <Emoji name="yum" style={{fontSize: 24}}/>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginHorizontal: 12,
    fontSize: 24,
    color: colorPalette.primary
  }

});
