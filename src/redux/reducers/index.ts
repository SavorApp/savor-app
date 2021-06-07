import { userReducer } from "./user";
import { reloadRecipesReducer } from "./reloadRecipes"
import { userRecipeListReducer } from "./UserRecipeList"
import { filtersReducer } from "./filters"
import { combineReducers } from "redux";
import { enableScrollReducer } from "./enableScroll";


const rootReducer = combineReducers({
    userState: userReducer,
    reloadRecipesState: reloadRecipesReducer,
    userRecipeListState: userRecipeListReducer,
    filtersState: filtersReducer,
    enableScrollState: enableScrollReducer,
});

export default rootReducer;