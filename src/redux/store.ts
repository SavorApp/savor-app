import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers"

// Take the rootReducer (all reducers combined) and initialize store
export const store = createStore(rootReducer, composeWithDevTools());