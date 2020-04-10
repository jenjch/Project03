import React, { useState } from "react";
import LoginComponent from "../components/Login";
import SignupComponent from "../components/Signup";

function Login() {

  // use state to toggle login versus signup components on the same "/" home route
  const [view, toggleView] = useState(true);

  

  return (
 
      <div className="box">
        {/* LoginComponent is default, in signup component add toggleView for use on Signup component (to use default Login component after redirect to "/") */}
        {view ? <LoginComponent/> : <SignupComponent toggleView = {toggleView}/>}
        {/* on click, toggle to SignupComponent */}
        <button className="waves-effect waves-light btn blue darken-1" onClick={() => toggleView(!view)}>
          {view ? " Or Sign Up Here" : "Or Log In Here"}
        </button>
      </div>

  );
}

export default Login;
