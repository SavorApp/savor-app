import React from "react";
import { Alert, Dimensions } from "react-native";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import axios from "axios";
import RecipeCardStack from "../components/RecipeCardStack";
import LoadingCardStack from "../components/LoadingCardStack";
import { applySmartFilter, removeViewedRecipes } from "../utils";

// Importing JSON data for development and testing
import * as recipesJson from "../data/100Recipes.json";
import { initialState } from "../redux/reducers/recipe";
import {
  Recipe,
  RootState,
  FiltersState,
  UserRecipeListState,
  Ingredient,
} from "../../types";

// Initializing Spoonacular resources
const API_KEY = Constants.manifest.extra?.SPOONACULAR_API_KEY;
const RAND_RECIPE_BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&`;

export default function MenuScreen() {
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const filtersState = useSelector<RootState, FiltersState>(
    (state) => state.filtersState
  );
  const [randRecipes, setRandRecipes] = React.useState<Recipe[]>([
    initialState.recipe,
  ]);
  const [isCardStackLoading, setIsCardStackLoading] =
    React.useState<boolean>(true);

  // Fetch random Recipes from Spoonacular
  async function fetchRandomRecipes() {
    // let fetchedRecipes: Recipe[];

    // Endpoint with filters included
    const ENDPOINT =
      "number=100&tags=" +
      `${
        filtersState.filters.dishType && filtersState.filters.dishType + ","
      }` +
      `${filtersState.filters.cuisine && filtersState.filters.cuisine + ","}` +
      `${filtersState.filters.vegetarian ? "vegetarian," : ""}` +
      `${filtersState.filters.vegan ? "vegan," : ""}` +
      `${filtersState.filters.glutenFree ? "gluten%20free," : ""}` +
      `${filtersState.filters.dairyFree ? "dairy%20free," : ""}`;

    // Try to fatch data
    try {
      // // Spoonacular GET request
      // const resp = await axios.get(RAND_RECIPE_BASE_URL + ENDPOINT);
      // // Assign parse data.recipes to fit our Recipep[] type
      // fetchedRecipes = resp.data.recipes.map((rcp: Recipe) => {
      //   // For each Recipe, initialize an ingredients arrat containing ingredient names
      //   const ingredientsArray = (
      //     rcp.extendedIngredients as Array<Ingredient>
      //   ).map((ing: Ingredient): string => {
      //     return ing?.name;
      //   });
      //   // Return the Recipe object with ingredients = Ingredient[]
      //   return {
      //     id: rcp.id,
      //     sourceUrl: rcp.sourceUrl,
      //     image: rcp.image,
      //     imageType: rcp.imageType,
      //     title: rcp.title,
      //     diets: rcp.diets,
      //     cuisines: rcp.cuisines,
      //     dishTypes: rcp.dishTypes,
      //     vegetarian: rcp.vegetarian,
      //     vegan: rcp.vegan,
      //     glutenFree: rcp.glutenFree,
      //     dairyFree: rcp.dairyFree,
      //     veryHealthy: rcp.veryHealthy,
      //     cheap: rcp.cheap,
      //     veryPopular: rcp.veryPopular,
      //     sustainable: rcp.sustainable,
      //     aggregateLikes: rcp.aggregateLikes,
      //     spoonacularScore: rcp.spoonacularScore,
      //     healthScore: rcp.healthScore,
      //     pricePerServing: rcp.pricePerServing,
      //     readyInMinutes: rcp.readyInMinutes,
      //     ingredients: ingredientsArray,
      //     servings: rcp.servings,
      //   };
      // });

      const fetchedRecipes = recipesJson.recipes.map((rcp) => {
        const ingredientsArray = (
          rcp.extendedIngredients as Array<Ingredient>
        ).map((ing: Ingredient): string => {
          return ing?.name;
        });
        return {
          id: rcp.id,
          sourceUrl: rcp.sourceUrl,
          image: rcp.image,
          imageType: rcp.imageType,
          title: rcp.title,
          diets: rcp.diets,
          cuisines: rcp.cuisines,
          dishTypes: rcp.dishTypes,
          vegetarian: rcp.vegetarian,
          vegan: rcp.vegan,
          glutenFree: rcp.glutenFree,
          dairyFree: rcp.dairyFree,
          veryHealthy: rcp.veryHealthy,
          cheap: rcp.cheap,
          veryPopular: rcp.veryPopular,
          sustainable: rcp.sustainable,
          aggregateLikes: rcp.aggregateLikes,
          spoonacularScore: rcp.spoonacularScore,
          healthScore: rcp.healthScore,
          pricePerServing: rcp.pricePerServing,
          readyInMinutes: rcp.readyInMinutes,
          servings: rcp.servings,
          ingredients: ingredientsArray,
          smartFilterScore: 0,
        };
      });

      if (fetchedRecipes.length === 0) {
        Alert.alert(
          "No Recipes Found",
          "Please adjust your filter settings to allow for more recipes to show."
        );
      } else {
        // Remove already viewed Recipes
        const removedViewedRecipes = removeViewedRecipes(fetchedRecipes, userRecipeListState.userRecipeList);

        // Apply smartFilter is set to true
        if (filtersState.filters.smartFilter) {
          const finalRandRecipes = applySmartFilter(
            removedViewedRecipes,
            userRecipeListState.userRecipeList
          );
          setRandRecipes(finalRandRecipes);
        } else {
          setRandRecipes(removedViewedRecipes);
        }
      }
      setIsCardStackLoading(false);

      // Catch server erorrs
    } catch {
      Alert.alert(
        "Server Error 🤕",
        "Sorry for the inconvenience, please try again later."
      );
    }

    // Filter random recipes based on filters + Suffle them
    // Filter random recipes based on already viewed recipes by user
    // Apply smart logic if turned on
    // const fetchedRecipes = recipesJson.recipes.map((rcp) => {
    //   const ingredientsArray = (
    //     rcp.extendedIngredients as Array<Ingredient>
    //   ).map((ing: Ingredient): string => {
    //     return ing?.name;
    //   });
    //   return {
    //     id: rcp.id,
    //     sourceUrl: rcp.sourceUrl,
    //     image: rcp.image,
    //     imageType: rcp.imageType,
    //     title: rcp.title,
    //     diets: rcp.diets,
    //     cuisines: rcp.cuisines,
    //     dishTypes: rcp.dishTypes,
    //     vegetarian: rcp.vegetarian,
    //     vegan: rcp.vegan,
    //     glutenFree: rcp.glutenFree,
    //     dairyFree: rcp.dairyFree,
    //     veryHealthy: rcp.veryHealthy,
    //     cheap: rcp.cheap,
    //     veryPopular: rcp.veryPopular,
    //     sustainable: rcp.sustainable,
    //     aggregateLikes: rcp.aggregateLikes,
    //     spoonacularScore: rcp.spoonacularScore,
    //     healthScore: rcp.healthScore,
    //     pricePerServing: rcp.pricePerServing,
    //     readyInMinutes: rcp.readyInMinutes,
    //     servings: rcp.servings,
    //     ingredients: ingredientsArray,
    //     smartFilterScore: 0,
    //   };
    // });

    // Apply smartFilter is set to true
    // if (filtersState.filters.smartFilter) {
    //   const finalRandRecipes = applySmartFilter(
    //     fetchedRecipes,
    //     userRecipeListState.userRecipeList
    //   );
    //   setRandRecipes(finalRandRecipes);
    // } else {
    //   setRandRecipes(fetchedRecipes);
    // }

    // setIsCardStackLoading(false);
  }

  // On update
  React.useEffect(() => {
    setIsCardStackLoading(true);
    fetchRandomRecipes();
  }, [filtersState]);

  // Listen to when randRecipes get set
  // TODO:
  // - On load/before render make API requests for randomized Recipes (Spoonacular)
  // - Apply filters
  // - Compare against User"s viewed Recipes list if User is logged in
  // - Apply score and sorting if smart filter is turned on

  return isCardStackLoading ? (
    <LoadingCardStack />
  ) : (
    <RecipeCardStack randRecipes={randRecipes} filtersState={filtersState} />
  );
}