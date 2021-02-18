import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Caret from "../common/Caret";

const TutorialsList = ({
  tutorials,
  onPublishClick,
  onSearch,
  onDeleteClick,
  onSort,
  sortBy,
}) => (
  <>
    
    <input type="search" placeholder="search tutorial by name" className="form-control" onChange={onSearch} />

    <table className="table">
      <thead>
        <tr>
          
          <th
            onClick={onSort}
            data-name="title"
            style={{ cursor: "pointer" }}
            title="Order by title"
          >
            Title{" "}
            {sortBy && sortBy.criteria === "title" && (
              <Caret direction={sortBy.incr ? "down" : "up"} />
            )}
          </th>

          <th>Status</th>

          {/* <th>Publish</th> */}

          <th>Edit</th>
          
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {tutorials.map((tutorial) => {
          return (
            <tr key={tutorial.id}>
              
              <td>
                <Link to={"/" + tutorial.id}>{tutorial.title}</Link>
              </td>

              <td>{tutorial.published > 0 ? "Published" : "Unpublished"}</td>
              
              {/* <td>
                {tutorial.published > 0 ? (
                  <button
                  className="btn btn-danger"
                  onClick={() => onPublishClick(tutorial)}
                >
                  Unpublish
                </button>
                ) : (
                  <button
                  className="btn btn-success"
                  onClick={() => onPublishClick(tutorial)}
                >
                  Publish
                </button>
                )}
              </td> */}

              <td>
                <Link to={"/" + tutorial.id} className="btn btn-primary">Edit</Link>
              </td>

              <td>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(tutorial)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);

TutorialsList.propTypes = {
  tutorials: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onPublishClick: PropTypes.func,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  onSort: PropTypes.func,
  sortBy: PropTypes.object,
};

export default TutorialsList;
