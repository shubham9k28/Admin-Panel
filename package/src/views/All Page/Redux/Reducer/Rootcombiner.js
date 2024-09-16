import { combineReducers } from "redux";
import { Reducer } from "./Reducer.js";

export const rootReducer = combineReducers({
    token : Reducer
})