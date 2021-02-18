import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost/tech-test-api/index.php";

export function getTutorials() {
  return fetch(baseUrl,{ credentials: 'same-origin' }).then(handleResponse).catch(handleError);
}

export function saveTutorial(tutorial) {
  var myHeaders = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});


  return fetch(baseUrl + (tutorial.id || ""), {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(tutorial),
    credentials: 'same-origin',
    //mode: 'no-cors'
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTutorial(tutorialId) {
  return fetch(baseUrl + tutorialId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
