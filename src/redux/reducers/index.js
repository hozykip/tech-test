import { combineReducers } from "redux";
import tutorials from "./tutorialReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({ 
    tutorials,
    apiCallsInProgress,
 });

export default rootReducer;