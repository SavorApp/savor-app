import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addtoUserRecipeList } from "../redux/actions";
import axios from "axios";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import CardStack, { Card } from "react-native-card-stack-swiper";
import RecipeCard from "../components/RecipeCard";
import SwipeButtons from "../components/SwipeButtons";
import {
  Recipe,
  RootState,
  UserState,
  RecipeCardStackParamList,
} from "../../types";
import { swipeToDb } from "../db/db";

const _screen = Dimensions.get("screen");

export default function RecipeCardStack({
  randRecipes,
  filtersState,
}: RecipeCardStackParamList) {
  const dispatch = useDispatch();
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const userId = useRef<string | undefined>("");
  const cardStackRef = React.useRef<CardStack>();

  useEffect(() => {
    console.log("UserState has probably updated", userState.user.id);
    userId.current = userState.user.id;
  }, [userState]);

  async function onSwipedLeft(idx: number) {
    const recipeToBeAdded = {
      id: randRecipes[idx].id,
      title: randRecipes[idx].title,
      cuisine:
        filtersState.filters.cuisine === ""
          ? randRecipes[idx].cuisines.toString()
          : filtersState.filters.cuisine,
      dishType:
        filtersState.filters.dishType === ""
          ? randRecipes[idx].dishTypes.toString()
          : filtersState.filters.dishType,
      vegetarian: randRecipes[idx].vegetarian,
      vegan: randRecipes[idx].vegan,
      glutenFree: randRecipes[idx].glutenFree,
      dairyFree: randRecipes[idx].dairyFree,
      readyInMinutes: randRecipes[idx].readyInMinutes,
      servings: randRecipes[idx].servings,
      ingredients: randRecipes[idx].ingredients,
      isSavored: false,
    };
    dispatch(addtoUserRecipeList(recipeToBeAdded));
    swipeToDb(userId.current, recipeToBeAdded);
  }

  async function onSwipedRight(idx: number) {
    const recipeToBeAdded = {
      id: randRecipes[idx].id,
      title: randRecipes[idx].title,
      cuisine:
        filtersState.filters.cuisine === ""
          ? randRecipes[idx].cuisines.toString()
          : filtersState.filters.cuisine,
      dishType:
        filtersState.filters.dishType === ""
          ? randRecipes[idx].dishTypes.toString()
          : filtersState.filters.dishType,
      vegetarian: randRecipes[idx].vegetarian,
      vegan: randRecipes[idx].vegan,
      glutenFree: randRecipes[idx].glutenFree,
      dairyFree: randRecipes[idx].dairyFree,
      readyInMinutes: randRecipes[idx].readyInMinutes,
      servings: randRecipes[idx].servings,
      ingredients: randRecipes[idx].ingredients,
      isSavored: true,
    };
    dispatch(addtoUserRecipeList(recipeToBeAdded));
    swipeToDb(userId.current, recipeToBeAdded);
  }

  function handleOnPressLeft() {
    cardStackRef.current?.swipeLeft();
  }

  function handleOnPressRight() {
    cardStackRef.current?.swipeRight();
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CardStack
          style={styles.cardStack}
          ref={(cardStack: CardStack) => {
            cardStackRef.current = cardStack;
          }}
          renderNoMoreCards={() => {
            return (
              <View>
                <Text style={styles.renderNoMoreCards}>No More Recipes</Text>
              </View>
            );
          }}
          disableBottomSwipe
          disableTopSwipe
        >
          {randRecipes.map((rcp: Recipe, idx: number) => {
            return (
              <Card
                key={rcp.id}
                onSwipedLeft={() => {
                  onSwipedLeft(idx);
                }}
                onSwipedRight={() => {
                  onSwipedRight(idx);
                }}
              >
                <RecipeCard rcp={rcp} id={rcp.id} />
              </Card>
            );
          })}
        </CardStack>
        <SwipeButtons
          handleOnPressLeft={handleOnPressLeft}
          handleOnPressRight={handleOnPressRight}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStack: {
    justifyContent: "flex-end",
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorPalette.background,
  },

  subContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: _screen.width * 0.9,
    height: _screen.height * 0.75,
    borderRadius: 30,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  renderNoMoreCards: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 250,
    color: "white",
  },
});
