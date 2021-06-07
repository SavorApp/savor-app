import React from "react";
import { View, StyleSheet, Text, Dimensions, ImageBackground, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { shadowStyle, colorPalette } from "../constants/ColorPalette";
import { disableScroll, enableScroll } from "../redux/actions";
const _screen = Dimensions.get("screen");
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function RecipeCard({ id, rcp, }: RecipeCardParamList) {
  const filtersState = useSelector<RootState, FiltersState>(
    (state) => state.filtersState
  );
  const scrollState = useSelector<RootState, EnableScrollState>(
    (state) => state.enableScrollState
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          centerContent={true}
          directionalLockEnabled
          scrollEnabled={scrollState.enable}
          onTouchStart={() => { dispatch(enableScroll()) }}
          onScrollEndDrag={() => { dispatch(disableScroll()) }}
        >
          {rcp.image ? (
            <ImageBackground
              key={id}
              source={{ uri: rcp.image || " " }}
              style={styles.picture}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.titleBackground}>{rcp.title}</Text>
              </View>
            </ImageBackground>
          ) : (
              <ImageBackground key={id} source={require("../../assets/icon.png")} style={styles.picture}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleBackground}>{rcp.title}</Text>
                </View>
                <Text style={styles.pictureUnavailable}>
                  Picture unavailable for this recipe 😟 But believe us, it's
              delicious!🍽{" "}
                </Text>
              </ImageBackground>
            )}

          <View style={styles.rcpInfoContainer}>
            <Text style={styles.rcpInfo}>
              Type:{" "}
              {filtersState.filters.dishType
                ? filtersState.filters.dishType[0].toUpperCase() +
                filtersState.filters.dishType.slice(1)
                : rcp.dishTypes.length === 0
                  ? "Many"
                  : rcp.dishTypes[0][0].toUpperCase() + rcp.dishTypes[0].slice(1)}
            </Text>
            <Text style={styles.rcpInfo}>
              Cuisine:{" "}
              {filtersState.filters.cuisine
                ? filtersState.filters.cuisine[0].toUpperCase() +
                filtersState.filters.cuisine.slice(1)
                : rcp.cuisines.length === 0
                  ? "World Food"
                  : rcp.cuisines[0]}
            </Text>
            <Text style={styles.rcpInfo}>
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
            </Text>

            
            <Text style={styles.subTitle}>Additional Information</Text>
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
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  picture: {
    height: 350,
    width: 350,
    resizeMode: "cover",
    borderRadius: 20,
    alignItems: "center",
    overflow: "hidden",
  },

  title: {
    color: "white",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBackground: {
    color: "black",
    marginTop: 5,
    textAlign: "center",
  },

  titleContainer: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: "white",
    width: 250,
    borderRadius: 15,
    ...shadowStyle,
  },

  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  subContainer: {
    alignItems: "center",
    paddingTop: 20,
    width: _screen.width * 0.9,
    height: _screen.height * 0.6,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  pictureUnavailable: {
    textAlign: "center",
    marginTop: 50,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: "white",
    overflow: "hidden"
  },

  pictureUnavailableContainer: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: "white",
    width: 250,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: _screen.height * 0.25,
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
    marginTop: 150,
    alignContent: "stretch",
    marginBottom: 10,
  },

  rcpInfo: {
    textAlign: "center",
    marginTop: 10,
    width: "50%",
  },

  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
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
