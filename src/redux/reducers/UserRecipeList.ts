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
      // TODO: clean this up
      // Rename references to recipe's id
      if (Array.isArray(action.payload)) {
        action.payload.map((rcp) => {
          if (rcp.recipe_id) {
            rcp.id = rcp.recipe_id;
            delete rcp.recipe_id
          }
        });
      }
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
      const newUserRecipeList = state.userRecipeList.map((rcp) => {
        if (rcp.id === action.payload) {
          rcp.isSavored = false;
        }
        return rcp;
      });
      return {
        userRecipeList: newUserRecipeList,
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
