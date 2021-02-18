import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function tutorialReducer(state = initialState.tutorials, action) {
  console.log(action);
  switch (action.type) {
    case types.CREATE_TUTORIAL_SUCCESS:
      return [...state, { ...action.tutorial }];
    case types.UPDATE_TUTORIAL_SUCCESS:
      alert(action.tutorial.title);
      return state.map((tutorial) =>
        tutorial.id === action.tutorial.id ? action.tutorial : tutorial
      );
    case types.LOAD_TUTORIALS_SUCCESS:
      return action.tutorials;
    case types.DELETE_TUTORIAL_OPTIMISTIC:
      return state.filter((tutorial) => tutorial.id !== action.tutorial.id);
    default:
      return state;
  }
}