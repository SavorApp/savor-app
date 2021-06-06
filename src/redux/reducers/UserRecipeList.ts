// Initialize initial User Recipe List State
const initialState: UserRecipeListState = {
  userRecipeList: [],
};

// Initialize userRecipeListReducer with initialState and Action type
export const userRecipeListReducer = (
  state: UserRecipeListState = initialState,
  action: UserRecipeListAction
) => {
  switch (action.type) {
    // When user swipes...
    case "SET_USER_RECIPE_LIST": {
      return {
        userRecipeList: action.payload,
      };
    }
    // When user swipes...
    case "ADD_TO_USER_RECIPE_LIST": {
      return {
        userRecipeList: [...state.userRecipeList, action.payload],
      };
    }
    case "UNSAVOR_RECIPE": {
      return {
        userRecipeList: state.userRecipeList.forEach((rcp) => {
          if (rcp.id === action.payload) {
            rcp.isSavored = false;
          }
        }),
      };
    }
    case "RESET_USER_RECIPE_LIST": {
      return {
        userRecipeList: [],
      };
    }
    // Default...
    default:
      return state;
  }
};
