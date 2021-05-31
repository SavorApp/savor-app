import React from "react";
import { StyleSheet, Dimensions, View, ScrollView, Text } from "react-native";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import {
  header,
  slogan,
  noBounderies,
  noLimits,
  swipeAndLook,
  savorToCook,
  noBounderiesContent,
  noLimitsContent,
  swipeAndLookContent,
  savorToCookContent,
  contactUsContent,
  email
} from "../constants/AboutUsContent";

const _screen = Dimensions.get("screen");

export default function AboutUsScreen() {
  // TODO: Include information about us
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>About Us</Text>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.content}>{header}</Text>
            <View style={styles.sloganContainer}>
              <Text style={[styles.slogan, styles.content]}>{slogan}</Text>
            </View>
            <Text style={[styles.subTitle, styles.content]}>Savored Core Values:</Text>
            <Text style={[styles.subTitle2, styles.content]}>{noBounderies}</Text>
            <Text style={styles.content}>{noBounderiesContent}</Text>
            <Text style={[styles.subTitle2, styles.content]}>{noLimits}</Text>
            <Text style={styles.content}>{noLimitsContent}</Text>
            <Text style={[styles.subTitle2, styles.content]}>{swipeAndLook}</Text>
            <Text style={styles.content}>{swipeAndLookContent}</Text>
            <Text style={[styles.subTitle2, styles.content]}>{savorToCook}</Text>
            <Text style={styles.content}>{savorToCookContent}</Text>
            <Text style={[styles.subTitle, styles.content]}>Contact Information:</Text>
            <Text style={styles.content}>{contactUsContent}</Text>
            <Text style={[styles.content, styles.email]}>{email}</Text>
          </ScrollView>
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
    height: _screen.height * 0.8,
    borderRadius: 30,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  title: {
    marginVertical: 8,
    fontSize: 28,
    fontWeight: "bold",
    color: colorPalette.background,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.85,
    height: _screen.height * 0.7,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  scrollView: {
    padding: 8,
    width: _screen.width * 0.83,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  content: {
    marginBottom: 6,
  },

  sloganContainer: {
    marginVertical: 6,
    paddingTop: 4,
    backgroundColor: colorPalette.popDark,
    borderRadius: 10
  },

  slogan: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  subTitle2: {
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  email: {
    fontWeight: "bold",
    color: colorPalette.alternate2
  }
});
