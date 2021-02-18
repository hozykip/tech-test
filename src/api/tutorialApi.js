import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost/tech-test-api/index.php";

export function getTutorials() {
  return fetch(baseUrl,{ credentials: 'same-origin' }).then(handleResponse).catch(handleError);
}

export function saveTutorial(tutorial) {
  var myHeaders = new Headers({
    'Content-Type': 'application/json',
      Origin: "http://localhost:3000",
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Content-Type, Authorization',
  });


  return fetch(baseUrl, {
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

  let tutorial = { id:tutorialId }

  return fetch(baseUrl, 
  { 
    method: "DELETE", 
    body: JSON.stringify(tutorial),
    credentials: 'same-origin',
  })
    .then(handleResponse)
    .catch(handleError);
}
