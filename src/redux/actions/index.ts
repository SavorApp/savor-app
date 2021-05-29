import { User, UserAction, Recipe, RecipeAction, RecipeListAction } from "../../../types"


// User Actions
export const setUser = (user: User):UserAction => {
    return {
        type: "LOGIN_USER",
        payload: user
    }
}

export const removeUser = (user: User):UserAction => {
    return {
        type: "LOGOUT_USER",
        payload: user
    }
}

// Recipe Actions
export const recipeAction = (recipe: Recipe):RecipeAction => {
    return {
        type: "NEW_ACTION_HERE",
        payload: recipe
    }
}

// Recipe List Actions
export const recipeListAction = (recipeList: Recipe[]):RecipeListAction => {
    return {
        type: "NEW_ACTION_HERE",
        payload: recipeList
    }
}