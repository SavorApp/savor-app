import {
  User,
  EmptyUserAction,
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

export const removeUser = (): EmptyUserAction => {
  return {
    type: "LOGOUT_USER",
  };
};

// User Recipe List Actions
export const setUserRecipeListState = (
  userRecipeListState: UserRecipeListState
): UserRecipeListAction => {
  return {
    type: "ADD_TO_USER_RECIPE_LIST",
    payload: userRecipeListState,
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

// Filters Actions
export const setFilters = (filtersState: FiltersState): FiltersAction => {
  return {
    type: "UPDATE_FILTERS",
    payload: filtersState,
  };
};

export const updateFilters = (filters: Filters): FiltersAction => {
  return {
    type: "UPDATE_FILTERS",
    payload: filters,
  };
};
