import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="nav-wrapper blue darken-1">
      <Link className="brand-logo center" to="/">
        Convert-a-Trip
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item right">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/login" ? "nav-link active": "nav-link"}
            >
              Log Out
            </Link>
          </li>
          <li className="nav-item right">
            <Link
              to="/trips"
              className={window.location.pathname === "/main" ? "nav-link active" : "nav-link"}
            >
              Trips
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
