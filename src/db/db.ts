import axios from "axios";
import { SAVORED_SERVER_API } from "../constants/api";

export async function swipeToDb(user_id: string | undefined, rcp: UserRecipe) {
  console.log(user_id);
  const recipe = await axios(SAVORED_SERVER_API, {
    method: "POST",
    data: {
      query: `
            mutation addRcp(
                  $user_id: String!,
                  $id: Int!,
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
                id:$id,
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
                  id
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
        user_id: user_id,
        id: rcp.id,
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
  const newUser = await axios(SAVORED_SERVER_API, {
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

export async function getCurrentUser(currentUser: User) {
  console.log(currentUser.id);
  const user = await axios(SAVORED_SERVER_API, {
    method: "POST",
    data: {
      query: `
         query getUser($_id: String!)
         {user(_id:$_id) {
          _id
          username
          recipes{
          id
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
          filters{
            smartFilter
            dishType
            cuisine
            vegetarian
            vegan
            glutenFree
            dairyFree
            readyInMinutes
            servings
          }
         }}
            `,
      variables: {
        _id: currentUser.id,
      },
    },
  });
  return user.data.data.user;
}

export async function createFilters(
  user_id: string | undefined,
  filters: Filters
) {
  console.log(user_id, filters);
  const newFilters = await axios(SAVORED_SERVER_API, {
    method: "POST",
    data: {
      query: `
            mutation createFilters($user_id: String!, 
              $smartFilter: Boolean, 
              $dishType: String, 
              $cuisine: String, 
              $vegetarian: Boolean,
              $vegan: Boolean,
              $glutenFree: Boolean,
              $dairyFree: Boolean,
              $readyInMinutes: Int,
              $servings: Int) {
              createFilters(user_id:$user_id, 
                smartFilter:$smartFilter, 
                dishType:$dishType, 
                cuisine:$cuisine, 
                vegetarian:$vegetarian,
                vegan:$vegan,
                glutenFree:$glutenFree,
                dairyFree:$dairyFree,
                readyInMinutes:$readyInMinutes,
                servings:$servings) {
               smartFilter
               dishType
               cuisine
               vegetarian
               vegan
               glutenFree
               dairyFree
               readyInMinutes
               servings
              }
            }
            `,
      variables: {
        user_id: user_id,
        smartFilter: filters.smartFilter,
        dishType: filters.dishType,
        cuisine: filters.cuisine,
        vegetarian: filters.vegetarian,
        vegan: filters.vegan,
        glutenFree: filters.glutenFree,
        dairyFree: filters.dairyFree,
        readyInMinutes: filters.readyInMinutes,
        servings: filters.servings,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateFiltersDb(
  user_id: string | undefined,
  filters: Filters
) {
  console.log(user_id, filters);
  const updatedFilters = await axios(SAVORED_SERVER_API, {
    method: "POST",
    data: {
      query: `
            mutation updateFilters($user_id: String!, 
              $smartFilter: Boolean, 
              $dishType: String, 
              $cuisine: String, 
              $vegetarian: Boolean,
              $vegan: Boolean,
              $glutenFree: Boolean,
              $dairyFree: Boolean,
              $readyInMinutes: Int,
              $servings: Int) {
              updateFilters(user_id:$user_id, 
                smartFilter:$smartFilter, 
                dishType:$dishType, 
                cuisine:$cuisine, 
                vegetarian:$vegetarian,
                vegan:$vegan,
                glutenFree:$glutenFree,
                dairyFree:$dairyFree,
                readyInMinutes:$readyInMinutes,
                servings:$servings) {
                
                user_id
               smartFilter
               dishType
               cuisine
               vegetarian
               vegan
               glutenFree
               dairyFree
               readyInMinutes
               servings
              }
            }
            `,
      variables: {
        user_id: user_id,
        smartFilter: filters.smartFilter,
        dishType: filters.dishType,
        cuisine: filters.cuisine,
        vegetarian: filters.vegetarian,
        vegan: filters.vegan,
        glutenFree: filters.glutenFree,
        dairyFree: filters.dairyFree,
        readyInMinutes: filters.readyInMinutes,
        servings: filters.servings,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}
