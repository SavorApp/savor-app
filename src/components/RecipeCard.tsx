import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { shadowStyle, colorPalette } from "../constants/ColorPalette";
const _screen = Dimensions.get("screen");
import { useFonts } from "expo-font";

export default function RecipeCard({ id, rcp }: RecipeCardParamList) {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
            {rcp.image ? (
              <View style={styles.imageContainer}>
                <ImageBackground
                  key={id}
                  source={{ uri: rcp.image || " " }}
                  style={styles.image}
                >
                </ImageBackground>
                  <View style={styles.titleContainer}>
                    <Text numberOfLines={2} style={styles.title}>{rcp.title}</Text>
                  </View>
              </View>
            ) : (
              <View style={styles.noImageContainer}>
                <Image
                  key={id}
                  source={require("../../assets/icon2.png")}
                  style={styles.noImage}
                >
                </Image>
                  <Text style={styles.noImageMsg}>😟 No Image 😟</Text>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{rcp.title}</Text>
                  </View>
              </View>
            )}
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

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 20,
    height: _screen.height * 0.6,
    width: _screen.width * 0.93,
    borderRadius: 15,
    marginBottom: 30,
    // backgroundColor: colorPalette.secondary,
  },

  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: _screen.height * 0.6,
    width: _screen.width * 0.93,
    borderRadius: 15,
    backgroundColor: "#fff",
    ...shadowStyle,
  },

  noImageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: _screen.height * 0.6,
    width: _screen.width * 0.93,
    borderRadius: 15,
    backgroundColor: "white"
  },

  image: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: _screen.height * 0.5,
    width: _screen.width * 0.93,
    resizeMode: "contain",
    overflow: "hidden",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // borderRadius: 15,
  },

  noImage: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: _screen.height * 0.25,
    width: _screen.width * 0.8,
    resizeMode: "contain",
    // overflow: "hidden",
    borderRadius: 15,
  },

  titleContainer: {
    marginVertical: 3,
    padding: 3,
    width: _screen.width * 0.9,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    marginBottom: 15,
    // ...shadowStyle,
  },

  title: {
    textAlign: "center",
    fontSize: 28,
    color: "black",
    fontFamily: "OpenSans",
  },

  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  noImageMsg: {
    textAlign: "center",
    marginTop: 18,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    overflow: "hidden",
  },

  rcpInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    borderRadius: 20,
    width: _screen.width * 0.75,
    // marginTop: 150,
    alignContent: "stretch",
    marginBottom: 10,
  },

  rcpInfo: {
    textAlign: "center",
    marginTop: 10,
    width: "50%",
  },

  measurement: {
    justifyContent: "flex-start",
    width: "35%",
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  singleTagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3,
    marginTop: 3,
    padding: 4,
    borderRadius: 8,
    backgroundColor: colorPalette.trimLight,
  },

  tag: {
    fontSize: 10,
  },
});
