import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { shadowStyle, colorPalette, font } from "../constants/Styling";
import { useFonts } from "expo-font";


const _screen = Dimensions.get("screen");

export default function RecipeCard({ id, rcp }: RecipeCardParamList) {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
            {rcp.image ? (
              <View style={styles.cardContainer}>
                <Image
                  key={id}
                  source={{ uri: rcp.image || " " }}
                  style={styles.image}
                >
                </Image>
                  <View style={styles.titleContainer}>
                    <Text numberOfLines={2} style={styles.title}>{rcp.title}</Text>
                  </View>
              </View>
            ) : (
              <View style={styles.cardContainer}>
                <Image
                  key={id}
                  source={require("../../assets/icon2.png")}
                  style={styles.noImage}
                >
                </Image>
                  <Text style={styles.noImageText}>No Image</Text>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{rcp.title}</Text>
                  </View>
              </View>
            )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    ...shadowStyle
  },

  cardContainer: {
    flex: 8,
    justifyContent: "space-between",
    alignItems: "center",
    height: _screen.height * 0.5,
    borderRadius: 15,
    backgroundColor: colorPalette.white,
  },

  image: {
    height: _screen.height * 0.39,
    width: _screen.width * 0.93,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  titleContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    marginVertical: 6,
    paddingHorizontal: 3,
  },

  title: {
    textAlign: "center",
    fontSize: font.titleSize,
    fontFamily: "OpenSans",
  },

  noImage: {
    height: _screen.height * 0.3,
    width: _screen.width * 0.7,
    resizeMode: "contain",
  },

  noImageText: {
    fontSize: font.titleSize,
    color: colorPalette.primary
  },
});
