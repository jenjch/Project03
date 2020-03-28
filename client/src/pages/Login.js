import React, { useState, useEffect } from "react";
import LoginComponent from "../components/Login";
import SignupComponent from "../components/Signup";

function Login() {
  const [view, toggleView] = useState(true);

  

  return (
    <div className="container">
      <div>
        {view ? <LoginComponent/> : <SignupComponent/>}
        <button className="waves-effect waves-light btn blue darken-1" onClick={() => toggleView(!view)}>
          {view ? " Or Sign Up Here" : "Or Log In Here"}
        </button>
      </div>
    </div>
  );
}

export default Login;
