// Initialize initial ReloadRecipes State
const initialState: ReloadRecipesState = {
  reload: false,
};

// Initialize reloadRecipesReducer with initialState and Action type
export const reloadRecipesReducer = (
  state: ReloadRecipesState = initialState,
  action: EmptyAction
) => {
  switch (action.type) {
    // When we reach minimal randRecipes
    case "TRIGGER_RELOAD": {
      return { reload: true };
    }
    // After we've reloaded randRecipes
    case "SET_RELOAD_FALSE": {
      return { reload: false };
    }
    // Default...
    default:
      return state;
  }
};
