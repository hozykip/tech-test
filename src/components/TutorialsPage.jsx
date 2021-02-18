import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as tutorialActions from "../redux/actions/tutorialActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import TutorialsList from "./TutorialsList";

export function TutorialsPage({ actions, tutorials, loading }) {

  const [sortBy, setSortBy] = useState(false);
  const [redirectToAddTutorialPage, setRedirectToAddPage] = useState(false);
  const [filteredTutorials, setFilteredTutorials] = useState([]);

  useEffect(()=> {
    if (tutorials.length === 0) {
      actions.loadTutorials().catch((err) => {
          toast.error("Error Loading tutorials: " + err, { autoClose: false });
      });
    }
  });

  

  async function handleDeleteTutorial(tutorial) {
    toast.success("Tutorial deleted");
    try {
      await actions.deleteTutorial(tutorial);
    } catch (err) {
      toast.error("Delete failed " + err.message, { autoClose: false });
    }
  };
  
  async function handlePublishTutorial (tutorial) {
    tutorial.published = tutorial.published == 1 ? 0 : 1;

    let new_tutorial = {...tutorial};
    new_tutorial.published = tutorial.published == 1 ? 0 : 1;
    
    try {
      await actions.saveTutorial(new_tutorial);
      alert("dddd")
      toast.success("Tutorial published successfully");
    } catch (err) {
      toast.error("Publish failed " + err.message, { autoClose: false });
    }
  };


  function handleSearch (event) {
    const { name, value } = event.target;
    setFilteredTutorials((prevState) => {})
  }

  function handleFilter (event) {
    const { name, value } = event.target;

  }

  function handleSort (event) {
    const { name, value } = event.target;

  }
  

  return (
      <>
        {redirectToAddTutorialPage && <Redirect to="/tutorials" />}
        <h2>
          Tutorials {loading} ({tutorials.length})
        </h2>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <button
              className="btn btn-primary add-course"
              style={{ marginBottom: 20 }}
              onClick={() => setRedirectToAddPage(true)}
            >
              Add Tutorial
            </button>

            {tutorials.length > 0 ? (
              <TutorialsList
                onDeleteClick={handleDeleteTutorial}
                onPublishClick={handlePublishTutorial}
                tutorials={tutorials}
                onChange={handleFilter}
                onSort={handleSort}
                sortBy={sortBy}
                onSearch={handleSearch}
              />
            ) : (
              <div className="alert alert-info">No Tutorials</div>
            )}
          </>
        )}
      </>
    );
}

TutorialsPage.propTypes = {
  tutorials: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    tutorials: state.tutorials,
    loading: state.apiCallsInProgress > 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(TutorialsPage);
