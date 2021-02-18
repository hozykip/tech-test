import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import { Link } from "react-router-dom";

const TutorialForm = ({
  tutorial,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <>
    <Link
      to={"/"}
      className="btn btn-secondary"
      style={{ marginBottom: 20 }}
            >Back</Link>
    <form onSubmit={onSave}>
      <h2>{tutorial.id ? "Edit" : "Add"} Tutorial</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={tutorial.title}
        onChange={onChange}
        error={errors.title}
      />


      <TextInput
        name="description"
        label="Description"
        value={tutorial.description}
        onChange={onChange}
        error={errors.description}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
    </>
    
  );
};

TutorialForm.propTypes = {
  tutorial: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default TutorialForm;
