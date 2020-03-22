import React, { useState, useEffect } from "react";
import LoginComponent from "../components/Login";
import SignupComponent from "../components/Signup";

function Login() {
  const [view, toggleView] = useState(true);

  

  return (
    <div>
      {view ? <LoginComponent/> : <SignupComponent/>}
      <button onClick={() => toggleView(!view)}>
        {view ? " Or Sign Up Here" : "Or Log In Here"}
      </button>
    </div>
  );
}

export default Login;
