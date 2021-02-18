import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Caret from "../common/Caret";

const TutorialsList = ({
  tutorials,
  onPublishClick,
  onSearch,
  onDeleteClick,
  filteredTutorials
  //onSort,
  //sortBy,
}) => (
  <>
    
    <input type="search" placeholder="search tutorial by name" name="search" className="form-control" onChange={onSearch} />

    <table className="table">
      <thead>
        <tr>
          
          <th
            //onClick={onSort}
            data-name="title"
            style={{ cursor: "pointer" }}
            title="Order by title"
          >
            Title            
          </th>

          <th>Status</th>

          {/* <th>Publish</th> */}

          <th>Edit</th>

          <th>Publish</th>
          
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {filteredTutorials.map((tutorial) => {

          const publish_classes = `btn ${tutorial.published == 1 ? 'btn-success' : 'btn-danger'}`;

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

                <button id={tutorial.id} onClick={() => onPublishClick(tutorial)} className={publish_classes} title={tutorial.published > 0 ? "Unpublish: " + tutorial.title : "Publish: " + tutorial.title} >{tutorial.published > 0 ? "Published" : "Unpublished"}</button>
                
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
  filteredTutorials: PropTypes.array.isRequired
  //onSort: PropTypes.func,
  //sortBy: PropTypes.object,
};

export default TutorialsList;
