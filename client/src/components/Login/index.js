import React, { useState, useEffect } from "react";
import {Input} from "../Form";

function Login(props) {

  let [email, setEmail] = useState ("")
  // let [password, setPassword] = useState ("")

  const handleEmail = event => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  }

  const handlePassword = event => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  }

  const handleClick = () => {
    console.log(email);
  }

    return (
      <div>
        <h3>Log In</h3>
        <p>Email</p>
        <Input onChange={event => handleEmail(event)}/>
        <p>Password</p>
       <Input onChange={event => handlePassword(event)}/> 

       <button onClick={()=> handleClick()}>Log In!</button>
      </div>
    );
  }

  export default Login;