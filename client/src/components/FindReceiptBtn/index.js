import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function FindReceiptBtn(props) {
  return (
    <span className="findReceipt-btn" {...props} role="button" tabIndex="0">
     Go!
    </span>
  );
}

export default FindReceiptBtn;
