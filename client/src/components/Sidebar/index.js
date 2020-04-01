import React from "react";
import "./style.css";
import { PromiseProvider } from "mongoose";

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
