import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as tutorialActions from "../redux/actions/tutorialActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import TutorialsList from "./TutorialsList";
import { act } from "react-dom/test-utils";

export function TutorialsPage({ actions, tutorials, loading }) {

  const [sortBy, setSortBy] = useState(false);
  const [redirectToAddTutorialPage, setRedirectToAddPage] = useState(false);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(()=> {
    if (tutorials.length === 0) {
      actions.loadTutorials().catch((err) => {
          toast.error("Error Loading tutorials: " + err, { autoClose: false });
      });
    }else{
      setFilteredTutorials([...tutorials]);
    }

  },[tutorials]);

  

  async function handleDeleteTutorial(tutorial) {
    toast.success("Tutorial deleted");
    try {
      await actions.deleteTutorial(tutorial);
    } catch (err) {
      toast.error("Delete failed " + err.message, { autoClose: false });
    }
  };
  
  async function handlePublishTutorial (tutorial) {

    const newTutorial = {...tutorial, published: tutorial.published === 1 ? 0 : 1 }

    setSaving(true);
    actions.saveTutorial(newTutorial)
      .then((tut) => {
        setSaving(false);
        toast.success(tut.published ? "Tutorial published successfully" : "Tutorial unpublished successfully")
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };


  function handleSearch (event) {
    const { name, value } = event.target;


    setFilteredTutorials((prevState) => {
      const filtered = tutorials.filter(x => x.title.toLowerCase().includes(value.toLowerCase()));
      return filtered;
    });
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
                filteredTutorials={filteredTutorials}
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
