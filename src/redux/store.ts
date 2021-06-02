import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

// Take the rootReducer (all reducers combined) and initialize store
const thunky = applyMiddleware(thunk);
export const store = createStore(rootReducer, composeWithDevTools(thunky));
