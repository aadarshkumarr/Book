import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as bookReducer } from "./Books/reducer";

const rootReducer = combineReducers({ bookReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
