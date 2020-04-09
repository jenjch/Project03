import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function FindReceiptBtn(props) {
  return (
    <span id="go-button" className="waves-effect waves-light btn-small green accent-3" {...props} role="button" tabIndex="0">
     Go!
    </span>
  );
}

export default FindReceiptBtn;
