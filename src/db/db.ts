import axios from "axios";
import { SAVORED_SERVER_ENDPOINT } from "../constants/Api";

export async function postRecipeDb(
  user_id: string | undefined,
  rcp: UserRecipe
) {
  // console.log(rcp);
  try {
    const recipe = await axios(SAVORED_SERVER_ENDPOINT, {
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
        user_id:$user_id,
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
          user_id: user_id,
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
    // console.log(recipe);
    return recipe;
  } catch (err) {
    return new Error(err);
  }
}

export async function postUserDb(
  id: string | undefined,
  username: string | null | undefined
) {
  try {
    const newUser = await axios(SAVORED_SERVER_ENDPOINT, {
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
    return newUser;
  } catch (err) {
    return new Error(err);
  }
}

export async function getUserDb(currentUser: User) {
  try {
    const user = await axios(SAVORED_SERVER_ENDPOINT, {
      method: "POST",
      data: {
        query: `
           query getUser($_id: String!)
           {user(_id:$_id) {
            _id
            username
            recipes{
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
            updatedAt
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
  } catch (err) {
    return new Error(err);
  }
}

export async function postFiltersDb(
  user_id: string | undefined,
  filters: Filters
) {
  try {
    const newFilters = await axios(SAVORED_SERVER_ENDPOINT, {
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
    return newFilters;
  } catch (err) {
    // Handle rejected axios POST request Promise
    return new Error(err);
  }
}

export async function updateFiltersDb(
  user_id: string | undefined,
  filters: Filters
) {
  try {
    const updatedFilters = await axios(SAVORED_SERVER_ENDPOINT, {
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
  } catch (err) {
    // Handle rejected axios POST request Promise
    return new Error(err);
  }
}

export async function updateSavorDb(
  user_id: string | undefined,
  rcpId: number,
  isSavored: Boolean
) {
  // ("🍔🍕🍔🍟🌭🍿 inside async function")
  try {
    const recipe = await axios(SAVORED_SERVER_ENDPOINT, {
      method: "POST",
      data: {
        query: `
                      mutation updateRecipe($user_id: String!, $recipe_id: Int!, $isSavored: Boolean) {
                        updateRecipe(user_id:$user_id, recipe_id:$recipe_id, isSavored:$isSavored)
                        {
                          isSavored
                        }
                      }

                      `,
        variables: {
          // user_id: user_id,
          // id: rcpId,
          // isSavored: isSavored,
          user_id: user_id,
          recipe_id: rcpId,
          isSavored: isSavored,
        },
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    // Handle error
    return new Error(err);
  }
}

export async function deleteAccount(user_id: string) {
  try {
    const deleteAccount = await axios(SAVORED_SERVER_ENDPOINT, {
      method: "POST",
      data: {
        query: `
                    mutation deleteUser($user_id: String!) {
                      deleteUser(_id:$user_id) {
                          _id
                      }
                    }
                    `,
        variables: {
          user_id: user_id,
        },
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(deleteAccount);
  } catch (err) {
    // Handle rejected axios POST request Promise
    return new Error(err);
  }
}
