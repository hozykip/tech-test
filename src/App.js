import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./common/Header";
import ManageTutorialsPage from "./components/ManageTutorialsPage";
//import ManageTutorialPage from "./components/ManageTutorialPage";
import TurorialsPage from "./components/TutorialsPage";

import "react-toastify/dist/ReactToastify.css";
import './App.css';
import TutorialsPage from "./components/TutorialsPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={TutorialsPage} />
        <Route path="/:id" component={ManageTutorialsPage} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
