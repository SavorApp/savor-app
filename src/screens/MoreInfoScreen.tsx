import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import HTML from "react-native-render-html";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { useFonts } from "expo-font";

const _screen = Dimensions.get("screen");

export interface MoreInfoScreenProps {
  route: RouteProp<{ params: { rcp: Recipe } }, "params">;
}

export default function MoreInfoScreen({ route }: MoreInfoScreenProps) {
  const { rcp } = route.params;
  const [showSummary, setShowSummary] = React.useState(false);
  const [showIngredients, setShowIngredients] = React.useState(false);
  const [showInstructions, setShowInstructions] = React.useState(false);

  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  // Filter through an array of ingredient name to remove duplicates and set the display
  function Ingredients({ ingredients }: { ingredients: string[] }) {
    let idx = 0;
    const filteredIngredients = Array.from(new Set(ingredients));

    return (
      <View style={{ marginTop: 4 }}>
        {filteredIngredients.map((ing) => {
          idx++;
          return (
            <View
              key={"c_" + idx.toString()}
              style={{ ...styles.ingredientContainer, marginTop: 8 }}
            >
              <Text key={"i_" + idx.toString()} style={styles.ingredient}>
                {ing}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.contentContainer}>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{rcp.title}</Text>
            <View style={{ ...styles.borderline }} />
              <TouchableOpacity
                onPress={() => {
                  setShowSummary(!showSummary);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.accordion}>
                  <Text style={styles.subTitle}>Summary</Text>
                  <Ionicons
                    name={
                      showSummary ? "chevron-up-sharp" : "chevron-down-sharp"
                    }
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              {showSummary && (
                <HTML
                  tagsStyles={{
                    div: { fontSize: 18, lineHeight: 28, marginTop: 12, fontFamily: "OpenSans" },
                    b: {fontFamily: "OpenSansBold"},
                    a: { fontSize: 18, fontFamily: "OpenSans" },
                  }}
                  source={{ html: `<div>${rcp.summary} </div>` }}
                />
              )}
              <TouchableOpacity
                style={styles.touchableHeader}
                onPress={() => {
                  setShowIngredients(!showIngredients);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.accordion}>
                  <Text style={styles.subTitle}>Ingredients</Text>
                  <Ionicons
                    name={
                      showIngredients
                        ? "chevron-up-sharp"
                        : "chevron-down-sharp"
                    }
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              {showIngredients && <Ingredients ingredients={rcp.ingredients} />}
              <TouchableOpacity
                style={styles.touchableHeader}
                onPress={() => {
                  setShowInstructions(!showInstructions);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.accordion}>
                  <Text style={styles.subTitle}>Instructions</Text>
                  <Ionicons
                    name={
                      showInstructions
                        ? "chevron-up-sharp"
                        : "chevron-down-sharp"
                    }
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              {showInstructions && (
                <>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      fontFamily: "OpenSansBold",
                      marginTop: 12,
                    }}
                  >
                    Preparation time:{" "}
                    <Text style={{ fontWeight: "normal", fontFamily: "OpenSans" }}>
                      {rcp.readyInMinutes} min
                    </Text>
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 18, fontFamily: "OpenSansBold", }}>
                    Servings:{" "}
                    <Text style={{ fontWeight: "normal", fontFamily: "OpenSans" }}>{rcp.servings}</Text>
                    {"\n"}
                  </Text>
                  <HTML
                    tagsStyles={{
                      div: { fontSize: 18, lineHeight: 28, fontFamily: "OpenSans" },
                      ol: { fontSize: 18 },
                      li: { fontSize: 18, marginTop: -5 },
                      a: { fontSize: 18 },
                    }}
                    source={{ html: `<div>${rcp.instructions}</div>` }}
                  />
                </>
              )}
              <Text>{"\n\n\n"}</Text>
            </ScrollView>
          </View>
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
                <MaterialCommunityIcons name="alpha-v-circle" color="green" />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colorPalette.background,
  },

  subContainer: {
    // justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    height: _screen.height * 0.8,
    borderRadius: 15,
    // backgroundColor: "#ff5454",
    ...shadowStyle,
  },

  title: {
    // margin: 8,
    // marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
    // color: colorPalette.background,
    textAlign: "center",
    fontFamily: "OpenSans",
  },

  borderline: {
    alignSelf: "center",
    borderBottomColor: "black",
    marginVertical: 8,
    marginBottom: 24,
    borderBottomWidth: 1,
    opacity: 0.8,
    width: _screen.width * 0.7,

  },

  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "OpenSansBold",
    // color: "#ff5454"
  },

  touchableHeader: {
    marginTop: 30,
  },

  accordion: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  contentContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    height: _screen.height * 0.8,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  scrollView: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.93,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  ingredientContainer: {
    flex: 1,
    flexDirection: "row",
  },

  ingredient: {
    justifyContent: "flex-start",
    width: "65%",
    fontSize: 18,
    fontFamily: "OpenSans"
  },

  measurement: {
    justifyContent: "flex-start",
    width: "35%",
    fontSize: 18,
  },

  tagsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // flexWrap: "wrap",
    marginTop: 8,
    marginHorizontal: 16,
  },

  singleTagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
    marginTop: 3,
    padding: 4,
    borderRadius: 8,
    backgroundColor: colorPalette.trimLight,
  },

  tag: {
    fontSize: 10,
  },
});
