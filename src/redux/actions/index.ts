import {
  User,
  EmptyAction,
  UserAction,
  UserRecipeListAction,
  Filters,
  FiltersAction,
  UserRecipe,
  UserRecipeListState,
  FiltersState,
} from "../../../types";

// User Actions
export const setUser = (user: User): UserAction => {
  return {
    type: "LOGIN_USER",
    payload: user,
  };
};

export const removeUser = (): EmptyAction => {
  return {
    type: "LOGOUT_USER",
  };
};

// User Recipe List Actions
export const setUserRecipeListState = (
  userRecipeList: UserRecipe[]
): UserRecipeListAction => {
  return {
    type: "SET_USER_RECIPE_LIST_STATE",
    payload: userRecipeList,
  };
};

export const addtoUserRecipeList = (
  recipe: UserRecipe
): UserRecipeListAction => {
  return {
    type: "ADD_TO_USER_RECIPE_LIST",
    payload: recipe,
  };
};

export const resetUserRecipeListState = (): EmptyAction => {
  return {
    type: "RESET_USER_RECIPE_LIST_STATE",
  };
};

// Filters Actions
export const setFilters = (filters: Filters): FiltersAction => {
  return {
    type: "SET_FILTERS",
    payload: filters,
  };
};

export const updateFilters = (filters: Filters): FiltersAction => {
  return {
    type: "UPDATE_FILTERS",
    payload: filters,
  };
};

export const resetFilters = (): EmptyAction => {
  return {
    type: "RESET_FILTERS",
  };
};
