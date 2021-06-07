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
export const setUserRecipeList = (
  userRecipeList: UserRecipe[]
): UserRecipeListAction => {
  return {
    type: "SET_USER_RECIPE_LIST",
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

export const unSavorRecipe = (recipeId: number): UserRecipeListAction => {
  return {
    type: "UNSAVOR_RECIPE",
    payload: recipeId,
  };
};

export const resetUserRecipeList = (): EmptyAction => {
  return {
    type: "RESET_USER_RECIPE_LIST",
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

// ReloadRecipes Actions
export const triggerReload = (): EmptyAction => {
  return {
    type: "TRIGGER_RELOAD",
  };
};

export const resetReload = (): EmptyAction => {
  return {
    type: "SET_RELOAD_FALSE",
  };
};

// EnableScroll on Recipe Card Actions
export const enableScroll = (): EmptyAction => {
  return {
    type: "ENABLE_SCROLL",
  };
};

export const disableScroll = (): EmptyAction => {
  return {
    type: "DISABLE_SCROLL",
  };
};
