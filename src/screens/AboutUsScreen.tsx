import React from "react";
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  ScrollView,
  Text,
} from "react-native";
import { colorPalette, font } from "../constants/Styling";
import {
  header,
  slogan1,
  slogan2,
  noBoundaries,
  noLimits,
  swipeAndLook,
  savorToCook,
  noBoundariesContent,
  noLimitsContent,
  swipeAndLookContent,
  savorToCookContent,
  contactUsContent,
  email,
} from "../constants/AboutUsContent";
import { useFonts } from "expo-font";

const _screen = Dimensions.get("screen");

export default function AboutUsScreen() {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.content}>{header}</Text>
            <View style={styles.sloganContainer}>
              <Text style={styles.slogan}>{slogan1}</Text>
              <Text style={styles.slogan}>{slogan2}</Text>
            </View>
            <Text style={styles.subTitle}>
              Savored Core Values:
            </Text>
            <Text style={styles.subHeader}>
              {noBoundaries}
            </Text>
            <Text style={styles.content}>{noBoundariesContent}</Text>
            <Text style={styles.subHeader}>{noLimits}</Text>
            <Text style={styles.content}>{noLimitsContent}</Text>
            <Text style={styles.subHeader}>
              {swipeAndLook}
            </Text>
            <Text style={styles.content}>{swipeAndLookContent}</Text>
            <Text style={styles.subHeader}>
              {savorToCook}
            </Text>
            <Text style={styles.content}>{savorToCookContent}</Text>
            <Text style={styles.subTitle}>
              Contact Information:
            </Text>
            <Text style={styles.content}>{contactUsContent}</Text>
            <Text style={[styles.content, styles.email]}>{email}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    width: _screen.width * 0.93,
  },

  scrollView: {
    paddingTop: _screen.height * 0.01,
  },

  sloganContainer: {
    backgroundColor: colorPalette.lightGray,
    borderRadius: 10,
    borderColor: colorPalette.darkGray,
    borderWidth: Platform.OS === "android" ? 0.5 : 0.3,
    marginTop: _screen.height * 0.03
  },

  slogan: {
    textAlign: "center",
    fontSize: font.subHeaderSize,
    fontFamily: "OpenSansBold",
    color: colorPalette.primary
  },

  subTitle: {
    fontSize: font.subTitleSize,
    fontFamily: "OpenSansBold",
    marginVertical: _screen.height * 0.03
  },

  subHeader: {
    fontSize: font.subHeaderSize,
    fontFamily: "OpenSansBold",
    textDecorationLine: "underline",
    marginVertical: _screen.height * 0.01
  },

  content: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
    lineHeight: 24,
  },


  email: {
    fontSize: font.contentSize,
    fontFamily: "OpenSansBold",
    color: colorPalette.secondary,
  },
});
