import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addtoUserRecipeList, disableScroll, savorRecipe, triggerReload, unSavorRecipe } from "../redux/actions";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import CardStack, { Card } from "react-native-card-stack-swiper";
import RecipeCard from "../components/RecipeCard";
import SwipeButtons from "../components/SwipeButtons";
import { swipeToDb, toggleSavorDB } from "../db/db";
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
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const [blockSwipeButtons, setBlockSwipeButtons] = React.useState(false);
  const userId = useRef<string | undefined>("");
  const cardStackRef = React.useRef<CardStack>();
  
  useEffect(() => {
    userId.current = userState.user.id;
  }, [userState]);

  async function handleSwipe(idx: number, savored: Boolean) {
    const randRecipe = randRecipes[idx];

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
      if (userState.isLoggedIn) {
        await swipeToDb(userId.current, recipeToBeAdded);
      }
    } else {
      // If this recipe has been acted upon...
      if (savored) {
        // Update global state based on savored value
        dispatch(savorRecipe(recipeToBeAdded.id))
      } else {
        dispatch(unSavorRecipe(recipeToBeAdded.id))
      }
      if (userState.isLoggedIn) {
        // Update DB record based on savored value
        await toggleSavorDB(userId.current, recipeToBeAdded.id, savored);
      }
    }
    
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
    borderRadius: 15,
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
