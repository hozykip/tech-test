import React from "react";
import { connect } from "react-redux";
import * as tutorialActions from "../redux/actions/tutorialActions";
import PropTypes from "prop-types";
//import TutorialForm from "./TutorialForm";
//import { newTutorial } from "../mockData"
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";


class ManageTutorialPage extends React.Component {
  
  componentDidMount(){
      const { tutorials, actions, history } = this.props;

      console.log(tutorials);
  }

  render() {  
    return (
      <>
        Yess
      </>
    );
  }
}

 
ManageTutorialPage.propTypes = {
  tutorial: PropTypes.object.isRequired,
  tutorials: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export function getTutorialById(tutorials, id) {
  return tutorials.find((tutorial) => tutorial.id === id || null);
}


function mapStateToProps(state) {
    const id = 1;
  const tutorial =
    id && state.tutorials.length > 0
      ? getTutorialById(state.tutorials, id)
      : newTutorial;
  return {
    tutorial,
    tutorials: state.tutorials,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveTutorial: bindActionCreators(tutorialActions.saveTutorial, dispatch),
      loadTutorials: bindActionCreators(tutorialActions.loadTutorials, dispatch),
      deleteTutorial: bindActionCreators(tutorialActions.deleteTutorial, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTutorialPage);
