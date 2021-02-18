import * as types from "./actionTypes";
import * as tutorialApi from "../../api/tutorialApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTutorialsSuccess(tutorials) {
  return { type: types.LOAD_TUTORIALS_SUCCESS, tutorials };
}

export function createTutorialSuccess(tutorial) {
  return { type: types.CREATE_TUTORIAL_SUCCESS, tutorial };
}
export function updateTutorialSuccess(tutorial) {
  return { type: types.UPDATE_TUTORIAL_SUCCESS, tutorial };
}

export function deleteTutorialOptimistic(tutorial) {
  return { type: types.DELETE_TUTORIAL_OPTIMISTIC, tutorial };
}



export function loadTutorials() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return tutorialApi
      .getTutorials()
      .then((tutorials) => {
        dispatch(loadTutorialsSuccess(tutorials));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveTutorial(tutorial) {
  console.log(tutorial);
  return (dispatch) => {
    dispatch(beginApiCall());
    return tutorialApi
      .saveTutorial(tutorial)
      .then((savedTutorial) => {
        tutorial.id
          ? dispatch(updateTutorialSuccess(savedTutorial))
          : dispatch(createTutorialSuccess(savedTutorial));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deleteTutorial(tutorial) {
  return function (dispatch) {
    dispatch(deleteTutorialOptimistic(tutorial));
    return tutorialApi.deleteTutorial(tutorial.id);
  };
}
