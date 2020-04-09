import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function FindReceiptBtn(props) {
  return (
    <span className="findReceipt-btn waves-effect waves-light btn-small green darken-2 " {...props} role="button" tabIndex="0">
     Select
    </span>
  );
}

export default FindReceiptBtn;
