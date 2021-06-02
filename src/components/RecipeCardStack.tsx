import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addtoUserRecipeList } from "../redux/actions";
import axios from "axios";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import CardStack, { Card } from "react-native-card-stack-swiper";
import RecipeCard from "../components/RecipeCard";
import SwipeButtons from "../components/SwipeButtons";

// Importing JSON data for development and testing
import * as recipesJson from "../data/recipes.json";
import { initialState } from "../redux/reducers/recipe";
import {
  Recipe,
  RootState,
  UserState,
  FiltersState,
  UserRecipeListState,
  LoggedInParamList,
  RecipeCardStackParamList,
} from "../../types";
import { useFocusEffect } from "@react-navigation/native";

const _screen = Dimensions.get("screen");

export default function RecipeCardStack({
  randRecipes,
  filtersState,
}: RecipeCardStackParamList) {
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const dispatch = useDispatch();
  // FOR TEST PURPOSES
  const [swipedLeftRecipes, setSwipedLeftRecipes] = React.useState<Recipe[]>(
    []
  );
  const [swipedRightRecipes, setSwipedRightRecipes] = React.useState<Recipe[]>(
    []
  );

  const userUID: any = useRef("");

  useEffect(() => {
    console.log("UserState has probably updated", userState.user.id);
    userUID.current = userState.user.id;
  }, [userState]);

  let cardStackRef = React.useRef<CardStack | any>();
  async function onSwipedLeft(idx: number) {
    console.log("Swiped left");

    // TODO: store it the database instead
    console.log("onSwipedLeft -> dishType:", filtersState.filters.dishType);

    const recipeToBeAdded = {
      id: randRecipes[idx].id,
      title: randRecipes[idx].title,
      // Change cuisne and dishType to be comma separated string value
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

    const notSavoredRecipe = await axios(
      "https://savored-server.herokuapp.com/",
      {
        method: "POST",
        data: {
          query: `
            mutation addRcp(
                $user_id: String!, 
                $recipe_id: Int!, 
                $title: String!, 
                $is_savored: Boolean!, 
                $summary: String!, 
                ) {
              addRecipe(
                user_id:$user_id, 
                recipe_id:$recipe_id, 
                title:$title, 
                is_savored:$is_savored, 
                summary:$summary, 
                ) {
               user_id
               recipe_id
               title
               is_savored
               summary
              }
            }
            `,
          variables: {
            user_id: userUID.current,
            recipe_id: recipeToBeAdded.id,
            title: recipeToBeAdded.title,
            is_savored: false,
            summary: "delicious dude",
          },
        },

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(notSavoredRecipe);

    dispatch(addtoUserRecipeList(recipeToBeAdded));

    swipedLeftRecipes.push(randRecipes[idx]);
    setSwipedLeftRecipes(swipedLeftRecipes);
  }

  async function onSwipedRight(idx: number) {
    console.log("Swiped right");

    // TODO: store it the database instead
    console.log("onSwipedRight -> dishType:", filtersState.filters.dishType);

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

    const savoredRecipe = await axios("https://savored-server.herokuapp.com/", {
      method: "POST",
      data: {
        query: `
            mutation addRcp(
                $user_id: String!, 
                $recipe_id: Int!, 
                $title: String!, 
                $is_savored: Boolean!, 
                $summary: String!, 
                ) {
              addRecipe(
                user_id:$user_id, 
                recipe_id:$recipe_id, 
                title:$title, 
                is_savored:$is_savored, 
                summary:$summary, 
                ) {
               user_id
               recipe_id
               title
               is_savored
               summary
              }
            }
            `,
        variables: {
          user_id: userUID.current,
          recipe_id: recipeToBeAdded.id,
          title: recipeToBeAdded.title,
          is_savored: true,
          summary: "delicious dude",
        },
      },

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(savoredRecipe);

    swipedRightRecipes.push(randRecipes[idx]);
    setSwipedRightRecipes(swipedRightRecipes);
  }

  function handleOnPressLeft() {
    cardStackRef.current.swipeLeft();
  }

  function handleOnPressRight() {
    cardStackRef.current.swipeRight();
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
              <Text style={{ justifyContent: "center", alignItems: "center" }}>
                No More Recipes
              </Text>
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
});
