import { userReducer } from "./user";
import { reloadRecipesReducer } from "./reloadRecipes";
import { userRecipeListReducer } from "./userRecipeList";
import { filtersReducer } from "./filters";
import { combineReducers } from "redux";
import { enableScrollReducer } from "./enableScroll";
import { leaveRecipeScreenReducer } from "./leaveRecipeScreen";

const rootReducer = combineReducers({
  userState: userReducer,
  reloadRecipesState: reloadRecipesReducer,
  userRecipeListState: userRecipeListReducer,
  filtersState: filtersReducer,
  enableScrollState: enableScrollReducer,
  leaveRecipeScreenState: leaveRecipeScreenReducer,
});

export default rootReducer;
