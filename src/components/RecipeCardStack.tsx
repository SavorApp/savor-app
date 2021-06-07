import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addtoUserRecipeList, disableScroll, enableScroll, triggerReload } from "../redux/actions";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import CardStack, { Card } from "react-native-card-stack-swiper";
import RecipeCard from "../components/RecipeCard";
import SwipeButtons from "../components/SwipeButtons";
import { swipeToDb } from "../db/db";
import Emoji from "react-native-emoji";

const _screen = Dimensions.get("screen");

export default function RecipeCardStack({
  randRecipes,
  filtersState,
}: RecipeCardStackParamList) {
  const dispatch = useDispatch();
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const scrollState = useSelector<RootState, EnableScrollState>(
    (state) => state.enableScrollState
  );
  const [blockSwipeButtons, setBlockSwipeButtons] = React.useState(false);
  const userId = useRef<string | undefined>("");
  const cardStackRef = React.useRef<CardStack>();
  
  useEffect(() => {
    userId.current = userState.user.id;
  }, [userState]);

  async function handleSwipe(idx: number, savored: Boolean) {
    const randRecipe = randRecipes[idx]

    const recipeToBeAdded = {
      id: randRecipe.id,
      title: randRecipe.title,
      cuisine:
        filtersState.filters.cuisine
          ? filtersState.filters.cuisine[0].toUpperCase() +
          filtersState.filters.cuisine.slice(1)
          : randRecipe.cuisines.length === 0
            ? "World Food"
            : randRecipe.cuisines[0],
      dishType:
        filtersState.filters.dishType
          ? filtersState.filters.dishType[0].toUpperCase() +
          filtersState.filters.dishType.slice(1)
          : randRecipe.dishTypes.length === 0
            ? "Many"
            : randRecipe.dishTypes[0][0].toUpperCase() + randRecipe.dishTypes[0].slice(1),
      vegetarian: randRecipe.vegetarian,
      vegan: randRecipe.vegan,
      glutenFree: randRecipe.glutenFree,
      dairyFree: randRecipe.dairyFree,
      readyInMinutes: randRecipe.readyInMinutes,
      servings: randRecipe.servings,
      ingredients: randRecipe.ingredients,
      isSavored: savored,
    };

    // Add recipe to global state
    dispatch(addtoUserRecipeList(recipeToBeAdded));
    // Add recipe to DB for given user
    await swipeToDb(userId.current, recipeToBeAdded);
    // If we are at the last card, trigger a reload
    if (randRecipes.length - idx === 1) {
      dispatch(triggerReload());
    }
    setBlockSwipeButtons(false);
  }

  function handleOnPressLeft() {
    setBlockSwipeButtons(true);
    !blockSwipeButtons && cardStackRef.current?.swipeLeft();
  }

  function handleOnPressRight() {
    setBlockSwipeButtons(true);
    !blockSwipeButtons && cardStackRef.current?.swipeRight();
  }

  function renderNoMoreCard() {
    return (
      <View style={styles.renderNoMoreCardsContainer}>
        <Text style={styles.noMoreCardsText}>No More Recipes,</Text>
        <Text style={styles.noMoreCardsText}>please adjust your filters...</Text>
        <Emoji style={{ margin: 8 }} name="male-cook" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CardStack
          style={{ ...styles.cardStack, flex: 1 }}
          ref={(cardStack: CardStack) => {
            cardStackRef.current = cardStack;
          }}
          renderNoMoreCards={renderNoMoreCard}
          onSwipeStart={() => dispatch(disableScroll())}
          verticalSwipe={false}
        >
          {randRecipes.map((rcp: Recipe, idx: number) => {
            return (
              <Card
                key={rcp.id}
                onSwipedLeft={() => {
                  handleSwipe(idx, false);
                }}
                onSwipedRight={() => {
                  handleSwipe(idx, true);
                }}
              >
                <RecipeCard 
                  rcp={rcp} 
                  id={rcp.id} 
                   />
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

  renderNoMoreCardsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 250,
    height: _screen.height * 0.05,
    color: "white",
  },

  noMoreCardsText: {
    justifyContent: "center",
    alignItems: "center",
    color: colorPalette.background,
  },
});
