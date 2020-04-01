import React, { useState, useEffect } from "react";
import LoginComponent from "../components/Login";
import SignupComponent from "../components/Signup";

function Login() {

  // use state to toggle login versus signup components on the same "/" home route
  const [view, toggleView] = useState(true);

  

  return (
    <div className="container">
      <div>
        {/* LoginComponent is default */}
        {view ? <LoginComponent/> : <SignupComponent/>}
        {/* on click, toggle to SignupComponent */}
        <button className="waves-effect waves-light btn blue darken-1" onClick={() => toggleView(!view)}>
          {view ? " Or Sign Up Here" : "Or Log In Here"}
        </button>
      </div>
    </div>
  );
}

export default Login;
