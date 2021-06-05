import { userReducer } from "./user";
import { reloadRecipesReducer } from "./reloadRecipes"
import { userRecipeListReducer } from "./userRecipeList"
import { filtersReducer } from "./filters"
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    userState: userReducer,
    reloadRecipesState: reloadRecipesReducer,
    userRecipeListState: userRecipeListReducer,
    filtersState: filtersReducer
});

export default rootReducer;