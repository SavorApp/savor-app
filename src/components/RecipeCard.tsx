import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { shadowStyle, colorPalette } from "../constants/ColorPalette";
import { disableScroll, enableScroll } from "../redux/actions";
const _screen = Dimensions.get("screen");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

export default function RecipeCard({ id, rcp }: RecipeCardParamList) {
  // if (rcp.title.split(" ").length > 3) {
  //   rcp.title = rcp.title.split(" ").splice(0, 3).join(" ");
  // }
  const filtersState = useSelector<RootState, FiltersState>(
    (state) => state.filtersState
  );
  const scrollState = useSelector<RootState, EnableScrollState>(
    (state) => state.enableScrollState
  );
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          {/* <Animated.ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            centerContent={true}
            directionalLockEnabled
            scrollEnabled={scrollState.enable}
            onTouchStart={() => {
              dispatch(enableScroll());
            }}
            onScrollEndDrag={() => {
              dispatch(disableScroll());
            }}
          > */}
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

            {/* <View style={styles.rcpInfoContainer}>
              <Text style={styles.rcpInfo}>
                Type:{" "}
                {filtersState.filters.dishType
                  ? filtersState.filters.dishType[0].toUpperCase() +
                    filtersState.filters.dishType.slice(1)
                  : rcp.dishTypes.length === 0
                  ? "Many"
                  : rcp.dishTypes[0][0].toUpperCase() +
                    rcp.dishTypes[0].slice(1)}
              </Text>
              <Text style={styles.rcpInfo}>
                Cuisine:{" "}
                {filtersState.filters.cuisine
                  ? filtersState.filters.cuisine[0].toUpperCase() +
                    filtersState.filters.cuisine.slice(1)
                  : rcp.cuisines.length === 0
                  ? "World Food"
                  : rcp.cuisines[0]}
              </Text> */}
              {/* <Text style={styles.rcpInfo}>
                Dairy-free:{rcp.dairyFree ? " ✅  " : " ❌ "}
              </Text>
              <Text style={styles.rcpInfo}>
                Gluten-free:{rcp.glutenFree ? " ✅  " : " ❌ "}
              </Text>
              <Text style={styles.rcpInfo}>
                Vegetarian:{rcp.vegetarian ? " ✅  " : " ❌ "}
              </Text>
              <Text style={styles.rcpInfo}>
                Vegan:{rcp.vegan ? " ✅  " : " ❌ "}
              </Text> */}

              {/* <Text style={styles.subTitle}>Additional Information</Text>
              <Text>Preparation time: {rcp.readyInMinutes} min </Text>
              <Text>Servings: {rcp.servings}</Text>
              <View style={styles.tagsContainer}>
                {rcp.veryHealthy && (
                  <View style={styles.singleTagContainer}>
                    <MaterialCommunityIcons
                      name="food-apple-outline"
                      color="green"
                    />
                    <Text style={styles.tag}>Healthy Choice</Text>
                  </View>
                )}
                {rcp.vegetarian && (
                  <View style={styles.singleTagContainer}>
                    <MaterialCommunityIcons
                      name="alpha-v-circle-outline"
                      color="green"
                    />
                    <Text style={styles.tag}>Vegetarian</Text>
                  </View>
                )}
                {rcp.vegan && (
                  <View style={styles.singleTagContainer}>
                    <MaterialCommunityIcons
                      name="alpha-v-circle"
                      color="green"
                    />
                    <Text style={styles.tag}>Vegan</Text>
                  </View>
                )}
                {rcp.glutenFree && (
                  <View style={styles.singleTagContainer}>
                    <Text style={[styles.tag, { fontWeight: "bold" }]}>
                      Gluten Free
                    </Text>
                  </View>
                )}
                {rcp.dairyFree && (
                  <View style={styles.singleTagContainer}>
                    <Text style={[styles.tag, { fontWeight: "bold" }]}>
                      Dairy Free
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Animated.ScrollView> */}
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
    backgroundColor: "white",
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
