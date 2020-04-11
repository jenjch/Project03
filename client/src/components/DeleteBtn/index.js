import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <span id="delete-btn" className="waves-effect waves-light btn-small red darken-2" {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default DeleteBtn;
