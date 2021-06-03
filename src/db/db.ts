import axios from "axios";
import { UserRecipe } from "../../types";

export async function leftSwipeAddToDb(rcp: UserRecipe) {
  const recipe = await axios("https://savored-server.herokuapp.com/", {
    method: "POST",
    data: {
      query: `
            mutation addRcp(
                  $user_id: String!,
                  $recipe_id: Int!,
                  $title: String!,
                  $cuisine: String,
                  $dishType: String,
                  $vegetarian: Boolean,
                  $vegan: Boolean,
                  $glutenFree: Boolean,
                  $dairyFree: Boolean,
                  $readyInMinutes: Int,
                  $servings: Int,
                  $ingredients: [String],
                  $isSavored: Boolean,
  
  
              
  
                ) {
              addRecipe(
                user_id:$user_id
                recipe_id:$recipe_id,
                title:$title,
                cuisine:$cuisine,
                dishType:$dishType,
                vegetarian:$vegetarian,
                vegan:$vegan,
                glutenFree:$glutenFree,
                dairyFree:$dairyFree,
                readyInMinutes:$readyInMinutes,
                servings:$servings,
                ingredients:$ingredients,
                isSavored:$isSavored,
                ) {
                  user_id
                  recipe_id
                  title
                  cuisine
                  dishType
                  vegetarian
                  vegan
                  glutenFree
                  dairyFree
                  readyInMinutes
                  servings
                  ingredients
                  isSavored
              }
            }
            `,
      variables: {
        user_id: "2",
        recipe_id: rcp.id,
        title: rcp.title,
        cuisine: rcp.cuisine,
        dishType: rcp.dishType,
        vegetarian: rcp.vegetarian,
        vegan: rcp.vegan,
        glutenFree: rcp.glutenFree,
        dairyFree: rcp.dairyFree,
        readyInMinutes: rcp.readyInMinutes,
        servings: rcp.servings,
        ingredients: rcp.ingredients,
        isSavored: rcp.isSavored,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(recipe);
}

export async function rightSwipeAddToDb(rcp: UserRecipe) {
  const recipe = await axios("https://savored-server.herokuapp.com/", {
    method: "POST",
    data: {
      query: `
          mutation addRcp(
                $user_id: String!,
                $recipe_id: Int!,
                $title: String!,
                $cuisine: String,
                $dishType: String,
                $vegetarian: Boolean,
                $vegan: Boolean,
                $glutenFree: Boolean,
                $dairyFree: Boolean,
                $readyInMinutes: Int,
                $servings: Int,
                $ingredients: [String],
                $isSavored: Boolean,


            

              ) {
            addRecipe(
              user_id:$user_id
              recipe_id:$recipe_id,
              title:$title,
              cuisine:$cuisine,
              dishType:$dishType,
              vegetarian:$vegetarian,
              vegan:$vegan,
              glutenFree:$glutenFree,
              dairyFree:$dairyFree,
              readyInMinutes:$readyInMinutes,
              servings:$servings,
              ingredients:$ingredients,
              isSavored:$isSavored,
              ) {
                user_id
                recipe_id
                title
                cuisine
                dishType
                vegetarian
                vegan
                glutenFree
                dairyFree
                readyInMinutes
                servings
                ingredients
                isSavored
            }
          }
          `,
      variables: {
        user_id: "2",
        recipe_id: rcp.id,
        title: rcp.title,
        cuisine: rcp.cuisine,
        dishType: rcp.dishType,
        vegetarian: rcp.vegetarian,
        vegan: rcp.vegan,
        glutenFree: rcp.glutenFree,
        dairyFree: rcp.dairyFree,
        readyInMinutes: rcp.readyInMinutes,
        servings: rcp.servings,
        ingredients: rcp.ingredients,
        isSavored: rcp.isSavored,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(recipe);
}

export async function createUser(
  id: string | undefined,
  username: string | null | undefined
) {
  console.log(id, username);
  const newUser = await axios("https://savored-server.herokuapp.com/", {
    method: "POST",
    data: {
      query: `
            mutation createUser($_id: String!, $username: String!) {
              createUser(_id:$_id, username:$username) {
               _id
                username
              }
            }
            `,
      variables: {
        _id: id,
        username: username,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(newUser);
}
