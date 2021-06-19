import { Dimensions } from "react-native";

const _screen = Dimensions.get("screen");

export const colorPalette = {
  primary: "#FF5454",
  secondary: "#5454FF",
  primaryGradient: ["#FF5454", "#b33b3b"],
  secondaryGradient: ["#5454FF", "#3B3BB3"],
  deleteAccountGradient: ["#ad3333", "#990000"],
  whiteSmokeGradient: ["#ffffff", "#dddddd"],
  truffleShuffleGradient: ["#F7DD08", "#FFA500"],
  thumbsDown: "#d64f4f",
  thumbsUp: "#75d177",
  lightGray: "#d7d9db",
  darkGray: "#818283",
  white: "#ffffff",
  black: "#000000",
  removeRed: "#C70000",
  deleteAccount: "#990000",
};

export const font = {
  SatisfyTitleSize: 38,
  titleSize: 24,
  subTitleSize: 20,
  subHeaderSize: 14,
  contentSize: 14,
  tagSize: 10
}

export const shadowStyle = {
  shadowColor: "#000000",
  shadowOffset: {
    width: -3,
    height: 3,
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,
};

export const borderLine = {
  borderBottomColor: "black",
  marginVertical: _screen.height * 0.01,
  marginBottom: _screen.height * 0.03,
  borderBottomWidth: 1,
  opacity: 0.5,
  width: _screen.width * 0.6,
};