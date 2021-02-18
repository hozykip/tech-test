import React from "react";
import PropTypes from "prop-types";
import "./Caret.css";

const Caret = ({ direction }) => {
  let classStyle = `caret ${direction}`;
  return <span className={classStyle}></span>;
};

Caret.propTypes = {
  direction: PropTypes.string.isRequired,
};

export default Caret;
