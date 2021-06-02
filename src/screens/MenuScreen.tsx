import React from "react";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import axios from "axios";
import RecipeCardStack from "../components/RecipeCardStack";
import LoadingCardStack from "../components/LoadingCardStack";
import { applySmartFilter } from "../utils";

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

const _screen = Dimensions.get("screen");

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
    const vegetarian = filtersState.filters.vegetarian;
    const ENDPOINT = `number=10&tags=${vegetarian && "vegetarian"}`;

    // const resp = await axios.get(RAND_RECIPE_BASE_URL + ENDPOINT);
    // const fetchedRecipes = resp.data.recipes.map((rcp: Recipe) => {
    //     return {
    //         id: rcp.id,
    //         sourceUrl: rcp.sourceUrl,
    //         image: rcp.image,
    //         imageType: rcp.imageType,
    //         title: rcp.title,
    //         diets: rcp.diets,
    //         cuisines: rcp.cuisines,
    //         dishTypes: rcp.dishTypes,
    //         vegetarian: rcp.vegetarian,
    //         vegan: rcp.vegan,
    //         glutenFree: rcp.glutenFree,
    //         dairyFree: rcp.dairyFree,
    //         veryHealthy: rcp.veryHealthy,
    //         cheap: rcp.cheap,
    //         veryPopular: rcp.veryPopular,
    //         sustainable: rcp.sustainable,
    //         aggregateLikes: rcp.aggregateLikes,
    //         spoonacularScore: rcp.spoonacularScore,
    //         healthScore: rcp.healthScore,
    //         pricePerServing: rcp.pricePerServing,
    //         readyInMinutes: rcp.readyInMinutes,
    //         servings: rcp.servings
    //     }
    // });

    // Filter random recipes based on filters + Suffle them
    // Filter random recipes based on already viewed recipes by user
    // Apply smart logic if turned on
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

    // Apply smartFilter is set to true
    if (filtersState.filters.smartFilter) {
      const finalRandRecipes = applySmartFilter(
        fetchedRecipes,
        userRecipeListState.userRecipeList
      );
      setRandRecipes(finalRandRecipes);
    } else {
      setRandRecipes(fetchedRecipes);
    }

    setIsCardStackLoading(false);
  }

  // On update
  React.useEffect(() => {
    setIsCardStackLoading(true);
    fetchRandomRecipes();
  }, [filtersState]);

  console.log(
    "OUTSIDE MENU SCREEN -> dishType:",
    filtersState.filters.dishType
  );
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
