import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as tutorialActions from "../redux/actions/tutorialActions";
import PropTypes from "prop-types";
import TutorialForm from "./TutorialForm";
import { newTutorial } from "../mockData"
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";

export function ManageTutorialsPage({
  tutorials,
  actions,
  history,
  ...props
}) {

    console.log(props);

  const [tutorial, setTutorial] = useState({ ...props.tutorial });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [fetchTutorials, setFetchTutorials] = useState(false);
  useEffect(() => {

    if (tutorials.length === 0 && !fetchTutorials) {
      actions.loadTutorials()
        .then(() => setFetchTutorials(true))
        .catch((err) => {
          toast.error("Error Loading tutorials: " + err);
        });
    } else {
      setTutorial({ ...props.tutorial });
      setFetchTutorials(true);
    }

    
  }, [props.tutorial]);

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    actions.saveTutorial(tutorial)
      .then(() => {
        toast.success("Tutorial saved");
        history.push("/");
      })
      .catch((error) => {
          
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleChange(event) {
     
    const { name, value } = event.target;
    setTutorial((prevTutorial) => ({
      ...prevTutorial,
      [name]: value,
    }));

    
  }

  function formIsValid() {
    const { title, description } = tutorial;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";

    setErrors(errors);
    //Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <>
      {!fetchTutorials ? (
        <Spinner />
      ) : (
        <TutorialForm
          tutorial={tutorial}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
}

ManageTutorialsPage.propTypes = {
  tutorial: PropTypes.object.isRequired,
  tutorials: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export function getTutorialById(tutorials, id) {
  return tutorials.find((tutorial) => tutorial.id === id || null);
}





function mapStateToProps(state,ownProps) {
    const id = ownProps.match.params.id;
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTutorialsPage);
