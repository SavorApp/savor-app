import { createStore } from "redux";
import rootReducer from "./reducers"

// Take the rootReducer (all reducers combined) and initialize store
export const store = createStore(rootReducer);