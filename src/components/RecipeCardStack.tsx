import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  addtoUserRecipeList,
  disableScroll,
  savorRecipe,
  triggerReload,
  unSavorRecipe,
} from "../redux/actions";
import { colorPalette } from "../constants/Styling";
import CardStack, { Card } from "react-native-card-stack-swiper";
import RecipeCard from "../components/RecipeCard";
import SwipeButtons from "../components/SwipeButtons";
import { postRecipeDb, updateSavorDb } from "../db/db";
import Emoji from "react-native-emoji";

const _screen = Dimensions.get("screen");

export default function RecipeCardStack({
  randRecipes,
  filtersState,
  navigateToMoreInfoScreen,
}: RecipeCardStackParamList) {
  const dispatch = useDispatch();
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const [blockSwipeButtons, setBlockSwipeButtons] = React.useState(false);
  const userRef = useRef<UserState>();
  const cardStackRef = React.useRef<CardStack>();
  const [currentRcp, setCurrentRcp] = React.useState<Recipe>(randRecipes[0]);

  useEffect(() => {
    userRef.current = userState;
  }, [userState]);

  async function handleSwipe(idx: number, savored: Boolean) {
    const randRecipe = randRecipes[idx];

    const recipeToBeAdded = {
      id: randRecipe.id,
      title: randRecipe.title,

      cuisine: filtersState.filters.cuisine
        ? filtersState.filters.cuisine[0].toUpperCase() +
          filtersState.filters.cuisine.slice(1)
        : randRecipe.cuisines.length === 0
        ? "World Food"
        : randRecipe.cuisines[0],
      dishType: filtersState.filters.dishType
        ? filtersState.filters.dishType[0].toUpperCase() +
          filtersState.filters.dishType.slice(1)
        : randRecipe.dishTypes.length === 0
        ? "Many"
        : randRecipe.dishTypes[0][0].toUpperCase() +
          randRecipe.dishTypes[0].slice(1),
      vegetarian: randRecipe.vegetarian,
      vegan: randRecipe.vegan,
      glutenFree: randRecipe.glutenFree,
      dairyFree: randRecipe.dairyFree,
      readyInMinutes: randRecipe.readyInMinutes,
      servings: randRecipe.servings,
      ingredients: randRecipe.ingredients,
      isSavored: savored,
    };

    let neverViewed = true;
    // Check if this recipe has been acted upon by the user at any time
    userRecipeListState.userRecipeList.forEach((rcp) => {
      if (rcp.id === recipeToBeAdded.id) {
        neverViewed = false;
      }
    });

    // If user has never acted on this recipe...
    if (neverViewed) {
      // Add recipe to global state
      dispatch(addtoUserRecipeList(recipeToBeAdded));
      // Add recipe to DB for given user, if logged in
      if (userRef.current?.isLoggedIn) {
        await postRecipeDb(userRef.current?.user.id, recipeToBeAdded);
      }
    } else {
      // If this recipe has been acted upon...
      if (savored) {
        // Update global state based on savored value
        dispatch(savorRecipe(recipeToBeAdded.id));
      } else {
        dispatch(unSavorRecipe(recipeToBeAdded.id));
      }
      if (userRef.current?.isLoggedIn) {
        // Update DB record based on savored value
        await updateSavorDb(
          userRef.current?.user.id,
          recipeToBeAdded.id,
          savored
        );
      }
    }

    // If we are at the last card, trigger a reload
    if (randRecipes.length - idx === 1) {
      dispatch(triggerReload());
    }
    setCurrentRcp(randRecipes[idx + 1]);
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
      <View style={styles.noMoreCardsContainer}>
        <Emoji name="male-cook" style={{ fontSize: 24, marginTop: _screen.height*0.01 }} />
        <Text style={styles.noMoreCardsText}>No more recipes,</Text>
        <Text style={styles.noMoreCardsText}>
          please adjust your filters.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <CardStack
          style={styles.cardStack}
          ref={(cardStack: CardStack) => {
            cardStackRef.current = cardStack;
          }}
          renderNoMoreCards={renderNoMoreCard}
          onSwipeStart={() => dispatch(disableScroll())}
          horizontalThreshold={0}
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
                <RecipeCard rcp={rcp} id={rcp.id} />
              </Card>
            );
          })}
        </CardStack>
        <SwipeButtons
          handleOnPressLeft={handleOnPressLeft}
          handleOnPressRight={handleOnPressRight}
          rcp={currentRcp}
          navigateToMoreInfoScreen={navigateToMoreInfoScreen}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  cardStack: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  noMoreCardsContainer: {
    alignItems: "center",
  },

  noMoreCardsText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    color: colorPalette.primary,
  },
});
