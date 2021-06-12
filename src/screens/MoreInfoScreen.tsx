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

const _screen = Dimensions.get("screen");

export interface MoreInfoScreenProps {
    route: RouteProp<{ params: { rcp: Recipe } }, "params">;
}

export default function MoreInfoScreen({ route }: MoreInfoScreenProps) {
    const { rcp } = route.params;
    const [showSummary, setShowSummary] = React.useState(false);
    const [showIngredients, setShowIngredients] = React.useState(false);
    const [showInstructions, setShowInstructions] = React.useState(false);


    // Remove duplicates in array of elements and then map through it to organize the layout
    function Ingredients({ ingredients }: { ingredients: string[] }) {
        const filteredIngredients = [...new Set(ingredients)];

        return (
            <View>
                {filteredIngredients.map((ing, idx) => {
                    return (
                        <View
                            key={"c_" + idx.toString()}
                            style={styles.ingredientContainer}
                        >
                            <Text
                                key={"i_" + idx.toString()}
                                style={styles.ingredient}
                            >
                                {ing}
                            </Text>
                        </View>
                    );
                })}
            </View>
        );
    }

    return (
        <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{rcp.title}</Text>
          <View style={styles.contentContainer}>
            <ScrollView style={styles.scrollView}>
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
              {showSummary && <HTML source={{ html: rcp.summary }} />}
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
              {showIngredients && (
                <Ingredients ingredients={rcp.ingredients} />
              )}
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
                  <Text style={{ fontWeight: "bold" }}>
                    Preparation time:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {rcp.readyInMinutes} min
                    </Text>
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    Servings:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {rcp.servings}
                    </Text>
                    {"\n"}
                  </Text>
                  <HTML source={{ html: rcp.instructions }} />
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
    )
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
      borderRadius: 15,
      backgroundColor: colorPalette.primary,
      ...shadowStyle,
    },
  
    title: {
      margin: 8,
      fontSize: 25,
      fontWeight: "bold",
      color: colorPalette.background,
      textAlign: "center",
    },
  
    subTitle: {
      fontSize: 20,
      fontWeight: "bold",
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
      justifyContent: "center",
      alignItems: "center",
      width: _screen.width * 0.85,
      height: _screen.height * 0.55,
      borderRadius: 15,
      backgroundColor: colorPalette.secondary,
    },
  
    scrollView: {
      padding: 8,
      marginVertical: Platform.OS === "android" ? 12 : 0,
      width: _screen.width * 0.83,
      borderRadius: 15,
      backgroundColor: colorPalette.secondary,
    },
  
    ingredientContainer: {
      flex: 1,
      flexDirection: "row",
    },
  
    ingredient: {
      justifyContent: "flex-start",
      width: "65%",
    },
  
    measurement: {
      justifyContent: "flex-start",
      width: "35%",
    },
  
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 8,
      marginHorizontal: 16,
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