import React from "react";
import "./style.css";

function Sidebar(props) {
  return (
    // <div className="container">
      <div className="sidebar">
          {props.children}
      </div>
    // </div>
  );
}

export default Sidebar;
